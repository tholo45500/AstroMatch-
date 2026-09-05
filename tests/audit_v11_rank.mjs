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
  rule_id, domain, planet_a, aspect_type,
  planet_b, base_points, orb_max, overlay_house
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
    version: `v1.1-rank-${scale}`,
    rules: [
      ...v10.rules,
      ...additions.map(x => {
        const r = makeRule(x);
        r.base_points *= scale;
        return r;
      }),
      ...frictionRules.map(x => {
        const r = makeRule(x);
        r.base_points *= scale;
        return r;
      })
    ]
  };
}

const configs = {
  v10,
  v11_50: buildConfig(.50),
  v11_60: buildConfig(.60),
  v11_70: buildConfig(.70)
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
        best = {type,exact,maxOrb,orb};
      }
    }
  }

  return best;
}

function makeSynastry(index) {
  const primary = {};
  const target = {};

  for (const body of bodies) {
    primary[body] = Math.random()*360;
    target[body] = Math.random()*360;
  }

  const aspects = [];
  let n = 0;

  for (const a of bodies) {
    for (const b of bodies) {
      const x = detectAspect(
        primary[a],
        target[b]
      );

      if (!x) continue;

      const orb_strength =
        0.5 *
        (
          1 +
          Math.cos(
            Math.PI*x.orb/x.maxOrb
          )
        );

      aspects.push({
        aspect_id:`rank-${index}-${n++}`,
        body_a:{
          owner:"primary",
          body:a
        },
        body_b:{
          owner:"target",
          body:b
        },
        aspect_type:x.type,
        exact_angle:x.exact,
        actual_angle:x.exact+x.orb,
        orb:x.orb,
        orb_max:x.maxOrb,
        orb_strength,
        polarity:
          ["square","opposition"].includes(x.type)
            ? "tense"
            : "harmonious"
      });
    }
  }

  return {
    synastry_id:`rank-${index}`,
    reliability:{
      degraded_mode:false,
      quality:"full"
    },
    aspects,
    house_overlays:[],
    angle_contacts:[]
  };
}

const N = 10000;

const scores = {
  v10:[],
  v11_50:[],
  v11_60:[],
  v11_70:[]
};

let errors = 0;

for (let i=0;i<N;i++) {
  const synastry = makeSynastry(i);

  try {
    for (const [name,config] of Object.entries(configs)) {
      scores[name].push(
        computeScore(synastry,config).global_score
      );
    }
  } catch {
    errors++;
  }
}

function rank(arr) {
  const indexed = arr.map((score,index)=>({
    score,
    index
  }));

  indexed.sort((a,b)=>b.score-a.score);

  const ranks = new Array(arr.length);

  for (let i=0;i<indexed.length;i++) {
    ranks[indexed[i].index]=i+1;
  }

  return ranks;
}

function spearman(a,b) {
  const ra=rank(a);
  const rb=rank(b);
  const n=a.length;

  let sum=0;

  for(let i=0;i<n;i++) {
    const d=ra[i]-rb[i];
    sum+=d*d;
  }

  return 1-(6*sum)/(n*(n*n-1));
}

function topOverlap(base,candidate,pct) {
  const n=Math.floor(base.length*pct);

  const baseSet=new Set(
    rank(base).map((r,i)=>({r,i}))
      .sort((a,b)=>a.r-b.r)
      .slice(0,n)
      .map(x=>x.i)
  );

  const candSet=new Set(
    rank(candidate).map((r,i)=>({r,i}))
      .sort((a,b)=>a.r-b.r)
      .slice(0,n)
      .map(x=>x.i)
  );

  let common=0;

  for(const i of baseSet) {
    if(candSet.has(i)) common++;
  }

  return common/n*100;
}

console.log("=== ASTROMATCH · RANK AUDIT V1.1 ===");
console.log("");
console.log("Synastries :",N);
console.log("Erreurs    :",errors);
console.log("");

for(const name of ["v11_50","v11_60","v11_70"]) {

  console.log(`── ${name} ──`);

  console.log(
    "Spearman        :",
    spearman(scores.v10,scores[name]).toFixed(5)
  );

  console.log(
    "Top 1% commun   :",
    topOverlap(scores.v10,scores[name],.01).toFixed(2)+"%"
  );

  console.log(
    "Top 5% commun   :",
    topOverlap(scores.v10,scores[name],.05).toFixed(2)+"%"
  );

  console.log(
    "Top 10% commun  :",
    topOverlap(scores.v10,scores[name],.10).toFixed(2)+"%"
  );

  console.log("");
}

console.log("=== FIN ===");
