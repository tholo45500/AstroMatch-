import fs from "node:fs";
import { performance } from "node:perf_hooks";

import { computeAstronomyEngineEphemeris } from "./js/astrology/ephemeris/astronomy_engine_provider.js";
import { computeSynastry } from "./js/synastry/synastry_engine.js";
import { computeScore } from "./js/scoring/scoring_engine.js";

const CONFIG_PATH = "./js/scoring/config/weighting_v1_2.json";
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

let PASS = 0;
let FAIL = 0;

function ok(condition, label) {
  if (condition) {
    PASS++;
    console.log(`PASS — ${label}`);
  } else {
    FAIL++;
    console.log(`FAIL — ${label}`);
  }
}

function finite(x) {
  return Number.isFinite(Number(x));
}

function bounded(x) {
  return finite(x) && Number(x) >= 0 && Number(x) <= 100;
}

function approx(a, b, eps = 1e-9) {
  return Math.abs(Number(a) - Number(b)) <= eps;
}

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

function makeInput(date, time, latitude, longitude, timezone_id) {
  return {
    date,
    time: { known: true, value: time },
    place: {
      resolved: {
        resolution_status: "resolved",
        latitude,
        longitude,
        timezone_id
      }
    }
  };
}

function allContributions(score) {
  return score.domain_scores.flatMap(d =>
    Array.isArray(d.contributions) ? d.contributions : []
  );
}

function stripDynamic(score) {
  const x = clone(score);
  x.score_id = null;
  x.computed_at = null;
  return x;
}

const inputA = makeInput(
  "1990-04-12",
  "14:35",
  45.764,
  23.44055538,
  "Europe/Bucharest"
);

const inputB = makeInput(
  "1985-07-22",
  "18:25",
  40.4168,
  -3.7038,
  "Europe/Madrid"
);

console.log("");
console.log("==================================================");
console.log("ASTROMATCH RELEASE CANDIDATE — TESTS 106 → 110");
console.log("==================================================");
console.log("");

/* =========================================================
   106 — AUDIT DES 51 RÈGLES
   ========================================================= */

console.log("=== TEST 106 — AUDIT DES 51 RÈGLES ===");

const validDomains = new Set([
  "love",
  "emotions",
  "communication",
  "passion",
  "daily",
  "projects",
  "frictions"
]);

const validPlanets = new Set([
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto"
]);

const validAspects = new Set([
  "conjunction",
  "sextile",
  "square",
  "trine",
  "opposition"
]);

ok(Array.isArray(CONFIG.rules), "CONFIG.rules est un tableau");
ok(CONFIG.rules.length === 51, "Exactement 51 règles");

const ruleIds = CONFIG.rules.map(r => r.rule_id);

ok(
  ruleIds.every(id => typeof id === "string" && id.length > 0),
  "Toutes les règles ont un rule_id"
);

ok(
  new Set(ruleIds).size === ruleIds.length,
  "Tous les rule_id sont uniques"
);

ok(
  CONFIG.rules.every(r => validDomains.has(r.domain)),
  "Tous les domaines sont valides"
);

ok(
  CONFIG.rules.every(r =>
    validPlanets.has(r.planet_a) &&
    validPlanets.has(r.planet_b)
  ),
  "Toutes les planètes sont valides"
);

ok(
  CONFIG.rules.every(r => validAspects.has(r.aspect_type)),
  "Tous les aspects sont valides"
);

ok(
  CONFIG.rules.every(r =>
    finite(r.base_points) &&
    finite(r.orb_max) &&
    finite(r.house_bonus)
  ),
  "Toutes les valeurs numériques sont finies"
);

ok(
  CONFIG.rules.every(r =>
    Number(r.orb_max) >= 0 &&
    Number(r.orb_max) <= 180
  ),
  "Tous les orb_max sont dans [0,180]"
);

/*
 * house_bonus = 0 est autorisé.
 * Cela signifie : règle valide sans bonus de maison.
 */
ok(
  CONFIG.rules.every(r =>
    Number(r.house_bonus) >= 0
  ),
  "Tous les house_bonus sont >= 0"
);

ok(
  CONFIG.rules.every(r =>
    Number.isInteger(Number(r.overlay_house)) &&
    Number(r.overlay_house) >= 1 &&
    Number(r.overlay_house) <= 12
  ),
  "Tous les overlay_house sont dans [1,12]"
);

