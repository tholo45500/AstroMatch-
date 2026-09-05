import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { computeAstronomyEngineEphemeris } =
  await import("./js/astrology/ephemeris/astronomy_engine_provider.js");

const { computeSynastry } =
  await import("./js/synastry/synastry_engine.js");

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

const { validateWeightingConfig } =
  await import("./js/scoring/config/weighting_validator.js");

const cfg = JSON.parse(
  await readFile("./js/scoring/config/weighting_v1_2.json", "utf8")
);

let PASS = 0;
let FAIL = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`PASS — ${name}`);
    PASS++;
  } catch (e) {
    console.log(`FAIL — ${name} :: ${e.message}`);
    FAIL++;
  }
}

function finite(x) {
  return Number.isFinite(Number(x));
}

function birth(
  id,
  date,
  time,
  latitude,
  longitude,
  timezone
) {
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
        latitude,
        longitude,
        timezone_id: timezone
      }
    }
  };
}

function assertChart(chart) {
  assert.ok(chart);
  assert.ok(Array.isArray(chart.points));
  assert.equal(chart.points.length, 10);
  assert.ok(Array.isArray(chart.houses));
  assert.equal(chart.houses.length, 12);

  for (const p of chart.points) {
    assert.ok(finite(p.absolute_degree));
    assert.ok(p.absolute_degree >= 0);
    assert.ok(p.absolute_degree < 360);
    assert.ok(finite(p.longitude_speed));
    assert.ok(finite(p.latitude));
    assert.ok(finite(p.distance_au));
  }

  assert.equal(chart.reliability.time_known, true);
  assert.equal(chart.reliability.houses_valid, true);
  assert.equal(chart.reliability.house_fallback, false);
  assert.equal(chart.reliability.ascendant_valid, true);

  assert.equal(
    chart.calculation_meta.house_system_effective,
    "placidus"
  );
}

function assertSynastry(syn) {
  assert.ok(syn);
  assert.ok(Array.isArray(syn.aspects));
  assert.ok(Array.isArray(syn.house_overlays));

  assert.ok(syn.aspects.length > 0);
  assert.ok(syn.house_overlays.length > 0);

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

function assertScore(score) {
  assert.ok(score);
  assert.ok(finite(score.global_score));
  assert.ok(score.global_score >= 0);
  assert.ok(score.global_score <= 100);
  assert.ok(score.domain_scores);

  for (const domain of Object.values(score.domain_scores)) {
    if (!domain || !Array.isArray(domain.contributions)) continue;

    for (const c of domain.contributions) {
      assert.equal(typeof c.rule_id, "string");
      assert.ok(finite(c.final_points));
      assert.ok(finite(c.orb_strength));
      assert.ok(finite(c.planet_weight));
      assert.ok(finite(c.house_weight));
    }
  }
}

console.log("==================================================");
console.log(" TEST 55 FINAL — MULTI-CASE STRESS TEST");
console.log("==================================================");

console.log("\n=== 55.1 CONFIGURATION ===");

test("V1.2 version", () => {
  assert.equal(cfg.version, "v1.2");
});

test("Doctrine ACTIVE", () => {
  assert.equal(cfg.doctrine_status, "ACTIVE");
});

test("51 règles", () => {
  assert.equal(cfg.rules.length, 51);
});

test("Validator V1.2", () => {
  assert.equal(validateWeightingConfig(cfg), true);
});

console.log("\n=== 55.2 PROFILS MULTI-DATES / FUSEAUX ===");

const profiles = [
  birth(
    "P1",
    "1975-01-15",
    "06:40",
    48.8566,
    2.3522,
    "Europe/Paris"
  ),

  birth(
    "P2",
    "1985-07-22",
    "18:25",
    40.4168,
    -3.7038,
    "Europe/Madrid"
  ),

  birth(
    "P3",
    "1990-04-12",
    "14:35",
    45.764,
    23.44055538,
    "Europe/Bucharest"
  ),

  birth(
    "P4",
    "2000-01-01",
    "11:00",
    35.6762,
    139.6503,
    "Asia/Tokyo"
  ),

  birth(
    "P5",
    "2010-06-21",
    "23:15",
    -33.8688,
    151.2093,
    "Australia/Sydney"
  ),

  birth(
    "P6",
    "2026-09-04",
    "08:30",
    45.4642,
    9.19,
    "Europe/Rome"
  )
];

const charts = [];

for (const input of profiles) {
  const chart = computeAstronomyEngineEphemeris(input);
  charts.push(chart);

  test(
    `Profil ${input.profile_id} carte complète`,
    () => assertChart(chart)
  );
}

console.log("\n=== 55.3 STABILITE DETERMINISTE ===");

test("Même entrée => même carte", () => {
  const a = computeAstronomyEngineEphemeris(profiles[2]);
  const b = computeAstronomyEngineEphemeris(profiles[2]);

  assert.deepEqual(a.points, b.points);
  assert.deepEqual(a.houses, b.houses);
  assert.deepEqual(a.angles, b.angles);
});

console.log("\n=== 55.4 SYNASTRIES CROISEES ===");

const pairs = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5]
];

