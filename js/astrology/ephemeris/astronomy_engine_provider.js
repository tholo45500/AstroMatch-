// Commercial-safe candidate provider: Astronomy Engine (MIT).
// Astronomy Engine provides deterministic planetary astronomy in JS/Node/browser.
// It is NOT a Swiss Ephemeris drop-in: this adapter deliberately exposes only
// capabilities we can validate and does not pretend to provide Placidus yet.
import { createRequire } from "node:module";
import { localBirthToUtc, localBirthAtNoonUtc } from "./timezone.js";
import { normalizeDegrees } from "../../utils/math.js";

export const PROVIDER = "astronomy-engine";
export const ENGINE_VERSION = "astronomy-engine-adapter@1.0.0";

const BODY_NAMES = ["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto"];

function signOf(deg) {
  const n = normalizeDegrees(deg);
  const signs = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"];
  const i = Math.floor(n / 30);
  return { sign: signs[i], degree_in_sign: Number((n - i * 30).toFixed(6)) };
}

const require = createRequire(import.meta.url);

function loadApi() {
  try { return require("astronomy-engine"); }
  catch (cause) {
    const err = new Error("Le provider Astronomy Engine nécessite le package astronomy-engine. Lance npm install dans le kit.");
    err.type = "EPHEMERIS_PROVIDER_UNAVAILABLE";
    err.cause = cause;
    throw err;
  }
}

function utcDate(birthData) {
  const tz = birthData.place.resolved.timezone_id;
  if (!tz) throw new Error("TIMEZONE_REQUIRED: timezone_id manquant.");
  return birthData.time?.known
    ? localBirthToUtc(birthData.date, birthData.time.value, tz)
    : localBirthAtNoonUtc(birthData.date, tz);
}

function bodyEnum(api, body) {
  const key = body[0].toUpperCase() + body.slice(1);
  return api.Body?.[key] ?? key;
}

function eclipticCoordinates(api, body, date) {
  const eqj = api.GeoVector(bodyEnum(api, body), date, true);
  return api.Ecliptic(eqj);
}

function longitude(api, body, date) {
  return normalizeDegrees(eclipticCoordinates(api, body, date).elon);
}

function latitude(api, body, date) {
  return Number(eclipticCoordinates(api, body, date).elat.toFixed(8));
}

function distanceAu(api, body, date) {
  const eqj = api.GeoVector(bodyEnum(api, body), date, true);
  return Number(eqj.Length().toFixed(10));
}

function longitudeSpeed(api, body, date) {
  const ms = 60000;
  const before = new Date(date.getTime() - ms);
  const after = new Date(date.getTime() + ms);
  let delta = normalizeDegrees(longitude(api, body, after) - longitude(api, body, before));
  if (delta > 180) delta -= 360;
  return delta / 120 * 86400; // degrees/day
}

