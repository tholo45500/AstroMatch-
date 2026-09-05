import fs from "node:fs";
import { computeScore } from "./js/scoring/scoring_engine.js";

const v10 = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1.json", "utf8")
);

const v11 = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1_1.json", "utf8")
);

const v11b = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1_1_b.json", "utf8")
);

function aspect(bodyA, bodyB, type, orb = 0, strength = 1) {
  return {
    aspect_id: `${bodyA}_${bodyB}_${type}_${orb}_${strength}`,
    body_a: { owner: "primary", body: bodyA },
    body_b: { owner: "target", body: bodyB },
    aspect_type: type,
    exact_angle: 0,
    actual_angle: orb,
    orb,
    orb_max: 8,
    orb_strength: strength,
    polarity: "neutral"
  };
}

function synastry(aspects = []) {
  return {
    synastry_id: "TEST42",
    primary_chart_id: "A",
    target_chart_id: "B",
    computed_at: new Date().toISOString(),
    reliability: {
      degraded_mode: false,
      reason: null
    },
    aspects,
    house_overlays: [],
    angle_contacts: []
  };
}

function score(label, s, config) {
  const r = computeScore(s, config);

  console.log(`\n=== ${label} ===`);
  console.log("global_score:", r.global_score);

  for (const [domain, data] of Object.entries(r.domain_scores)) {
    console.log(
      `${domain}: score=${data.score} ` +
      `positive=${data.raw_positive} ` +
      `negative=${data.raw_negative} ` +
      `contributions=${data.contributions?.length ?? 0}`
    );
  }

  return r;
}

function contribution(result, ruleId) {
  for (const data of Object.values(result.domain_scores)) {
    const found = (data.contributions || []).find(
      c => c.rule_id === ruleId
    );
    if (found) return found;
  }
  return null;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`ASSERT FAIL: ${message}`);
  }
  console.log(`PASS — ${message}`);
}

function reverseSynastry(s) {
  return {
    ...s,
    primary_chart_id: "B",
    target_chart_id: "A",
    aspects: s.aspects.map(a => ({
      ...a,
      body_a: {
        owner: a.body_a.owner === "primary"
          ? "target"
          : "primary",
        body: a.body_a.body
      },
      body_b: {
        owner: a.body_b.owner === "primary"
          ? "target"
          : "primary",
        body: a.body_b.body
      }
    }))
  };
}

console.log("========================================");
console.log("=== TEST 42 — ASTROMATCH SCORING ===");
console.log("========================================");

/* =========================================================
   42.1 — V1.0 seul
   ========================================================= */

const basePositive = synastry([
  aspect("venus", "jupiter", "conjunction")
]);

const r10 = score(
  "42.1 — V1.0 seul",
  basePositive,
  v10
);

/* =========================================================
   42.2 — V1.1 primaire seul
   ========================================================= */

const r11 = score(
  "42.2 — V1.1 primaire seul",
  basePositive,
  v11
);

/* =========================================================
   42.3 — V1.1 + risque Mars/Saturne
   ========================================================= */

const positivePlusRisk = synastry([
  aspect("venus", "jupiter", "conjunction"),
  aspect("mars", "saturn", "opposition")
]);

const rRisk = score(
  "42.3 — V1.1 + risque",
  positivePlusRisk,
  v11
);

/* =========================================================
   42.4 — TENSION sans risque explicite
   ========================================================= */

const tension = synastry([
  aspect("venus", "mars", "square"),
  aspect("mercury", "moon", "square")
]);

const rTension = score(
  "42.4 — TENSION sans risque",
  tension,
  v11
);

/* =========================================================
   42.5 — MIXED + risque
   ========================================================= */

const mixed = synastry([
  aspect("venus", "jupiter", "conjunction"),
  aspect("venus", "mars", "square"),
  aspect("mars", "saturn", "opposition"),
  aspect("mercury", "venus", "conjunction")
]);

const rMixed = score(
  "42.5 — MIXED + risque",
  mixed,
  v11
);

/* =========================================================
   42.6 — Plusieurs aspects simultanés
   ========================================================= */

const multi = synastry([
  aspect("sun", "moon", "conjunction"),
  aspect("sun", "venus", "conjunction"),
  aspect("moon", "venus", "trine"),
  aspect("mercury", "moon", "trine"),
  aspect("venus", "mars", "trine"),
  aspect("sun", "jupiter", "trine"),
  aspect("jupiter", "saturn", "trine")
]);

const rMulti = score(
  "42.6 — MULTI",
  multi,
  v11
);

