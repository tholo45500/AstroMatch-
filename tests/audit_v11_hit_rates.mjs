import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const v10 = JSON.parse(
  fs.readFileSync(
    new URL("../js/scoring/config/weighting_v1.json", import.meta.url),
    "utf8"
  )
);

const additions = [
  ["V11_SUN_MOON_CONJ","emotions","sun","conjunction","moon",24,8,4],
  ["V11_SUN_MOON_TRINE","emotions","sun","trine","moon",16,7,4],
  ["V11_SUN_MOON_SQUARE","emotions","sun","square","moon",-12,6,4],

  ["V11_SUN_VENUS_CONJ","love","sun","conjunction","venus",24,8,7],
  ["V11_SUN_VENUS_SEXTILE","love","sun","sextile","venus",15,4,7],
  ["V11_SUN_VENUS_OPPOSITION","love","sun","opposition","venus",12,7,7],

  ["V11_MOON_VENUS_CONJ","love","moon","conjunction","venus",22,8,7],
  ["V11_MOON_VENUS_TRINE","love","moon","trine","venus",17,7,7],
  ["V11_MOON_VENUS_SQUARE","emotions","moon","square","venus",-10,6,4],

  ["V11_MERCURY_MOON_TRINE","communication","mercury","trine","moon",16,7,3],
  ["V11_MERCURY_MOON_SQUARE","communication","mercury","square","moon",-12,6,3],

  ["V11_MERCURY_VENUS_CONJ","communication","mercury","conjunction","venus",18,8,3],
  ["V11_MERCURY_VENUS_TRINE","communication","mercury","trine","venus",15,7,3],

  ["V11_MERCURY_MARS_TRINE","communication","mercury","trine","mars",14,7,3],

  ["V11_MOON_MARS_TRINE","passion","moon","trine","mars",15,7,8],
  ["V11_MOON_MARS_SQUARE","passion","moon","square","mars",-12,6,8],

  ["V11_VENUS_MARS_TRINE","passion","venus","trine","mars",22,7,8],
  ["V11_VENUS_MARS_SQUARE","passion","venus","square","mars",-14,6,8],

  ["V11_VENUS_JUPITER_CONJ","love","venus","conjunction","jupiter",20,8,7],
  ["V11_VENUS_JUPITER_TRINE","love","venus","trine","jupiter",17,7,7],

  ["V11_SUN_JUPITER_TRINE","projects","sun","trine","jupiter",18,7,10],
  ["V11_MOON_JUPITER_TRINE","emotions","moon","trine","jupiter",15,7,4],

  ["V11_JUPITER_SATURN_TRINE","projects","jupiter","trine","saturn",14,7,10]
];

const frictionRules = [
  ["FRICTION_MERCURY_MOON_SQUARE","frictions","mercury","square","moon",10,6,1],
  ["FRICTION_VENUS_MARS_SQUARE","frictions","venus","square","mars",10,6,1]
];

function makeRule([
  id, domain, bodyA, aspectType, bodyB,
  basePoints, orbMax, overlayHouse
]) {
  return {
    rule_id: id,
    domain,
    planet_a: bodyA,
    aspect_type: aspectType,
    planet_b: bodyB,
    base_points: basePoints,
    orb_max: orbMax,
    overlay_house: overlayHouse,
    house_bonus: 0
  };
}

const rules = [
  ...v10.rules,
  ...additions.map(makeRule),
  ...frictionRules.map(makeRule)
];

const config = {
  ...v10,
  version: "v1.1-hit-rate-audit",
  rules
};

const bodies = [
  "sun","moon","mercury","venus","mars",
  "jupiter","saturn","uranus","neptune","pluto"
];

const aspectDefs = [
  ["conjunction",0,8],
  ["sextile",60,4],
  ["square",90,6],
  ["trine",120,7],
  ["opposition",180,7]
];

function randomPosition() {
  return Math.random() * 360;
}

function angularDistance(a,b) {
  const d = Math.abs(a-b);
  return Math.min(d,360-d);
}

function detectAspect(a,b) {
  const distance = angularDistance(a,b);

  let best = null;

  for (const [type, exact, maxOrb] of aspectDefs) {
    const orb = Math.abs(distance - exact);

    if (orb <= maxOrb) {
      if (!best || orb < best.orb) {
        best = {
          type,
          exact,
          maxOrb,
          orb
        };
      }
    }
  }

  return best;
}

function makeSynastry(index) {
  const primary = {};
  const target = {};

  for (const body of bodies) {
    primary[body] = randomPosition();
    target[body] = randomPosition();
  }

  const aspects = [];
  let aspectIndex = 0;

  for (const a of bodies) {
    for (const b of bodies) {
      const detected = detectAspect(
        primary[a],
        target[b]
      );

      if (!detected) continue;

      const strength =
        0.5 *
        (
          1 +
          Math.cos(
            Math.PI *
            detected.orb /
            detected.maxOrb
          )
        );

      aspects.push({
        aspect_id:
          `audit-${index}-${aspectIndex++}`,

        body_a: {
          owner: "primary",
          body: a
        },

        body_b: {
          owner: "target",
          body: b
        },

        aspect_type: detected.type,

        exact_angle: detected.exact,

        actual_angle:
          detected.exact + detected.orb,

        orb: detected.orb,

        orb_max: detected.maxOrb,

        orb_strength: strength,

        polarity:
          ["square","opposition"]
            .includes(detected.type)
            ? "tense"
            : "harmonious"
      });
    }
  }

  return {
    synastry_id: `audit-${index}`,

    reliability: {
      degraded_mode: false,
      quality: "full"
    },

    aspects,

    house_overlays: [],

    angle_contacts: []
  };
}

const hitCounts = new Map();

for (const rule of rules) {
  hitCounts.set(rule.rule_id, 0);
}

const N = 10000;

let errors = 0;
let totalHits = 0;

for (let i = 0; i < N; i++) {
  try {
    const synastry = makeSynastry(i);

    const score = computeScore(
      synastry,
      config
    );

    if (!score || !Array.isArray(score.domain_scores)) {
      throw new Error(
        "computeScore: domain_scores absent"
      );
    }

    for (const domainScore of score.domain_scores) {
      if (!Array.isArray(domainScore.contributions)) {
        continue;
      }

      for (const contribution of domainScore.contributions) {
        const ruleId = contribution.rule_id;

        if (!ruleId || !hitCounts.has(ruleId)) {
          continue;
        }

        hitCounts.set(
          ruleId,
          hitCounts.get(ruleId) + 1
        );

        totalHits++;
      }
    }

  } catch (error) {
    errors++;

    if (errors <= 3) {
      console.log(
        "ERREUR EXEMPLE:",
        error?.message ?? error
      );
    }
  }
}

console.log("");
console.log("=== ASTROMATCH · HIT RATE V1.1 ===");
console.log("");
console.log("Synastries :", N);
console.log("Erreurs    :", errors);
console.log("Hits total :", totalHits);
console.log("");

console.log("── PAR RÈGLE ──");

const sorted = [...hitCounts.entries()]
  .sort((a,b) => b[1] - a[1]);

for (const [id, count] of sorted) {
  console.log(
    String(id).padEnd(40),
    String(count).padStart(5),
    `${(count / N * 100).toFixed(2)}%`
  );
}

console.log("");

console.log("── RÈGLES JAMAIS DÉCLENCHÉES ──");

const never = sorted.filter(
  ([, count]) => count === 0
);

if (never.length === 0) {
  console.log("Aucune");
} else {
  for (const [id] of never) {
    console.log(id);
  }
}

console.log("");
console.log("=== FIN ===");
