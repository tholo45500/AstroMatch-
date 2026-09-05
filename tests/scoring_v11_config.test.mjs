import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  validateWeightingConfig
} from "../js/scoring/config/weighting_validator.js";

import {
  computeScore
} from "../js/scoring/scoring_engine.js";

const config = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1_1.json",
    "utf8"
  )
);

function aspect(id, a, b, type, exact, orb, orbMax) {
  return {
    aspect_id: id,
    body_a: {
      owner: "primary",
      body: a
    },
    body_b: {
      owner: "target",
      body: b
    },
    aspect_type: type,
    exact_angle: exact,
    actual_angle: exact + orb,
    orb,
    orb_max: orbMax,
    orb_strength:
      0.5 *
      (
        1 +
        Math.cos(
          Math.PI * orb / orbMax
        )
      ),
    polarity:
      ["square", "opposition"].includes(type)
        ? "tense"
        : "harmonious"
  };
}

function synastry(id, aspects) {
  return {
    synastry_id: id,
    reliability: {
      degraded_mode: false,
      quality: "full"
    },
    aspects,
    house_overlays: [],
    angle_contacts: []
  };
}

test("V1.1 config: structure and fingerprint", () => {
  assert.equal(config.version, "v1.1");
  assert.equal(config.rules.length, 38);

  assert.doesNotThrow(() => {
    validateWeightingConfig(config);
  });

  const result = computeScore(
    synastry("fingerprint-check", []),
    config
  );

  assert.equal(
    result.weighting_config_fingerprint,
    "55e3a93d"
  );
});

test("V1.1 config: preserves all 13 V1.0 rules", () => {
  const v10 = JSON.parse(
    fs.readFileSync(
      "./js/scoring/config/weighting_v1.json",
      "utf8"
    )
  );

  const v10Ids = new Set(
    v10.rules.map(r => r.rule_id)
  );

  const v11Ids = new Set(
    config.rules.map(r => r.rule_id)
  );

  assert.equal(v10Ids.size, 13);

  for (const id of v10Ids) {
    assert.ok(
      v11Ids.has(id),
      `Missing V1.0 rule in V1.1: ${id}`
    );
  }
});

test("V1.1 runtime: Sun-Moon trine", () => {
  const result = computeScore(
    synastry("test-sun-moon", [
      aspect(
        "a1",
        "sun",
        "moon",
        "trine",
        120,
        0,
        7
      )
    ]),
    config
  );

  const contributions =
    result.domain_scores.flatMap(
      d => d.contributions
    );

  const match =
    contributions.find(
      c =>
        c.rule_id ===
        "V11_SUN_MOON_TRINE"
    );

  assert.ok(match);
  assert.equal(match.base_points, 8);
  assert.equal(match.final_points, 12);
  assert.equal(match.impact, "positive");

  assert.equal(
    result.weighting_config_fingerprint,
    "55e3a93d"
  );

  assert.equal(
    result.global_score.toFixed(2),
    "52.90"
  );
});

test("V1.1 runtime: Venus-Mars square + friction", () => {
  const result = computeScore(
    synastry("test-venus-mars-square", [
      aspect(
        "a1",
        "venus",
        "mars",
        "square",
        90,
        0,
        6
      )
    ]),
    config
  );

  const contributions =
    result.domain_scores.flatMap(
      d => d.contributions
    );

  const ids =
    contributions.map(
      c => c.rule_id
    );

  assert.ok(
    ids.includes(
      "V11_VENUS_MARS_SQUARE"
    )
  );

  assert.ok(
    ids.includes(
      "FRICTION_VENUS_MARS_SQUARE"
    )
  );

  assert.equal(
    result.global_score.toFixed(2),
    "45.88"
  );
});

test("V1.1 runtime: Jupiter-Saturn trine", () => {
  const result = computeScore(
    synastry("test-jupiter-saturn", [
      aspect(
        "a1",
        "jupiter",
        "saturn",
        "trine",
        120,
        0,
        7
      )
    ]),
    config
  );

  const contributions =
    result.domain_scores.flatMap(
      d => d.contributions
    );

  const match =
    contributions.find(
      c =>
        c.rule_id ===
        "V11_JUPITER_SATURN_TRINE"
    );

  assert.ok(match);
  assert.equal(match.base_points, 7);
  assert.equal(match.final_points, 7);
  assert.equal(match.impact, "positive");

  assert.equal(
    result.global_score.toFixed(2),
    "50.91"
  );
});
