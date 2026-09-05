import { computeAstronomyEngineEphemeris } from "./js/astrology/ephemeris/astronomy_engine_provider.js";
import { computeSynastry } from "./js/synastry/synastry_engine.js";
import { computeScore } from "./js/scoring/scoring_engine.js";
import fs from "node:fs";

const CONFIG = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1_2.json", "utf8")
);

let PASS = 0;
let FAIL = 0;

function ok(condition, message) {
  if (condition) {
    PASS++;
    console.log("PASS — " + message);
  } else {
    FAIL++;
    console.log("FAIL — " + message);
  }
}

function finite(x) {
  return Number.isFinite(x);
}

function chart(id, date, time, lat, lon, tz) {
  return {
    chart_id: id,
    date,
    time: { known: true, value: time },
    place: {
      resolved: {
        resolution_status: "resolved",
        latitude: lat,
        longitude: lon,
        timezone_id: tz
      }
    }
  };
}

function unknownChart(id) {
  return {
    chart_id: id,
    date: "1985-07-22",
    time: { known: false, value: null },
    place: {
      resolved: {
        resolution_status: "resolved",
        latitude: 40.4168,
        longitude: -3.7038,
        timezone_id: "Europe/Madrid"
      }
    }
  };
}

function makeReal(input) {
  return computeAstronomyEngineEphemeris(input);
}

function runScore(s) {
  try {
    return computeScore(s, CONFIG);
  } catch (e) {
    return { __error: e };
  }
}

function aspectKey(a) {
  return [
    a.body_a?.body,
    a.body_b?.body,
    a.aspect_type,
    Number(a.orb).toFixed(2)
  ].join("|");
}

console.log("");
console.log("==================================================");
console.log("ASTROMATCH TESTS 65 → 72");
console.log("==================================================");

/* ==================================================
   TEST 65 — MODE DÉGRADÉ RÉEL
================================================== */

console.log("");
console.log("=== TEST 65 — MODE DÉGRADÉ RÉEL ===");

const known = makeReal(
  chart("T65-K", "1985-07-22", "18:25", 40.4168, -3.7038, "Europe/Madrid")
);

const unknown = makeReal(unknownChart("T65-U"));

ok(known.reliability?.time_known === true,
  "Carte connue : heure connue");

ok(unknown.reliability?.time_known === false,
  "Carte inconnue : heure inconnue");

ok(unknown.reliability?.degraded_mode === true ||
   unknown.reliability?.houses_valid === false,
  "Carte inconnue : mode dégradé");

ok(Array.isArray(unknown.points) && unknown.points.length === 10,
  "Carte inconnue : 10 points conservés");

ok(Array.isArray(unknown.houses) && unknown.houses.length === 0,
  "Carte inconnue : aucune maison");

const synKU = computeSynastry(known, unknown);

ok(synKU.reliability?.degraded_mode === true,
  "Synastrie réelle dégradée");

ok(Array.isArray(synKU.aspects) && synKU.aspects.length > 0,
  "Aspects conservés en mode dégradé");

ok(synKU.house_overlays.length === 0,
  "Aucun overlay en mode dégradé");

ok(synKU.angle_contacts.length === 0,
  "Aucun contact d'angle en mode dégradé");

const scoreKU = runScore(synKU);

ok(!scoreKU.__error,
  "Scoring mode dégradé sans exception");

if (!scoreKU.__error) {
  ok(finite(scoreKU.global_score),
    "Score dégradé fini");

  ok(scoreKU.global_score >= 0 && scoreKU.global_score <= 100,
    "Score dégradé borné");

  let allHouseOne = true;

  for (const d of scoreKU.domain_scores || []) {
    for (const c of d.contributions || []) {
      if (c.house_weight !== 1) allHouseOne = false;
    }
  }

  ok(allHouseOne,
    "Toutes les contributions dégradées ont house_weight=1");
}

/* ==================================================
   TEST 66 — HEURE INCONNUE DES DEUX CÔTÉS
================================================== */

console.log("");
console.log("=== TEST 66 — DOUBLE MODE DÉGRADÉ ===");

const U1 = makeReal(unknownChart("T66-U1"));

const U2 = makeReal({
  chart_id: "T66-U2",
  date: "2000-01-01",
  time: { known: false, value: null },
  place: {
    resolved: {
      resolution_status: "resolved",
      latitude: 35.6762,
      longitude: 139.6503,
      timezone_id: "Asia/Tokyo"
    }
  }
});

