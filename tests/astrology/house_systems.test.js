import test from "node:test";
import assert from "node:assert/strict";
import { computeHouseCusps } from "../../js/astrology/ephemeris/astronomy_engine_provider.js";

test("house systems: Equal produit 12 cuspides à 30° de l'Ascendant", () => {
  const h = computeHouseCusps("equal", 123.456, 210, 45, 23.44);
  assert.equal(h.length, 12);
  assert.equal(h[0].cusp_degree, 123.456);
  assert.equal(h[11].cusp_degree, 93.456);
});

test("house systems: Whole Sign démarre au 0° du signe de l'Ascendant", () => {
  const h = computeHouseCusps("whole_sign", 123.456, 210, 45, 23.44);
  assert.equal(h[0].cusp_degree, 120);
  assert.equal(h[9].cusp_degree, 30);
});

test("house systems: Porphyry conserve les quatre angles", () => {
  const asc = 123.456, mc = 210.789;
  const h = computeHouseCusps("porphyry", asc, mc, 45, 23.44);
  assert.equal(h.length, 12);
  assert.equal(h[0].cusp_degree, Number(asc.toFixed(6)));
  assert.equal(h[3].cusp_degree, Number(((mc + 180) % 360).toFixed(6)));
  assert.equal(h[6].cusp_degree, Number(((asc + 180) % 360).toFixed(6)));
  assert.equal(h[9].cusp_degree, Number(mc.toFixed(6)));
});

test("house systems: Placidus produit 12 cuspides dans un cas géométriquement valide", () => {
  const h = computeHouseCusps("placidus", 80, 170, 45, 23.44);
  assert.equal(h.length, 12);
  for (const cusp of h) assert.ok(cusp.cusp_degree >= 0 && cusp.cusp_degree < 360);
});

test("house systems: Porphyry est un système de profil officiellement accepté", async () => {
  const { buildProfile } = await import("../../js/profiles/profile_service.js");
  const p = buildProfile({ role: "target", first_name: "Test", date: "1990-01-01", time: "12:00", time_known: true, place: "Paris, France", house_system: "porphyry" });
  assert.equal(p.house_system, "porphyry");
});

test("timezone: DST été/hiver Europe/Paris est correctement converti", async () => {
  const { localBirthToUtc } = await import("../../js/astrology/ephemeris/timezone.js");
  assert.equal(localBirthToUtc("2026-01-15", "12:00", "Europe/Paris").toISOString(), "2026-01-15T11:00:00.000Z");
  assert.equal(localBirthToUtc("2026-07-15", "12:00", "Europe/Paris").toISOString(), "2026-07-15T10:00:00.000Z");
});

test("timezone: heure inexistante pendant le passage à l'heure d'été est refusée", async () => {
  const { localBirthToUtc } = await import("../../js/astrology/ephemeris/timezone.js");
  assert.throws(() => localBirthToUtc("2026-03-29", "02:30", "Europe/Paris"), /inexistante/);
});

test("timezone: heure ambiguë pendant le retour à l'heure d'hiver est refusée", async () => {
  const { localBirthToUtc } = await import("../../js/astrology/ephemeris/timezone.js");
  assert.throws(() => localBirthToUtc("2026-10-25", "02:30", "Europe/Paris"), /ambiguë/);
});
