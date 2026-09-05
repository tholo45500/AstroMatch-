// tests/scoring/scoring.test.js

import test from "node:test";
import assert from "node:assert/strict";

import { wOrbe } from "../../js/utils/math.js";
import { buildProfile } from "../../js/profiles/profile_service.js";
import { computeNatalChart } from "../../js/astrology/natal_chart_engine.js";
import { computeSynastry } from "../../js/synastry/synastry_engine.js";
import { computeScore, loadWeightingConfig } from "../../js/scoring/scoring_engine.js";
import { validateWeightingConfig } from "../../js/scoring/config/weighting_validator.js";

const PRIMARY_INPUT = {
  role: "primary",
  first_name: "Anthony",
  date: "1990-04-12",
  time: "14:35",
  time_known: true,
  place: "Lyon, France"
};

const TARGET_INPUT = {
  role: "target",
  first_name: "Julie",
  date: "1992-08-03",
  time: "09:10",
  time_known: true,
  place: "Paris, France"
};

test("wOrbe(0) = 1", () => {
  assert.equal(wOrbe(0, 8), 1);
});

test("wOrbe(orb_max / 2) = 0.5", () => {
  assert.ok(Math.abs(wOrbe(4, 8) - 0.5) < 1e-9);
});

test("wOrbe(orb_max) = 0", () => {
  assert.equal(wOrbe(8, 8), 0);
});

test("wOrbe(orb_max + epsilon) = 0", () => {
  assert.equal(wOrbe(8.5, 8), 0);
});

test("computeScore est déterministe pour une même synastrie et une même config", async () => {
  const weightingConfig = await loadWeightingConfig();
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile(TARGET_INPUT));
  const synastry = computeSynastry(primaryChart, targetChart);

  const scoreA = computeScore(synastry, weightingConfig);
  const scoreB = computeScore(synastry, weightingConfig);

  assert.equal(scoreA.global_score, scoreB.global_score);
  assert.deepEqual(
    scoreA.domain_scores.map((d) => d.score),
    scoreB.domain_scores.map((d) => d.score)
  );
});

test("computeScore : le score global et tous les scores de domaine restent dans [0, 100]", async () => {
  const weightingConfig = await loadWeightingConfig();
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile(TARGET_INPUT));
  const synastry = computeSynastry(primaryChart, targetChart);
  const score = computeScore(synastry, weightingConfig);

  assert.ok(score.global_score >= 0 && score.global_score <= 100);
  for (const domainScore of score.domain_scores) {
    assert.ok(domainScore.score >= 0 && domainScore.score <= 100, `domaine ${domainScore.domain} hors bornes`);
  }
});

test("computeScore : les 7 domaines sont toujours présents, même sans contribution", async () => {
  const weightingConfig = await loadWeightingConfig();
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile(TARGET_INPUT));
  const synastry = computeSynastry(primaryChart, targetChart);
  const score = computeScore(synastry, weightingConfig);

  const domains = score.domain_scores.map((d) => d.domain).sort();
  assert.deepEqual(domains, ["communication", "daily", "emotions", "frictions", "love", "passion", "projects"].sort());
});

test("computeScore : chaque contribution référence un aspect réel de la synastrie", async () => {
  const weightingConfig = await loadWeightingConfig();
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile(TARGET_INPUT));
  const synastry = computeSynastry(primaryChart, targetChart);
  const score = computeScore(synastry, weightingConfig);

  const knownAspectIds = new Set(synastry.aspects.map((a) => a.aspect_id));
  for (const domainScore of score.domain_scores) {
    for (const contribution of domainScore.contributions) {
      assert.ok(
        knownAspectIds.has(contribution.aspect_id),
        `la contribution ${contribution.rule_id} doit référencer un aspect existant`
      );
    }
  }
});

test("computeScore : synastrie en mode dégradé -> score marqué partial", async () => {
  const weightingConfig = await loadWeightingConfig();
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile({ ...TARGET_INPUT, time_known: false, time: undefined }));
  const synastry = computeSynastry(primaryChart, targetChart);
  const score = computeScore(synastry, weightingConfig);

  assert.equal(score.partial, true);
  // Sans maisons fiables, aucun bonus de maison ne doit avoir été appliqué.
  for (const domainScore of score.domain_scores) {
    for (const contribution of domainScore.contributions) {
      assert.equal(contribution.house_weight, 1.0);
    }
  }
});


test("configuration de pondération V1.0 : structure valide et poids globaux cohérents", async () => {
  const weightingConfig = await loadWeightingConfig();
  assert.equal(validateWeightingConfig(weightingConfig), true);
});

