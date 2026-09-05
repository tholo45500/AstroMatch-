import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const v10 = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1.json", "utf8")
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
  ["FRICTION_MERCURY_MOON_SQUARE",
   "frictions","mercury","square","moon",10,6,1],

  ["FRICTION_VENUS_MARS_SQUARE",
   "frictions","venus","square","mars",10,6,1]
];

function makeRule(r) {
  const [
    rule_id,
    domain,
    planet_a,
    aspect_type,
    planet_b,
    base_points,
    orb_max,
    overlay_house
  ] = r;

  return {
    rule_id,
    domain,
    planet_a,
    aspect_type,
    planet_b,
    base_points,
    orb_max,
    overlay_house,
    house_bonus: 0
  };
}

const rules = [
  ...v10.rules,
  ...additions.map(makeRule),
  ...frictionRules.map(makeRule)
];

const bodies = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto"
];

const aspectDefs = [
  ["conjunction", 0, 8],
  ["sextile", 60, 4],
  ["square", 90, 6],
  ["trine", 120, 7],
  ["opposition", 180, 7]
];

/*
 * Génère 10 positions angulaires aléatoires
 * pour chacun des deux thèmes.
 *
 * On obtient ensuite les 45 distances réelles
 * entre planètes, puis on détecte les aspects
 * réellement présents selon les orbes.
 */

function randomPosition() {
  return Math.random() * 360;
}

function angularDistance(a, b) {
  const d = Math.abs(a - b);
  return Math.min(d, 360 - d);
}

function detectAspect(a, b) {

  const distance = angularDistance(a, b);

  let best = null;

  for (const [type, exact, maxOrb] of aspectDefs) {

    const direct = Math.abs(distance - exact);
    const oppositeEquivalent =
      Math.abs(distance - (360 - exact));

    const orb = Math.min(
      direct,
      oppositeEquivalent
    );

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

      const detected =
        detectAspect(
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
          `realistic-${index}-${aspectIndex++}`,

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
          detected.exact +
          detected.orb,

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
    synastry_id: `realistic-${index}`,

    reliability: {
      degraded_mode: false
    },

    aspects,

    house_overlays: []
  };
}

const N = 10000;

const globals = [];
const aspectCounts = [];
const ruleHits = [];

const buckets = {
  "<20": 0,
  "20-30": 0,
  "30-40": 0,
  "40-50": 0,
  "50-60": 0,
  "60-70": 0,
  "70-80": 0,
  "80-90": 0,
  "90+": 0
};

let errors = 0;
let totalAspects = 0;
let totalRuleHits = 0;

for (let i = 0; i < N; i++) {

  try {

    const synastry =
      makeSynastry(i);

    totalAspects +=
      synastry.aspects.length;

    aspectCounts.push(
      synastry.aspects.length
    );

    const result =
      computeScore(
        synastry,
        {
          ...v10,
          version:
            "v1.1-realistic-stress",
          rules
        }
      );

    globals.push(
      result.global_score
    );

    for (const d of result.domain_scores) {
      for (const c of d.contributions) {
        if (c.rule_id) {
          totalRuleHits++;
          ruleHits.push(c.rule_id);
        }
      }
    }

    const g =
      result.global_score;

    if (g < 20) buckets["<20"]++;
    else if (g < 30) buckets["20-30"]++;
    else if (g < 40) buckets["30-40"]++;
    else if (g < 50) buckets["40-50"]++;
    else if (g < 60) buckets["50-60"]++;
    else if (g < 70) buckets["60-70"]++;
    else if (g < 80) buckets["70-80"]++;
    else if (g < 90) buckets["80-90"]++;
    else buckets["90+"]++;

  } catch (error) {
    errors++;
  }
}

globals.sort((a,b) => a-b);
aspectCounts.sort((a,b) => a-b);

function percentile(values, p) {
  return values[
    Math.min(
      values.length - 1,
      Math.floor(values.length * p)
    )
  ];
}

function mean(values) {
  return (
    values.reduce((a,b) => a+b, 0)
    / values.length
  );
}

console.log(
  "\n=== ASTROMATCH · STRESS REALISTE V1.1 ===\n"
);

console.log(`Synastries       : ${N}`);
console.log(`Erreurs          : ${errors}`);

console.log(
  `Aspects moyens   : ${mean(aspectCounts).toFixed(2)}`
);

console.log(
  `Aspects p05/p95  : ` +
  `${percentile(aspectCounts,0.05)} / ` +
  `${percentile(aspectCounts,0.95)}`
);

console.log(
  `Règles déclenchées : ${totalRuleHits}`
);

console.log("\n── GLOBAL ──");

console.log(
  `min=${globals[0].toFixed(2)} ` +
  `p05=${percentile(globals,0.05).toFixed(2)} ` +
  `p25=${percentile(globals,0.25).toFixed(2)} ` +
  `med=${percentile(globals,0.50).toFixed(2)} ` +
  `mean=${mean(globals).toFixed(2)} ` +
  `p75=${percentile(globals,0.75).toFixed(2)} ` +
  `p95=${percentile(globals,0.95).toFixed(2)} ` +
  `max=${globals[globals.length-1].toFixed(2)}`
);

console.log("\n── DISTRIBUTION ──");

for (const [range, count] of Object.entries(buckets)) {

  console.log(
    `${range.padEnd(6)} ` +
    `${String(count).padStart(5)} ` +
    `(${(count/N*100).toFixed(2)}%)`
  );
}

console.log("\n=== FIN ===\n");
