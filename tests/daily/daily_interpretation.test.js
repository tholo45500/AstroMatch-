import test from "node:test";
import assert from "node:assert/strict";

import { buildDailyInterpretation } from "../../js/daily/daily_interpretation.js";

function fixture() {
  const transits = {
    date: "2026-09-08",
    provider: "astronomy-engine",
    reference_time_local: "12:00",
    timezone_id: "Europe/Paris",
    reliability: {
      real_astronomical_positions: true,
      natal_time_known: true
    }
  };

  const scoring = {
    dominant_domain: "energy",
    scores: {
      heart: { score: 51 },
      communication: { score: 49 },
      energy: { score: 61 }
    },
    contributions: [
      {
        kind: "planetary_aspect",
        domain: "heart",
        value: 5.871,
        transiting_body: "mars",
        natal_body: "moon",
        aspect_type: "trine",
        orb: 0.4664,
        orb_strength: 0.9415,
        house_number: 11
      },
      {
        kind: "planetary_aspect",
        domain: "heart",
        value: -5.099,
        transiting_body: "uranus",
        natal_body: "venus",
        aspect_type: "square",
        orb: 0.6982,
        orb_strength: 0.8722,
        house_number: 10
      },
      {
        kind: "planetary_aspect",
        domain: "energy",
        value: 4.634,
        transiting_body: "mars",
        natal_body: "pluto",
        aspect_type: "trine",
        orb: 0.9918,
        orb_strength: 0.7537,
        house_number: 11
      },
      {
        kind: "planetary_aspect",
        domain: "communication",
        value: 1,
        transiting_body: "mercury",
        natal_body: "sun",
        aspect_type: "sextile",
        orb: 2,
        orb_strength: 0.5
      }
    ]
  };

  return { transits, scoring };
}

test("daily interpretation est déterministe", () => {
  const { transits, scoring } = fixture();
  assert.deepEqual(
    buildDailyInterpretation(transits, scoring),
    buildDailyInterpretation(transits, scoring)
  );
});

test("daily interpretation conserve les trois scores", () => {
  const { transits, scoring } = fixture();
  const result = buildDailyInterpretation(transits, scoring);
  assert.equal(result.domains.heart.score, 51);
  assert.equal(result.domains.communication.score, 49);
  assert.equal(result.domains.energy.score, 61);
});

test("daily interpretation conserve la dominante", () => {
  const { transits, scoring } = fixture();
  const result = buildDailyInterpretation(transits, scoring);
  assert.equal(result.dominant_domain, "energy");
  assert.equal(result.dominant_domain_label, "Énergie");
});

test("pourquoi aujourd'hui est limité aux trois influences les plus fortes", () => {
  const { transits, scoring } = fixture();
  const result = buildDailyInterpretation(transits, scoring);
  assert.equal(result.why_today.length, 3);
  assert.equal(result.why_today[0].label, "Mars trigone Lune");
  assert.equal(result.why_today[1].label, "Uranus carré Vénus");
});

test("la phrase et le résumé sont non vides", () => {
  const { transits, scoring } = fixture();
  const result = buildDailyInterpretation(transits, scoring);
  assert.ok(result.phrase.length > 20);
  assert.ok(result.summary.length > 100);
});

test("les contributions gardent orbe et force pour la traçabilité", () => {
  const { transits, scoring } = fixture();
  const result = buildDailyInterpretation(transits, scoring);
  assert.equal(result.why_today[0].orb, 0.4664);
  assert.equal(result.why_today[0].orb_strength, 0.9415);
});

test("le provider simulé est refusé", () => {
  const { transits, scoring } = fixture();
  transits.provider = "simulated";
  assert.throws(
    () => buildDailyInterpretation(transits, scoring),
    error => error?.type === "DAILY_REAL_PROVIDER_REQUIRED"
  );
});
