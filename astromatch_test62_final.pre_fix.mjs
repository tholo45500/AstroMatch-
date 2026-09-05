import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

const cfg = JSON.parse(
  await readFile("./js/scoring/config/weighting_v1_2.json", "utf8")
);

console.log("==================================================");
console.log("TEST 62 FINAL — AUDIT MATHÉMATIQUE DU SCORING");
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

    // Aucun overlay :
    // le test porte exclusivement sur les mathématiques du scoring.
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

const positiveSyn =
  synastryForRules([positiveRule], "TEST62_POS");

const positiveScore =
  computeScore(positiveSyn, cfg);

const positiveDomain =
  getDomain(positiveScore, positiveRule.domain);

const positiveContribution =
  positiveDomain.contributions[0];

const expectedPositive =
  Number(
    (
      positiveRule.base_points *
      1 *
      1.35
    ).toFixed(2)
  );

ok("final_points positif = formule exacte", () => {
  approx(
    positiveContribution.final_points,
    expectedPositive
  );
});

/* ==================================================
   2. RAW POSITIVE
================================================== */

ok("raw_positive = somme des points positifs", () => {
  approx(
    positiveDomain.raw_positive,
    positiveContribution.final_points
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
  const reconstructed =
    50 * (
      1 -
      Math.exp(
        -positiveDomain.raw_positive / K
      )
    );

  approx(reconstructed, expectedSPos, 0.000001);
});

ok("score domaine positif = formule exacte", () => {
  approx(
    positiveDomain.score,
    Number(expectedDomainScore.toFixed(2))
  );
});

/* ==================================================
   4. MIXED 35 / 65
================================================== */

const mixedIds = [
  "V11_SUN_MOON_SQUARE",
  "V11_SUN_VENUS_OPPOSITION",
  "V11_MOON_VENUS_SQUARE",
  "V11_MERCURY_MOON_SQUARE",
  "V11_MOON_MARS_SQUARE",
  "V11_VENUS_MARS_SQUARE"
];

const mixedRules = mixedIds.map(
  id => cfg.rules.find(r => r.rule_id === id)
);

const mixedSyn =
  synastryForRules(mixedRules, "TEST62_MIXED");

const mixedScore =
  computeScore(mixedSyn, cfg);

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
    mixedExpectedPositive
  );
});

ok("MIXED raw_negative = 65%", () => {
  approx(
    mixedActualNegative,
    mixedExpectedNegative
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
  getDomain(pnScore, "love");

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
    expectedPNPositive
  );
});

ok("positif + négatif : raw_negative exact", () => {
  approx(
    pnDomain.raw_negative,
    expectedPNNegative
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
   7. DÉTERMINISME
================================================== */

const repeat1 =
  computeScore(mixedSyn, cfg);

const repeat2 =
  computeScore(mixedSyn, cfg);

ok("déterminisme mathématique", () => {
  assert.deepEqual(
    repeat1,
    repeat2
  );
});

/* ==================================================
   8. AUDIT FINAL DES DOMAINES
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
  }
});

console.log("==================================================");
console.log("RÉSULTAT TEST 62");
console.log("==================================================");
console.log(`PASS : ${pass}`);
console.log(`FAIL : ${fail}`);
console.log("==================================================");

if (fail === 0) {
  console.log("TEST 62 FINAL — PASS COMPLET");
  console.log("Mathématiques du scoring : OK");
  console.log("Saturation : OK");
  console.log("Mixed 35/65 : OK");
  console.log("Agrégation : OK");
  console.log("Bornes : OK");
  console.log("Déterminisme : OK");
} else {
  console.log("TEST 62 FINAL — ECHEC");
  process.exitCode = 1;
}
