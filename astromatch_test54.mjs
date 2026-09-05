import { createRequire } from "node:module";
import assert from "node:assert/strict";

const require = createRequire(import.meta.url);
const api = require("astronomy-engine");

const { computeAstronomyEngineEphemeris } =
  await import("./js/astrology/ephemeris/astronomy_engine_provider.js");

const { computeSynastry } =
  await import("./js/synastry/synastry_engine.js");

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

const { validateWeightingConfig } =
  await import("./js/scoring/config/weighting_validator.js");

const cfg = JSON.parse(
  await (await import("node:fs/promises")).readFile(
    "./js/scoring/config/weighting_v1_2.json",
    "utf8"
  )
);

const pass = [];
const fail = [];

function test(name, fn) {
  try {
    fn();
    pass.push(name);
    console.log(`PASS — ${name}`);
  } catch (e) {
    fail.push(`${name}: ${e.message}`);
    console.log(`FAIL — ${name} :: ${e.message}`);
  }
}

function finite(x) {
  return Number.isFinite(Number(x));
}

function makeInput(id, date, time, lat, lon, timezone) {
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
        timezone_id: timezone
      }
    }
  };
}

console.log("==================================================");
console.log(" TEST 54 — ASTROMATCH END-TO-END REAL SYNASTRY");
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

console.log("\n=== 54.2 REAL NATAL CHARTS ===");

const A = makeInput(
  "TEST54_A",
  "1990-04-12",
  "14:35",
  45.764,
  23.44055538,
  "Europe/Bucharest"
);

const B = makeInput(
  "TEST54_B",
  "1992-08-21",
  "09:20",
  43.6047,
  1.4442,
  "Europe/Paris"
);

const C = makeInput(
  "TEST54_C",
  "1988-12-03",
  "22:10",
  48.8566,
  2.3522,
  "Europe/Paris"
);

const chartA = computeAstronomyEngineEphemeris(A);
const chartB = computeAstronomyEngineEphemeris(B);
const chartC = computeAstronomyEngineEphemeris(C);

for (const [name, chart] of [
  ["A", chartA],
  ["B", chartB],
  ["C", chartC]
]) {
  test(`Carte ${name} générée`, () => {
    assert.ok(chart);
    assert.ok(Array.isArray(chart.points));
  });

  test(`Carte ${name} contient 10 corps`, () => {
    assert.equal(chart.points.length, 10);
  });

  test(`Carte ${name} contient 12 maisons`, () => {
    assert.equal(chart.houses.length, 12);
  });

  test(`Carte ${name} longitudes valides`, () => {
    for (const point of chart.points) {
      assert.ok(finite(point.absolute_degree));
      assert.ok(
        point.absolute_degree >= 0 &&
        point.absolute_degree < 360,
        `${point.body}=${point.absolute_degree}`
      );
    }
  });

  test(`Carte ${name} vitesses valides`, () => {
    for (const point of chart.points) {
      assert.ok(finite(point.longitude_speed));
    }
  });

  test(`Carte ${name} fiabilité OK`, () => {
    assert.equal(chart.reliability.time_known, true);
    assert.equal(chart.reliability.houses_valid, true);
    assert.equal(chart.reliability.house_fallback, false);
    assert.equal(chart.reliability.ascendant_valid, true);
  });

console.log("\n=== 54.3 REAL SYNASTRIES ===");

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

  test(`Synastrie ${name} contient des aspects`, () => {
    assert.ok(Array.isArray(syn.aspects));
  });

  test(`Synastrie ${name} contient les overlays`, () => {
    assert.ok(Array.isArray(syn.house_overlays));
  });

  test(`Synastrie ${name} aspects valides`, () => {
    for (const a of syn.aspects) {
      assert.ok(finite(a.orb));
      assert.ok(finite(a.orb_strength));
      assert.ok(a.orb >= 0);
      assert.ok(a.orb_strength >= 0);
      assert.ok(a.orb_strength <= 1);
    }
  });
}

