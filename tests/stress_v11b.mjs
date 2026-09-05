import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const baseConfig = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1_1.json",
    "utf8"
  )
);

const candidates = [
  ["V11B_JUPITER_URANUS_CONJ","projects","jupiter","conjunction","uranus",8,8],
  ["V11B_JUPITER_URANUS_TRINE","projects","jupiter","trine","uranus",7,7],
  ["V11B_JUPITER_URANUS_SQUARE","projects","jupiter","square","uranus",-6,6],

  ["V11B_JUPITER_NEPTUNE_CONJ","emotions","jupiter","conjunction","neptune",8,8],
  ["V11B_JUPITER_NEPTUNE_TRINE","emotions","jupiter","trine","neptune",7,7],
  ["V11B_JUPITER_NEPTUNE_SQUARE","emotions","jupiter","square","neptune",-5,6],

  ["V11B_JUPITER_PLUTO_CONJ","projects","jupiter","conjunction","pluto",9,8],
  ["V11B_JUPITER_PLUTO_TRINE","projects","jupiter","trine","pluto",7,7],
  ["V11B_JUPITER_PLUTO_SQUARE","projects","jupiter","square","pluto",-7,6],

  ["V11B_SATURN_URANUS_TRINE","projects","saturn","trine","uranus",6,7],
  ["V11B_SATURN_URANUS_SQUARE","projects","saturn","square","uranus",-7,6],

  ["V11B_SATURN_NEPTUNE_TRINE","projects","saturn","trine","neptune",6,7],
  ["V11B_SATURN_NEPTUNE_SQUARE","projects","saturn","square","neptune",-6,6],

  ["V11B_SATURN_PLUTO_TRINE","projects","saturn","trine","pluto",7,7],
  ["V11B_SATURN_PLUTO_SQUARE","projects","saturn","square","pluto",-8,6]
];

function randDeg() {
  return Math.random() * 360;
}

function angularDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function aspectFor(a, b, id) {
  const d = angularDistance(a.lon, b.lon);

  const defs = [
    ["conjunction", 0, 8],
    ["sextile", 60, 4],
    ["square", 90, 6],
    ["trine", 120, 7],
    ["opposition", 180, 7]
  ];

  let best = null;

  for (const [type, exact, orbMax] of defs) {
    const orb = Math.abs(d - exact);

    if (orb <= orbMax) {
      if (!best || orb < best.orb) {
        best = {
          type,
          exact,
          orbMax,
          orb
        };
      }
    }
  }

  if (!best) return null;

  return {
    aspect_id: id,
    body_a: {
      owner: "primary",
      body: a.name
    },
    body_b: {
      owner: "target",
      body: b.name
    },
    aspect_type: best.type,
    exact_angle: best.exact,
    actual_angle: d,
    orb: best.orb,
    orb_max: best.orbMax,
    orb_strength:
      0.5 *
      (
        1 +
        Math.cos(
          Math.PI *
          best.orb /
          best.orbMax
        )
      ),
    polarity:
      ["square", "opposition"].includes(best.type)
        ? "tense"
        : "harmonious"
  };
}

function makeSynastry(index) {
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

  const primary = bodies.map(name => ({
    name,
    lon: randDeg()
  }));

  const target = bodies.map(name => ({
    name,
    lon: randDeg()
  }));

  const aspects = [];

  for (const a of primary) {
    for (const b of target) {
      const aspect = aspectFor(
        a,
        b,
        `${index}-${a.name}-${b.name}`
      );

      if (aspect) {
        aspects.push(aspect);
      }
    }
  }

  return {
    synastry_id: `stress-${index}`,
    reliability: {
      degraded_mode: false,
      quality: "full"
    },
    aspects,
    house_overlays: [],
    angle_contacts: []
  };
}

function configWithCandidates() {
  return {
    ...baseConfig,
    version: "v1.1b-stress",
    rules: [
      ...baseConfig.rules,

      ...candidates.map(
        ([
          rule_id,
          domain,
          planet_a,
          aspect_type,
          planet_b,
          base_points,
          orb_max
        ]) => ({
          rule_id,
          domain,
          planet_a,
          aspect_type,
          planet_b,
          base_points,
          orb_max,
          overlay_house: 1,
          house_bonus: 0
        })
      )
    ]
  };
}

const config = configWithCandidates();

const N = 10000;

const globals = [];
const aspectCounts = [];

const hits = new Map();

for (const c of candidates) {
  hits.set(c[0], 0);
}

let errors = 0;
let totalRules = 0;

console.log("=== ASTROMATCH · STRESS V1.1-B ===");
console.log("");
console.log("Synastries :", N);
console.log("Base V1.1  :", baseConfig.rules.length);
console.log("V1.1-B     :", candidates.length);
console.log("Total      :", config.rules.length);
console.log("");

for (let i = 0; i < N; i++) {

  try {
    const syn = makeSynastry(i);

    const result =
      computeScore(syn, config);

    if (
      !Number.isFinite(
        result.global_score
      )
    ) {
      errors++;
      continue;
    }

    globals.push(
      result.global_score
    );

    aspectCounts.push(
      syn.aspects.length
    );

    const contributions =
      result.domain_scores.flatMap(
        d => d.contributions
      );

    totalRules += contributions.length;

    for (const c of contributions) {
      if (hits.has(c.rule_id)) {
        hits.set(
          c.rule_id,
          hits.get(c.rule_id) + 1
        );
      }
    }

  } catch {
    errors++;
  }
}

function percentile(values, p) {
  const a = [...values].sort(
    (x, y) => x - y
  );

  const index =
    (a.length - 1) * p;

  const lo = Math.floor(index);
  const hi = Math.ceil(index);

  if (lo === hi) return a[lo];

  return (
    a[lo] +
    (a[hi] - a[lo]) *
    (index - lo)
  );
}

function mean(values) {
  return (
    values.reduce(
      (a, b) => a + b,
      0
    ) / values.length
  );
}

console.log(
  "Erreurs           :",
  errors
);

console.log(
  "Aspects moyens    :",
  mean(aspectCounts).toFixed(2)
);

console.log(
  "Aspects p05/p95   :",
  percentile(aspectCounts, 0.05),
  "/",
  percentile(aspectCounts, 0.95)
);

console.log(
  "Contributions     :",
  totalRules
);

console.log("");

console.log("GLOBAL:");
console.log(
  "min=",
  Math.min(...globals).toFixed(2),
  "p05=",
  percentile(globals, 0.05).toFixed(2),
  "p25=",
  percentile(globals, 0.25).toFixed(2),
  "med=",
  percentile(globals, 0.50).toFixed(2),
  "mean=",
  mean(globals).toFixed(2),
  "p75=",
  percentile(globals, 0.75).toFixed(2),
  "p95=",
  percentile(globals, 0.95).toFixed(2),
  "max=",
  Math.max(...globals).toFixed(2)
);

console.log("");

console.log("HITS V1.1-B:");

for (const [
  rule,
  count
] of hits) {
  console.log(
    rule.padEnd(38),
    `${count} (${(100 * count / N).toFixed(2)}%)`
  );
}

console.log("");

console.log(
  "Règles B jamais déclenchées :",
  [...hits.entries()]
    .filter(([, count]) => count === 0)
    .map(([rule]) => rule)
    .join(", ") || "Aucune"
);

if (errors !== 0) {
  process.exit(1);
}
