// js/daily/transit_engine.js
//
// Moteur quotidien AstroMatch.
// Compare le ciel astronomique réel d'une date au thème natal d'un profil.
// Aucun texte narratif ici : uniquement des faits astrologiques traçables.

import {
  computeEphemeris,
  EPHEMERIS_PROVIDER,
  getEphemerisCapabilities
} from "../astrology/ephemeris/ephemeris_adapter.js";
import { angularDistance, wOrbe } from "../utils/math.js";

export const DAILY_REFERENCE_TIME = "12:00";

export const DAILY_ASPECT_DEFINITIONS = [
  { type: "conjunction", exact_angle: 0, orb_max: 4, polarity: "neutral" },
  { type: "sextile", exact_angle: 60, orb_max: 2.5, polarity: "harmonious" },
  { type: "square", exact_angle: 90, orb_max: 3, polarity: "tense" },
  { type: "trine", exact_angle: 120, orb_max: 3, polarity: "harmonious" },
  { type: "opposition", exact_angle: 180, orb_max: 3.5, polarity: "tense" }
];

function assertIsoDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ""))) {
    const err = new Error("DAILY_DATE_INVALID: date YYYY-MM-DD attendue.");
    err.type = "DAILY_DATE_INVALID";
    throw err;
  }

  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    const err = new Error("DAILY_DATE_INVALID: date impossible.");
    err.type = "DAILY_DATE_INVALID";
    throw err;
  }
}

function assertRealProvider() {
  const capabilities = getEphemerisCapabilities();

  if (!capabilities.real_astronomical_positions) {
    const err = new Error(
      "DAILY_REAL_EPHEMERIS_REQUIRED: l'horoscope quotidien exige un provider astronomique réel."
    );
    err.type = "DAILY_REAL_EPHEMERIS_REQUIRED";
    throw err;
  }

  return capabilities;
}

function dailyBirthData(profile, date) {
  const resolved = profile?.birth_data?.place?.resolved;

  if (
    !resolved ||
    resolved.resolution_status !== "resolved" ||
    !Number.isFinite(Number(resolved.latitude)) ||
    !Number.isFinite(Number(resolved.longitude)) ||
    !resolved.timezone_id
  ) {
    const err = new Error(
      "DAILY_LOCATION_INVALID: coordonnées et timezone_id résolus requis."
    );
    err.type = "DAILY_LOCATION_INVALID";
    throw err;
  }

  return {
    date,
    time: {
      known: true,
      value: DAILY_REFERENCE_TIME
    },
    place: {
      raw_input: profile?.birth_data?.place?.raw_input || "",
      resolved: {
        ...resolved
      }
    }
  };
}

function cleanSkyPoint(point) {
  return {
    body: point.body,
    sign: point.sign,
    degree_in_sign: point.degree_in_sign,
    absolute_degree: point.absolute_degree,
    retrograde: Boolean(point.retrograde),
    longitude_speed: point.longitude_speed
  };
}

export function matchDailyAspect(actualAngle) {
  let best = null;

  for (const def of DAILY_ASPECT_DEFINITIONS) {
    const orb = Math.abs(actualAngle - def.exact_angle);
    if (orb > def.orb_max) continue;

    if (!best || orb < best.orb) {
      best = {
        type: def.type,
        exact_angle: def.exact_angle,
        actual_angle: actualAngle,
        orb,
        orb_max: def.orb_max,
        orb_strength: wOrbe(orb, def.orb_max),
        polarity: def.polarity
      };
    }
  }

  return best;
}

function findHouseForDegree(houses, degree) {
  if (!Array.isArray(houses) || houses.length !== 12) return null;

  for (let i = 0; i < houses.length; i++) {
    const start = houses[i].cusp_degree;
    const end = houses[(i + 1) % houses.length].cusp_degree;

    if (start < end) {
      if (degree >= start && degree < end) return houses[i].number;
    } else if (degree >= start || degree < end) {
      return houses[i].number;
    }
  }

  return null;
}

function aspectRecord(transit, natal, match) {
  return {
    transiting_body: transit.body,
    natal_body: natal.body,
    aspect_type: match.type,
    polarity: match.polarity,
    actual_angle: Number(match.actual_angle.toFixed(4)),
    orb: Number(match.orb.toFixed(4)),
    orb_max: match.orb_max,
    orb_strength: Number(match.orb_strength.toFixed(4)),
    transit_sign: transit.sign,
    transit_degree_in_sign: transit.degree_in_sign,
    transit_absolute_degree: transit.absolute_degree,
    transit_retrograde: transit.retrograde,
    natal_absolute_degree: natal.absolute_degree
  };
}

