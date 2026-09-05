import test from "node:test";
import assert from "node:assert/strict";

const REAL_INPUT = {
  date: "1990-04-12",
  time: { known: true, value: "14:35" },
  place: { resolved: {
    resolution_status: "resolved", latitude: 45.764, longitude: 4.8357,
    timezone_id: "Europe/Paris"
  }}
};

test("provider Astronomy Engine est déclaré sous politique MIT", async () => {
  const fs = await import("node:fs/promises");
  const manifest = JSON.parse(await fs.readFile(new URL("../../engine_manifest.json", import.meta.url), "utf8"));
  assert.equal(manifest.licensing_policy.astronomical_runtime_license, "MIT");
  assert.equal(manifest.licensing_policy.paid_astronomical_license_required, false);
  assert.equal(manifest.ephemeris.production_candidate, "astronomy-engine");
});

test("provider réel est importable quand astronomy-engine est installé", async (t) => {
  try {
    const mod = await import("../../js/astrology/ephemeris/astronomy_engine_provider.js");
    assert.equal(mod.PROVIDER, "astronomy-engine");
    assert.equal(typeof mod.computeAstronomyEngineEphemeris, "function");
    const result = mod.computeAstronomyEngineEphemeris(REAL_INPUT, { house_system: "whole_sign" });
    assert.equal(result.points.length, 10);
    for (const point of result.points) {
      assert.ok(Number.isFinite(point.absolute_degree));
      assert.ok(point.absolute_degree >= 0 && point.absolute_degree < 360);
      assert.ok(Number.isFinite(point.latitude));
      assert.ok(Number.isFinite(point.distance_au));
    }
    assert.equal(result.angles.ascendant !== null, true);
    assert.equal(result.houses.length, 12);
  } catch (err) {
    if (err?.code === "ERR_MODULE_NOT_FOUND" || err?.type === "EPHEMERIS_PROVIDER_UNAVAILABLE") {
      t.skip("astronomy-engine non installé dans l'environnement de test");
      return;
    }
    throw err;
  }
});