const synUU = computeSynastry(U1, U2);

ok(synUU.reliability?.degraded_mode === true,
  "Double heure inconnue = dégradé");

ok(synUU.house_overlays.length === 0,
  "Double inconnu = 0 overlays");

ok(synUU.angle_contacts.length === 0,
  "Double inconnu = 0 contacts angle");

const scoreUU = runScore(synUU);

ok(!scoreUU.__error,
  "Double dégradé scoré sans exception");

if (!scoreUU.__error) {
  ok(finite(scoreUU.global_score),
    "Double dégradé global fini");

  ok(scoreUU.global_score >= 0 && scoreUU.global_score <= 100,
    "Double dégradé borné");
}

/* ==================================================
   TEST 67 — IMMUTABILITÉ SYN ASTRIE
================================================== */

console.log("");
console.log("=== TEST 67 — IMMUTABILITÉ ===");

const before = JSON.stringify(synKU);
const scoreBefore = runScore(synKU);
const after = JSON.stringify(synKU);

ok(before === after,
  "computeScore ne modifie pas la synastrie");

const scoreAfter = runScore(synKU);

if (!scoreBefore.__error && !scoreAfter.__error) {
  ok(scoreBefore.global_score === scoreAfter.global_score,
    "Score identique après scoring");
}

/* ==================================================
   TEST 68 — PERMUTATION DES PLANÈTES
================================================== */

console.log("");
console.log("=== TEST 68 — ORDRE DES PLANÈTES ===");

const base = {
  synastry_id: "T68",
  primary_chart_id: "A",
  target_chart_id: "B",
  computed_at: "TEST",
  reliability: {
    degraded_mode: true,
    reason: null
  },
  aspects: [{
    aspect_id: "T68-ASPECT",
    body_a: { owner: "primary", body: "venus" },
    body_b: { owner: "target", body: "jupiter" },
    aspect_type: "trine",
    exact_angle: 120,
    actual_angle: 120,
    orb: 0,
    orb_max: 8,
    orb_strength: 1,
    polarity: "positive"
  }],
  house_overlays: [],
  angle_contacts: []
};

const reversed = structuredClone(base);

reversed.aspects[0].body_a = {
  owner: "primary",
  body: "jupiter"
};

reversed.aspects[0].body_b = {
  owner: "target",
  body: "venus"
};

const s1 = runScore(base);
const s2 = runScore(reversed);

ok(!s1.__error && !s2.__error,
  "Permutation scorée");

if (!s1.__error && !s2.__error) {
  ok(Math.abs(s1.global_score - s2.global_score) < 1e-12,
    "Permutation Venus/Jupiter = score identique");
}

/* ==================================================
   TEST 69 — ORB BOUNDARIES NATIVES
================================================== */

console.log("");
console.log("=== TEST 69 — FRONTIÈRES ORBE ===");

const boundary = structuredClone(base);

boundary.aspects[0].aspect_type = "conjunction";
boundary.aspects[0].body_a.body = "venus";
boundary.aspects[0].body_b.body = "jupiter";
boundary.aspects[0].orb_max = 8;
boundary.aspects[0].orb = 8;
boundary.aspects[0].orb_strength = 0;

const sb = runScore(boundary);

ok(!sb.__error,
  "Orb exactement à la limite accepté sans exception");

const beyond = structuredClone(boundary);

beyond.aspects[0].orb = 8.01;
beyond.aspects[0].orb_strength = 0;

const sx = runScore(beyond);

ok(!sx.__error,
  "Orb hors limite géré sans exception");

/* ==================================================
   TEST 70 — EXPLOSION DE DONNÉES
================================================== */

console.log("");
console.log("=== TEST 70 — 1000 ASPECTS NATIFS ===");

const stress = structuredClone(base);
stress.aspects = [];

for (let i = 0; i < 1000; i++) {
  stress.aspects.push({
    aspect_id: "T70-" + i,
    body_a: {
      owner: "primary",
      body: i % 2 === 0 ? "venus" : "mars"
    },
    body_b: {
      owner: "target",
      body: i % 3 === 0 ? "jupiter" : "saturn"
    },
    aspect_type: i % 2 === 0 ? "trine" : "square",
    exact_angle: i % 2 === 0 ? 120 : 90,
    actual_angle: i % 2 === 0 ? 120 : 90,
    orb: 1,
    orb_max: 8,
    orb_strength: 0.8,
    polarity: i % 2 === 0 ? "positive" : "negative"
  });
}

