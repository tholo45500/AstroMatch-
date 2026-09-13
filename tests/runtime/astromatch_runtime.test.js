import test from "node:test";
import assert from "node:assert/strict";

import {
  natal,
  match,
  daily
} from "../../js/runtime/astromatch_runtime.js";


const PRIMARY = {
  role: "primary",
  first_name: "Anthony",

  date: "1990-04-12",
  time: "14:35",
  time_known: true,

  place: "Lyon, France",
  latitude: 45.7640,
  longitude: 4.8357,
  timezone_id: "Europe/Paris"
};


const TARGET = {
  role: "target",
  first_name: "Julie",

  date: "1992-08-20",
  time: "10:20",
  time_known: true,

  place: "Toulouse, France",
  latitude: 43.6047,
  longitude: 1.4442,
  timezone_id: "Europe/Paris"
};


test("runtime natal", async () => {
  const payload =
    await natal({
      profile: PRIMARY
    });

  assert.equal(payload.ok, true);
  assert.equal(
    payload.result.chart.points.length,
    10
  );

  assert.ok(
    payload.result.chart.angles
  );
});


test("runtime match", async () => {
  const payload =
    await match({
      primary: PRIMARY,
      target: TARGET
    });

  assert.equal(payload.ok, true);

  assert.ok(
    payload.result.global.score >= 0 &&
    payload.result.global.score <= 100
  );

  assert.equal(
    payload.result.profiles.primary.name,
    "Anthony"
  );

  assert.equal(
    payload.result.profiles.target.name,
    "Julie"
  );
});


test("runtime daily", async () => {
  const payload =
    await daily({
      profile: PRIMARY,
      date: "2026-09-12"
    });

  assert.equal(payload.ok, true);
  assert.equal(
    payload.result.date,
    "2026-09-12"
  );

  assert.ok(
    Number.isFinite(
      payload.result.scores.heart.score
    )
  );
});
