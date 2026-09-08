// tests/daily/transit_engine.test.js

import test from "node:test";
import assert from "node:assert/strict";

import { buildProfile } from "../../js/profiles/profile_service.js";
import { computeNatalChart } from "../../js/astrology/natal_chart_engine.js";
import {
  computeDailySky,
  computeDailyTransits,
  DAILY_ASPECT_DEFINITIONS,
  DAILY_REFERENCE_TIME
} from "../../js/daily/transit_engine.js";

function makeProfile({ timeKnown = true } = {}) {
  return buildProfile({
    role: "primary",
    first_name: "Anthony",
    last_name: "",
    date: "1990-04-12",
    time: timeKnown ? "14:35" : "",
    time_known: timeKnown,
    place: "Lyon, France",
    house_system: "placidus"
  });
}

test("daily sky utilise Astronomy Engine réel et 10 corps", () => {
  const profile = makeProfile();
  const sky = computeDailySky(profile, "2026-09-08");

  assert.equal(sky.provider, "astronomy-engine");
  assert.equal(sky.real_astronomical_positions, true);
  assert.equal(sky.reference_time_local, DAILY_REFERENCE_TIME);
  assert.equal(sky.timezone_id, "Europe/Paris");
  assert.equal(sky.points.length, 10);

  const bodies = sky.points.map(p => p.body);
  assert.deepEqual(
    bodies,
    [
      "sun", "moon", "mercury", "venus", "mars",
      "jupiter", "saturn", "uranus", "neptune", "pluto"
    ]
  );
});

test("daily sky du 8 septembre 2026 place le Soleil en Vierge", () => {
  const profile = makeProfile();
  const sky = computeDailySky(profile, "2026-09-08");
  const sun = sky.points.find(p => p.body === "sun");

  assert.ok(sun);
  assert.equal(sun.sign, "virgo");
  assert.ok(sun.degree_in_sign > 15 && sun.degree_in_sign < 16.5);
});

test("daily transits est déterministe pour un même thème et une même date", () => {
  const profile = makeProfile();
  const natal = computeNatalChart(profile);

  const a = computeDailyTransits(profile, natal, "2026-09-08");
  const b = computeDailyTransits(profile, natal, "2026-09-08");

  assert.deepEqual(a.sky.points, b.sky.points);
  assert.deepEqual(a.transits, b.transits);
  assert.deepEqual(a.house_transits, b.house_transits);
  assert.deepEqual(a.angle_transits, b.angle_transits);
});

test("tous les aspects quotidiens respectent leur orbe maximal", () => {
  const profile = makeProfile();
  const natal = computeNatalChart(profile);
  const daily = computeDailyTransits(profile, natal, "2026-09-08");

  assert.ok(daily.transits.length > 0);

  for (const aspect of daily.transits) {
    assert.ok(aspect.orb <= aspect.orb_max);

    const definition = DAILY_ASPECT_DEFINITIONS.find(
      def => def.type === aspect.aspect_type
    );

    assert.ok(definition);
    assert.equal(aspect.orb_max, definition.orb_max);
    assert.ok(aspect.orb_strength >= 0 && aspect.orb_strength <= 1);
  }
});

test("heure natale connue -> maisons quotidiennes disponibles", () => {
  const profile = makeProfile();
  const natal = computeNatalChart(profile);
  const daily = computeDailyTransits(profile, natal, "2026-09-08");

  assert.equal(daily.reliability.natal_time_known, true);
  assert.equal(daily.reliability.houses_available, true);
  assert.equal(daily.house_transits.length, 10);

  for (const item of daily.house_transits) {
    assert.ok(item.house_number >= 1 && item.house_number <= 12);
  }
});

test("heure natale inconnue -> aucune maison ni aspect aux angles inventé", () => {
  const profile = makeProfile({ timeKnown: false });
  const natal = computeNatalChart(profile);
  const daily = computeDailyTransits(profile, natal, "2026-09-08");

  assert.equal(daily.reliability.natal_time_known, false);
  assert.equal(daily.reliability.houses_available, false);
  assert.equal(daily.reliability.angles_available, false);
  assert.deepEqual(daily.house_transits, []);
  assert.deepEqual(daily.angle_transits, []);
  assert.ok(daily.transits.length > 0);
});

test("date quotidienne invalide est refusée", () => {
  const profile = makeProfile();

  assert.throws(
    () => computeDailySky(profile, "2026-02-30"),
    error => error?.type === "DAILY_DATE_INVALID"
  );
});