function arc(a, b) { return normalizeDegrees(b - a); }
function signedArc(a, b) {
  let d = normalizeDegrees(a - b);
  if (d > 180) d -= 360;
  return d;
}
function eclipticLongitudeOfRA(ra, eps) {
  const r = ra * Math.PI / 180;
  const e = eps * Math.PI / 180;
  return normalizeDegrees(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(e)) * 180 / Math.PI);
}
function wholeSignHouses(asc) {
  const first = Math.floor(normalizeDegrees(asc) / 30) * 30;
  return Array.from({ length: 12 }, (_, i) => ({ number: i + 1, cusp_degree: Number(normalizeDegrees(first + i * 30).toFixed(6)), sign: signOf(first + i * 30).sign }));
}
function equalHouses(asc) {
  return Array.from({ length: 12 }, (_, i) => ({ number: i + 1, cusp_degree: Number(normalizeDegrees(asc + i * 30).toFixed(6)), sign: signOf(asc + i * 30).sign }));
}
function porphyryHouses(asc, mc) {
  const a = normalizeDegrees(asc), m = normalizeDegrees(mc), d = normalizeDegrees(a + 180), i = normalizeDegrees(m + 180);
  const c = new Array(12);
  c[0]=a; c[3]=i; c[6]=d; c[9]=m;
  const fill=(from,to,idxs)=>{const step=arc(from,to)/3; c[idxs[0]]=normalizeDegrees(from+step); c[idxs[1]]=normalizeDegrees(from+2*step);};
  fill(m,a,[10,11]); fill(a,i,[1,2]); fill(i,d,[4,5]); fill(d,m,[7,8]);
  return c.map((x,j)=>({number:j+1,cusp_degree:Number(x.toFixed(6)),sign:signOf(x).sign}));
}
function placidusHouses(ascendant, midheaven, location, epsDeg) {
  const eps = epsDeg * Math.PI / 180;
  const phi = Number(location.latitude) * Math.PI / 180;
  const mc = normalizeDegrees(midheaven);
  const ramc = normalizeDegrees(Math.atan2(Math.sin(mc*Math.PI/180)*Math.cos(eps), Math.cos(mc*Math.PI/180))*180/Math.PI);
  const solve=(offset,f,nocturnal)=>{
    let ra=normalizeDegrees(ramc+offset);
    for(let i=0;i<100;i++){
      const lambda=eclipticLongitudeOfRA(ra,epsDeg)*Math.PI/180;
      const dec=Math.asin(Math.sin(eps)*Math.sin(lambda));
      const x=Math.tan(phi)*Math.tan(dec);
      if(Math.abs(x)>=1) return null;
      const ad=Math.asin(x)*180/Math.PI;
      const next=nocturnal ? normalizeDegrees(ramc+180-f*(90-ad)) : normalizeDegrees(ramc+f*(90+ad));
      if(Math.abs(signedArc(next,ra))<1e-9) return eclipticLongitudeOfRA(next,epsDeg);
      ra=next;
    }
    return null;
  };
  const c11=solve(30,1/3,false), c12=solve(60,2/3,false), c2=solve(120,2/3,true), c3=solve(150,1/3,true);
  if([c11,c12,c2,c3].some(x=>x===null)) return null;
  const a=normalizeDegrees(ascendant), m=normalizeDegrees(midheaven);
  const raw=[a,c2,c3,normalizeDegrees(m+180),normalizeDegrees(c11+180),normalizeDegrees(c12+180),normalizeDegrees(a+180),normalizeDegrees(c2+180),normalizeDegrees(c3+180),m,c11,c12];
  return raw.map((x,j)=>({number:j+1,cusp_degree:Number(normalizeDegrees(x).toFixed(6)),sign:signOf(x).sign}));
}
export function computeHouseCusps(system, ascendant, midheaven, latitude, obliquityDeg) {
  if (system === "whole_sign") return wholeSignHouses(ascendant);
  if (system === "equal") return equalHouses(ascendant);
  if (system === "porphyry") return porphyryHouses(ascendant, midheaven);
  if (system === "placidus") {
    const solved = placidusHouses(ascendant, midheaven, { latitude, longitude: 0 }, obliquityDeg);
    return solved || porphyryHouses(ascendant, midheaven);
  }
  throw new Error(`HOUSE_SYSTEM_UNSUPPORTED: ${system}`);
}

