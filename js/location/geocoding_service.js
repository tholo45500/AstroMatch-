// js/location/geocoding_service.js
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { find: findTimeZones } = require("geo-tz/all");

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "AstroMatch/3.1.0 local-prototype";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MIN_REMOTE_INTERVAL_MS = 1100;

const cache = new Map();
let lastRemoteRequestAt = 0;
let requestQueue = Promise.resolve();

function normalizeQuery(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

function cacheKey(query, limit) {
  return `${normalizeQuery(query).toLowerCase()}|${limit}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function typedError(message, type, details = null) {
  const error = new Error(message);
  error.type = type;
  if (details !== null) error.details = details;
  return error;
}

async function rateLimitedFetch(url, options) {
  const run = async () => {
    const wait = Math.max(0, MIN_REMOTE_INTERVAL_MS - (Date.now() - lastRemoteRequestAt));
    if (wait > 0) await sleep(wait);
    lastRemoteRequestAt = Date.now();
    return fetch(url, options);
  };
  const pending = requestQueue.then(run, run);
  requestQueue = pending.catch(() => {});
  return pending;
}

function resolveTimezone(latitude, longitude) {
  const zones = findTimeZones(latitude, longitude);
  if (!Array.isArray(zones) || zones.length === 0) {
    throw typedError("Impossible de déterminer le fuseau horaire du lieu.", "TIMEZONE_NOT_FOUND", { latitude, longitude });
  }
  return zones[0];
}

function normalizeNominatimResult(item) {
  const latitude = Number(item?.lat);
  const longitude = Number(item?.lon);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  const address = item?.address || {};
  return {
    display_name: item?.display_name || "",
    name: address.city || address.town || address.village || address.municipality || address.hamlet || item?.name || item?.display_name || "",
    country: address.country || "",
    country_code: String(address.country_code || "").toUpperCase(),
    state: address.state || address.region || "",
    latitude,
    longitude,
    timezone_id: resolveTimezone(latitude, longitude),
    provider: "nominatim",
    resolution_status: "resolved",
    osm_type: item?.osm_type || null,
    osm_id: item?.osm_id ?? null
  };
}

export async function searchPlaces(rawQuery, { limit = 5 } = {}) {
  const query = normalizeQuery(rawQuery);
  if (query.length < 2) {
    throw typedError("Le lieu doit contenir au moins 2 caractères.", "GEOCODE_QUERY_TOO_SHORT");
  }

  const safeLimit = Math.max(1, Math.min(5, Number(limit) || 5));
  const key = cacheKey(query, safeLimit);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) {
    return cached.value.map(item => ({ ...item }));
  }

  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(safeLimit));
  url.searchParams.set("addressdetails", "1");

  const response = await rateLimitedFetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      "Accept": "application/json",
      "Accept-Language": "fr,en;q=0.8"
    }
  });

  if (!response.ok) {
    throw typedError(`Le service de géocodage a répondu ${response.status}.`, "GEOCODE_PROVIDER_ERROR", { status: response.status });
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw typedError("Réponse de géocodage invalide.", "GEOCODE_INVALID_RESPONSE");
  }

  const results = payload.map(normalizeNominatimResult).filter(Boolean);
  cache.set(key, { savedAt: Date.now(), value: results });
  return results.map(item => ({ ...item }));
}

export async function geocodePlace(rawQuery) {
  const results = await searchPlaces(rawQuery, { limit: 1 });
  if (results.length === 0) {
    throw typedError(`Aucun lieu trouvé pour "${normalizeQuery(rawQuery)}".`, "PLACE_NOT_FOUND");
  }
  return results[0];
}

export function clearGeocodingCache() {
  cache.clear();
}
