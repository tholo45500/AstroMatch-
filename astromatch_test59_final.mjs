import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

const cfg = JSON.parse(
  await readFile("./js/scoring/config/weighting_v1_2.json", "utf8")
);

console.log("==================================================");
console.log("TEST 59 FINAL — COUVERTURE DES 51 RÈGLES");
console.log("==================================================");

assert.equal(cfg.version, "v1.2");
assert.equal(cfg.rules.length, 51);

function makeAspect(rule) {
  const orb = Math.max(
    0.001,
    Math.min(rule.orb_max * 0.5, rule.orb_max - 0.001)
  );

  return {
    aspect_id: `TEST59_${rule.rule_id}`,
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
    orb_strength: 1 - (orb / rule.orb_max),
    polarity: "neutral"
  };
}

function makeSynastry(rule) {
  const synastry = {
    synastry_id: `TEST59_${rule.rule_id}`,
    primary_chart_id: "TEST59_A",
    target_chart_id: "TEST59_B",
    computed_at: "2026-01-01T00:00:00.000Z",

    reliability: {
      degraded_mode: false,
      reason: null
    },

    aspects: [
      makeAspect(rule)
    ],

    house_overlays: [],

    angle_contacts: []
  };

  if (rule.overlay_house != null) {
    synastry.house_overlays.push({
      owner_of_planet: "primary",
      planet: rule.planet_a,
      falls_in_house_of: "target",
      house_number: rule.overlay_house
    });
  }

  return synastry;
}

function allContributions(score) {
  assert.ok(Array.isArray(score.domain_scores));

  return score.domain_scores.flatMap(
    domain => Array.isArray(domain.contributions)
      ? domain.contributions
      : []
  );
}

function expectedHouseWeight(rule) {
  return rule.overlay_house != null
    ? rule.house_bonus
    : 1;
}

let pass = 0;
let fail = 0;
const failed = [];

for (const rule of cfg.rules) {
  try {
    const synastry = makeSynastry(rule);
    const score = computeScore(synastry, cfg);

    assert.ok(score);
    assert.ok(Array.isArray(score.domain_scores));

    const contributions = allContributions(score);

    const matches = contributions.filter(
      c => c.rule_id === rule.rule_id
    );

    assert.equal(
      matches.length,
      1,
      `${rule.rule_id}: contribution attendue = 1, trouvée = ${matches.length}`
    );

    const contribution = matches[0];

    assert.equal(
      contribution.domain,
      rule.domain,
      `${rule.rule_id}: domaine incorrect`
    );

    assert.equal(
      contribution.planet_a,
      rule.planet_a,
      `${rule.rule_id}: planet_a incorrect`
    );

    assert.equal(
      contribution.planet_b,
      rule.planet_b,
      `${rule.rule_id}: planet_b incorrect`
    );

    assert.equal(
      contribution.aspect_type,
      rule.aspect_type,
      `${rule.rule_id}: aspect_type incorrect`
    );

    assert.ok(Number.isFinite(contribution.final_points));
    assert.ok(Number.isFinite(contribution.orb));
    assert.ok(Number.isFinite(contribution.orb_strength));
    assert.ok(Number.isFinite(contribution.planet_weight));
    assert.ok(Number.isFinite(contribution.house_weight));

    assert.equal(
      contribution.house_weight,
      expectedHouseWeight(rule),
      `${rule.rule_id}: house_weight incorrect`
    );

    if (rule.doctrine_polarity) {
      assert.equal(
        contribution.doctrine_polarity,
        rule.doctrine_polarity,
        `${rule.rule_id}: doctrine_polarity incorrect`
      );
    } else {
      assert.equal(
        contribution.doctrine_polarity,
        null,
        `${rule.rule_id}: doctrine_polarity inattendue`
      );
    }

    assert.ok(
      score.global_score >= 0 &&
      score.global_score <= 100,
      `${rule.rule_id}: global hors bornes`
    );

    pass++;

    console.log(
      `PASS ${String(pass).padStart(2, "0")}/51 :: ${rule.rule_id}`
    );

  } catch (err) {
    fail++;

    failed.push({
      rule_id: rule.rule_id,
      error: err.message
    });

    console.log(
      `FAIL :: ${rule.rule_id} :: ${err.message}`
    );
  }
}

console.log("");
console.log("==================================================");
console.log("RÉSULTAT TEST 59");
console.log("==================================================");
console.log(`Règles : ${cfg.rules.length}`);
console.log(`PASS   : ${pass}`);
console.log(`FAIL   : ${fail}`);
console.log(
  `Couverture : ${((pass / cfg.rules.length) * 100).toFixed(2)}%`
);

if (failed.length > 0) {
  console.log("");
  console.log("===== RÈGLES EN ÉCHEC =====");

  for (const item of failed) {
    console.log(`${item.rule_id} :: ${item.error}`);
  }
}

console.log("==================================================");

if (pass === 51 && fail === 0) {
  console.log("TEST 59 FINAL — PASS COMPLET");
  console.log("Couverture règles : 51/51");
  console.log("Dead rules : 0");
} else {
  console.log("TEST 59 FINAL — ECHEC");
  process.exitCode = 1;
}
