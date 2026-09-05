import { computeAstronomyEngineEphemeris } from "./js/astrology/ephemeris/astronomy_engine_provider.js";
import { computeSynastry } from "./js/synastry/synastry_engine.js";
import { computeScore } from "./js/scoring/scoring_engine.js";
import fs from "node:fs";

const CONFIG = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1_2.json", "utf8")
);

const A = {
  chart_id: "T64-A",
  date: "1975-01-15",
  time: { known: true, value: "06:40" },
  place: {
    resolved: {
      resolution_status: "resolved",
      latitude: 48.8566,
      longitude: 2.3522,
      timezone_id: "Europe/Paris"
    }
  }
};

const B = {
  chart_id: "T64-B",
  date: "1985-07-22",
  time: { known: true, value: "18:25" },
  place: {
    resolved: {
      resolution_status: "resolved",
      latitude: 40.4168,
      longitude: -3.7038,
      timezone_id: "Europe/Madrid"
    }
  }
};

function makeChart(input, id) {
  const c = computeAstronomyEngineEphemeris(input);

  return {
    ...c,
    chart_id: id
  };
}

function assert(cond, msg) {
  if (!cond) throw new Error("FAIL — " + msg);
  console.log("PASS — " + msg);
}

function keyAspect(a) {
  return [
    a.body_a?.owner,
    a.body_a?.body,
    a.body_b?.owner,
    a.body_b?.body,
    a.aspect_type,
    Number(a.orb).toFixed(2)
  ].join("|");
}

console.log("==================================================");
console.log("TEST 64 — AUDIT SYN ASTRIE NATIF");
console.log("==================================================");

const chartA = makeChart(A, "T64-A");
const chartB = makeChart(B, "T64-B");

console.log("");
console.log("=== 1. CARTES RÉELLES ===");

assert(Array.isArray(chartA.points) && chartA.points.length === 10,
  "Carte A = 10 points");

assert(Array.isArray(chartB.points) && chartB.points.length === 10,
  "Carte B = 10 points");

assert(Array.isArray(chartA.houses) && chartA.houses.length === 12,
  "Carte A = 12 maisons");

assert(Array.isArray(chartB.houses) && chartB.houses.length === 12,
  "Carte B = 12 maisons");

assert(chartA.reliability?.time_known === true &&
       chartB.reliability?.time_known === true,
  "Heures connues");

console.log("");
console.log("=== 2. SYN ASTRIE NATIVE A → B ===");

const synAB = computeSynastry(chartA, chartB);

assert(Array.isArray(synAB.aspects),
  "aspects[] présent");

assert(Array.isArray(synAB.house_overlays),
  "house_overlays[] présent");

assert(Array.isArray(synAB.angle_contacts),
  "angle_contacts[] présent");

assert(synAB.reliability?.degraded_mode === false,
  "Synastrie A→B non dégradée");

console.log("Aspects natifs :", synAB.aspects.length);
console.log("Overlays natifs :", synAB.house_overlays.length);
console.log("Contacts angle :", synAB.angle_contacts.length);

assert(synAB.aspects.length > 0,
  "La synastrie native produit des aspects");

console.log("");
console.log("=== 3. VALIDATION DES ASPECTS NATIFS ===");

let duplicateIds = 0;
let duplicateTuples = 0;
const ids = new Set();
const tuples = new Set();

for (const a of synAB.aspects) {
  assert(a.aspect_id, "aspect_id présent");
  assert(!ids.has(a.aspect_id), "aspect_id unique");
  ids.add(a.aspect_id);

  assert(a.body_a?.owner === "primary", "body_a.owner = primary");
  assert(a.body_b?.owner === "target", "body_b.owner = target");

  assert(typeof a.body_a?.body === "string", "body_a.body valide");
  assert(typeof a.body_b?.body === "string", "body_b.body valide");

  assert(typeof a.aspect_type === "string", "aspect_type présent");

  assert(Number.isFinite(a.orb), "orb fini");
  assert(Number.isFinite(a.orb_max), "orb_max fini");
  assert(Number.isFinite(a.orb_strength), "orb_strength fini");

  assert(a.orb >= 0, "orb >= 0");
  assert(a.orb <= a.orb_max, "orb <= orb_max");
  assert(a.orb_strength >= 0 && a.orb_strength <= 1,
    "orb_strength dans [0,1]");

  const k = keyAspect(a);
  if (tuples.has(k)) duplicateTuples++;
  tuples.add(k);
}

assert(duplicateIds === 0, "Aucun aspect_id dupliqué");
assert(duplicateTuples === 0, "Aucun doublon exact d'aspect");

console.log("Aspects validés :", synAB.aspects.length);

console.log("");
console.log("=== 4. SYN ASTRIE INVERSE B → A ===");

const synBA = computeSynastry(chartB, chartA);

