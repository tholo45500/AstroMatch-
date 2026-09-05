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

function randDeg() {
  return Math.random() * 360;
}

function angularDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function makeAspect(id, a, b) {
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

    if (
      orb <= orbMax &&
      (!best || orb < best.orb)
    ) {
      best = {
        type,
        exact,
        orbMax,
        orb
      };
    }
  }

  if (!best) {
    return null;
  }

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
      ["square", "opposition"].includes(
        best.type
      )
        ? "tense"
        : "harmonious"
  };
}

function makeSynastry(index) {

  const primary =
    bodies.map(name => ({
      name,
      lon: randDeg()
    }));

  const target =
    bodies.map(name => ({
      name,
      lon: randDeg()
    }));

  const aspects = [];

  for (const a of primary) {
    for (const b of target) {

      const aspect =
        makeAspect(
          `${index}-${a.name}-${b.name}`,
          a,
          b
        );

      if (aspect) {
        aspects.push(aspect);
      }
    }
  }

  return {
    synastry_id: `compare-${index}`,

    reliability: {
      degraded_mode: false,
      quality: "full"
    },

    aspects,

    house_overlays: [],

    angle_contacts: []
  };
}

const v11bConfig = {
  ...baseConfig,

  version: "v1.1b-compare",

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

const N = 10000;

const v11 = [];
const v11b = [];

let errors = 0;

for (let i = 0; i < N; i++) {

  try {

    const syn =
      makeSynastry(i);

    const a =
      computeScore(
        syn,
        baseConfig
      );

    const b =
      computeScore(
        syn,
        v11bConfig
      );

    if (
      !Number.isFinite(a.global_score) ||
      !Number.isFinite(b.global_score)
    ) {
      errors++;
      continue;
    }

    v11.push(a.global_score);
    v11b.push(b.global_score);

  } catch {
    errors++;
  }
}

function mean(values) {
  return values.reduce(
    (a, b) => a + b,
    0
  ) / values.length;
}

function percentile(values, p) {

  const a =
    [...values].sort(
      (x, y) => x - y
    );

  const index =
    (a.length - 1) * p;

  const lo =
    Math.floor(index);

  const hi =
    Math.ceil(index);

  if (lo === hi) {
    return a[lo];
  }

  return (
    a[lo] +
    (a[hi] - a[lo]) *
    (index - lo)
  );
}

function pearson(x, y) {

  const mx = mean(x);
  const my = mean(y);

  let num = 0;
  let dx = 0;
  let dy = 0;

  for (let i = 0; i < x.length; i++) {

    const ax = x[i] - mx;
    const ay = y[i] - my;

    num += ax * ay;
    dx += ax * ax;
    dy += ay * ay;
  }

  return num / Math.sqrt(dx * dy);
}

function ranks(values) {

  const indexed =
    values.map(
      (value, index) => ({
        value,
        index
      })
    );

  indexed.sort(
    (a, b) =>
      a.value - b.value
  );

  const result =
    new Array(values.length);

  let i = 0;

  while (i < indexed.length) {

    let j = i + 1;

    while (
      j < indexed.length &&
      indexed[j].value ===
        indexed[i].value
    ) {
      j++;
    }

    const rank =
      (i + 1 + j) / 2;

    for (let k = i; k < j; k++) {
      result[indexed[k].index] =
        rank;
    }

    i = j;
  }

  return result;
}

function spearman(x, y) {
  return pearson(
    ranks(x),
    ranks(y)
  );
}

function topOverlap(x, y, fraction) {

  const n =
    Math.max(
      1,
      Math.floor(
        x.length * fraction
      )
    );

  const ix =
    [...x.keys()]
      .sort(
        (a, b) =>
          x[b] - x[a]
      )
      .slice(0, n);

  const iy =
    [...y.keys()]
      .sort(
        (a, b) =>
          y[b] - y[a]
      )
      .slice(0, n);

  const setY =
    new Set(iy);

  let common = 0;

  for (const i of ix) {

    if (setY.has(i)) {
      common++;
    }
  }

  return common / n * 100;
}

const deltas =
  v11b.map(
    (score, i) =>
      score - v11[i]
  );

const absDeltas =
  deltas.map(
    Math.abs
  );

console.log(
  "=== ASTROMATCH · V1.1 vs V1.1-B ==="
);

console.log("");

console.log(
  "Synastries :",
  N
);

console.log(
  "Erreurs    :",
  errors
);

console.log("");

console.log(
  "V1.1  mean=",
  mean(v11).toFixed(2),
  "med=",
  percentile(v11, .50).toFixed(2),
  "p05=",
  percentile(v11, .05).toFixed(2),
  "p95=",
  percentile(v11, .95).toFixed(2)
);

console.log(
  "V1.1-B mean=",
  mean(v11b).toFixed(2),
  "med=",
  percentile(v11b, .50).toFixed(2),
  "p05=",
  percentile(v11b, .05).toFixed(2),
  "p95=",
  percentile(v11b, .95).toFixed(2)
);

console.log("");

console.log(
  "CORRELATION Pearson :",
  pearson(v11, v11b).toFixed(5)
);

console.log(
  "CORRELATION Spearman:",
  spearman(v11, v11b).toFixed(5)
);

console.log("");

console.log(
  "Delta moyen         :",
  mean(deltas).toFixed(2)
);

console.log(
  "Delta absolu moyen  :",
  mean(absDeltas).toFixed(2)
);

console.log(
  "|delta| > 5         :",
  (
    100 *
    absDeltas.filter(
      x => x > 5
    ).length /
    N
  ).toFixed(2) + "%"
);

console.log(
  "|delta| > 10        :",
  (
    100 *
    absDeltas.filter(
      x => x > 10
    ).length /
    N
  ).toFixed(2) + "%"
);

console.log(
  "Delta min/max       :",
  Math.min(...deltas).toFixed(2),
  "/",
  Math.max(...deltas).toFixed(2)
);

console.log("");

console.log(
  "TOP 1% commun       :",
  topOverlap(v11, v11b, .01).toFixed(2) + "%"
);

console.log(
  "TOP 5% commun       :",
  topOverlap(v11, v11b, .05).toFixed(2) + "%"
);

console.log(
  "TOP 10% commun      :",
  topOverlap(v11, v11b, .10).toFixed(2) + "%"
);

console.log("");

console.log("DISTRIBUTION V1.1:");

console.log(
  "<40   :",
  v11.filter(x => x < 40).length
);

console.log(
  "40-50 :",
  v11.filter(
    x => x >= 40 && x < 50
  ).length
);

console.log(
  "50-60 :",
  v11.filter(
    x => x >= 50 && x < 60
  ).length
);

console.log(
  "60-70 :",
  v11.filter(
    x => x >= 60 && x < 70
  ).length
);

console.log(
  "70+   :",
  v11.filter(x => x >= 70).length
);

console.log("");

console.log("DISTRIBUTION V1.1-B:");

console.log(
  "<40   :",
  v11b.filter(x => x < 40).length
);

console.log(
  "40-50 :",
  v11b.filter(
    x => x >= 40 && x < 50
  ).length
);

console.log(
  "50-60 :",
  v11b.filter(
    x => x >= 50 && x < 60
  ).length
);

console.log(
  "60-70 :",
  v11b.filter(
    x => x >= 60 && x < 70
  ).length
);

console.log(
  "70+   :",
  v11b.filter(x => x >= 70).length
);

if (errors !== 0) {
  process.exit(1);
}
