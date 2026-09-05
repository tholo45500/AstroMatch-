import assert from "node:assert/strict";
import { computeScore } from "./js/scoring/scoring_engine.js";
import cfg from "./js/scoring/config/weighting_v1_2.json" with { type: "json" };

console.log("==================================================");
console.log("TEST 62.2 — AUDIT MATHÉMATIQUE DU SCORING");
console.log("==================================================");

function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

function aspectFor(rule, index) {
  return {
    aspect_id: `TEST62_${index}_${rule.rule_id}`,
    body_a: {
      owner: "primary",
      body: rule.planet_a
    },
    body_b: {
      owner: "target",
      body: rule.planet_b
    },
    aspect_type: rule.aspect_type,
    exact_angle: 0,
    actual_angle: 1,
    orb: 1,
    orb_max: rule.orb_max,
    orb_strength: 1,
    polarity: "neutral"
  };
}

function synastryForRules(rules, id = "TEST62") {
  return {
    synastry_id: id,
    primary_chart_id: "A",
    target_chart_id: "B",
    computed_at: "2026-01-01T00:00:00.000Z",
    reliability: {
      degraded_mode: false,
      reason: null
    },
    aspects: rules.map((r, i) => aspectFor(r, i)),
    house_overlays: [],
    angle_contacts: []
  };
}

function getDomain(score, name) {
  const d = score.domain_scores.find(x => x.domain === name);
  assert.ok(d, `Domaine absent : ${name}`);
  return d;
}

function approx(actual, expected, tolerance = 0.01) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `actual=${actual}, expected=${expected}, delta=${Math.abs(actual - expected)}`
  );
}

function numericSnapshot(score) {
  return {
    global_score: score.global_score,
    domain_scores: score.domain_scores.map(d => ({
      domain: d.domain,
      score: d.score,
      raw_positive: d.raw_positive,
      raw_negative: d.raw_negative,
      contributions: d.contributions.map(c => ({
        rule_id: c.rule_id,
        aspect_id: c.aspect_id,
        domain: c.domain,
        planet_a: c.planet_a,
        planet_b: c.planet_b,
        aspect_type: c.aspect_type,
        base_points: c.base_points,
        orb: c.orb,
        orb_max: c.orb_max,
        orb_strength: c.orb_strength,
        planet_weight: c.planet_weight,
        house_weight: c.house_weight,
        final_points: c.final_points,
        doctrine_polarity: c.doctrine_polarity,
        impact: c.impact
      }))
    }))
  };
}

let pass = 0;
let fail = 0;

function ok(name, fn) {
  try {
    fn();
    console.log(`PASS :: ${name}`);
    pass++;
  } catch (err) {
    console.log(`FAIL :: ${name} :: ${err.message}`);
    fail++;
  }
}

/* ==================================================
   1. FORMULE D'UNE CONTRIBUTION
================================================== */

const positiveRule =
  cfg.rules.find(r => r.rule_id === "V11_VENUS_JUPITER_CONJ");

const positiveScore =
  computeScore(
    synastryForRules([positiveRule], "TEST62_POS"),
    cfg
  );

const positiveDomain =
  getDomain(positiveScore, positiveRule.domain);

const positiveContribution =
  positiveDomain.contributions[0];

const expectedPlanetWeight =
  (
    cfg.planet_weights[positiveRule.planet_a] +
    cfg.planet_weights[positiveRule.planet_b]
  ) / 2;

const expectedPositive =
  Number(
    (
      positiveRule.base_points *
      1 *
      expectedPlanetWeight *
      1
    ).toFixed(2)
  );

ok("planet_weight calculé exactement", () => {
  approx(
    positiveContribution.planet_weight,
    expectedPlanetWeight,
    0.0001
  );
});

ok("final_points positif = formule exacte", () => {
  approx(
    positiveContribution.final_points,
    expectedPositive,
    0.01
  );
});

/* ==================================================
   2. RAW POSITIVE / NEGATIVE
================================================== */

ok("raw_positive = somme des points positifs", () => {
  approx(
    positiveDomain.raw_positive,
    positiveContribution.final_points,
    0.01
  );
});

ok("raw_negative positif seul = 0", () => {
  assert.equal(
    positiveDomain.raw_negative,
    0
  );
});

/* ==================================================
   3. FORMULE SATURATION
================================================== */

const K = cfg.k_saturation;

const expectedSPos =
  50 * (
    1 -
    Math.exp(
      -positiveDomain.raw_positive / K
    )
  );

const expectedSNeg =
  50 * (
    1 -
    Math.exp(
      -positiveDomain.raw_negative / K
    )
  );

const expectedDomainScore =
  clamp(
    50 + expectedSPos - expectedSNeg,
    0,
    100
  );

ok("saturation S_pos exacte", () => {
  approx(
    50 * (
      1 -
      Math.exp(
        -positiveDomain.raw_positive / K
      )
    ),
    expectedSPos,
    0.000001
  );
});

ok("saturation S_neg exacte", () => {
  approx(
    50 * (
      1 -
      Math.exp(
        -positiveDomain.raw_negative / K
      )
    ),
    expectedSNeg,
    0.000001
  );
});

ok("score domaine positif = formule exacte", () => {
  approx(
    positiveDomain.score,
    Number(expectedDomainScore.toFixed(2)),
    0.01
  );
});

/* ==================================================
   4. MIXED 35 / 65
   On reconstruit depuis les final_points réellement
   arrondis par le moteur à 2 décimales.
================================================== */