assert(synBA.aspects.length === synAB.aspects.length,
  "Symétrie : même nombre d'aspects");

assert(synBA.house_overlays.length === synAB.house_overlays.length,
  "Symétrie : même nombre d'overlays");

assert(synBA.angle_contacts.length === synAB.angle_contacts.length,
  "Symétrie : même nombre de contacts angle");

const norm = a => [
  a.aspect_type,
  [a.body_a.body, a.body_b.body].sort().join("|"),
  Number(a.orb).toFixed(2)
].join("|");

const setAB = new Set(synAB.aspects.map(norm));
const setBA = new Set(synBA.aspects.map(norm));

assert(setAB.size === setBA.size,
  "Symétrie : même ensemble d'aspects");

for (const k of setAB) {
  assert(setBA.has(k), "Symétrie aspect : " + k);
}

console.log("");
console.log("=== 5. SCORING SUR SYN ASTRIE NATIVE ===");

const score = computeScore(synAB, CONFIG);

assert(Number.isFinite(score.global_score),
  "Global score fini");

assert(score.global_score >= 0 && score.global_score <= 100,
  "Global dans [0,100]");

assert(Array.isArray(score.domain_scores),
  "domain_scores[] présent");

assert(score.domain_scores.length === 7,
  "7 domaines présents");

let contributionCount = 0;
let badContributionRefs = 0;

for (const d of score.domain_scores) {
  assert(Number.isFinite(d.score),
    `Score domaine ${d.domain} fini`);

  assert(d.score >= 0 && d.score <= 100,
    `Score domaine ${d.domain} borné`);

  if (Array.isArray(d.contributions)) {
    contributionCount += d.contributions.length;

    for (const c of d.contributions) {
      const native = synAB.aspects.find(
        a => a.aspect_id === c.aspect_id
      );

      if (!native) {
        badContributionRefs++;
        continue;
      }

      assert(Number.isFinite(c.final_points),
        "Contribution final_points fini");

      assert(Number.isFinite(c.orb_strength),
        "Contribution orb_strength fini");

      assert(Number.isFinite(c.planet_weight),
        "Contribution planet_weight fini");

      assert(Number.isFinite(c.house_weight),
        "Contribution house_weight fini");

      assert(c.planet_a === native.body_a.body ||
             c.planet_a === native.body_b.body,
        "Contribution planète A issue de l'aspect natif");

      assert(c.planet_b === native.body_a.body ||
             c.planet_b === native.body_b.body,
        "Contribution planète B issue de l'aspect natif");
    }
  }
}

assert(badContributionRefs === 0,
  "Toutes les contributions pointent vers un aspect natif");

console.log("Contributions :", contributionCount);
console.log("Global :", score.global_score);

console.log("");
console.log("=== 6. DÉTERMINISME STRUCTUREL ===");

const synAB2 = computeSynastry(chartA, chartB);

assert(synAB2.aspects.length === synAB.aspects.length,
  "Synastrie répétée : même nombre d'aspects");

assert(synAB2.house_overlays.length === synAB.house_overlays.length,
  "Synastrie répétée : mêmes overlays");

assert(synAB2.angle_contacts.length === synAB.angle_contacts.length,
  "Synastrie répétée : mêmes contacts angle");

const setAB2 = new Set(synAB2.aspects.map(norm));

assert(setAB.size === setAB2.size,
  "Synastrie répétée : même ensemble d'aspects");

for (const k of setAB) {
  assert(setAB2.has(k), "Aspect stable : " + k);
}

const score2 = computeScore(synAB2, CONFIG);

assert(
  Math.abs(score.global_score - score2.global_score) < 1e-12,
  "Score numérique déterministe"
);

console.log("");
console.log("=== 7. CONTRÔLE MIXED NATIF ===");

const mixed = [];

for (const d of score.domain_scores) {
  for (const c of (d.contributions || [])) {
    if (c.doctrine_polarity === "MIXED_TENSION_REVIEW") {
      mixed.push(c);
    }
  }
}

console.log("Contributions MIXED :", mixed.length);

if (mixed.length > 0) {
  assert(
    mixed.every(c => Number.isFinite(c.final_points)),
    "Toutes les contributions MIXED sont numériques"
  );
  assert(
    mixed.every(c => c.impact === "positive" || c.impact === "negative"),
    "Toutes les MIXED ont un impact valide"
  );
}

console.log("");
console.log("==================================================");
console.log("RÉSUMÉ TEST 64");
console.log("==================================================");
console.log("Aspects natifs      :", synAB.aspects.length);
console.log("Overlays natifs     :", synAB.house_overlays.length);
console.log("Contacts angle      :", synAB.angle_contacts.length);
console.log("Contributions score :", contributionCount);
console.log("Global              :", score.global_score);
console.log("MIXED               :", mixed.length);
console.log("==================================================");
console.log("TEST 64 FINAL — PASS COMPLET");
console.log("==================================================");
