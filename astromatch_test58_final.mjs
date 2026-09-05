import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { computeAstronomyEngineEphemeris } =
  await import("./js/astrology/ephemeris/astronomy_engine_provider.js");

const { computeSynastry } =
  await import("./js/synastry/synastry_engine.js");

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

const cfg = JSON.parse(
  await readFile("./js/scoring/config/weighting_v1_2.json", "utf8")
);

const A = {
  date: "1990-04-12",
  time: {
    known: true,
    value: "14:35"
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

const B = {
  date: "1985-07-22",
  time: {
    known: true,
    value: "18:25"
  },
  place: {
    resolved: {
      resolution_status: "resolved",
      latitude: 40.4168,
      longitude: -3.7038,
      timezone_id: "Europe/Madrid"
    }
  }
};

function validateScore(score) {
  assert.ok(score);
  assert.ok(Number.isFinite(score.global_score));
  assert.ok(score.global_score >= 0);
  assert.ok(score.global_score <= 100);

  assert.ok(score.domain_scores);

  for (const [domain, value] of Object.entries(score.domain_scores)) {
    if (typeof value === "number") {
      assert.ok(Number.isFinite(value));
      assert.ok(value >= 0);
      assert.ok(value <= 100);
    }
  }

  if (Array.isArray(score.contributions)) {
    for (const c of score.contributions) {
      assert.ok(Number.isFinite(c.final_points));
      assert.ok(Number.isFinite(c.orb));
      assert.ok(Number.isFinite(c.orb_strength));
      assert.ok(Number.isFinite(c.planet_weight));
      assert.ok(Number.isFinite(c.house_weight));
    }
  }
}

console.log("==================================================");
console.log("TEST 58 FINAL — PERFORMANCE / DETERMINISME");
console.log("==================================================");

console.log("Calcul des cartes...");

const chartA = computeAstronomyEngineEphemeris(A);
const chartB = computeAstronomyEngineEphemeris(B);

console.log(`Carte A : ${chartA.points.length} points / ${chartA.houses.length} maisons`);
console.log(`Carte B : ${chartB.points.length} points / ${chartB.houses.length} maisons`);

const synAB = computeSynastry(chartA, chartB);

assert.ok(synAB);
assert.ok(Array.isArray(synAB.aspects));
assert.ok(Array.isArray(synAB.house_overlays));

console.log(`Synastrie : ${synAB.aspects.length} aspects / ${synAB.house_overlays.length} overlays`);

const baselineSynastry = JSON.stringify(synAB);

console.log("");
console.log("Warm-up...");

for (let i = 0; i < 100; i++) {
  const score = computeScore(synAB, cfg);
  validateScore(score);
}

console.log("Warm-up OK");

const firstScore = computeScore(synAB, cfg);
validateScore(firstScore);

const baselineScore = JSON.stringify(firstScore);
const baselineGlobal = firstScore.global_score;

console.log(`Score de référence : ${baselineGlobal}`);

console.log("");
console.log("===== 10 000 COMPUTE SCORE =====");

const scoreStart = performance.now();

let scorePass = 0;
let scoreFail = 0;

let minMs = Infinity;
let maxMs = 0;

for (let i = 0; i < 10000; i++) {
  const t0 = performance.now();

  try {
    const score = computeScore(synAB, cfg);
    validateScore(score);

    assert.equal(score.global_score, baselineGlobal);

    const elapsed = performance.now() - t0;

    minMs = Math.min(minMs, elapsed);
    maxMs = Math.max(maxMs, elapsed);

    scorePass++;
  } catch (err) {
    scoreFail++;

    if (scoreFail <= 5) {
      console.log(`FAIL score ${i + 1} :: ${err.message}`);
    }
  }
}

const scoreTotal = performance.now() - scoreStart;

console.log(`Scores OK : ${scorePass}/10000`);
console.log(`Scores FAIL : ${scoreFail}`);
console.log(`Temps total scoring : ${scoreTotal.toFixed(2)} ms`);
console.log(`Moyenne scoring : ${(scoreTotal / 10000).toFixed(4)} ms`);
console.log(`Min : ${minMs.toFixed(4)} ms`);
console.log(`Max : ${maxMs.toFixed(4)} ms`);

console.log("");
console.log("===== DÉTERMINISME =====");

const repeatedScores = [];

for (let i = 0; i < 100; i++) {
  repeatedScores.push(computeScore(synAB, cfg).global_score);
}

const deterministic = repeatedScores.every(
  value => value === baselineGlobal
);

console.log(
  `Déterminisme : ${deterministic ? "OK" : "FAIL"}`
);

console.log("");
console.log("===== IMMUTABILITÉ SYNPASTRIE =====");

const afterSynastry = JSON.stringify(synAB);

const synastryUnchanged =
  afterSynastry === baselineSynastry;

console.log(
  `Synastrie inchangée après scoring : ${synastryUnchanged ? "OK" : "FAIL"}`
);

console.log("");
console.log("===== IMMUTABILITÉ SCORE =====");

const scoreAgain = computeScore(synAB, cfg);
const scoreAgainJson = JSON.stringify(scoreAgain);

const scoreStable =
  scoreAgain.global_score === baselineGlobal &&
  scoreAgainJson !== undefined;

console.log(
  `Score stable : ${scoreStable ? "OK" : "FAIL"}`
);

console.log("");
console.log("===== RÉSULTAT =====");

const failures =
  scoreFail +
  (deterministic ? 0 : 1) +
  (synastryUnchanged ? 0 : 1) +
  (scoreStable ? 0 : 1);

console.log(`Échecs : ${failures}`);

console.log("==================================================");

if (
  scorePass === 10000 &&
  scoreFail === 0 &&
  deterministic &&
  synastryUnchanged &&
  scoreStable
) {
  console.log("TEST 58 FINAL — PASS COMPLET");
  console.log("Performance : OK");
  console.log("Déterminisme : OK");
  console.log("Immutabilité : OK");
} else {
  console.log("TEST 58 FINAL — ECHEC");
  process.exitCode = 1;
}
