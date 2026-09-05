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
  ["FRICTION_MERCURY_MOON_SQUARE","frictions","mercury","square","moon",10,6,1],
  ["FRICTION_VENUS_MARS_SQUARE","frictions","venus","square","mars",10,6,1]
];

function makeRule([
  rule_id,domain,planet_a,aspect_type,
  planet_b,base_points,orb_max,overlay_house
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
    house_bonus:0
  };
}

function buildConfig(excludeId=null) {
  return {
    ...v10,
    version:"v1.1-sensitivity",
    rules:[
      ...v10.rules,

      ...additions
        .filter(x=>x[0]!==excludeId)
        .map(x=>{
          const r=makeRule(x);
          r.base_points*=0.50;
          return r;
        }),

      ...frictionRules
        .filter(x=>x[0]!==excludeId)
        .map(x=>{
          const r=makeRule(x);
          r.base_points*=0.50;
          return r;
        })
    ]
  };
}

const configs={
  baseline:buildConfig()
};

for(const r of [...additions,...frictionRules]) {
  configs[r[0]]=buildConfig(r[0]);
}

const bodies=[
  "sun","moon","mercury","venus","mars",
  "jupiter","saturn","uranus","neptune","pluto"
];

const aspectDefs=[
  ["conjunction",0,8],
  ["sextile",60,4],
  ["square",90,6],
  ["trine",120,7],
  ["opposition",180,7]
];

function angularDistance(a,b) {
  const d=Math.abs(a-b);
  return Math.min(d,360-d);
}

function detectAspect(a,b) {
  const distance=angularDistance(a,b);
  let best=null;

  for(const [type,exact,maxOrb] of aspectDefs) {
    const orb=Math.abs(distance-exact);

    if(orb<=maxOrb) {
      if(!best || orb<best.orb) {
        best={type,exact,maxOrb,orb};
      }
    }
  }

  return best;
}

function makeSynastry(index) {
  const primary={};
  const target={};

  for(const body of bodies) {
    primary[body]=Math.random()*360;
    target[body]=Math.random()*360;
  }

  const aspects=[];
  let n=0;

  for(const a of bodies) {
    for(const b of bodies) {

      const x=detectAspect(
        primary[a],
        target[b]
      );

      if(!x) continue;

      const orb_strength=
        0.5*
        (
          1+
          Math.cos(
            Math.PI*x.orb/x.maxOrb
          )
        );

      aspects.push({
        aspect_id:`sens-${index}-${n++}`,

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
            ?"tense"
            :"harmonious"
      });
    }
  }

  return {
    synastry_id:`sens-${index}`,

    reliability:{
      degraded_mode:false,
      quality:"full"
    },

    aspects,
    house_overlays:[],
    angle_contacts:[]
  };
}

const N=10000;

const synastries=[];

for(let i=0;i<N;i++) {
  synastries.push(makeSynastry(i));
}

const results={};

let errors=0;

for(const [name,config] of Object.entries(configs)) {

  results[name]=[];

  for(const synastry of synastries) {

    try {
      results[name].push(
        computeScore(synastry,config).global_score
      );
    } catch {
      errors++;
      results[name].push(null);
    }
  }
}

function rank(arr) {

  const indexed=arr.map((score,index)=>({
    score,
    index
  }));

  indexed.sort((a,b)=>b.score-a.score);

  const ranks=new Array(arr.length);

  for(let i=0;i<indexed.length;i++) {
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

function meanAbsDelta(a,b) {

  let sum=0;

  for(let i=0;i<a.length;i++) {
    sum+=Math.abs(a[i]-b[i]);
  }

  return sum/a.length;
}

function maxDelta(a,b) {

  let m=0;

  for(let i=0;i<a.length;i++) {
    m=Math.max(m,Math.abs(a[i]-b[i]));
  }

  return m;
}

function meanDelta(a,b) {

  let sum=0;

  for(let i=0;i<a.length;i++) {
    sum+=b[i]-a[i];
  }

  return sum/a.length;
}

console.log("=== ASTROMATCH · SENSIBILITÉ DES RÈGLES V1.1 ===");
console.log("");
console.log("Synastries :",N);
console.log("Erreurs    :",errors);
console.log("");
console.log("Baseline = V1.1 à 50%");
console.log("");
console.log(
  "RÈGLE".padEnd(40),
  "ΔMOY".padStart(8),
  "ΔABS".padStart(8),
  "MAX".padStart(8),
  "SPEARMAN".padStart(10)
);
console.log("-".repeat(78));

const rows=[];

for(const r of [...additions,...frictionRules]) {

  const id=r[0];
  const candidate=results[id];

  const row={
    id,
    meanDelta:meanDelta(
      results.baseline,
      candidate
    ),
    meanAbs:meanAbsDelta(
      results.baseline,
      candidate
    ),
    max:maxDelta(
      results.baseline,
      candidate
    ),
    spearman:spearman(
      results.baseline,
      candidate
    )
  };

  rows.push(row);
}

rows.sort((a,b)=>b.meanAbs-a.meanAbs);

for(const r of rows) {

  console.log(
    r.id.padEnd(40),
    r.meanDelta.toFixed(2).padStart(8),
    r.meanAbs.toFixed(2).padStart(8),
    r.max.toFixed(2).padStart(8),
    r.spearman.toFixed(5).padStart(10)
  );
}

console.log("");
console.log("=== FIN ===");