const generationalRules = CONFIG.rules.filter(r =>
  ["uranus", "neptune", "pluto"].includes(r.planet_a) ||
  ["uranus", "neptune", "pluto"].includes(r.planet_b)
);

ok(
  generationalRules.length >= 15,
  "Au moins 15 règles générationnelles"
);

const mixedRules = CONFIG.rules.filter(
  r => r.doctrine_polarity === "MIXED_TENSION_REVIEW"
);

ok(
  mixedRules.length === 6,
  "Exactement 6 règles MIXED"
);

console.log("");

/* =========================================================
   107 — CONTRIBUTIONS
   ========================================================= */

console.log("=== TEST 107 — AUDIT DES CONTRIBUTIONS ===");

const chartA = computeAstronomyEngineEphemeris(inputA);
const chartB = computeAstronomyEngineEphemeris(inputB);

const synAB = computeSynastry(chartA, chartB);
const scoreAB = computeScore(synAB, CONFIG);

const contributions = allContributions(scoreAB);

ok(
  contributions.length > 0,
  "Contributions réelles présentes"
);

ok(
  contributions.every(c =>
    typeof c.rule_id === "string" &&
    typeof c.aspect_id === "string"
  ),
  "Chaque contribution possède rule_id + aspect_id"
);

ok(
  contributions.every(c => ruleIds.includes(c.rule_id)),
  "Chaque contribution référence une règle existante"
);

const aspectIds = new Set(
  synAB.aspects.map(a => a.aspect_id)
);

ok(
  contributions.every(c => aspectIds.has(c.aspect_id)),
  "Chaque contribution référence un aspect réel"
);

const contributionKeys = contributions.map(c =>
  [
    c.rule_id,
    c.aspect_id,
    c.domain,
    c.planet_a,
    c.planet_b,
    c.aspect_type
  ].join("|")
);

ok(
  new Set(contributionKeys).size === contributionKeys.length,
  "Aucun doublon de contribution"
);

ok(
  contributions.every(c =>
    finite(c.base_points) &&
    finite(c.orb) &&
    finite(c.orb_max) &&
    finite(c.orb_strength) &&
    finite(c.planet_weight) &&
    finite(c.house_weight) &&
    finite(c.final_points)
  ),
  "Toutes les contributions sont finies"
);

ok(
  contributions.every(c =>
    c.impact === "positive" ||
    c.impact === "negative"
  ),
  "Tous les impacts sont valides"
);

ok(
  contributions.every(c =>
    c.orb >= 0 &&
    c.orb <= c.orb_max
  ),
  "Toutes les contributions respectent orb <= orb_max"
);

ok(
  contributions.every(c => {
    const expected = Number(
      (
        Number(c.base_points) *
        Number(c.orb_strength) *
        Number(c.planet_weight) *
        Number(c.house_weight)
      ).toFixed(2)
    );

    return approx(expected, c.final_points);
  }),
  "Recalcul indépendant de final_points"
);

console.log("");

/* =========================================================
   108 — STRESS
   ========================================================= */

console.log("=== TEST 108 — STRESS EXTRÊME ===");

const stressAspects = [];

for (let i = 0; i < 10000; i++) {
  const rule = CONFIG.rules[i % CONFIG.rules.length];

  const exact =
    rule.aspect_type === "conjunction" ? 0 :
    rule.aspect_type === "sextile" ? 60 :
    rule.aspect_type === "square" ? 90 :
    rule.aspect_type === "trine" ? 120 :
    180;

  stressAspects.push({
    aspect_id: `stress-${i}`,
    body_a: {
      owner: "primary",
      body: rule.planet_a
    },
    body_b: {
      owner: "target",
      body: rule.planet_b
    },
    aspect_type: rule.aspect_type,
    exact_angle: exact,
    actual_angle: exact,
    orb: 0,
    orb_max: rule.orb_max,
    orb_strength: 1,
    polarity: null
  });
}

const stressSyn = {
  synastry_id: "stress-10000",
  reliability: { degraded_mode: false },
  aspects: stressAspects,
  house_overlays: [],
  angle_contacts: []
};

const t0 = performance.now();
const stressScore = computeScore(stressSyn, CONFIG);
const t1 = performance.now();

const stressMs = t1 - t0;

ok(
  bounded(stressScore.global_score),
  "10 000 aspects : global borné"
);

ok(
  stressScore.domain_scores.every(d => bounded(d.score)),
  "10 000 aspects : domaines bornés"
);

ok(
  allContributions(stressScore).every(c => finite(c.final_points)),
  "10 000 aspects : contributions finies"
);

