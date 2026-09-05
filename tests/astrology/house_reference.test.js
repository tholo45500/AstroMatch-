import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { computeHouseCusps } from "../../js/astrology/ephemeris/astronomy_engine_provider.js";

const fixture = JSON.parse(await fs.readFile(new URL("../fixtures/house_reference.json", import.meta.url), "utf8"));
const circularDiff = (a, b) => Math.abs(((a - b + 180) % 360) - 180);

test("Placidus reste conforme aux fixtures numériques indépendantes", () => {
  for (const c of fixture.cases) {
    const got = computeHouseCusps("placidus", c.ascendant, c.midheaven, c.latitude, 23.439291111);
    assert.equal(got.length, 12, c.id);
    got.forEach((house, i) => {
      assert.ok(circularDiff(house.cusp_degree, c.placidus_cusps[i]) < 0.01, `${c.id} house ${i + 1}`);
    });
  }
});
