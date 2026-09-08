import { clamp } from "../utils/math.js";

export const DAILY_SCORE_VERSION = "daily-score@1.0.0";
export const DAILY_DOMAINS = ["heart", "communication", "energy"];

const TRANSIT_RELEVANCE = {
  heart: { sun: .5, moon: 1.0, mercury: .4, venus: 1.4, mars: .9, jupiter: .7, saturn: .4, uranus: .5, neptune: .6, pluto: .5 },
  communication: { sun: .4, moon: .6, mercury: 1.5, venus: .5, mars: .5, jupiter: .7, saturn: .5, uranus: .8, neptune: .5, pluto: .4 },
  energy: { sun: 1.2, moon: .6, mercury: .4, venus: .5, mars: 1.5, jupiter: .9, saturn: .7, uranus: .8, neptune: .3, pluto: .8 }
};

const NATAL_RELEVANCE = {
  heart: { sun: .7, moon: 1.2, mercury: .3, venus: 1.5, mars: 1.0, jupiter: .5, saturn: .4, uranus: .4, neptune: .6, pluto: .6 },
  communication: { sun: .5, moon: .8, mercury: 1.5, venus: .5, mars: .5, jupiter: .6, saturn: .6, uranus: .7, neptune: .5, pluto: .4 },
  energy: { sun: 1.2, moon: .7, mercury: .4, venus: .4, mars: 1.5, jupiter: .7, saturn: .7, uranus: .6, neptune: .3, pluto: .7 }
};

const HOUSE_RELEVANCE = {
  heart: new Set([5, 7, 8]),
  communication: new Set([3, 9, 11]),
  energy: new Set([1, 6, 10])
};

const ASPECT_WEIGHT = {
  conjunction: 1.0,
  sextile: .65,
  square: .9,
  trine: .8,
  opposition: .95
};

const NEUTRAL_VALENCE = {
  sun: .35,
  moon: .15,
  mercury: .15,
  venus: .65,
  mars: -.25,
  jupiter: .7,
  saturn: -.55,
  uranus: 0,
  neptune: 0,
  pluto: -.2
};

const ANGLE_RELEVANCE = {
  heart: { ascendant: .45, midheaven: .15 },
  communication: { ascendant: .45, midheaven: .35 },
  energy: { ascendant: .8, midheaven: .7 }
};

function directionFor(aspect) {
  if (aspect.polarity === "harmonious") return 1;
  if (aspect.polarity === "tense") return -1;
  return NEUTRAL_VALENCE[aspect.transiting_body] ?? 0;
}

function houseMultiplier(domain, body, houseByBody) {
  const house = houseByBody.get(body);
  return HOUSE_RELEVANCE[domain].has(house) ? 1.15 : 1;
}

function scoreFromRaw(raw) {
  return Math.round(clamp(50 + 35 * Math.tanh(raw / 18), 0, 100));
}

function level(score) {
  if (score >= 68) return "favorable";
  if (score <= 32) return "challenging";
  return "balanced";
}

function addContribution(bucket, contribution) {
  if (!Number.isFinite(contribution.value) || Math.abs(contribution.value) < 0.01) return;
  bucket.push({ ...contribution, value: Number(contribution.value.toFixed(3)) });
}

export function computeDailyScores(dailyTransits) {
  if (!dailyTransits || !Array.isArray(dailyTransits.transits)) {
    throw new TypeError("dailyTransits.transits doit être un tableau.");
  }
  if (dailyTransits.provider && dailyTransits.provider !== "astronomy-engine") {
    throw new Error("Le scoring quotidien exige le provider astronomy-engine.");
  }

  const houseByBody = new Map(
    (dailyTransits.house_transits || []).map((x) => [x.transiting_body, x.house_number])
  );

  const raw = Object.fromEntries(DAILY_DOMAINS.map((domain) => [domain, 0]));
  const contributions = [];

  for (const transit of dailyTransits.transits) {
    const strength = clamp(Number(transit.orb_strength) || 0, 0, 1);
    const aspectWeight = ASPECT_WEIGHT[transit.aspect_type] ?? .5;
    const direction = directionFor(transit);

    for (const domain of DAILY_DOMAINS) {
      const transitWeight = TRANSIT_RELEVANCE[domain][transit.transiting_body] ?? .25;
      const natalWeight = NATAL_RELEVANCE[domain][transit.natal_body] ?? .25;
      const relevance = Math.sqrt(transitWeight * natalWeight);
      const hMultiplier = houseMultiplier(domain, transit.transiting_body, houseByBody);
      const value = direction * strength * aspectWeight * relevance * hMultiplier * 7.5;
      raw[domain] += value;

      addContribution(contributions, {
        kind: "planetary_aspect",
        domain,
        value,
        transiting_body: transit.transiting_body,
        natal_body: transit.natal_body,
        aspect_type: transit.aspect_type,
        orb: transit.orb,
        orb_strength: transit.orb_strength,
        house_number: houseByBody.get(transit.transiting_body) ?? null
      });
    }
  }

  for (const transit of dailyTransits.angle_transits || []) {
    const strength = clamp(Number(transit.orb_strength) || 0, 0, 1);
    const aspectWeight = ASPECT_WEIGHT[transit.aspect_type] ?? .5;
    const direction = directionFor(transit);

    for (const domain of DAILY_DOMAINS) {
      const angleWeight = ANGLE_RELEVANCE[domain][transit.natal_angle] ?? 0;
      if (!angleWeight) continue;
      const bodyWeight = TRANSIT_RELEVANCE[domain][transit.transiting_body] ?? .25;
      const value = direction * strength * aspectWeight * angleWeight * bodyWeight * 4;
      raw[domain] += value;

      addContribution(contributions, {
        kind: "angle_aspect",
        domain,
        value,
        transiting_body: transit.transiting_body,
        natal_angle: transit.natal_angle,
        aspect_type: transit.aspect_type,
        orb: transit.orb,
        orb_strength: transit.orb_strength
      });
    }
  }

  const scores = {};
  for (const domain of DAILY_DOMAINS) {
    const score = scoreFromRaw(raw[domain]);
    const domainContributions = contributions
      .filter((x) => x.domain === domain)
      .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    scores[domain] = {
      score,
      level: level(score),
      raw: Number(raw[domain].toFixed(3)),
      strongest_influences: domainContributions.slice(0, 3)
    };
  }

  const dominantDomain = DAILY_DOMAINS
    .map((domain) => ({ domain, distance: Math.abs(scores[domain].score - 50) }))
    .sort((a, b) => b.distance - a.distance)[0].domain;

  return {
    version: DAILY_SCORE_VERSION,
    date: dailyTransits.date ?? null,
    profile_id: dailyTransits.profile_id ?? null,
    provider: dailyTransits.provider ?? null,
    scores,
    dominant_domain: dominantDomain,
    contributions: contributions.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
  };
}
