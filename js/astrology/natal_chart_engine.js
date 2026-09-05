// js/astrology/natal_chart_engine.js
//
// Responsabilité : transformer un profile en natal_chart via l'adaptateur
// d'éphémérides. Le reste de l'application ne dépend jamais du provider.

import { generateId, nowIso, deterministicHash } from "../utils/id.js";
import { computeEphemeris, EPHEMERIS_ENGINE_VERSION, EPHEMERIS_PROVIDER, getEphemerisCapabilities } from "./ephemeris/ephemeris_adapter.js";

export function profileCalculationFingerprint(profile) {
  const birth = profile.birth_data;
  const resolved = birth.place.resolved;
  const canonical = [
    birth.date,
    birth.time.known ? birth.time.value : "unknown-time",
    birth.time.known,
    resolved.latitude,
    resolved.longitude,
    resolved.timezone_id,
    profile.house_system
  ].join("|");
  return deterministicHash(canonical).toString(16);
}

export function computeNatalChart(profile) {
  if (profile.birth_data.place.resolved.resolution_status !== "resolved") {
    const err = new Error(`Impossible de calculer le thème natal de ${profile.identity.first_name} : lieu de naissance non résolu.`);
    err.type = "CALCULATION_IMPOSSIBLE";
    throw err;
  }

  const { points, angles, houses, reliability, calculation_meta } = computeEphemeris(profile.birth_data, { house_system: profile.house_system });

  return {
    chart_id: generateId("chart"),
    profile_id: profile.profile_id,
    source_profile_updated_at: profile.updated_at,
    source_profile_fingerprint: profileCalculationFingerprint(profile),
    computed_at: nowIso(),
    engine_version: EPHEMERIS_ENGINE_VERSION,
    calculation: {
      provider: EPHEMERIS_PROVIDER,
      engine_version: EPHEMERIS_ENGINE_VERSION,
      status: getEphemerisCapabilities().production_ready ? "production_candidate" : "prototype_only",
      requested_house_system: profile.house_system,
      used_house_system: profile.birth_data.time.known
        ? (EPHEMERIS_PROVIDER === "simulated" ? "equal_simulated" : profile.house_system)
        : null,
      supported_house_systems: getEphemerisCapabilities().supported_house_systems,
      astrologically_valid: getEphemerisCapabilities().real_astronomical_positions
    },
    reliability,
    points,
    angles,
    houses,
    calculation_meta: calculation_meta || null
  };
}