const t70start = performance.now();
const s70 = runScore(stress);
const t70ms = performance.now() - t70start;

ok(!s70.__error,
  "1000 aspects scorés");

if (!s70.__error) {
  ok(finite(s70.global_score),
    "1000 aspects = global fini");

  ok(s70.global_score >= 0 && s70.global_score <= 100,
    "1000 aspects = global borné");
}

console.log("Temps 1000 aspects :", t70ms.toFixed(3), "ms");

/* ==================================================
   TEST 71 — FUZZ SYN ASTRIE RÉELLE
================================================== */

console.log("");
console.log("=== TEST 71 — FUZZ SYN ASTRIE RÉELLE ===");

const profiles = [
  chart("F71-A", "1975-01-15", "06:40", 48.8566, 2.3522, "Europe/Paris"),
  chart("F71-B", "1985-07-22", "18:25", 40.4168, -3.7038, "Europe/Madrid"),
  chart("F71-C", "1990-04-12", "14:35", 45.764, 23.44055538, "Europe/Bucharest"),
  chart("F71-D", "2000-01-01", "11:00", 35.6762, 139.6503, "Asia/Tokyo"),
  chart("F71-E", "2010-06-21", "23:15", -33.8688, 151.2093, "Australia/Sydney")
];

const charts = profiles.map(p => makeReal(p));

let fuzzPass = 0;

for (let i = 0; i < charts.length; i++) {
  for (let j = i + 1; j < charts.length; j++) {
    try {
      const syn = computeSynastry(charts[i], charts[j]);
      const sc = computeScore(syn, CONFIG);

      if (
        Array.isArray(syn.aspects) &&
        Array.isArray(syn.house_overlays) &&
        Array.isArray(syn.angle_contacts) &&
        finite(sc.global_score) &&
        sc.global_score >= 0 &&
        sc.global_score <= 100
      ) {
        fuzzPass++;
      }
    } catch {}
  }
}

ok(fuzzPass === 10,
  "10 couples réelles = 10/10 valides");

/* ==================================================
   TEST 72 — STABILITÉ NATIVE COMPLÈTE
================================================== */

console.log("");
console.log("=== TEST 72 — STABILITÉ NATIVE COMPLÈTE ===");

const referenceSyn = computeSynastry(chartA(), chartB());

function chartA() {
  return makeReal(
    chart(
      "T72-A",
      "1975-01-15",
      "06:40",
      48.8566,
      2.3522,
      "Europe/Paris"
    )
  );
}

function chartB() {
  return makeReal(
    chart(
      "T72-B",
      "1985-07-22",
      "18:25",
      40.4168,
      -3.7038,
      "Europe/Madrid"
    )
  );
}

const refScore = computeScore(referenceSyn, CONFIG);

let stable = true;

for (let i = 0; i < 100; i++) {
  const syn = computeSynastry(chartA(), chartB());
  const sc = computeScore(syn, CONFIG);

  if (syn.aspects.length !== referenceSyn.aspects.length) {
    stable = false;
    break;
  }

  if (syn.house_overlays.length !== referenceSyn.house_overlays.length) {
    stable = false;
    break;
  }

  if (syn.angle_contacts.length !== referenceSyn.angle_contacts.length) {
    stable = false;
    break;
  }

  if (sc.global_score !== refScore.global_score) {
    stable = false;
    break;
  }

  const keys1 = syn.aspects.map(aspectKey).sort().join("||");
  const keys2 = referenceSyn.aspects.map(aspectKey).sort().join("||");

  if (keys1 !== keys2) {
    stable = false;
    break;
  }
}

ok(stable,
  "100 recalculs natifs = structure + score stables");

console.log("");
console.log("==================================================");
console.log("RÉSULTAT GLOBAL TESTS 65 → 72");
console.log("==================================================");
console.log("PASS :", PASS);
console.log("FAIL :", FAIL);
console.log("==================================================");

if (FAIL === 0) {
  console.log("TESTS 65 → 72 — PASS COMPLET");
} else {
  console.log("TESTS 65 → 72 — ANOMALIES À ANALYSER");
}

console.log("==================================================");