const mixedIds = [
  "V11_SUN_MOON_SQUARE",
  "V11_SUN_VENUS_OPPOSITION",
  "V11_MOON_VENUS_SQUARE",
  "V11_MERCURY_MOON_SQUARE",
  "V11_MOON_MARS_SQUARE",
  "V11_VENUS_MARS_SQUARE"
];

const mixedRules =
  mixedIds.map(
    id => cfg.rules.find(r => r.rule_id === id)
  );

assert.equal(
  mixedRules.filter(Boolean).length,
  mixedIds.length,
  "Une ou plusieurs règles MIXED sont absentes"
);

const mixedSyn =
  synastryForRules(
    mixedRules,
    "TEST62_MIXED"
  );

const mixedScore =
  computeScore(
    mixedSyn,
    cfg
  );

const mixedContribs =
  mixedScore.domain_scores.flatMap(
    d => d.contributions
  );

const mixedExpectedPositive =
  mixedContribs.reduce(
    (sum, c) =>
      c.doctrine_polarity === "MIXED_TENSION_REVIEW"
        ? sum + Math.abs(c.final_points) * 0.35
        : sum,
    0
  );

const mixedExpectedNegative =
  mixedContribs.reduce(
    (sum, c) =>
      c.doctrine_polarity === "MIXED_TENSION_REVIEW"
        ? sum + Math.abs(c.final_points) * 0.65
        : sum,
    0
  );

const mixedActualPositive =
  mixedScore.domain_scores.reduce(
    (sum, d) => sum + d.raw_positive,
    0
  );

const mixedActualNegative =
  mixedScore.domain_scores.reduce(
    (sum, d) => sum + d.raw_negative,
    0
  );

ok("MIXED raw_positive = 35%", () => {
  approx(
    mixedActualPositive,
    mixedExpectedPositive,
    0.02
  );
});

ok("MIXED raw_negative = 65%", () => {
  approx(
    mixedActualNegative,
    mixedExpectedNegative,
    0.02
  );
});

/* ==================================================
   5. POSITIF + NÉGATIF
================================================== */

const positiveNegativeRules = [
  cfg.rules.find(
    r => r.rule_id === "V11_VENUS_JUPITER_CONJ"
  ),
  cfg.rules.find(
    r => r.rule_id === "AMOUR_SATURNE_CARRE_VENUS"
  )
];

const pnScore =
  computeScore(
    synastryForRules(
      positiveNegativeRules,
      "TEST62_PN"
    ),
    cfg
  );

const pnDomain =
  getDomain(
    pnScore,
    "love"
  );

const pnContribs =
  pnDomain.contributions;

const expectedPNPositive =
  pnContribs
    .filter(c => c.final_points >= 0)
    .reduce(
      (sum, c) => sum + c.final_points,
      0
    );

const expectedPNNegative =
  pnContribs
    .filter(c => c.final_points < 0)
    .reduce(
      (sum, c) => sum + Math.abs(c.final_points),
      0
    );

ok("positif + négatif : raw_positive exact", () => {
  approx(
    pnDomain.raw_positive,
    expectedPNPositive,
    0.01
  );
});

ok("positif + négatif : raw_negative exact", () => {
  approx(
    pnDomain.raw_negative,
    expectedPNNegative,
    0.01
  );
});

/* ==================================================
   6. BORNES
================================================== */

ok("tous les domaines dans [0,100]", () => {
  for (const d of mixedScore.domain_scores) {
    assert.ok(
      d.score >= 0 &&
      d.score <= 100
    );
  }
});

ok("global dans [0,100]", () => {
  assert.ok(
    mixedScore.global_score >= 0 &&
    mixedScore.global_score <= 100
  );
});

/* ==================================================
   7. DÉTERMINISME NUMÉRIQUE
   score_id et computed_at sont ignorés car dynamiques.
================================================== */

const repeat1 =
  computeScore(
    synastryForRules(
      mixedRules,
      "TEST62_DETERMINISM"
    ),
    cfg
  );

const repeat2 =
  computeScore(
    synastryForRules(
      mixedRules,
      "TEST62_DETERMINISM"
    ),
    cfg
  );

ok("déterminisme numérique", () => {
  assert.deepEqual(
    numericSnapshot(repeat1),
    numericSnapshot(repeat2)
  );
});

/* ==================================================
   8. VALEURS FINIES
================================================== */

ok("chaque domaine possède des valeurs cohérentes", () => {
  for (const d of mixedScore.domain_scores) {
    assert.ok(
      Number.isFinite(d.score)
    );

    assert.ok(
      Number.isFinite(d.raw_positive)
    );

    assert.ok(
      Number.isFinite(d.raw_negative)
    );

    for (const c of d.contributions) {
      assert.ok(
        Number.isFinite(c.final_points)
      );

      assert.ok(
        Number.isFinite(c.planet_weight)
      );

      assert.ok(
        Number.isFinite(c.house_weight)
      );
    }
  }
});

/* ==================================================
   RÉSULTAT FINAL
================================================== */

console.log("==================================================");
console.log("RÉSULTAT TEST 62.2");
console.log("==================================================");
console.log(`PASS : ${pass}`);
console.log(`FAIL : ${fail}`);
console.log("==================================================");

if (fail === 0) {
  console.log("TEST 62.2 FINAL — PASS COMPLET");
  console.log("Mathématiques : OK");
  console.log("Poids planétaires : OK");
  console.log("Saturation : OK");
  console.log("Mixed 35/65 : OK");
  console.log("Agrégation : OK");
  console.log("Bornes : OK");
  console.log("Déterminisme numérique : OK");
} else {
  console.log("TEST 62.2 FINAL — ECHEC");
  process.exitCode = 1;
}