const scores = [];

for (const [i, j] of pairs) {
  const syn = computeSynastry(charts[i], charts[j]);
  const score = computeScore(syn, cfg);

  test(
    `Synastrie P${i + 1}-P${j + 1}`,
    () => assertSynastry(syn)
  );

  test(
    `Score P${i + 1}-P${j + 1}`,
    () => assertScore(score)
  );

  scores.push({
    i,
    j,
    syn,
    score
  });
}

console.log("\n=== 55.5 SYMETRIES CROISEES ===");

for (const item of scores) {
  const reverseSyn =
    computeSynastry(charts[item.j], charts[item.i]);

  const reverseScore =
    computeScore(reverseSyn, cfg);

  const delta = Math.abs(
    item.score.global_score -
    reverseScore.global_score
  );

  test(
    `Symétrie P${item.i + 1}-P${item.j + 1}`,
    () => {
      assert.ok(delta < 0.01, `delta=${delta}`);
    }
  );

  console.log(
    `P${item.i + 1}-P${item.j + 1} = ${item.score.global_score} | ` +
    `P${item.j + 1}-P${item.i + 1} = ${reverseScore.global_score} | ` +
    `delta=${delta}`
  );
}

console.log("\n=== 55.6 BORNES GLOBALES ===");

for (const item of scores) {
  test(
    `Score borné P${item.i + 1}-P${item.j + 1}`,
    () => {
      assert.ok(item.score.global_score >= 0);
      assert.ok(item.score.global_score <= 100);
    }
  );
}

console.log("\n=== 55.7 VALIDITE DES DOMAINES ===");

for (const item of scores) {
  for (const [domainName, domain] of Object.entries(
    item.score.domain_scores
  )) {
    test(
      `Domaine ${domainName} P${item.i + 1}-P${item.j + 1}`,
      () => {
        assert.ok(finite(domain.score));
        assert.ok(domain.score >= 0);
        assert.ok(domain.score <= 100);
      }
    );
  }
}

console.log("\n=== 55.8 DIVERSITE DES RESULTATS ===");

const uniqueScores = new Set(
  scores.map(x => x.score.global_score)
);

test("Les cas ne produisent pas tous le même score", () => {
  assert.ok(uniqueScores.size > 1);
});

console.log(
  "Scores distincts :",
  [...uniqueScores].join(" | ")
);

console.log("\n=== 55.9 MIXED / POLARITE ===");

const mixedIds = new Set([
  "V11_SUN_MOON_SQUARE",
  "V11_SUN_VENUS_OPPOSITION",
  "V11_MOON_VENUS_SQUARE",
  "V11_MERCURY_MOON_SQUARE",
  "V11_MOON_MARS_SQUARE",
  "V11_VENUS_MARS_SQUARE"
]);

let mixedCount = 0;

for (const item of scores) {
  for (const domain of Object.values(
    item.score.domain_scores
  )) {
    if (!domain || !Array.isArray(domain.contributions)) {
      continue;
    }

    for (const c of domain.contributions) {
      if (!mixedIds.has(c.rule_id)) continue;

      mixedCount++;

      test(
        `MIXED ${c.rule_id} correctement marqué`,
        () => {
          assert.equal(
            c.doctrine_polarity,
            "MIXED_TENSION_REVIEW"
          );
        }
      );

      test(
        `MIXED ${c.rule_id} contribution non nulle`,
        () => {
          assert.notEqual(c.final_points, 0);
        }
      );
    }
  }
}

console.log("Contributions MIXED réelles détectées :", mixedCount);

console.log("\n=== 55.10 ABSENCE DE FALLBACK MAISONS ===");

for (let i = 0; i < charts.length; i++) {
  test(
    `P${i + 1} sans fallback Placidus`,
    () => {
      assert.equal(
        charts[i].reliability.house_fallback,
        false
      );
    }
  );
}

console.log("\n=== 55.11 RESULTATS ===");

for (const item of scores) {
  console.log(
    `P${item.i + 1}-P${item.j + 1} : ` +
    `${item.score.global_score} ` +
    `(${item.syn.aspects.length} aspects / ` +
    `${item.syn.house_overlays.length} overlays)`
  );
}

console.log("\n==================================================");
console.log(" TEST 55 FINAL — RESULTAT");
console.log("==================================================");

console.log("PASS :", PASS);
console.log("FAIL :", FAIL);

if (FAIL === 0) {
  console.log("\n=== TEST 55 FINAL — PASS COMPLET ===");
  console.log("Multi-dates               : OK");
  console.log("Multi-fuseaux             : OK");
  console.log("Multi-lieux               : OK");
  console.log("6 cartes réelles          : OK");
  console.log("Déterminisme              : OK");
  console.log("Synastries croisées       : OK");
  console.log("Symétries                  : OK");
  console.log("Bornes 0-100              : OK");
  console.log("Domaines 0-100            : OK");
  console.log("Diversité                 : OK");
  console.log("MIXED                      : OK");
  console.log("Placidus sans fallback    : OK");
} else {
  console.log("\n=== TEST 55 FINAL — ECHEC ===");
  process.exit(1);
}
