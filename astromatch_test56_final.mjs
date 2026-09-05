import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { computeAstronomyEngineEphemeris } =
  await import("./js/astrology/ephemeris/astronomy_engine_provider.js");

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

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

function makeInput(
  id,
  date,
  timeKnown,
  time,
  latitude,
  longitude,
  timezone
) {
  return {
    profile_id: id,
    date,
    time: {
      known: timeKnown,
      ...(timeKnown ? { value: time } : {})
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

function minimalSynastry(aspect = null) {
  return {
    synastry_id: "TEST56_SYN",
    primary_chart_id: "TEST56_A",
    target_chart_id: "TEST56_B",
    computed_at: new Date().toISOString(),
    reliability: {
      degraded_mode: false,
      reason: null
    },
    aspects: aspect ? [aspect] : [],
    house_overlays: [],
    angle_contacts: []
  };
}

function venusVenusConjunction(orb) {
  return {
    aspect_id: "TEST56_VENUS_VENUS",
    body_a: {
      owner: "primary",
      body: "venus"
    },
    body_b: {
      owner: "target",
      body: "venus"
    },
    aspect_type: "conjunction",
    exact_angle: 0,
    actual_angle: orb,
    orb,
    orb_max: 8,
    orb_strength: 1 - orb / 8,
    polarity: "positive"
  };
}

console.log("==================================================");
console.log(" TEST 56 FINAL — EDGE CASE / ROBUSTNESS");
console.log("==================================================");

console.log("\n=== 56.1 CONFIGURATION ===");

test("V1.2 active", () => {
  assert.equal(cfg.version, "v1.2");
  assert.equal(cfg.doctrine_status, "ACTIVE");
});

test("51 règles intactes", () => {
  assert.equal(cfg.rules.length, 51);
});

console.log("\n=== 56.2 HEURE INCONNUE / MODE DEGRADE ===");

const unknownTimeInput = makeInput(
  "TEST56_UNKNOWN",
  "1990-04-12",
  false,
  null,
  45.764,
  23.44055538,
  "Europe/Bucharest"
);

let degradedChart = null;

test("Carte heure inconnue calculable", () => {
  degradedChart =
    computeAstronomyEngineEphemeris(unknownTimeInput);

  assert.ok(degradedChart);
});

test("Carte heure inconnue possède ses points", () => {
  assert.ok(Array.isArray(degradedChart.points));
  assert.equal(degradedChart.points.length, 10);
});

test("Carte heure inconnue possède ses maisons", () => {
  assert.ok(Array.isArray(degradedChart.houses));
  assert.equal(degradedChart.houses.length, 12);
});

test("Mode dégradé explicitement signalé", () => {
  assert.equal(
    degradedChart.reliability.time_known,
    false
  );
});

test("Aucune valeur planétaire NaN en mode dégradé", () => {
  for (const p of degradedChart.points) {
    assert.ok(finite(p.absolute_degree));
    assert.ok(finite(p.longitude_speed));
  }
});

console.log("\n=== 56.3 ORBE EXACTEMENT A LA LIMITE ===");

const exactBoundaryAspect =
  venusVenusConjunction(8);

const exactBoundarySyn =
  minimalSynastry(exactBoundaryAspect);

let exactBoundaryScore = null;

test("Aspect à orb exactement 8° accepté", () => {
  exactBoundaryScore =
    computeScore(exactBoundarySyn, cfg);

  assert.ok(exactBoundaryScore);
});

test("Aspect frontière produit une contribution", () => {
  let found = false;

  for (const domain of Object.values(
    exactBoundaryScore.domain_scores
  )) {
    if (!domain || !Array.isArray(domain.contributions)) {
      continue;
    }

    if (
      domain.contributions.some(
        c => c.rule_id === "AMOUR_VENUS_CONJ_VENUS"
      )
    ) {
      found = true;
    }
  }

  assert.equal(found, true);
});

console.log("\n=== 56.4 ORBE JUSTE AU-DELA ===");

const overBoundaryAspect =
  venusVenusConjunction(8.0001);

const overBoundarySyn =
  minimalSynastry(overBoundaryAspect);

let overBoundaryScore = null;

test("Aspect à 8.0001° ne provoque pas de crash", () => {
  overBoundaryScore =
    computeScore(overBoundarySyn, cfg);

  assert.ok(overBoundaryScore);
});

test("Aspect au-delà de la limite ignoré", () => {
  let found = false;

  for (const domain of Object.values(
    overBoundaryScore.domain_scores
  )) {
    if (!domain || !Array.isArray(domain.contributions)) {
      continue;
    }

    if (
      domain.contributions.some(
        c => c.rule_id === "AMOUR_VENUS_CONJ_VENUS"
      )
    ) {
      found = true;
    }
  }

  assert.equal(found, false);
});

console.log("\n=== 56.5 SYNASTRIE SANS ASPECT ===");

const emptySyn = minimalSynastry(null);

let emptyScore = null;

test("Synastrie vide calculable", () => {
  emptyScore = computeScore(emptySyn, cfg);
  assert.ok(emptyScore);
});

test("Synastrie vide score borné", () => {
  assert.ok(emptyScore.global_score >= 0);
  assert.ok(emptyScore.global_score <= 100);
});

test("Synastrie vide retourne la neutralité attendue", () => {
  assert.equal(emptyScore.global_score, 50);
});

console.log("\n=== 56.6 BORNES DES SCORES ===");

for (const [name, score] of [
  ["frontière", exactBoundaryScore],
  ["hors-limite", overBoundaryScore],
  ["vide", emptyScore]
]) {
  test(`Score ${name} borné 0-100`, () => {
    assert.ok(finite(score.global_score));
    assert.ok(score.global_score >= 0);
    assert.ok(score.global_score <= 100);

    for (const domain of Object.values(
      score.domain_scores
    )) {
      assert.ok(finite(domain.score));
      assert.ok(domain.score >= 0);
      assert.ok(domain.score <= 100);
    }
  });
}

console.log("\n=== 56.7 DETERMINISME DES CAS LIMITES ===");

test("Cas frontière déterministe", () => {
  const a = computeScore(
    minimalSynastry(venusVenusConjunction(8)),
    cfg
  );

  const b = computeScore(
    minimalSynastry(venusVenusConjunction(8)),
    cfg
  );

  assert.equal(a.global_score, b.global_score);
  assert.deepEqual(a.domain_scores, b.domain_scores);
});

test("Cas vide déterministe", () => {
  const a = computeScore(minimalSynastry(), cfg);
  const b = computeScore(minimalSynastry(), cfg);

  assert.equal(a.global_score, b.global_score);
  assert.deepEqual(a.domain_scores, b.domain_scores);
});

console.log("\n=== 56.8 RESULTATS ===");

console.log(
  "Frontière orb 8°      :",
  exactBoundaryScore.global_score
);

console.log(
  "Au-delà 8.0001°       :",
  overBoundaryScore.global_score
);

console.log(
  "Synastrie vide         :",
  emptyScore.global_score
);

console.log(
  "Heure inconnue         :",
  degradedChart.reliability.time_known
);

console.log("\n==================================================");
console.log(" TEST 56 FINAL — RESULTAT");
console.log("==================================================");

console.log("PASS :", PASS);
console.log("FAIL :", FAIL);

if (FAIL === 0) {
  console.log("\n=== TEST 56 FINAL — PASS COMPLET ===");
  console.log("Heure inconnue          : OK");
  console.log("Mode dégradé            : OK");
  console.log("Orbe frontière          : OK");
  console.log("Orbe hors limite        : OK");
  console.log("Synastrie vide          : OK");
  console.log("Bornes                  : OK");
  console.log("Déterminisme            : OK");
} else {
  console.log("\n=== TEST 56 FINAL — ECHEC ===");
  process.exit(1);
}
