import fs from "node:fs/promises";
import { engineCapabilities } from "../js/engine.js";
import { computeAstronomyEngineEphemeris } from "../js/astrology/ephemeris/astronomy_engine_provider.js";
import { localBirthToUtc } from "../js/astrology/ephemeris/timezone.js";

const cap = engineCapabilities();
if (cap.provider !== "astronomy-engine") throw new Error(`Provider incorrect: ${cap.provider}`);
if (cap.license_profile !== "MIT") throw new Error("Licence astronomique non-MIT");
if (!cap.real_astronomical_positions) throw new Error("Provider réel non actif");

const input = {
  date: "2000-01-01",
  time: { known: true, value: "13:00" },
  place: { resolved: {
    resolution_status: "resolved", latitude: 48.8566, longitude: 2.3522,
    timezone_id: "Europe/Paris"
  }}
};

const chart = computeAstronomyEngineEphemeris(input, { house_system: "placidus" });
if (chart.points.length !== 10) throw new Error(`Nombre de corps incorrect: ${chart.points.length}`);
for (const point of chart.points) {
  if (!Number.isFinite(point.absolute_degree) || point.absolute_degree < 0 || point.absolute_degree >= 360) {
    throw new Error(`Longitude invalide pour ${point.body}`);
  }
  if (!Number.isFinite(point.latitude) || !Number.isFinite(point.distance_au)) {
    throw new Error(`Coordonnées invalides pour ${point.body}`);
  }
}
if (chart.houses.length !== 12) throw new Error("Placidus n'a pas produit 12 cuspides");
if (!chart.angles.ascendant || !chart.angles.midheaven) throw new Error("Angles absents");

const fixture = JSON.parse(await fs.readFile(new URL("../tests/fixtures/house_reference.json", import.meta.url), "utf8"));
const ref = fixture.cases.find((c) => c.id === "paris_2000");
const circularDiff = (a, b) => Math.abs(((a - b + 180) % 360) - 180);
if (circularDiff(chart.angles.ascendant.absolute_degree, ref.ascendant) > 0.05) throw new Error("Ascendant hors tolérance de référence");
if (circularDiff(chart.angles.midheaven.absolute_degree, ref.midheaven) > 0.05) throw new Error("MC hors tolérance de référence");
for (let i = 0; i < 12; i++) {
  if (circularDiff(chart.houses[i].cusp_degree, ref.placidus_cusps[i]) > 0.05) throw new Error(`Cuspide ${i + 1} hors tolérance de référence`);
}

if (localBirthToUtc("2026-01-15", "12:00", "Europe/Paris").toISOString() !== "2026-01-15T11:00:00.000Z") throw new Error("DST hiver incorrect");
if (localBirthToUtc("2026-07-15", "12:00", "Europe/Paris").toISOString() !== "2026-07-15T10:00:00.000Z") throw new Error("DST été incorrect");

console.log("ASTROMATCH PRODUCTION CHECK: OK");
console.log(JSON.stringify({
  provider: cap.provider,
  engine_version: cap.engine_version,
  bodies: chart.points.length,
  houses: chart.houses.length,
  house_system: chart.calculation_meta.house_system_effective,
  utc: chart.calculation_meta.utc
}, null, 2));