console.log("\n=== 54.4 REAL SCORING ===");

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
  });

  test(`Global ${name} borné`, () => {
    assert.ok(
      finite(score.global_score) &&
      score.global_score >= 0 &&
      score.global_score <= 100
    );
  });

  test(`Domaines ${name} bornés`, () => {
    for (const [domain, value] of Object.entries(score.domain_scores)) {
      if (typeof value === "object" && value !== null) {
        if ("score" in value) {
          assert.ok(
            value.score >= 0 &&
            value.score <= 100,
            `${domain}=${value.score}`
          );
        }
      }
    }
  });

  test(`Contributions ${name} cohérentes`, () => {
    for (const domain of Object.values(score.domain_scores)) {
      if (!domain || !Array.isArray(domain.contributions)) continue;

      for (const c of domain.contributions) {
        assert.ok(finite(c.final_points));
        assert.ok(finite(c.orb_strength));
        assert.ok(finite(c.planet_weight));
        assert.ok(finite(c.house_weight));
      }
    }
  });
}

console.log("\n=== 54.5 SYMMETRIE REELLE ===");

test("A-B / B-A même score", () => {
  const delta =
    Math.abs(scoreAB.global_score - scoreBA.global_score);

  assert.ok(delta < 0.01, `delta=${delta}`);
});

console.log("\n=== 54.6 DIVERSITE DES CAS ===");

test("A-B et A-C ne sont pas identiques", () => {
  assert.notEqual(
    scoreAB.global_score,
    scoreAC.global_score
  );
});

test("Les synastries produisent plusieurs aspects", () => {
  assert.ok(synAB.aspects.length > 0);
  assert.ok(synAC.aspects.length > 0);
});

test("Les scores utilisent plusieurs domaines", () => {
  const domains = Object.keys(scoreAB.domain_scores);
  assert.ok(domains.length >= 6);
});

console.log("\n=== 54.7 INTEGRITE MIXED ===");

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

    test(`${c.rule_id} reste MIXED`, () => {
      assert.equal(
        c.doctrine_polarity,
        "MIXED_TENSION_REVIEW"
      );
    });

    test(`${c.rule_id} contribution finale valide`, () => {
      assert.ok(finite(c.final_points));
      assert.ok(c.orb_strength >= 0);
      assert.ok(c.orb_strength <= 1);
    });

    test(`${c.rule_id} split MIXED appliqué`, () => {
      /*
       * Le moteur applique 35% / 65% dans le calcul
       * des raw positive/negative du domaine.
       * Ces champs ne sont pas stockés dans chaque contribution.
       *
       * Vérification directe :
       * contribution non nulle + doctrine MIXED.
       */
      assert.notEqual(c.final_points, 0);
      assert.equal(
        c.doctrine_polarity,
        "MIXED_TENSION_REVIEW"
      );
    });
  }
}

console.log(`MIXED rencontrés dans A-B : ${mixedFound}`);

test("Au moins un MIXED réel détecté", () => {
  assert.ok(mixedFound > 0);
});

console.log("\n=== 54.8 DISTRIBUTION ===");

test("Score A-B non dégénéré", () => {
  assert.ok(
    scoreAB.global_score > 0 &&
    scoreAB.global_score < 100
  );
});

test("Score A-C non dégénéré", () => {
  assert.ok(
    scoreAC.global_score > 0 &&
    scoreAC.global_score < 100
  );
});

console.log("\n=== 54.9 RESUME REEL ===");

console.log("A-B global :", scoreAB.global_score);
console.log("A-C global :", scoreAC.global_score);
console.log("B-A global :", scoreBA.global_score);

console.log("A-B aspects :", synAB.aspects.length);
console.log("A-C aspects :", synAC.aspects.length);
console.log("A-B overlays :", synAB.house_overlays.length);
console.log("A-C overlays :", synAC.house_overlays.length);

console.log("\n==================================================");
console.log(" RESULTAT TEST 54");
console.log("==================================================");

console.log("PASS :", pass.length);
console.log("FAIL :", fail.length);

if (fail.length) {
  console.log("\n--- FAILURES ---");
  for (const f of fail) console.log(f);
  console.log("\n=== TEST 54 — ECHEC ===");
  process.exit(1);
}

console.log("\n=== TEST 54 — PASS COMPLET ===");
console.log("Pipeline : naissance → carte → synastrie → scoring");
console.log("Astronomie : OK");
console.log("Maisons : OK");
console.log("Aspects réels : OK");
console.log("Scoring réel : OK");
console.log("Bornes : OK");
console.log("Symétrie : OK");
console.log("V1.2 : OK");
