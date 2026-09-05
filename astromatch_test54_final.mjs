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

function input(id, date, time, latitude, longitude, timezone) {
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

console.log("==================================================");
console.log(" TEST 54 FINAL — ASTROMATCH END-TO-END");
console.log("==================================================");

console.log("\n=== 54.1 CONFIGURATION ===");

test("V1.2 version", () => {
  assert.equal(cfg.version, "v1.2");
});

test("V1.2 doctrine ACTIVE", () => {
  assert.equal(cfg.doctrine_status, "ACTIVE");
});

test("V1.2 validator", () => {
  assert.equal(validateWeightingConfig(cfg), true);
});

test("V1.2 51 règles", () => {
  assert.equal(cfg.rules.length, 51);
});

console.log("\n=== 54.2 CARTES NATALES REELLES ===");

const inputA = input(
  "TEST54_A",
  "1990-04-12",
  "14:35",
  45.764,
  23.44055538,
  "Europe/Bucharest"
);

const inputB = input(
  "TEST54_B",
  "1992-08-21",
  "09:20",
  43.6047,
  1.4442,
  "Europe/Paris"
);

const inputC = input(
  "TEST54_C",
  "1988-12-03",
  "22:10",
  48.8566,
  2.3522,
  "Europe/Paris"
);

const chartA = computeAstronomyEngineEphemeris(inputA);
const chartB = computeAstronomyEngineEphemeris(inputB);
const chartC = computeAstronomyEngineEphemeris(inputC);

for (const [name, chart] of [
  ["A", chartA],
  ["B", chartB],
  ["C", chartC]
]) {
  test(`Carte ${name} générée`, () => {
    assert.ok(chart);
  });

  test(`Carte ${name} = 10 points`, () => {
    assert.ok(Array.isArray(chart.points));
    assert.equal(chart.points.length, 10);
  });

  test(`Carte ${name} = 12 maisons`, () => {
    assert.ok(Array.isArray(chart.houses));
    assert.equal(chart.houses.length, 12);
  });

  test(`Carte ${name} longitudes 0-360`, () => {
    for (const p of chart.points) {
      assert.ok(finite(p.absolute_degree));
      assert.ok(p.absolute_degree >= 0);
      assert.ok(p.absolute_degree < 360);
    }
  });

  test(`Carte ${name} vitesses valides`, () => {
    for (const p of chart.points) {
      assert.ok(finite(p.longitude_speed));
    }
  });

  test(`Carte ${name} fiabilité complète`, () => {
    assert.equal(chart.reliability.time_known, true);
    assert.equal(chart.reliability.houses_valid, true);
    assert.equal(chart.reliability.house_fallback, false);
    assert.equal(chart.reliability.ascendant_valid, true);
  });

  test(`Carte ${name} Placidus effectif`, () => {
    assert.equal(
      chart.calculation_meta.house_system_effective,
      "placidus"
    );
  });
}

console.log("\n=== 54.3 SYNASTRIES REELLES ===");

const synAB = computeSynastry(chartA, chartB);
const synAC = computeSynastry(chartA, chartC);
const synBA = computeSynastry(chartB, chartA);

for (const [name, syn] of [
  ["A-B", synAB],
  ["A-C", synAC],
  ["B-A", synBA]
]) {
  test(`Synastrie ${name} générée`, () => {
    assert.ok(syn);
  });

  test(`Synastrie ${name} possède des aspects`, () => {
    assert.ok(Array.isArray(syn.aspects));
    assert.ok(syn.aspects.length > 0);
  });

  test(`Synastrie ${name} possède des overlays`, () => {
    assert.ok(Array.isArray(syn.house_overlays));
    assert.ok(syn.house_overlays.length > 0);
  });

  test(`Synastrie ${name} aspects cohérents`, () => {
    for (const a of syn.aspects) {
      assert.ok(finite(a.orb));
      assert.ok(finite(a.orb_strength));
      assert.ok(a.orb >= 0);
      assert.ok(a.orb_strength >= 0);
      assert.ok(a.orb_strength <= 1);
    }
  });
}

test("A-B possède plusieurs aspects réels", () => {
  assert.ok(synAB.aspects.length >= 10);
});

test("A-C possède plusieurs aspects réels", () => {
  assert.ok(synAC.aspects.length >= 10);
});

console.log("\n=== 54.4 SCORING REEL V1.2 ===");

const scoreAB = computeScore(synAB, cfg);
const scoreAC = computeScore(synAC, cfg);
const scoreBA = computeScore(synBA, cfg);

for (const [name, score] of [
  ["A-B", scoreAB],
  ["A-C", scoreAC],
  ["B-A", scoreBA]
]) {
  test(`Score ${name} généré`, () => {
    assert.ok(score);
    assert.ok(finite(score.global_score));
  });

  test(`Score global ${name} borné`, () => {
    assert.ok(score.global_score >= 0);
    assert.ok(score.global_score <= 100);
  });

  test(`Domaines ${name} présents`, () => {
    assert.ok(score.domain_scores);
    assert.ok(
      Object.keys(score.domain_scores).length >= 6
    );
  });

  test(`Contributions ${name} valides`, () => {
    for (const domain of Object.values(score.domain_scores)) {
      if (!domain || !Array.isArray(domain.contributions)) continue;

      for (const c of domain.contributions) {
        assert.ok(typeof c.rule_id === "string");
        assert.ok(finite(c.final_points));
        assert.ok(finite(c.orb_strength));
        assert.ok(finite(c.planet_weight));
        assert.ok(finite(c.house_weight));
      }
    }
  });
}

console.log("\n=== 54.5 SYMETRIE REELLE ===");

test("A-B = B-A", () => {
  const delta =
    Math.abs(scoreAB.global_score - scoreBA.global_score);

  assert.ok(delta < 0.01, `delta=${delta}`);
});

console.log(
  `A-B=${scoreAB.global_score} | B-A=${scoreBA.global_score}`
);

console.log("\n=== 54.6 DIVERSITE ===");

test("A-B différent de A-C", () => {
  assert.notEqual(
    scoreAB.global_score,
    scoreAC.global_score
  );
});

test("A-B score non dégénéré", () => {
  assert.ok(
    scoreAB.global_score > 0 &&
    scoreAB.global_score < 100
  );
});

test("A-C score non dégénéré", () => {
  assert.ok(
    scoreAC.global_score > 0 &&
    scoreAC.global_score < 100
  );
});

console.log("\n=== 54.7 MIXED REEL ===");

const mixedIds = new Set([
  "V11_SUN_MOON_SQUARE",
  "V11_SUN_VENUS_OPPOSITION",
  "V11_MOON_VENUS_SQUARE",
  "V11_MERCURY_MOON_SQUARE",
  "V11_MOON_MARS_SQUARE",
  "V11_VENUS_MARS_SQUARE"
]);

let mixedFound = 0;

for (const domain of Object.values(scoreAB.domain_scores)) {
  if (!domain || !Array.isArray(domain.contributions)) continue;

  for (const c of domain.contributions) {
    if (!mixedIds.has(c.rule_id)) continue;

    mixedFound++;

    test(`${c.rule_id} doctrine MIXED`, () => {
      assert.equal(
        c.doctrine_polarity,
        "MIXED_TENSION_REVIEW"
      );
    });

    test(`${c.rule_id} contribution non nulle`, () => {
      assert.notEqual(c.final_points, 0);
    });
  }
}

console.log(`MIXED réels trouvés A-B : ${mixedFound}`);

test("Au moins un MIXED réel détecté", () => {
  assert.ok(mixedFound > 0);
});

console.log("\n=== 54.8 OVERLAYS MAISONS ===");

test("A-B overlays exploitables", () => {
  for (const o of synAB.house_overlays) {
    assert.ok(finite(o.house_number));
    assert.ok(o.house_number >= 1);
    assert.ok(o.house_number <= 12);
  }
});

test("A-C overlays exploitables", () => {
  for (const o of synAC.house_overlays) {
    assert.ok(finite(o.house_number));
    assert.ok(o.house_number >= 1);
    assert.ok(o.house_number <= 12);
  }
});

console.log("\n=== 54.9 RESULTATS ===");

console.log("A-B global :", scoreAB.global_score);
console.log("A-C global :", scoreAC.global_score);
console.log("B-A global :", scoreBA.global_score);

console.log("A-B aspects :", synAB.aspects.length);
console.log("A-C aspects :", synAC.aspects.length);
console.log("A-B overlays :", synAB.house_overlays.length);
console.log("A-C overlays :", synAC.house_overlays.length);

console.log("\n==================================================");
console.log(" TEST 54 FINAL — RESULTAT");
console.log("==================================================");

console.log("PASS :", PASS);
console.log("FAIL :", FAIL);

if (FAIL === 0) {
  console.log("\n=== TEST 54 FINAL — PASS COMPLET ===");
  console.log("Carte natale réelle       : OK");
  console.log("10 corps                  : OK");
  console.log("12 maisons                : OK");
  console.log("Placidus                  : OK");
  console.log("Fiabilité calcul          : OK");
  console.log("Synastrie réelle           : OK");
  console.log("Aspects réels             : OK");
  console.log("Overlays maisons          : OK");
  console.log("Scoring V1.2              : OK");
  console.log("Symétrie réelle            : OK");
  console.log("MIXED réel                 : OK");
  console.log("Bornes                     : OK");
} else {
  console.log("\n=== TEST 54 FINAL — ECHEC ===");
  process.exit(1);
}