/* =========================================================
   42.7 — Jupiter dominant / V1.1-B
   ========================================================= */

const jupiterDominant = synastry([
  aspect("venus", "jupiter", "conjunction"),
  aspect("venus", "jupiter", "trine"),
  aspect("sun", "jupiter", "trine"),
  aspect("moon", "jupiter", "trine"),
  aspect("jupiter", "saturn", "trine"),
  aspect("jupiter", "uranus", "trine"),
  aspect("jupiter", "neptune", "trine"),
  aspect("jupiter", "pluto", "trine")
]);

const rJupiter = score(
  "42.7 — JUPITER dominant / V1.1-B",
  jupiterDominant,
  v11b
);

/* =========================================================
   42.8 — Saturation
   =========================================================
   Probe volontairement synthétique :
   on répète le même aspect pour vérifier que la
   transformation exponentielle borne le score.
   ========================================================= */

const saturation = [];

for (let i = 0; i < 30; i++) {
  saturation.push(
    aspect("venus", "jupiter", "conjunction")
  );
}

const rSaturation = score(
  "42.8 — SATURATION synthétique",
  synastry(saturation),
  v11
);

assert(
  rSaturation.global_score >= 0 &&
  rSaturation.global_score <= 100,
  "La saturation reste bornée entre 0 et 100"
);

/* =========================================================
   42.9 — Symétrie A/B
   ========================================================= */

const rA = computeScore(mixed, v11);
const rB = computeScore(reverseSynastry(mixed), v11);

console.log("\n=== 42.9 — SYMÉTRIE A/B ===");
console.log("A =", rA.global_score);
console.log("B =", rB.global_score);
console.log(
  "delta =",
  Math.abs(rA.global_score - rB.global_score)
);

assert(
  Math.abs(rA.global_score - rB.global_score) < 1e-12,
  "Le scoring sans overlays est symétrique A/B"
);

/* =========================================================
   42.10 — Comparaison V1.0 / V1.1
   ========================================================= */

console.log("\n=== 42.10 — V1.0 vs V1.1 ===");
console.log("V1.0 global =", r10.global_score);
console.log("V1.1 global =", r11.global_score);

const v10Contribution = contribution(
  r10,
  "AMOUR_VENUS_CONJ_JUPITER"
);

const v11Contribution = contribution(
  r11,
  "V11_VENUS_JUPITER_CONJ"
);

console.log(
  "V1.0 contribution Venus/Jupiter =",
  v10Contribution?.final_points ?? "absente"
);

console.log(
  "V1.1 contribution Venus/Jupiter =",
  v11Contribution?.final_points ?? "absente"
);

/* =========================================================
   42.11 — INVARIANT RISQUE
   ========================================================= */

const positiveOnly = computeScore(
  synastry([
    aspect("venus", "jupiter", "conjunction")
  ]),
  v11
);

const positiveWithRisk = computeScore(
  synastry([
    aspect("venus", "jupiter", "conjunction"),
    aspect("mars", "saturn", "opposition")
  ]),
  v11
);

const positiveOnlyContribution = contribution(
  positiveOnly,
  "V11_VENUS_JUPITER_CONJ"
);

const positiveWithRiskContribution = contribution(
  positiveWithRisk,
  "V11_VENUS_JUPITER_CONJ"
);

console.log("\n=== 42.11 — INVARIANT RISQUE ===");

console.log(
  "Positive seule =",
  positiveOnlyContribution?.final_points
);

console.log(
  "Positive + risque =",
  positiveWithRiskContribution?.final_points
);

console.log(
  "Global positif seul =",
  positiveOnly.global_score
);

console.log(
  "Global positif + risque =",
  positiveWithRisk.global_score
);

assert(
  positiveOnlyContribution !== null,
  "La contribution positive existe sans risque"
);

assert(
  positiveWithRiskContribution !== null,
  "La contribution positive reste présente avec le risque"
);

assert(
  Math.abs(
    positiveOnlyContribution.final_points -
    positiveWithRiskContribution.final_points
  ) < 1e-12,
  "Le risque n'efface pas artificiellement la contribution positive"
);

assert(
  positiveWithRisk.global_score <= positiveOnly.global_score,
  "Le risque peut diminuer le global sans supprimer la contribution positive"
);

/* =========================================================
   42.12 — V1.1-B cohérence
   ========================================================= */

assert(
  Number.isFinite(rJupiter.global_score),
  "V1.1-B produit un global fini"
);

console.log("\n========================================");
console.log("=== TEST 42 — TOUS LES TESTS TERMINÉS ===");
console.log("========================================");
