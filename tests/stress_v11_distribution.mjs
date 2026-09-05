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

const aspects = [
  "conjunction",
  "sextile",
  "square",
  "trine",
  "opposition"
];

const angles = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  opposition: 180
};

const orbMax = {
  conjunction: 8,
  sextile: 4,
  square: 6,
  trine: 7,
  opposition: 7
};

function randomAspect(i) {
  const a = bodies[Math.floor(Math.random() * bodies.length)];
  let b = bodies[Math.floor(Math.random() * bodies.length)];

  while (b === a) {
    b = bodies[Math.floor(Math.random() * bodies.length)];
  }

  const type =
    aspects[Math.floor(Math.random() * aspects.length)];

  const max = orbMax[type];

  /*
   * Distribution uniforme de l'orb.
   * Cela permet de tester l'ensemble de la courbe
   * d'atténuation et pas seulement les aspects exacts.
   */
  const orb = Math.random() * max;

  const strength =
    0.5 *
    (1 + Math.cos(Math.PI * orb / max));

  return {
    aspect_id: `stress-${i}`,
    body_a: {
      owner: "primary",
      body: a
    },
    body_b: {
      owner: "target",
      body: b
    },
    aspect_type: type,
    exact_angle: angles[type],
    actual_angle: angles[type] + orb,
    orb,
    orb_max: max,
    orb_strength: strength,
    polarity:
      ["square", "opposition"].includes(type)
        ? "tense"
        : "harmonious"
  };
}

function makeSynastry(i) {

  /*
   * Entre 5 et 20 aspects par synastrie.
   * Cela reste volontairement synthétique.
   */
  const count =
    5 + Math.floor(Math.random() * 16);

  const generated = [];

  for (let j = 0; j < count; j++) {
    generated.push(
      randomAspect(`${i}-${j}`)
    );
  }

  return {
    synastry_id: `stress-${i}`,
    reliability: {
      degraded_mode: false
    },
    aspects: generated,
    house_overlays: []
  };
}

const N = 10000;

const globals = [];
const domains = {
  love: [],
  emotions: [],
  communication: [],
  passion: [],
  daily: [],
  projects: [],
  frictions: []
};

let errors = 0;

for (let i = 0; i < N; i++) {

  try {

    const result = computeScore(
      makeSynastry(i),
      {
        ...v10,
        version: "v1.1-stress-candidate",
        rules
      }
    );

    globals.push(result.global_score);

    for (const d of result.domain_scores) {
      if (domains[d.domain]) {
        domains[d.domain].push(d.score);
      }
    }

  } catch (error) {
    errors++;
  }
}

function stats(values) {

  values.sort((a,b) => a-b);

  const n = values.length;

  const sum =
    values.reduce((a,b) => a+b, 0);

  const mean = sum / n;

  const median =
    n % 2
      ? values[(n-1)/2]
      : (values[n/2-1] + values[n/2]) / 2;

  function pct(p) {
    return values[
      Math.min(
        n-1,
        Math.floor(n * p)
      )
    ];
  }

  return {
    min: values[0],
    p05: pct(0.05),
    p25: pct(0.25),
    median,
    mean,
    p75: pct(0.75),
    p95: pct(0.95),
    max: values[n-1]
  };
}

function printStats(label, values) {

  const s = stats(values);

  console.log(
    `${label.padEnd(14)} ` +
    `min=${s.min.toFixed(2)} ` +
    `p05=${s.p05.toFixed(2)} ` +
    `p25=${s.p25.toFixed(2)} ` +
    `med=${s.median.toFixed(2)} ` +
    `mean=${s.mean.toFixed(2)} ` +
    `p75=${s.p75.toFixed(2)} ` +
    `p95=${s.p95.toFixed(2)} ` +
    `max=${s.max.toFixed(2)}`
  );
}

function bucket(values) {

  const b = {
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

  for (const x of values) {

    if (x < 20) b["<20"]++;
    else if (x < 30) b["20-30"]++;
    else if (x < 40) b["30-40"]++;
    else if (x < 50) b["40-50"]++;
    else if (x < 60) b["50-60"]++;
    else if (x < 70) b["60-70"]++;
    else if (x < 80) b["70-80"]++;
    else if (x < 90) b["80-90"]++;
    else b["90+"]++;
  }

  return b;
}

console.log(
  "\n=== ASTROMATCH · STRESS TEST V1.1 ===\n"
);

console.log(`Synastries testées : ${N}`);
console.log(`Erreurs            : ${errors}\n`);

console.log("── GLOBAL ──");

printStats("GLOBAL", globals);

console.log("\n── DOMAINES ──");

for (const [name, values] of Object.entries(domains)) {
  printStats(name, values);
}

console.log("\n── DISTRIBUTION GLOBAL ──");

const buckets = bucket(globals);

for (const [range, count] of Object.entries(buckets)) {

  const pct = count / N * 100;

  console.log(
    `${range.padEnd(6)} ` +
    `${String(count).padStart(5)} ` +
    `(${pct.toFixed(2)}%)`
  );
}

console.log("\n=== FIN ===\n");
