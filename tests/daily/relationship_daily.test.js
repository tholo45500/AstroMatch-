import test from "node:test";
import assert from "node:assert/strict";

import {
  buildRelationshipDailyClimate
} from "../../js/daily/relationship_daily.js";

const daily = score => ({
  date: "2026-09-19",
  reliability: {
    real_astronomical_positions: true
  },
  interpretation: {
    domains: {
      heart: { score },
      communication: { score },
      energy: { score }
    },
    why_today: [
      {
        label: "Mercure trigone Mercure",
        text: "Les échanges sont soutenus.",
        impact: "supportive",
        domain: "communication",
        transiting_body: "mercury",
        natal_body: "mercury",
        aspect_type: "trine",
        value: 5
      }
    ]
  }
});

const matchResult = {
  domains: [
    { domain: "love", score: 70 },
    { domain: "emotions", score: 65 },
    { domain: "communication", score: 75 },
    { domain: "passion", score: 60 },
    { domain: "daily", score: 55 },
    { domain: "projects", score: 80 }
  ]
};

test(
  "le climat relationnel est déterministe",
  () => {
    const input = {
      primaryDaily: daily(60),
      targetDaily: daily(70),
      matchResult,
      mode: "love",
      primaryName: "A",
      targetName: "B"
    };

    assert.deepEqual(
      buildRelationshipDailyClimate(input),
      buildRelationshipDailyClimate(input)
    );
  }
);

test(
  "le contexte professionnel possède ses propres axes",
  () => {
    const result =
      buildRelationshipDailyClimate({
        primaryDaily: daily(60),
        targetDaily: daily(70),
        matchResult,
        mode: "professional"
      });

    assert.deepEqual(
      result.axes.map(x => x.label),
      [
        "Climat d'équipe",
        "Communication",
        "Coordination"
      ]
    );
  }
);

test(
  "une activation commune est détectée",
  () => {
    const result =
      buildRelationshipDailyClimate({
        primaryDaily: daily(60),
        targetDaily: daily(70),
        matchResult,
        mode: "friendship"
      });

    assert.ok(
      result.shared_activations
        .includes("mercury")
    );
  }
);
