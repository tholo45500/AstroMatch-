import fs from "node:fs";

import { computeAstronomyEngineEphemeris } from "./js/astrology/ephemeris/astronomy_engine_provider.js";
import { computeSynastry } from "./js/synastry/synastry_engine.js";
import { computeScore } from "./js/scoring/scoring_engine.js";

const CONFIG = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1_2.json", "utf8")
);

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

function finiteNumber(x) {
  return Number.isFinite(Number(x));
}

function bounded(x) {
  return finiteNumber(x) && Number(x) >= 0 && Number(x) <= 100;
}

function makeInput(
  date,
  time,
  latitude,
  longitude,
  timezone_id
) {
  return {
    date,
    time: {
      known: true,
      value: time
    },
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
console.log("ASTROMATCH TESTS 101 → 105");
console.log("==================================================");
console.log("");

/* =========================================================
   TEST 101 — GLOBAL NON-RÉGRESSION
   ========================================================= */

console.log("=== TEST 101 — GLOBAL NON-RÉGRESSION ===");

const chartA = computeAstronomyEngineEphemeris(inputA);
const chartB = computeAstronomyEngineEphemeris(inputB);

const synAB = computeSynastry(chartA, chartB);
const scoreAB = computeScore(synAB, CONFIG);

ok(chartA && typeof chartA === "object", "Carte A calculable");
ok(chartB && typeof chartB === "object", "Carte B calculable");

ok(
  synAB && typeof synAB === "object",
  "Synastrie calculable"
);

ok(
  Array.isArray(synAB.aspects),
  "Synastrie.aspects présent"
);

ok(
  Array.isArray(synAB.house_overlays),
  "Synastrie.house_overlays présent"
);

ok(
  Array.isArray(synAB.angle_contacts),
  "Synastrie.angle_contacts présent"
);

ok(
  scoreAB && typeof scoreAB === "object",
  "Score calculable"
);

ok(
  finiteNumber(scoreAB.global_score),
  "Global score fini"
);

ok(
  bounded(scoreAB.global_score),
  "Global score borné 0..100"
);

ok(
  CONFIG.version === "v1.2",
  "Configuration V1.2 active"
);

ok(
  CONFIG.doctrine_status === "ACTIVE",
  "Doctrine ACTIVE"
);

ok(
  Array.isArray(CONFIG.rules) && CONFIG.rules.length === 51,
  "V1.2 = 51 règles"
);

console.log("");

/* =========================================================
   TEST 102 — CONTRATS JSON
   ========================================================= */

console.log("=== TEST 102 — CONTRATS JSON ===");

ok(
  Array.isArray(chartA.points),
  "Contrat natal : points"
);

ok(
  Array.isArray(chartA.houses),
  "Contrat natal : houses"
);

ok(
  chartA.reliability &&
  typeof chartA.reliability === "object",
  "Contrat natal : reliability"
);

ok(
  Array.isArray(chartA.points),
  "Contrat natal : points[]"
);

ok(
  Array.isArray(chartA.houses),
  "Contrat natal : houses[]"
);

ok(
  chartA.reliability &&
  typeof chartA.reliability === "object" &&
  !Array.isArray(chartA.reliability),
  "Contrat natal : reliability{}"
);

ok(
  chartA.points.length >= 10,
  "Contrat natal : au moins 10 points"
);

ok(
  chartA.points.every(
    p => p && typeof p === "object" && typeof p.body === "string"
  ),
  "Contrat natal : points structurés"
);

console.log("");

/* =========================================================
   TEST 103 — CAS LIMITES MÉTIER
   ========================================================= */

console.log("=== TEST 103 — CAS LIMITES MÉTIER ===");

const synBA = computeSynastry(chartB, chartA);
const scoreBA = computeScore(synBA, CONFIG);

ok(
  Math.abs(scoreAB.global_score - scoreBA.global_score) < 1e-9,
  "A/B et B/A : score symétrique"
);

ok(
  synAB.aspects.every(a =>
    finiteNumber(a.actual_angle) &&
    finiteNumber(a.orb) &&
    finiteNumber(a.orb_strength)
  ),
  "Aspects : valeurs numériques valides"
);

ok(
  synAB.aspects.every(
    a =>
      finiteNumber(a.actual_angle) &&
      a.actual_angle >= 0 &&
      a.actual_angle <= 180
  ),
  "Aspects : distance angulaire 0..180"
);

ok(
  synAB.aspects.every(
    a =>
      finiteNumber(a.orb) &&
      finiteNumber(a.orb_max) &&
      a.orb >= 0 &&
      a.orb <= a.orb_max
  ),
  "Aspects : orb dans les limites"
);

const emptySyn = {
  synastry_id: "empty-test",
  reliability: {
    degraded_mode: false
  },
  aspects: [],
  house_overlays: [],
  angle_contacts: []
};

const emptyScore = computeScore(emptySyn, CONFIG);

const emptyDomains = Object.fromEntries(
  emptyScore.domain_scores.map(d => [d.domain, d])
);

ok(
  emptyScore.global_score === 50,
  "Synastrie vide : global = 50"
);

ok(
  emptyDomains.frictions &&
  emptyDomains.frictions.score === 0,
  "Synastrie vide : frictions = 0"
);

ok(
  ["love", "passion", "communication", "emotions", "daily", "projects"]
    .every(d => emptyDomains[d]?.score === 50),
  "Synastrie vide : domaines neutres = 50"
);

const degradedInput = {
  date: "1990-04-12",
  time: {
    known: false,
    value: null
  },
  place: {
    resolved: {
      resolution_status: "resolved",
      latitude: 45.764,
      longitude: 23.44055538,
      timezone_id: "Europe/Bucharest"
    }
  }
};

const degradedChart =
  computeAstronomyEngineEphemeris(degradedInput);

const degradedSyn =
  computeSynastry(chartA, degradedChart);

const degradedScore =
  computeScore(degradedSyn, CONFIG);

ok(
  finiteNumber(degradedScore.global_score),
  "Mode dégradé : score fini"
);

ok(
  bounded(degradedScore.global_score),
  "Mode dégradé : score borné"
);

console.log("");

/* =========================================================
   TEST 104 — TRAÇABILITÉ
   ========================================================= */

console.log("=== TEST 104 — TRAÇABILITÉ ===");

const ruleIds = CONFIG.rules.map(r => r.rule_id);

ok(
  ruleIds.every(id => typeof id === "string" && id.length > 0),
  "Règles : IDs présents"
);

ok(
  new Set(ruleIds).size === ruleIds.length,
  "Règles : IDs uniques"
);

const allContributions = scoreAB.domain_scores.flatMap(
  d => Array.isArray(d.contributions)
    ? d.contributions
    : []
);

ok(
  Array.isArray(allContributions),
  "Contributions : collection globale reconstruite"
);

ok(
  allContributions.every(c =>
    c &&
    typeof c.rule_id === "string" &&
    typeof c.aspect_id === "string"
  ),
  "Contributions : rule_id + aspect_id présents"
);

ok(
  allContributions.every(c =>
    ruleIds.includes(c.rule_id)
  ),
  "Contributions : rule_id traçables vers CONFIG"
);

ok(
  allContributions.every(c =>
    finiteNumber(c.final_points) &&
    finiteNumber(c.orb) &&
    finiteNumber(c.orb_max) &&
    finiteNumber(c.orb_strength) &&
    finiteNumber(c.planet_weight) &&
    finiteNumber(c.house_weight)
  ),
  "Contributions : valeurs numériques finies"
);

ok(
  allContributions.every(c =>
    c.impact === "positive" ||
    c.impact === "negative"
  ),
  "Contributions : impact valide"
);

console.log("");

/* =========================================================
   TEST 105 — FINAL INTEGRITY / LOCK
   ========================================================= */

console.log("=== TEST 105 — FINAL INTEGRITY / LOCK ===");

const synBefore = JSON.stringify(synAB);
const configBefore = JSON.stringify(CONFIG);

const score1 = computeScore(synAB, CONFIG);
const score2 = computeScore(synAB, CONFIG);

ok(
  JSON.stringify({
    ...score1,
    score_id: null,
    computed_at: null
  }) ===
  JSON.stringify({
    ...score2,
    score_id: null,
    computed_at: null
  }),
  "Déterminisme global"
);

ok(
  JSON.stringify(synAB) === synBefore,
  "Synastrie originale inchangée"
);

ok(
  JSON.stringify(CONFIG) === configBefore,
  "Configuration inchangée"
);

ok(
  bounded(score1.global_score),
  "Intégrité finale : global borné"
);

ok(
  score1.domain_scores.every(d => bounded(d.score)),
  "Intégrité finale : domaines bornés"
);

console.log("");
console.log("==================================================");
console.log("");
console.log("RÉSULTAT TESTS 101 → 105");
console.log(`PASS : ${PASS}`);
console.log(`FAIL : ${FAIL}`);

if (FAIL === 0) {
  console.log("TESTS 101 → 105 — PASS COMPLET");
  process.exit(0);
} else {
  console.log("TESTS 101 → 105 — ANOMALIES À ANALYSER");
  process.exit(1);
}