function houseOf(degree, houses) {
  for (let i=0;i<houses.length;i++) {
    const start=houses[i].cusp_degree, end=houses[(i+1)%houses.length].cusp_degree;
    if (start<=end ? degree>=start && degree<end : degree>=start || degree<end) return houses[i].number;
  }
  return 12;
}
function gmstHours(jd) {
  const T=(jd-2451545.0)/36525;
  return normalizeDegrees(280.46061837+360.98564736629*(jd-2451545.0)+0.000387933*T*T-T*T*T/38710000)/15;
}
function julianDay(date) { return date.getTime()/86400000+2440587.5; }
function trueObliquity(api, date) {
  const rotation = api.Rotation_EQD_ECT(date);
  const m = rotation.rot;
  return Math.atan2(m[2][1], m[1][1]) * 180 / Math.PI;
}
function calculateAngles(jd, latitude, longitude, api, date) {
  const eps = trueObliquity(api, date);
  let gast;
  if (typeof api.SiderealTime === 'function') gast=api.SiderealTime(date);
  else gast=gmstHours(jd);
  const ramc=normalizeDegrees(gast*15+longitude);
  const ra=ramc*Math.PI/180, e=eps*Math.PI/180, phi=latitude*Math.PI/180;
  let mc=normalizeDegrees(Math.atan2(Math.tan(ra),Math.cos(e))*180/Math.PI);
  const diff=Math.abs(mc-ramc); if(diff>90 && diff<270) mc=normalizeDegrees(mc+180);
  const asc=normalizeDegrees(Math.atan2(Math.cos(ra),-(Math.sin(ra)*Math.cos(e)+Math.tan(phi)*Math.sin(e)))*180/Math.PI);
  return {asc,mc,eps};
}

export function computeAstronomyEngineEphemeris(birthData, options = {}) {
  const api = loadApi();
  const date = utcDate(birthData);
  const points = BODY_NAMES.map(body => {
    const absolute = longitude(api, body, date);
    const speed = longitudeSpeed(api, body, date);
    const s = signOf(absolute);
    return {
      body, sign: s.sign, degree_in_sign: s.degree_in_sign,
      absolute_degree: Number(absolute.toFixed(6)), house: null,
      retrograde: speed < 0, longitude_speed: Number(speed.toFixed(8)),
      latitude: latitude(api, body, date), distance_au: distanceAu(api, body, date)
    };
  });

  const timeKnown = Boolean(birthData.time?.known);
  let houses = [];
  let resultHouseFallback = false;
  let angles = { ascendant: null, midheaven: null, descendant: null, imum_coeli: null };
  const requested = options.house_system || "placidus";

  if (timeKnown) {
    if (!["equal","whole_sign","porphyry","placidus"].includes(requested)) {
      const err = new Error(`HOUSE_SYSTEM_UNSUPPORTED: système de maisons non supporté: ${requested}.`);
      err.type = "HOUSE_SYSTEM_UNSUPPORTED";
      throw err;
    }
    const lat = Number(birthData.place.resolved.latitude);
    const lon = Number(birthData.place.resolved.longitude);
    const jd = julianDay(date);
    const a = calculateAngles(jd, lat, lon, api, date);
    const asc = a.asc;
    const mc = a.mc;
    if (requested === "whole_sign") houses = wholeSignHouses(asc);
    else if (requested === "equal") houses = equalHouses(asc);
    else if (requested === "porphyry") houses = porphyryHouses(asc, mc);
    else if (requested === "placidus") {
      houses = placidusHouses(asc, mc, { latitude: lat, longitude: lon }, a.eps);
      if (!houses) {
        houses = porphyryHouses(asc, mc);
        resultHouseFallback = true;
      }
    }
    angles = {
      ascendant: { ...signOf(asc), absolute_degree: Number(asc.toFixed(6)) },
      midheaven: { ...signOf(mc), absolute_degree: Number(mc.toFixed(6)) },
      descendant: { ...signOf(asc + 180), absolute_degree: Number(normalizeDegrees(asc + 180).toFixed(6)) },
      imum_coeli: { ...signOf(mc + 180), absolute_degree: Number(normalizeDegrees(mc + 180).toFixed(6)) }
    };
    for (const p of points) p.house = houseOf(p.absolute_degree, houses);
  }

  return {
    points, angles, houses,
    reliability: {
      time_known: timeKnown, houses_valid: timeKnown, house_fallback: resultHouseFallback,
      ascendant_valid: timeKnown, provider: PROVIDER,
      approximate_time_used: !timeKnown
    },
    calculation_meta: {
      utc: date.toISOString(), julian_day_ut: julianDay(date),
      source_model: "Astronomy Engine / VSOP87-based planetary model",
      license_profile: "MIT", house_system_requested: requested, house_system_effective: resultHouseFallback ? "porphyry" : (timeKnown ? requested : null)
    }
  };
}