function angleAspectRecord(transit, angleName, angle, match) {
  return {
    transiting_body: transit.body,
    natal_angle: angleName,
    aspect_type: match.type,
    polarity: match.polarity,
    actual_angle: Number(match.actual_angle.toFixed(4)),
    orb: Number(match.orb.toFixed(4)),
    orb_max: match.orb_max,
    orb_strength: Number(match.orb_strength.toFixed(4)),
    transit_sign: transit.sign,
    transit_degree_in_sign: transit.degree_in_sign,
    transit_absolute_degree: transit.absolute_degree,
    transit_retrograde: transit.retrograde,
    natal_absolute_degree: angle.absolute_degree
  };
}

function strongestFirst(a, b) {
  if (b.orb_strength !== a.orb_strength) {
    return b.orb_strength - a.orb_strength;
  }

  if (a.orb !== b.orb) return a.orb - b.orb;

  return String(a.transiting_body).localeCompare(String(b.transiting_body));
}

export function computeDailySky(profile, date) {
  assertIsoDate(date);
  const capabilities = assertRealProvider();
  const birthData = dailyBirthData(profile, date);

  const ephemeris = computeEphemeris(
    birthData,
    { house_system: "whole_sign" }
  );

  return {
    date,
    reference_time_local: DAILY_REFERENCE_TIME,
    timezone_id: birthData.place.resolved.timezone_id,
    provider: EPHEMERIS_PROVIDER,
    real_astronomical_positions:
      Boolean(capabilities.real_astronomical_positions),
    points: ephemeris.points.map(cleanSkyPoint),
    calculation_meta: ephemeris.calculation_meta || null
  };
}

export function computeDailyTransits(profile, natalChart, date) {
  if (!natalChart || !Array.isArray(natalChart.points)) {
    const err = new Error("DAILY_NATAL_CHART_REQUIRED");
    err.type = "DAILY_NATAL_CHART_REQUIRED";
    throw err;
  }

  const sky = computeDailySky(profile, date);
  const transits = [];

  for (const transit of sky.points) {
    for (const natal of natalChart.points) {
      const actualAngle = angularDistance(
        transit.absolute_degree,
        natal.absolute_degree
      );

      const match = matchDailyAspect(actualAngle);
      if (!match) continue;

      transits.push(
        aspectRecord(transit, natal, match)
      );
    }
  }

  transits.sort(strongestFirst);

  const timeKnown = Boolean(natalChart?.reliability?.time_known);
  const housesAvailable =
    timeKnown &&
    Array.isArray(natalChart.houses) &&
    natalChart.houses.length === 12;

  const houseTransits = housesAvailable
    ? sky.points.map(point => ({
        transiting_body: point.body,
        house_number: findHouseForDegree(
          natalChart.houses,
          point.absolute_degree
        ),
        transit_sign: point.sign,
        transit_degree_in_sign: point.degree_in_sign,
        transit_absolute_degree: point.absolute_degree,
        transit_retrograde: point.retrograde
      }))
    : [];

  const angleTransits = [];

  if (timeKnown) {
    const angles = [
      ["ascendant", natalChart?.angles?.ascendant],
      ["midheaven", natalChart?.angles?.midheaven]
    ];

    for (const transit of sky.points) {
      for (const [angleName, angle] of angles) {
        if (!angle || !Number.isFinite(Number(angle.absolute_degree))) continue;

        const actualAngle = angularDistance(
          transit.absolute_degree,
          angle.absolute_degree
        );

        const match = matchDailyAspect(actualAngle);
        if (!match) continue;

        angleTransits.push(
          angleAspectRecord(transit, angleName, angle, match)
        );
      }
    }

    angleTransits.sort(strongestFirst);
  }

  return {
    date,
    profile_id: profile?.profile_id || null,
    reference_time_local: sky.reference_time_local,
    timezone_id: sky.timezone_id,
    provider: sky.provider,
    reliability: {
      real_astronomical_positions: sky.real_astronomical_positions,
      natal_time_known: timeKnown,
      houses_available: housesAvailable,
      angles_available: timeKnown
    },
    sky,
    transits,
    house_transits: houseTransits,
    angle_transits: angleTransits
  };
}
