import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const baseConfig = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1_1.json", "utf8")
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
  "sun","moon","mercury","venus","mars",
  "jupiter","saturn","uranus","neptune","pluto"
];

function randDeg() {
  return Math.random() * 360;
}

function angularDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function makeSynastry(index) {
  const primary = bodies.map(name => ({
    name,
    lon: randDeg()
  }));

  const target = bodies.map(name => ({
    name,
    lon: randDeg()
  }));

  const defs = [
    ["conjunction",0,8],
    ["sextile",60,4],
    ["square",90,6],
    ["trine",120,7],
    ["opposition",180,7]
  ];

  const aspects = [];

  for (const a of primary) {
    for (const b of target) {
      const d = angularDistance(a.lon,b.lon);

      let best = null;

      for (const [type,exact,orbMax] of defs) {
        const orb = Math.abs(d-exact);

        if (
          orb <= orbMax &&
          (!best || orb < best.orb)
        ) {
          best = {type,exact,orbMax,orb};
        }
      }

      if (!best) continue;

      aspects.push({
        aspect_id:`${index}-${a.name}-${b.name}`,
        body_a:{
          owner:"primary",
          body:a.name
        },
        body_b:{
          owner:"target",
          body:b.name
        },
        aspect_type:best.type,
        exact_angle:best.exact,
        actual_angle:d,
        orb:best.orb,
        orb_max:best.orbMax,
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
          ["square","opposition"].includes(best.type)
            ? "tense"
            : "harmonious"
      });
    }
  }

  return {
    synastry_id:`sensitivity-${index}`,
    reliability:{
      degraded_mode:false,
      quality:"full"
    },
    aspects,
    house_overlays:[],
    angle_contacts:[]
  };
}

function ruleObject(c) {
  return {
    rule_id:c[0],
    domain:c[1],
    planet_a:c[2],
    aspect_type:c[3],
    planet_b:c[4],
    base_points:c[5],
    orb_max:c[6],
    overlay_house:1,
    house_bonus:0
  };
}

function configWith(rule) {
  return {
    ...baseConfig,
    version:"v1.1b-sensitivity",
    rules:[
      ...baseConfig.rules,
      ruleObject(rule)
    ]
  };
}

function mean(a) {
  return a.reduce((x,y)=>x+y,0)/a.length;
}

function spearman(x,y) {
  function rank(v) {
    return [...v.keys()]
      .sort((a,b)=>v[a]-v[b])
      .reduce((r,i,n)=>(r[i]=n+1,r),[]);
  }

  const rx=rank(x);
  const ry=rank(y);

  const mx=mean(rx);
  const my=mean(ry);

  let num=0,dx=0,dy=0;

  for(let i=0;i<x.length;i++){
    const a=rx[i]-mx;
    const b=ry[i]-my;

    num+=a*b;
    dx+=a*a;
    dy+=b*b;
  }

  return num/Math.sqrt(dx*dy);
}

const N=10000;

const synastries=[];

for(let i=0;i<N;i++){
  synastries.push(makeSynastry(i));
}

const baseline=synastries.map(
  syn =>
    computeScore(
      syn,
      baseConfig
    ).global_score
);

console.log("=== ASTROMATCH · SENSIBILITÉ V1.1-B ===");
console.log("");
console.log("Synastries :",N);
console.log("");

const rows=[];

for(const candidate of candidates){

  const scores=[];
  let hits=0;

  const config=configWith(candidate);

  for(let i=0;i<N;i++){

    const result=computeScore(
      synastries[i],
      config
    );

    scores.push(result.global_score);

    const contributionCount =
      result.domain_scores
        .flatMap(d=>d.contributions)
        .filter(
          c=>c.rule_id===candidate[0]
        ).length;

    if(contributionCount>0){
      hits++;
    }
  }

  const deltas=scores.map(
    (x,i)=>x-baseline[i]
  );

  const abs=deltas.map(Math.abs);

  rows.push({
    rule:candidate[0],
    hits,
    hitRate:100*hits/N,
    delta:mean(deltas),
    abs:mean(abs),
    max:Math.max(...abs),
    spearman:spearman(baseline,scores)
  });
}

rows.sort(
  (a,b)=>b.abs-a.abs
);

console.log(
  "RÈGLE".padEnd(39),
  "HITS".padStart(6),
  "HIT%".padStart(7),
  "ΔMOY".padStart(8),
  "ΔABS".padStart(8),
  "MAX".padStart(8),
  "SPEAR".padStart(8)
);

for(const r of rows){
  console.log(
    r.rule.padEnd(39),
    String(r.hits).padStart(6),
    r.hitRate.toFixed(2).padStart(7),
    r.delta.toFixed(2).padStart(8),
    r.abs.toFixed(2).padStart(8),
    r.max.toFixed(2).padStart(8),
    r.spearman.toFixed(5).padStart(8)
  );
}

console.log("");
console.log("RÉSULTAT : SENSIBILITÉ CALCULÉE");
