import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";
import { angularDistance } from "../js/utils/math.js";

const cfgA = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1_1.json",
    "utf8"
  )
);

const cfgB = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1_1_b.json",
    "utf8"
  )
);

const N = 10000;

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

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function makeChart() {
  return Object.fromEntries(
    bodies.map(body => [body, rand(0, 360)])
  );
}

function makeAspects(a, b) {
  const aspects = [];

  for (const bodyA of bodies) {
    for (const bodyB of bodies) {
      const d = angularDistance(a[bodyA], b[bodyB]);

      for (const [type, exact, orbMax] of aspectDefs) {
        const orb = Math.abs(d - exact);

        if (orb <= orbMax) {
          const orbStrength =
            0.5 *
            (
              1 +
              Math.cos(
                Math.PI * orb / orbMax
              )
            );

          aspects.push({
            aspect_id:
              `aspect-${bodyA}-${bodyB}-${type}-${aspects.length}`,

            body_a: {
              owner: "primary",
              body: bodyA
            },

            body_b: {
              owner: "target",
              body: bodyB
            },

            aspect_type: type,
            actual_angle: d,
            orb,
            orb_max: orbMax,
            orb_strength: orbStrength
          });

          break;
        }
      }
    }
  }

  return aspects;
}

function makeSynastry() {
  const a = makeChart();
  const b = makeChart();

  return {
    synastry_id: `stress-${Math.random()}`,

    reliability: {
      degraded_mode: false
    },

    aspects: makeAspects(a, b),

    house_overlays: []
  };
}

function mean(arr) {
  return arr.reduce((a,b) => a+b,0) / arr.length;
}

function percentile(arr, p) {
  const s = [...arr].sort((a,b) => a-b);
  const i = Math.floor((s.length - 1) * p);
  return s[i];
}

function pearson(x, y) {
  const mx = mean(x);
  const my = mean(y);

  let num = 0;
  let dx = 0;
  let dy = 0;

  for (let i = 0; i < x.length; i++) {
    const a = x[i] - mx;
    const b = y[i] - my;

    num += a * b;
    dx += a * a;
    dy += b * b;
  }

  return num / Math.sqrt(dx * dy);
}

function ranks(arr) {
  const indexed = arr.map((v,i) => [v,i]);

  indexed.sort((a,b) => a[0] - b[0]);

  const r = Array(arr.length);

  for (let i = 0; i < indexed.length; i++) {
    r[indexed[i][1]] = i + 1;
  }

  return r;
}

function spearman(x, y) {
  return pearson(ranks(x), ranks(y));
}

function topOverlap(a, b, fraction) {
  const n = Math.floor(a.length * fraction);

  const ia = [...a.keys()]
    .sort((i,j) => a[j] - a[i])
    .slice(0,n);

  const ib = new Set(
    [...b.keys()]
      .sort((i,j) => b[j] - b[i])
      .slice(0,n)
  );

  return (
    ia.filter(i => ib.has(i)).length / n
  ) * 100;
}

console.log("=== ASTROMATCH · RÉGRESSION PHYSIQUE V1.1 / V1.1-B ===");
console.log("");
console.log("V1.1    :", cfgA.version, cfgA.rules.length, "règles");
console.log("V1.1-B  :", cfgB.version, cfgB.rules.length, "règles");
console.log("Fingerprint B : 2999c95e");
console.log("Synastries :", N);
console.log("");

const scoresA = [];
const scoresB = [];

let errors = 0;
let totalAspects = 0;

for (let i = 0; i < N; i++) {
  try {
    const syn = makeSynastry();

    totalAspects += syn.aspects.length;

    const a = computeScore(syn, cfgA);
    const b = computeScore(syn, cfgB);

    if (
      !Number.isFinite(a.global_score) ||
      !Number.isFinite(b.global_score)
    ) {
      throw new Error("Global score non fini");
    }

    scoresA.push(a.global_score);
    scoresB.push(b.global_score);

  } catch (error) {
    errors++;
  }
}

const deltas = scoresB.map(
  (v,i) => v - scoresA[i]
);

const absDeltas = deltas.map(Math.abs);

console.log("Erreurs :", errors);
console.log(
  "Aspects moyens :",
  (totalAspects / N).toFixed(2)
);
console.log("");

console.log("GLOBAL V1.1:");
console.log(
  "min=",
  Math.min(...scoresA).toFixed(2),
  "p05=",
  percentile(scoresA,.05).toFixed(2),
  "med=",
  percentile(scoresA,.50).toFixed(2),
  "mean=",
  mean(scoresA).toFixed(2),
  "p95=",
  percentile(scoresA,.95).toFixed(2),
  "max=",
  Math.max(...scoresA).toFixed(2)
);

console.log("");

console.log("GLOBAL V1.1-B:");
console.log(
  "min=",
  Math.min(...scoresB).toFixed(2),
  "p05=",
  percentile(scoresB,.05).toFixed(2),
  "med=",
  percentile(scoresB,.50).toFixed(2),
  "mean=",
  mean(scoresB).toFixed(2),
  "p95=",
  percentile(scoresB,.95).toFixed(2),
  "max=",
  Math.max(...scoresB).toFixed(2)
);

console.log("");

console.log("CORRÉLATION:");
console.log(
  "Pearson  :",
  pearson(scoresA,scoresB).toFixed(5)
);

console.log(
  "Spearman :",
  spearman(scoresA,scoresB).toFixed(5)
);

console.log("");

console.log("DELTA V1.1-B - V1.1:");
console.log(
  "moyen         :",
  mean(deltas).toFixed(2)
);

console.log(
  "absolu moyen  :",
  mean(absDeltas).toFixed(2)
);

console.log(
  "|delta| > 5   :",
  (
    absDeltas.filter(x => x > 5).length /
    N * 100
  ).toFixed(2) + "%"
);

console.log(
  "|delta| > 10  :",
  (
    absDeltas.filter(x => x > 10).length /
    N * 100
  ).toFixed(2) + "%"
);

console.log(
  "delta min/max :",
  Math.min(...deltas).toFixed(2),
  "/",
  Math.max(...deltas).toFixed(2)
);

console.log("");

console.log("TOP OVERLAP:");
console.log(
  "Top 1%  :",
  topOverlap(scoresA,scoresB,.01).toFixed(2) + "%"
);

console.log(
  "Top 5%  :",
  topOverlap(scoresA,scoresB,.05).toFixed(2) + "%"
);

console.log(
  "Top 10% :",
  topOverlap(scoresA,scoresB,.10).toFixed(2) + "%"
);

console.log("");

console.log("RÉSULTAT :",
  errors === 0
    ? "RÉGRESSION PHYSIQUE OK"
    : `ÉCHEC — ${errors} erreurs`
);

if (errors !== 0) {
  process.exit(1);
}