test("computeScore : les frictions V1.0 produisent bien un score de friction et un impact négatif", () => {
  const weightingConfig = {
    version: "test",
    k_saturation: 35,
    frictions_penalty_global: 0.20,
    domains: ["love", "passion", "communication", "emotions", "daily", "projects", "frictions"],
    domain_weights_global: { love: 0.25, emotions: 0.20, communication: 0.20, passion: 0.15, daily: 0.10, projects: 0.10 },
    aspect_orbs: { conjunction: 8, opposition: 7, trine: 7, square: 6, sextile: 4 },
    planet_weights: { sun: 1, moon: 1, mercury: 1, venus: 1, mars: 1, jupiter: 1, saturn: 1, uranus: 1, neptune: 1, pluto: 1 },
    rules: [{ rule_id: "FRICTIONS_TEST", domain: "frictions", planet_a: "mars", aspect_type: "opposition", planet_b: "saturn", base_points: 24, orb_max: 7, overlay_house: 1, house_bonus: 1 }]
  };
  const synastry = {
    synastry_id: "syn_test",
    reliability: { degraded_mode: false },
    aspects: [{
      aspect_id: "asp_test",
      body_a: { owner: "primary", body: "mars" },
      body_b: { owner: "target", body: "saturn" },
      aspect_type: "opposition",
      exact_angle: 180,
      actual_angle: 180,
      orb: 0,
      orb_max: 7,
      orb_strength: 1,
      polarity: "tense"
    }],
    house_overlays: []
  };

  const score = computeScore(synastry, weightingConfig);
  const friction = score.domain_scores.find((d) => d.domain === "frictions");
  assert.ok(friction.score > 0);
  assert.equal(friction.contributions[0].impact, "negative");
});

test("computeScore respecte l'orb_max propre à une règle", () => {
  const config = {
    version: "test-orb",
    k_saturation: 35,
    frictions_penalty_global: 0.2,
    domains: ["love", "passion", "communication", "emotions", "daily", "projects", "frictions"],
    domain_weights_global: { love: 0.25, emotions: 0.20, communication: 0.20, passion: 0.15, daily: 0.10, projects: 0.10 },
    aspect_orbs: { conjunction: 8, opposition: 7, trine: 7, square: 6, sextile: 4 },
    planet_weights: { sun: 1, moon: 1, mercury: 1, venus: 1, mars: 1, jupiter: 1, saturn: 1, uranus: 1, neptune: 1, pluto: 1 },
    rules: [{ rule_id: "TEST", domain: "love", planet_a: "venus", aspect_type: "conjunction", planet_b: "mars", base_points: 20, orb_max: 2, overlay_house: 7, house_bonus: 1 }]
  };
  const synastry = {
    synastry_id: "syn_test",
    reliability: { degraded_mode: false },
    aspects: [{
      aspect_id: "asp_test",
      body_a: { owner: "primary", body: "venus" }, body_b: { owner: "target", body: "mars" },
      aspect_type: "conjunction", exact_angle: 0, actual_angle: 3, orb: 3, orb_max: 8, orb_strength: 0.7, polarity: "neutral"
    }],
    house_overlays: []
  };
  const score = computeScore(synastry, config);
  const love = score.domain_scores.find(d => d.domain === "love");
  assert.equal(love.contributions.length, 0);
});

test("computeScore ne déclenche pas une règle au-delà de son orb_max", () => {
  const config = {
    version: "test-orb",
    k_saturation: 35,
    frictions_penalty_global: 0.2,
    domains: ["love", "passion", "communication", "emotions", "daily", "projects", "frictions"],
    domain_weights_global: { love: 0.25, emotions: 0.20, communication: 0.20, passion: 0.15, daily: 0.10, projects: 0.10 },
    aspect_orbs: { conjunction: 8, opposition: 7, trine: 7, square: 6, sextile: 4 },
    planet_weights: { sun: 1, moon: 1, mercury: 1, venus: 1, mars: 1, jupiter: 1, saturn: 1, uranus: 1, neptune: 1, pluto: 1 },
    rules: [{ rule_id: "TEST", domain: "love", planet_a: "venus", aspect_type: "conjunction", planet_b: "mars", base_points: 20, orb_max: 2, overlay_house: 7, house_bonus: 1 }]
  };
  const synastry = {
    synastry_id: "syn_test",
    reliability: { degraded_mode: false },
    aspects: [{ aspect_id: "asp_test", body_a: { owner: "primary", body: "venus" }, body_b: { owner: "target", body: "mars" }, aspect_type: "conjunction", exact_angle: 0, actual_angle: 3, orb: 3, orb_max: 8, orb_strength: 0.7, polarity: "neutral" }],
    house_overlays: []
  };
  const love = computeScore(synastry, config).domain_scores.find(d => d.domain === "love");
  assert.equal(love.contributions.length, 0);
});

import { weightingConfigFingerprint } from "../../js/scoring/config/weighting_fingerprint.js";
import weightingConfig from "../../js/scoring/config/weighting_v1.json" with { type: "json" };

test("weighting fingerprint is deterministic and changes with config", () => {
  const a = weightingConfigFingerprint(weightingConfig);
  const b = weightingConfigFingerprint(JSON.parse(JSON.stringify(weightingConfig)));
  assert.equal(a, b);
  const changed = JSON.parse(JSON.stringify(weightingConfig));
  changed.k_saturation += 1;
  assert.notEqual(a, weightingConfigFingerprint(changed));
});
