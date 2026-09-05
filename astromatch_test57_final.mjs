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

const N = 1000;

let pass = 0;
let fail = 0;
let exceptions = 0;
let nanCount = 0;
let boundCount = 0;
let symmetryCount = 0;

function finite(x) {
  return Number.isFinite(Number(x));
}

function birth(id, date, time, lat, lon, tz) {
  return {
    profile_id: id,
    date,
    time: {
      known: true,
      value: time
    },
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

function randomDate(year) {
  const month =
    String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");

  const day =
    String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function randomTime() {
  const h =
    String(Math.floor(Math.random() * 24)).padStart(2, "0");

  const m =
    String(Math.floor(Math.random() * 60)).padStart(2, "0");

  return `${h}:${m}`;
}

function randomLatitude() {
  return -60 + Math.random() * 120;
}

function randomLongitude() {
  return -180 + Math.random() * 360;
}

const timezones = [
  "UTC",
  "Europe/Paris",
  "Europe/Bucharest",
  "Europe/Madrid",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Asia/Tokyo",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney"
];

function randomTimezone() {
  return timezones[
    Math.floor(Math.random() * timezones.length)
  ];
}

function validateChart(chart) {
  assert.ok(chart);
  assert.equal(chart.points.length, 10);

  for (const p of chart.points) {
    assert.ok(finite(p.absolute_degree));
    assert.ok(p.absolute_degree >= 0);
    assert.ok(p.absolute_degree < 360);
    assert.ok(finite(p.longitude_speed));
    assert.ok(finite(p.latitude));
    assert.ok(finite(p.distance_au));
  }

  assert.ok(Array.isArray(chart.houses));
  assert.equal(chart.houses.length, 12);

  assert.equal(chart.reliability.time_known, true);
  assert.equal(chart.reliability.houses_valid, true);
  assert.equal(chart.reliability.house_fallback, false);
}

function validateSynastry(syn) {
  assert.ok(syn);
  assert.ok(Array.isArray(syn.aspects));
  assert.ok(Array.isArray(syn.house_overlays));

  for (const a of syn.aspects) {
    assert.ok(finite(a.orb));
    assert.ok(finite(a.orb_strength));
    assert.ok(a.orb >= 0);
    assert.ok(a.orb_strength >= 0);
    assert.ok(a.orb_strength <= 1);
  }

  for (const o of syn.house_overlays) {
    assert.ok(finite(o.house_number));
    assert.ok(o.house_number >= 1);
    assert.ok(o.house_number <= 12);
  }
}

function validateScore(score) {
  assert.ok(score);
  assert.ok(finite(score.global_score));
  assert.ok(score.global_score >= 0);
  assert.ok(score.global_score <= 100);

  for (const domain of Object.values(score.domain_scores)) {
    assert.ok(finite(domain.score));
    assert.ok(domain.score >= 0);
    assert.ok(domain.score <= 100);

    if (!Array.isArray(domain.contributions)) continue;

    for (const c of domain.contributions) {
      assert.ok(finite(c.final_points));
      assert.ok(finite(c.orb_strength));
      assert.ok(finite(c.planet_weight));
      assert.ok(finite(c.house_weight));
    }
  }
}

console.log("==================================================");
console.log(" TEST 57 FINAL — FUZZ 1000 COUPLES");
console.log("==================================================");

console.log(`Couples prévues : ${N}`);

const start = performance.now();

for (let i = 1; i <= N; i++) {
  try {
    const yearA =
      1900 + Math.floor(Math.random() * 127);

    const yearB =
      1900 + Math.floor(Math.random() * 127);

    const A = birth(
      `FUZZ_A_${i}`,
      randomDate(yearA),
      randomTime(),
      randomLatitude(),
      randomLongitude(),
      randomTimezone()
    );

    const B = birth(
      `FUZZ_B_${i}`,
      randomDate(yearB),
      randomTime(),
      randomLatitude(),
      randomLongitude(),
      randomTimezone()
    );

    const chartA =
      computeAstronomyEngineEphemeris(A);

    const chartB =
      computeAstronomyEngineEphemeris(B);

    validateChart(chartA);
    validateChart(chartB);

    const synAB =
      computeSynastry(chartA, chartB);

    validateSynastry(synAB);

    const scoreAB =
      computeScore(synAB, cfg);

    validateScore(scoreAB);

    const synBA =
      computeSynastry(chartB, chartA);

    validateSynastry(synBA);

    const scoreBA =
      computeScore(synBA, cfg);

    validateScore(scoreBA);

    const delta =
      Math.abs(
        scoreAB.global_score -
        scoreBA.global_score
      );

    assert.ok(
      delta < 0.01,
      `symétrie delta=${delta}`
    );

    symmetryCount++;

    pass++;

    if (i % 100 === 0) {
      console.log(
        `Progression : ${i}/${N} | ` +
        `PASS=${pass} | FAIL=${fail}`
      );
    }

  } catch (e) {
    fail++;
    exceptions++;

    if (
      String(e.message).includes("NaN") ||
      String(e.message).includes("finite")
    ) {
      nanCount++;
    }

    if (
      String(e.message).includes("bound") ||
      String(e.message).includes("0") ||
      String(e.message).includes("100")
    ) {
      boundCount++;
    }

    console.log(
      `FAIL couple ${i} :: ${e.message}`
    );
  }
}

const elapsed =
  performance.now() - start;

console.log("\n=== STATISTIQUES ===");

console.log("Couples :", N);
console.log("PASS :", pass);
console.log("FAIL :", fail);
console.log("Exceptions :", exceptions);
console.log("NaN détectés :", nanCount);
console.log("Problèmes bornes :", boundCount);
console.log("Symétries validées :", symmetryCount);

console.log(
  "Temps total :",
  (elapsed / 1000).toFixed(2),
  "s"
);

console.log(
  "Temps moyen/couple :",
  (elapsed / N).toFixed(3),
  "ms"
);

console.log("\n==================================================");
console.log(" TEST 57 FINAL — RESULTAT");
console.log("==================================================");

if (
  fail === 0 &&
  nanCount === 0 &&
  boundCount === 0 &&
  symmetryCount === N
) {
  console.log("=== TEST 57 FINAL — PASS COMPLET ===");
  console.log("1000 couples réels/synthétiques : OK");
  console.log("0 exception : OK");
  console.log("0 NaN : OK");
  console.log("Bornes 0-100 : OK");
  console.log("Symétrie 1000/1000 : OK");
  console.log("Robustesse : OK");
} else {
  console.log("=== TEST 57 FINAL — ECHEC ===");
  process.exit(1);
}
