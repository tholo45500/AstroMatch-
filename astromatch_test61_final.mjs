import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

const cfg = JSON.parse(
  await readFile("./js/scoring/config/weighting_v1_2.json", "utf8")
);

console.log("==================================================");
console.log("TEST 61 FINAL — AGRÉGATION MULTI-RÈGLES");
console.log("==================================================");

function aspectFor(rule, index) {
  const orb = Math.max(
    0.001,
    Math.min(rule.orb_max * 0.5, rule.orb_max - 0.001)
  );

  return {
    aspect_id: `TEST61_${index}_${rule.rule_id}`,
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
    actual_angle: orb,
    orb,
    orb_max: rule.orb_max,
    // TEST D'AGRÉGATION : force orb_strength à 1
    // afin d'isoler la combinaison des règles du facteur d'orbe.
    orb_strength: 1,
    polarity: "neutral"
  };
}

function synastryForRules(rules, id = "TEST61") {
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

    // TEST D'AGRÉGATION :
    // aucun overlay afin d'isoler les effets des règles
    // et d'éviter d'activer artificiellement house_bonus.
    house_overlays: [],

    angle_contacts: []
  };
}

function contributions(score) {
  return score.domain_scores.flatMap(
    d => d.contributions || []
  );
}

function domain(score, name) {
  return score.domain_scores.find(d => d.domain === name);
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
   1. BASELINE VIDE
================================================== */

const empty = {
  synastry_id: "TEST61_EMPTY",
  primary_chart_id: "A",
  target_chart_id: "B",
  computed_at: "2026-01-01T00:00:00.000Z",
  reliability: {
    degraded_mode: false,
    reason: null
  },
  aspects: [],
  house_overlays: [],
  angle_contacts: []
};

const emptyScore = computeScore(empty, cfg);

ok("baseline vide = 50", () => {
  assert.equal(emptyScore.global_score, 50);
});

/* ==================================================
   2. TROIS RÈGLES POSITIVES — MÊME DOMAINE
================================================== */

const loveRules = [
  "AMOUR_VENUS_CONJ_VENUS",
  "V11_SUN_VENUS_CONJ",
  "V11_MOON_VENUS_CONJ"
].map(id => cfg.rules.find(r => r.rule_id === id));

const loveSyn = synastryForRules(loveRules, "TEST61_LOVE");
const loveScore = computeScore(loveSyn, cfg);
const loveContrib = contributions(loveScore);

ok("3 règles amour simultanées", () => {
  assert.equal(
    loveContrib.filter(c => c.domain === "love").length,
    3
  );
});

ok("amour > baseline", () => {
  assert.ok(domain(loveScore, "love").score > 50);
});

ok("global amour > baseline", () => {
  assert.ok(loveScore.global_score > 50);
});

/* ==================================================
   3. PLUSIEURS DOMAINES
================================================== */

const multiIds = [
  "AMOUR_VENUS_CONJ_VENUS",
  "PASSION_VENUS_CONJ_MARS",
  "COMM_MERCURE_SEX_MERCURE",
  "EMOTIONS_LUNE_CONJ_LUNE",
  "QUOTIDIEN_SATURNE_TRI_LUNE",
  "PROJETS_SOLEIL_CONJ_SATURNE"
];

const multiRules = multiIds.map(
  id => cfg.rules.find(r => r.rule_id === id)
);

const multiSyn = synastryForRules(multiRules, "TEST61_MULTI");
const multiScore = computeScore(multiSyn, cfg);
const multiContrib = contributions(multiScore);

ok("6 règles / 6 domaines", () => {
  assert.equal(multiContrib.length, 6);

  for (const id of multiIds) {
    assert.equal(
      multiContrib.filter(c => c.rule_id === id).length,
      1
    );
  }
});

ok("tous les domaines concernés", () => {
  for (const r of multiRules) {
    assert.ok(
      domain(multiScore, r.domain).contributions.length >= 1,
      `${r.domain} absent`
    );
  }
});

ok("global multi-domaines borné", () => {
  assert.ok(
    multiScore.global_score >= 0 &&
    multiScore.global_score <= 100
  );
});

/* ==================================================
   4. POSITIF + NÉGATIF
================================================== */

const mixedPolarityRules = [
  "AMOUR_VENUS_CONJ_VENUS",
  "AMOUR_SATURNE_CARRE_VENUS",
  "V11_SUN_VENUS_CONJ",
  "V11_SUN_VENUS_OPPOSITION"
].map(id => cfg.rules.find(r => r.rule_id === id));

const mixedPolaritySyn =
  synastryForRules(mixedPolarityRules, "TEST61_POLARITY");

const mixedPolarityScore =
  computeScore(mixedPolaritySyn, cfg);

const mixedPolarityContrib =
  contributions(mixedPolarityScore);

ok("positif + négatif simultanés", () => {
  assert.ok(
    mixedPolarityContrib.some(c => c.final_points > 0)
  );

  assert.ok(
    mixedPolarityContrib.some(c => c.final_points < 0)
  );
});

ok("raw positive et raw negative présents", () => {
  const love = domain(mixedPolarityScore, "love");

  assert.ok(love.raw_positive > 0);
  assert.ok(love.raw_negative > 0);
});

/* ==================================================
   5. MIXED + POSITIF + FRICTION
================================================== */

const advancedIds = [
  "AMOUR_VENUS_CONJ_VENUS",
  "V11_SUN_MOON_SQUARE",
  "V11_VENUS_MARS_SQUARE",
  "FRICTIONS_MARS_OPPO_SATURNE"
];

const advancedRules = advancedIds.map(
  id => cfg.rules.find(r => r.rule_id === id)
);

const advancedSyn =
  synastryForRules(advancedRules, "TEST61_ADVANCED");

const advancedScore =
  computeScore(advancedSyn, cfg);

const advancedContrib =
  contributions(advancedScore);

ok("mixed + positif + friction", () => {
  assert.equal(advancedContrib.length, 4);

  assert.ok(
    advancedContrib.some(
      c => c.doctrine_polarity === "MIXED_TENSION_REVIEW"
    )
  );

  assert.ok(
    advancedContrib.some(c => c.domain === "frictions")
  );
});

ok("friction reste transversal", () => {
  const friction = domain(advancedScore, "frictions");

  assert.ok(friction);
  assert.ok(friction.contributions.length >= 1);
});

/* ==================================================
   6. MIXED : POSITIF + NÉGATIF
================================================== */

const mixedRules = cfg.rules.filter(
  r => r.doctrine_polarity === "MIXED_TENSION_REVIEW"
);

const mixedSyn =
  synastryForRules(mixedRules, "TEST61_ALL_MIXED");

const mixedScore =
  computeScore(mixedSyn, cfg);

const mixedContrib =
  contributions(mixedScore);

ok("6 mixed simultanés", () => {
  assert.equal(mixedRules.length, 6);
  assert.equal(mixedContrib.length, 6);
});

ok("6 mixed ont une composante positive", () => {
  for (const c of mixedContrib) {
    assert.ok(
      c.doctrine_polarity === "MIXED_TENSION_REVIEW"
    );
  }

  const totalPositive = mixedScore.domain_scores
    .reduce((sum, d) => sum + d.raw_positive, 0);

  assert.ok(totalPositive > 0);
});

ok("6 mixed ont une composante tension", () => {
  const totalNegative = mixedScore.domain_scores
    .reduce((sum, d) => sum + d.raw_negative, 0);

  assert.ok(totalNegative > 0);
});

/* ==================================================
   7. GÉNÉRATIONNELLES + PERSONNELLES
================================================== */

const generational = cfg.rules.filter(
  r => r.rule_id.startsWith("V11B_")
);

const personal = [
  "AMOUR_VENUS_CONJ_VENUS",
  "PASSION_VENUS_CONJ_MARS",
  "COMM_MERCURE_SEX_MERCURE",
  "EMOTIONS_LUNE_CONJ_LUNE"
].map(id => cfg.rules.find(r => r.rule_id === id));

const generationRules =
  [...personal, ...generational.slice(0, 4)];

const generationSyn =
  synastryForRules(generationRules, "TEST61_GENERATIONAL");

const generationScore =
  computeScore(generationSyn, cfg);

const generationContrib =
  contributions(generationScore);

ok("personnelles + générationnelles", () => {
  assert.equal(
    generationContrib.length,
    generationRules.length
  );
});

ok("générationnelles ne dominent pas seules", () => {
  const personalAbs = generationContrib
    .filter(c => !c.rule_id.startsWith("V11B_"))
    .reduce((s, c) => s + Math.abs(c.final_points), 0);

  const genAbs = generationContrib
    .filter(c => c.rule_id.startsWith("V11B_"))
    .reduce((s, c) => s + Math.abs(c.final_points), 0);

  assert.ok(genAbs < personalAbs);
});

/* ==================================================
   8. SATURATION
================================================== */

const saturationRules = Array.from(
  { length: 100 },
  (_, i) => cfg.rules[i % cfg.rules.length]
);

const saturationSyn =
  synastryForRules(saturationRules, "TEST61_SATURATION");

const saturationScore =
  computeScore(saturationSyn, cfg);

ok("saturation globale bornée", () => {
  assert.ok(
    saturationScore.global_score >= 0 &&
    saturationScore.global_score <= 100
  );

  for (const d of saturationScore.domain_scores) {
    assert.ok(d.score >= 0 && d.score <= 100);
  }
});

/* ==================================================
   9. DÉTERMINISME
================================================== */

const deterministicA =
  computeScore(multiSyn, cfg);

const deterministicB =
  computeScore(multiSyn, cfg);

ok("déterminisme multi-règles", () => {
  assert.deepEqual(
    {
      global_score: deterministicA.global_score,
      domain_scores: deterministicA.domain_scores
    },
    {
      global_score: deterministicB.global_score,
      domain_scores: deterministicB.domain_scores
    }
  );
});

/* ==================================================
   10. SYMÉTRIE
================================================== */

function reverseSynastry(s) {
  return {
    ...s,
    synastry_id: `${s.synastry_id}_REVERSE`,
    primary_chart_id: s.target_chart_id,
    target_chart_id: s.primary_chart_id,

    aspects: s.aspects.map(a => ({
      ...a,
      body_a: a.body_b,
      body_b: a.body_a
    })),

    house_overlays: s.house_overlays.map(o => ({
      ...o,
      owner_of_planet:
        o.owner_of_planet === "primary"
          ? "target"
          : "primary",
      falls_in_house_of:
        o.falls_in_house_of === "primary"
          ? "target"
          : "primary"
    }))
  };
}

const reverse = reverseSynastry(multiSyn);

const scoreAB = computeScore(multiSyn, cfg);
const scoreBA = computeScore(reverse, cfg);

ok("symétrie multi-règles", () => {
  assert.equal(
    scoreAB.global_score,
    scoreBA.global_score
  );
});

/* ==================================================
   11. ABSENCE DE DUPLICATION
================================================== */

const duplicatedRules = [
  cfg.rules.find(r => r.rule_id === "AMOUR_VENUS_CONJ_VENUS"),
  cfg.rules.find(r => r.rule_id === "AMOUR_VENUS_CONJ_VENUS")
];

const duplicateSyn =
  synastryForRules(duplicatedRules, "TEST61_DUPLICATE");

const duplicateScore =
  computeScore(duplicateSyn, cfg);

const duplicateContrib =
  contributions(duplicateScore);

ok("deux aspects identiques = deux événements distincts", () => {
  assert.equal(duplicateContrib.length, 2);
});

/* ==================================================
   12. BORNES FINALES
================================================== */

ok("toutes les sorties finales bornées", () => {
  const scores = [
    emptyScore,
    loveScore,
    multiScore,
    mixedPolarityScore,
    advancedScore,
    mixedScore,
    generationScore,
    saturationScore,
    duplicateScore
  ];

  for (const s of scores) {
    assert.ok(
      Number.isFinite(s.global_score)
    );

    assert.ok(
      s.global_score >= 0 &&
      s.global_score <= 100
    );

    for (const d of s.domain_scores) {
      assert.ok(Number.isFinite(d.score));
      assert.ok(d.score >= 0 && d.score <= 100);
      assert.ok(Number.isFinite(d.raw_positive));
      assert.ok(Number.isFinite(d.raw_negative));
    }
  }
});

/* ==================================================
   RÉSULTAT
================================================== */

console.log("");
console.log("==================================================");
console.log("RÉSULTAT TEST 61");
console.log("==================================================");
console.log(`PASS : ${pass}`);
console.log(`FAIL : ${fail}`);
console.log("==================================================");

if (fail === 0) {
  console.log("TEST 61 FINAL — PASS COMPLET");
  console.log("Agrégation multi-règles : OK");
  console.log("Multi-domaines : OK");
  console.log("Mixed : OK");
  console.log("Friction : OK");
  console.log("Générationnelles : OK");
  console.log("Saturation : OK");
  console.log("Déterminisme : OK");
  console.log("Symétrie : OK");
  console.log("Bornes : OK");
} else {
  console.log("TEST 61 FINAL — ECHEC");
  process.exitCode = 1;
}
