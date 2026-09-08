import test from "node:test";
import assert from "node:assert/strict";
import { computeDailyScores } from "../../js/daily/daily_scoring.js";

const BASE = {
  date: "2026-09-08",
  profile_id: "profile_test",
  provider: "astronomy-engine",
  transits: [],
  house_transits: [],
  angle_transits: []
};

function withTransit(overrides = {}) {
  return {
    ...BASE,
    transits: [{
      transiting_body: "venus",
      natal_body: "venus",
      aspect_type: "trine",
      polarity: "harmonious",
      orb: 0,
      orb_strength: 1,
      ...overrides
    }]
  };
}

test("daily scoring est déterministe", () => {
  const input = withTransit();
  assert.deepEqual(computeDailyScores(input), computeDailyScores(input));
});

test("daily scoring garde les trois scores dans [0,100]", () => {
  const result = computeDailyScores(withTransit());
  for (const key of ["heart", "communication", "energy"]) {
    assert.ok(result.scores[key].score >= 0);
    assert.ok(result.scores[key].score <= 100);
  }
});

test("Vénus harmonieuse sur Vénus favorise surtout le coeur", () => {
  const result = computeDailyScores(withTransit());
  assert.ok(result.scores.heart.score > 50);
  assert.equal(result.dominant_domain, "heart");
});

test("Mercure carré Mercure pèse surtout sur les échanges", () => {
  const result = computeDailyScores(withTransit({
    transiting_body: "mercury",
    natal_body: "mercury",
    aspect_type: "square",
    polarity: "tense"
  }));
  assert.ok(result.scores.communication.score < 50);
  assert.equal(result.dominant_domain, "communication");
});

test("Mars trigone Mars favorise surtout l'énergie", () => {
  const result = computeDailyScores(withTransit({
    transiting_body: "mars",
    natal_body: "mars"
  }));
  assert.ok(result.scores.energy.score > 50);
  assert.equal(result.dominant_domain, "energy");
});

test("le scoring fonctionne sans maisons ni angles", () => {
  const result = computeDailyScores({ ...BASE, transits: withTransit().transits });
  assert.equal(result.provider, "astronomy-engine");
  assert.ok(Array.isArray(result.contributions));
});

test("le provider simulé est refusé", () => {
  assert.throws(
    () => computeDailyScores({ ...BASE, provider: "simulated" }),
    /astronomy-engine/
  );
});