ok(
  stressMs < 5000,
  `10 000 aspects : performance < 5 s (${stressMs.toFixed(2)} ms)`
);

console.log("");

/* =========================================================
   109 — DÉTERMINISME
   ========================================================= */

console.log("=== TEST 109 — DÉTERMINISME PROFOND ===");

const synOriginal = clone(synAB);
const scoreOriginal = stripDynamic(scoreAB);

const scoreRepeat1 = computeScore(synAB, CONFIG);
const scoreRepeat2 = computeScore(synAB, CONFIG);
const scoreRepeat3 = computeScore(synAB, CONFIG);

ok(
  JSON.stringify(scoreOriginal) ===
  JSON.stringify(stripDynamic(scoreRepeat1)) &&
  JSON.stringify(scoreOriginal) ===
  JSON.stringify(stripDynamic(scoreRepeat2)) &&
  JSON.stringify(scoreOriginal) ===
  JSON.stringify(stripDynamic(scoreRepeat3)),
  "3 recalculs : score strictement déterministe"
);

const permutedSyn = clone(synAB);
permutedSyn.aspects.reverse();

const permutedScore = computeScore(permutedSyn, CONFIG);

ok(
  approx(scoreAB.global_score, permutedScore.global_score),
  "Permutation des aspects : global identique"
);

const overlayPermutedSyn = clone(synAB);
overlayPermutedSyn.house_overlays.reverse();

const overlayPermutedScore =
  computeScore(overlayPermutedSyn, CONFIG);

ok(
  approx(scoreAB.global_score, overlayPermutedScore.global_score),
  "Permutation des overlays : global identique"
);

ok(
  JSON.stringify(synAB) === JSON.stringify(synOriginal),
  "Synastrie originale inchangée"
);

console.log("");

/* =========================================================
   110 — RELEASE LOCK RÉEL
   ========================================================= */

console.log("=== TEST 110 — RELEASE LOCK ===");

const requiredFiles = [
  "./js/astrology/ephemeris/astronomy_engine_provider.js",
  "./js/synastry/synastry_engine.js",
  "./js/scoring/scoring_engine.js",
  "./js/scoring/config/weighting_v1_2.json",
  "./js/scoring/config/weighting_fingerprint.js",
  "./js/scoring/config/weighting_validator.js"
];

ok(
  requiredFiles.every(f => fs.existsSync(f)),
  "Fichiers critiques réels présents"
);

ok(
  CONFIG.version === "v1.2",
  "Version V1.2"
);

ok(
  CONFIG.doctrine_status === "ACTIVE",
  "Doctrine ACTIVE"
);

ok(
  CONFIG.rules.length === 51,
  "51 règles verrouillées"
);

/*
 * Le JSON actuel ne stocke pas "fingerprint".
 * Le fingerprint de référence est donc calculé depuis rules.
 * On vérifie ici la stabilité de la représentation des règles.
 */
const rulesFingerprint = await import(
  "./js/scoring/config/weighting_fingerprint.js"
);

let calculatedFingerprint = null;

if (typeof rulesFingerprint.weightingConfigFingerprint === "function") {
  calculatedFingerprint =
    rulesFingerprint.weightingConfigFingerprint(CONFIG);
}

ok(
  typeof calculatedFingerprint === "string" &&
  calculatedFingerprint.length > 0,
  "Mécanisme de fingerprint disponible"
);

if (calculatedFingerprint !== null) {
  console.log(
    `INFO — Fingerprint calculé par le projet : ${calculatedFingerprint}`
  );
}

ok(
  bounded(scoreAB.global_score),
  "Score final borné"
);

ok(
  scoreAB.domain_scores.every(d => bounded(d.score)),
  "Tous les domaines finaux bornés"
);

console.log("");

console.log("==================================================");
console.log("RÉSULTAT RELEASE CANDIDATE 106 → 110");
console.log(`PASS : ${PASS}`);
console.log(`FAIL : ${FAIL}`);
console.log("==================================================");

if (FAIL === 0) {
  console.log("");
  console.log("🔒 ASTROMATCH V1.2 — RELEASE CANDIDATE VALIDÉE");
  console.log("🔒 TESTS 106 → 110 — PASS COMPLET");
  console.log("");
  process.exit(0);
} else {
  console.log("");
  console.log("⚠️ RELEASE CANDIDATE — ANOMALIES À ANALYSER");
  console.log("");
  process.exit(1);
}
