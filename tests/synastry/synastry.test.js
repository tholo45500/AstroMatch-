// tests/synastry/synastry.test.js

import test from "node:test";
import assert from "node:assert/strict";

import { buildProfile } from "../../js/profiles/profile_service.js";
import { computeNatalChart } from "../../js/astrology/natal_chart_engine.js";
import { computeSynastry } from "../../js/synastry/synastry_engine.js";

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

test("computeSynastry ne produit que des aspects dans leur orbe maximal, avec orb_strength dans [0,1]", () => {
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile(TARGET_INPUT));
  const synastry = computeSynastry(primaryChart, targetChart);

  assert.ok(synastry.aspects.length > 0, "au moins un aspect devrait être détecté");
  for (const aspect of synastry.aspects) {
    assert.ok(aspect.orb <= aspect.orb_max, `orb ${aspect.orb} doit être <= orb_max ${aspect.orb_max}`);
    assert.ok(aspect.orb_strength >= 0 && aspect.orb_strength <= 1, "orb_strength doit être dans [0,1]");
    assert.ok(aspect.aspect_id, "chaque aspect doit avoir un aspect_id unique");
  }
});

test("computeSynastry : heure inconnue -> mode dégradé, aucun overlay ni contact d'angle", () => {
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile({ ...TARGET_INPUT, time_known: false, time: undefined }));

  const synastry = computeSynastry(primaryChart, targetChart);

  assert.equal(synastry.reliability.degraded_mode, true);
  assert.equal(synastry.house_overlays.length, 0);
  assert.equal(synastry.angle_contacts.length, 0);
});

test("computeSynastry : quand les deux thèmes sont fiables, les overlays de maison sont calculés", () => {
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile(TARGET_INPUT));

  const synastry = computeSynastry(primaryChart, targetChart);

  assert.equal(synastry.reliability.degraded_mode, false);
  assert.ok(synastry.house_overlays.length > 0, "des overlays de maison devraient exister quand les deux thèmes sont fiables");
  for (const overlay of synastry.house_overlays) {
    assert.ok(overlay.house_number >= 1 && overlay.house_number <= 12);
  }
});

test("computeSynastry produit des aspects_id uniques (traçabilité)", () => {
  const primaryChart = computeNatalChart(buildProfile(PRIMARY_INPUT));
  const targetChart = computeNatalChart(buildProfile(TARGET_INPUT));
  const synastry = computeSynastry(primaryChart, targetChart);

  const ids = synastry.aspects.map((a) => a.aspect_id);
  const uniqueIds = new Set(ids);
  assert.equal(ids.length, uniqueIds.size, "tous les aspect_id doivent être uniques");
});
