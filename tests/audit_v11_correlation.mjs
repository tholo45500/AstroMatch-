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

function buildConfig(scale) {
  return {
    ...v10,
    version: `v1.1-scale-${scale}`,
    rules: [
      ...v10.rules,

      ...additions.map(rule => {
        const r = makeRule(rule);
        r.base_points *= scale;
        return r;
      }),

      ...frictionRules.map(rule => {
        const r = makeRule(rule);
        r.base_points *= scale;
        return r;
      })
    ]
  };
}

const configs = {
  v10: v10,
  v11_50: buildConfig(0.50),
  v11_60: buildConfig(0.60),
  v11_70: buildConfig(0.70)
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
    const orb = Math.abs(distance-exact);

    if (orb <= maxOrb) {
      if (!best || orb < best.orb) {
        best = { type, exact, maxOrb, orb };
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
          `corr-${index}-${aspectIndex++}`,

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
    synastry_id: `corr-${index}`,

    reliability: {
      degraded_mode: false,
      quality: "full"
    },

    aspects,

    house_overlays: [],
    angle_contacts: []
  };
}

const N = 10000;

const values = {
  v10: [],
  v11_50: [],
  v11_60: [],
  v11_70: []
};

let errors = 0;

for (let i = 0; i < N; i++) {
  const synastry = makeSynastry(i);

  try {
    for (const [name, config] of Object.entries(configs)) {
      const result = computeScore(
        synastry,
        config
      );

      values[name].push(result.global_score);
    }
  } catch {
    errors++;
  }
}

function stats(arr) {
  const sorted = [...arr].sort((a,b) => a-b);

  const mean =
    arr.reduce((a,b) => a+b,0) / arr.length;

  const percentile = p =>
    sorted[Math.floor(
      (sorted.length - 1) * p
    )];

  return {
    min: sorted[0],
    p05: percentile(.05),
    median: percentile(.50),
    mean,
    p95: percentile(.95),
    max: sorted.at(-1)
  };
}

function correlation(a,b) {
  const n = a.length;

  const ma =
    a.reduce((s,x) => s+x,0) / n;

  const mb =
    b.reduce((s,x) => s+x,0) / n;

  let num = 0;
  let da = 0;
  let db = 0;

  for (let i = 0; i < n; i++) {
    const xa = a[i] - ma;
    const xb = b[i] - mb;

    num += xa * xb;
    da += xa * xa;
    db += xb * xb;
  }

  return num / Math.sqrt(da * db);
}

function compare(base, candidate) {
  const diffs =
    candidate.map((x,i) => x - base[i]);

  const abs =
    diffs.map(Math.abs);

  return {
    meanDelta:
      diffs.reduce((a,b) => a+b,0) /
      diffs.length,

    meanAbsDelta:
      abs.reduce((a,b) => a+b,0) /
      abs.length,

    maxAbsDelta:
      Math.max(...abs),

    over5:
      abs.filter(x => x > 5).length,

    over10:
      abs.filter(x => x > 10).length
  };
}

console.log("=== ASTROMATCH · CORRÉLATION V1.0 / V1.1 ===");
console.log("");
console.log("Synastries :", N);
console.log("Erreurs    :", errors);
console.log("");

for (const name of Object.keys(values)) {
  const s = stats(values[name]);

  console.log(
    name.padEnd(8),
    `min=${s.min.toFixed(2)}`,
    `p05=${s.p05.toFixed(2)}`,
    `med=${s.median.toFixed(2)}`,
    `mean=${s.mean.toFixed(2)}`,
    `p95=${s.p95.toFixed(2)}`,
    `max=${s.max.toFixed(2)}`
  );
}

console.log("");

for (const name of ["v11_50","v11_60","v11_70"]) {
  const c = correlation(
    values.v10,
    values[name]
  );

  const d = compare(
    values.v10,
    values[name]
  );

  console.log(`── ${name} ──`);
  console.log(
    "corrélation      :",
    c.toFixed(5)
  );
  console.log(
    "delta moyen      :",
    d.meanDelta.toFixed(2)
  );
  console.log(
    "delta absolu moy.:",
    d.meanAbsDelta.toFixed(2)
  );
  console.log(
    "|delta| > 5      :",
    d.over5,
    `(${(d.over5/N*100).toFixed(2)}%)`
  );
  console.log(
    "|delta| > 10     :",
    d.over10,
    `(${(d.over10/N*100).toFixed(2)}%)`
  );
  console.log(
    "delta max        :",
    d.maxAbsDelta.toFixed(2)
  );
  console.log("");
}

console.log("=== FIN ===");
