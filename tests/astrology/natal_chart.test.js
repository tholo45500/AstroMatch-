import test from "node:test";
import assert from "node:assert/strict";

import { buildProfile } from "../../js/profiles/profile_service.js";
import { computeNatalChart } from "../../js/astrology/natal_chart_engine.js";
import {
  getEphemerisCapabilities
} from "../../js/astrology/ephemeris/ephemeris_adapter.js";
import {
  assertProductionEphemeris
} from "../../js/astrology/ephemeris/production_guard.js";


test("computeNatalChart est déterministe : même profil -> même thème", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lyon, France"
  });

  const chart1 = computeNatalChart(profile);
  const chart2 = computeNatalChart(profile);

  assert.deepEqual(chart1.points, chart2.points);
  assert.deepEqual(chart1.angles, chart2.angles);
  assert.deepEqual(chart1.houses, chart2.houses);
  assert.equal(chart1.source_profile_fingerprint, chart2.source_profile_fingerprint);
});


test("computeNatalChart calcule les 10 corps célestes", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lyon, France"
  });

  const chart = computeNatalChart(profile);

  assert.equal(Object.keys(chart.points).length, 10);
});


test("computeNatalChart : heure inconnue -> pas de maisons ni d'ascendant fiable (mode dégradé)", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: null,
    time_known: false,
    place: "Lyon, France"
  });

  const chart = computeNatalChart(profile);

  assert.deepEqual(chart.houses, []);
  assert.equal(chart.angles.ascendant, null);
});


test("computeNatalChart lève une erreur typée si le lieu n'est pas résolu", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lieu inexistant"
  });

  assert.throws(
    () => computeNatalChart(profile),
    (err) => err.type === "CALCULATION_IMPOSSIBLE"
  );
});


test("validation : une date impossible ou mal formée est rejetée", () => {
  assert.throws(
    () => buildProfile({
      role: "primary",
      first_name: "Test",
      date: "1990-99-99",
      time: "14:35",
      time_known: true,
      place: "Lyon, France"
    })
  );
});


test("validation : une mise à jour de profil est validée avant sauvegarde", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lyon, France"
  });

  assert.ok(profile.profile_id);
  assert.ok(profile.updated_at);
});


test("mise à jour : changer le lieu sans coordonnées utilise bien le nouveau lieu", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lyon, France"
  });

  assert.equal(profile.birth_data.place.resolved.resolution_status, "resolved");
});


test("computeNatalChart expose le provider réel et le système de maisons demandé", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lyon, France"
  });

  const chart = computeNatalChart(profile);

  assert.equal(chart.calculation.provider, "astronomy-engine");
  assert.equal(chart.calculation.status, "production_candidate");
  assert.equal(chart.calculation.requested_house_system, "whole_sign");
  assert.equal(chart.calculation.used_house_system, "whole_sign");
  assert.equal(chart.calculation.astrologically_valid, true);
});


test("mise à jour : une seule coordonnée manuelle est fusionnée avec l'autre coordonnée existante", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lyon, France"
  });

  assert.ok(profile.birth_data.place.resolved.latitude != null);
  assert.ok(profile.birth_data.place.resolved.longitude != null);
});


test("normalisation : date et heure sont stockées sans espaces parasites", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: " 1990-04-12 ",
    time: " 14:35 ",
    time_known: true,
    place: "Lyon, France"
  });

  assert.equal(profile.birth_data.date, "1990-04-12");
  assert.equal(profile.birth_data.time.value, "14:35");
});


test("ephemeris capabilities déclarent le provider réel", () => {
  const capabilities = getEphemerisCapabilities();

  assert.equal(capabilities.provider, "astronomy-engine");
  assert.equal(capabilities.production_ready, true);
  assert.equal(capabilities.real_astronomical_positions, true);

  assert.deepEqual(
    capabilities.supported_house_systems,
    ["whole_sign", "equal", "porphyry", "placidus"]
  );
});


test("production guard accepte le provider réel", () => {
  assert.doesNotThrow(
    () => assertProductionEphemeris(getEphemerisCapabilities())
  );
});


test("production guard refuse explicitement un provider simulé", () => {
  assert.throws(
    () => assertProductionEphemeris({
      provider: "simulated",
      production_ready: false,
      real_astronomical_positions: false
    }),
    (err) => err.type === "EPHEMERIS_NOT_PRODUCTION_READY"
  );
});


test("timezone locale -> UTC est déterministe pour Europe/Paris", () => {
  const profile = buildProfile({
    role: "primary",
    first_name: "Test",
    date: "1990-04-12",
    time: "14:35",
    time_known: true,
    place: "Lyon, France"
  });

  assert.ok(profile.birth_data.place.resolved.timezone_id);
});


test("timezone invalide est refusé", () => {
  assert.throws(
    () => buildProfile({
      role: "primary",
      first_name: "Test",
      date: "1990-04-12",
      time: "14:35",
      time_known: true,
      place: {
        query: "Test",
        resolved: {
          resolution_status: "resolved",
          latitude: 45.75,
          longitude: 4.85,
          timezone_id: "Timezone/Invalide"
        }
      }
    })
  );
});
