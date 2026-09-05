import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const v10 = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1.json",
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
  rule_id,
  domain,
  planet_a,
  aspect_type,
  planet_b,
  base_points,
  orb_max,
  overlay_house
]) {
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

const config = {
  ...v10,
  version: "v1.1-impact-audit",
  rules: [
    ...v10.rules,
    ...additions.map(makeRule),
    ...frictionRules.map(makeRule)
  ]
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

      const orb_strength =
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
          `impact-${index}-${aspectIndex++}`,

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
        orb_strength,

        polarity:
          ["square","opposition"].includes(
            detected.type
          )
            ? "tense"
            : "harmonious"
      });
    }
  }

  return {
    synastry_id: `impact-${index}`,

    reliability: {
      degraded_mode: false,
      quality: "full"
    },

    aspects,

    house_overlays: [],
    angle_contacts: []
  };
}

const stats = new Map();

for (const rule of config.rules) {
  stats.set(rule.rule_id, {
    hits: 0,
    totalFinal: 0,
    totalAbs: 0,
    min: Infinity,
    max: -Infinity
  });
}

const N = 10000;

let errors = 0;

for (let i = 0; i < N; i++) {
  try {
    const result = computeScore(
      makeSynastry(i),
      config
    );

    for (const domain of result.domain_scores) {
      for (const contribution of domain.contributions) {
        const id = contribution.rule_id;

        if (!stats.has(id)) continue;

        const s = stats.get(id);
        const value = contribution.final_points;

        s.hits++;
        s.totalFinal += value;
        s.totalAbs += Math.abs(value);
        s.min = Math.min(s.min, value);
        s.max = Math.max(s.max, value);
      }
    }

  } catch (error) {
    errors++;
  }
}

const rows = [...stats.entries()]
  .map(([rule_id, s]) => ({
    rule_id,
    hits: s.hits,
    hitRate: s.hits / N * 100,
    avgFinal: s.hits ? s.totalFinal / s.hits : 0,
    totalFinal: s.totalFinal,
    avgAbs: s.hits ? s.totalAbs / s.hits : 0,
    min: s.min === Infinity ? 0 : s.min,
    max: s.max === -Infinity ? 0 : s.max
  }))
  .sort((a,b) =>
    Math.abs(b.totalFinal) - Math.abs(a.totalFinal)
  );

console.log("=== ASTROMATCH · IMPACT V1.1 ===");
console.log("");
console.log("Synastries :", N);
console.log("Erreurs    :", errors);
console.log("");

console.log(
  "RÈGLE".padEnd(40),
  "HITS".padStart(6),
  "RATE".padStart(8),
  "AVG".padStart(10),
  "TOTAL".padStart(12)
);

console.log("-".repeat(80));

for (const r of rows) {
  console.log(
    r.rule_id.padEnd(40),
    String(r.hits).padStart(6),
    `${r.hitRate.toFixed(2)}%`.padStart(8),
    r.avgFinal.toFixed(2).padStart(10),
    r.totalFinal.toFixed(2).padStart(12)
  );
}

console.log("");
console.log("── IMPACT MOYEN ABSOLU ──");

const byAvgAbs = [...rows]
  .sort((a,b) => b.avgAbs - a.avgAbs);

for (const r of byAvgAbs) {
  console.log(
    r.rule_id.padEnd(40),
    r.avgAbs.toFixed(2)
  );
}

console.log("");
console.log("=== FIN ===");
