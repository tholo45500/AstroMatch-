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

const TZONES = [
  "Europe/Paris",
  "Europe/Bucharest",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Africa/Cairo",
  "Asia/Kolkata"
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function randomInput() {
  const year = randInt(1900, 2026);
  const month = randInt(1, 12);
  const day = randInt(1, 28);
  const hour = randInt(0, 23);
  const minute = randInt(0, 59);

  return {
    date: `${year}-${pad2(month)}-${pad2(day)}`,
    time: {
      known: true,
      value: `${pad2(hour)}:${pad2(minute)}`
    },
    place: {
      resolved: {
        resolution_status: "resolved",
        latitude: Number(rand(-60, 60).toFixed(6)),
        longitude: Number(rand(-180, 180).toFixed(6)),
        timezone_id: TZONES[randInt(0, TZONES.length - 1)]
      }
    }
  };
}

function validateChart(chart) {
  assert.ok(chart);
  assert.ok(Array.isArray(chart.points));
  assert.equal(chart.points.length, 10);

  assert.ok(Array.isArray(chart.houses));
  assert.equal(chart.houses.length, 12);

  for (const p of chart.points) {
    assert.ok(Number.isFinite(p.absolute_degree));
    assert.ok(p.absolute_degree >= 0);
    assert.ok(p.absolute_degree < 360);

    assert.ok(Number.isFinite(p.longitude_speed));
    assert.ok(Number.isFinite(p.latitude));
    assert.ok(Number.isFinite(p.distance_au));
  }

  assert.ok(chart.reliability);
  assert.equal(chart.reliability.time_known, true);
  assert.equal(chart.reliability.houses_valid, true);
  assert.equal(chart.reliability.house_fallback, false);
}

function validateScore(score) {
  assert.ok(score);
  assert.ok(Number.isFinite(score.global_score));
  assert.ok(score.global_score >= 0);
  assert.ok(score.global_score <= 100);

  assert.ok(score.domain_scores);

  for (const [domain, value] of Object.entries(score.domain_scores)) {
    if (typeof value === "number") {
      assert.ok(Number.isFinite(value), `NaN domain ${domain}`);
      assert.ok(value >= 0 && value <= 100, `Bounds domain ${domain}`);
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
console.log("TEST 57.1 FINAL — FUZZ 1000 COUPLES / ROBUSTESSE");
console.log("==================================================");
console.log(`Couples prévues : 1000`);

let pass = 0;
let rejected = 0;
let fail = 0;
let nanCount = 0;
let boundCount = 0;
let symmetryCount = 0;
let unexpected = 0;

const rejectionExamples = [];

for (let i = 1; i <= 1000; i++) {
  const a = randomInput();
  const b = randomInput();

  try {
    const chartA = computeAstronomyEngineEphemeris(a);
    const chartB = computeAstronomyEngineEphemeris(b);

    validateChart(chartA);
    validateChart(chartB);

    const synAB = computeSynastry(chartA, chartB);
    const synBA = computeSynastry(chartB, chartA);

    assert.ok(synAB);
    assert.ok(synBA);
    assert.ok(Array.isArray(synAB.aspects));
    assert.ok(Array.isArray(synAB.house_overlays));

    const scoreAB = computeScore(synAB, cfg);
    const scoreBA = computeScore(synBA, cfg);

    validateScore(scoreAB);
    validateScore(scoreBA);

    const delta = Math.abs(scoreAB.global_score - scoreBA.global_score);

    assert.ok(delta < 0.01, `Symétrie delta=${delta}`);

    symmetryCount++;
    pass++;
  } catch (err) {
    const message = String(err?.message || err);

    const expectedHistoricalTimeError =
      message.includes("Heure locale inexistante");

    if (expectedHistoricalTimeError) {
      rejected++;

      if (rejectionExamples.length < 10) {
        rejectionExamples.push({
          couple: i,
          message
        });
      }
    } else {
      fail++;
      unexpected++;

      if (
        message.includes("NaN") ||
        message.includes("not finite") ||
        message.includes("Bounds") ||
        message.includes("bound")
      ) {
        if (message.includes("NaN") || message.includes("not finite")) {
          nanCount++;
        } else {
          boundCount++;
        }
      }

      console.log(`FAIL couple ${i} :: ${message}`);
    }
  }

  if (i % 100 === 0) {
    console.log(
      `Progression : ${i}/1000 | PASS=${pass} | REJECT_EXPECTED=${rejected} | FAIL=${fail}`
    );
  }
}

console.log("");
console.log("=== STATISTIQUES ===");
console.log(`Couples : 1000`);
console.log(`PASS : ${pass}`);
console.log(`REJECT_EXPECTED : ${rejected}`);
console.log(`FAIL : ${fail}`);
console.log(`Exceptions inattendues : ${unexpected}`);
console.log(`NaN détectés : ${nanCount}`);
console.log(`Problèmes bornes : ${boundCount}`);
console.log(`Symétries validées : ${symmetryCount}`);

if (rejectionExamples.length > 0) {
  console.log("");
  console.log("=== EXEMPLES DE REJETS HISTORIQUES ATTENDUS ===");

  for (const r of rejectionExamples) {
    console.log(`couple ${r.couple} :: ${r.message}`);
  }
}

console.log("==================================================");

if (
  fail === 0 &&
  unexpected === 0 &&
  nanCount === 0 &&
  boundCount === 0 &&
  symmetryCount === pass
) {
  console.log("TEST 57.1 FINAL — PASS COMPLET");
  console.log("Robustesse fuzz : OK");
  console.log("Rejets historiques : correctement classés");
} else {
  console.log("TEST 57.1 FINAL — ECHEC");
  process.exitCode = 1;
}
