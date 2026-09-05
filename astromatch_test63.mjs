import assert from "node:assert/strict";
import { computeAstronomyEngineEphemeris } from "./js/astrology/ephemeris/astronomy_engine_provider.js";
import { computeScore } from "./js/scoring/scoring_engine.js";
import cfg from "./js/scoring/config/weighting_v1_2.json" with { type: "json" };

console.log("==================================================");
console.log("TEST 63 — RECONSTRUCTION COMPLÈTE DU SCORE RÉEL");
console.log("==================================================");

const A = {
  date: "1975-01-15",
  time: { known: true, value: "06:40" },
  place: {
    resolved: {
      resolution_status: "resolved",
      latitude: 48.8566,
      longitude: 2.3522,
      timezone: "Europe/Paris",
      timezone_id: "Europe/Paris"
    }
  }
};

const B = {
  date: "1985-07-22",
  time: { known: true, value: "18:25" },
  place: {
    resolved: {
      resolution_status: "resolved",
      latitude: 40.4168,
      longitude: -3.7038,
      timezone: "Europe/Madrid",
      timezone_id: "Europe/Madrid"
    }
  }
};

function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

function approx(actual, expected, tolerance = 0.02, label = "") {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label} actual=${actual} expected=${expected} delta=${Math.abs(actual - expected)}`
  );
}

function getRule(ruleId) {
  const rule = cfg.rules.find(r => r.rule_id === ruleId);
  assert.ok(rule, `Règle absente : ${ruleId}`);
  return rule;
}

function makeSynastry(chartA, chartB) {
  const a = chartA.points ?? [];
  const b = chartB.points ?? [];

  const aspects = [];

  /*
   * Reprise volontaire de la structure attendue par le scoring.
   * On utilise ici les aspects déjà produits par le provider si
   * disponibles dans les cartes ; sinon on construit les aspects
   * géométriques directement.
   */

  for (const pa of a) {
    for (const pb of b) {
      let delta = Math.abs(pa.absolute_degree - pb.absolute_degree);
      if (delta > 180) delta = 360 - delta;

      const candidates = [
        { type: "conjunction", angle: 0 },
        { type: "opposition", angle: 180 },
        { type: "trine", angle: 120 },
        { type: "square", angle: 90 },
        { type: "sextile", angle: 60 }
      ];

      for (const c of candidates) {
        const orb = Math.abs(delta - c.angle);

        if (orb <= 8) {
          aspects.push({
            aspect_id:
              `T63_${pa.body}_${pb.body}_${c.type}`,
            body_a: {
              owner: "primary",
              body: pa.body
            },
            body_b: {
              owner: "target",
              body: pb.body
            },
            aspect_type: c.type,
            exact_angle: c.angle,
            actual_angle: delta,
            orb,
            orb_max: 8,
            orb_strength: Math.max(0, 1 - orb / 8),
            polarity: "neutral"
          });

          break;
        }
      }
    }
  }

  return {
    synastry_id: "TEST63_REAL_AB",
    primary_chart_id: "A",
    target_chart_id: "B",
    computed_at: "2026-01-01T00:00:00.000Z",
    reliability: {
      degraded_mode: false,
      reason: null
    },
    aspects,
    house_overlays: [],
    angle_contacts: []
  };
}

let pass = 0;
let fail = 0;

function ok(name, fn) {
  try {
    fn();
    console.log(`PASS :: ${name}`);
    pass++;
  } catch (err) {
    console.log(`FAIL :: ${name} :: ${err.message}`);
    fail++;
  }
}

console.log("Calcul des cartes réelles...");

const chartA = computeAstronomyEngineEphemeris(A);
const chartB = computeAstronomyEngineEphemeris(B);

console.log(`A points : ${chartA.points.length}`);
console.log(`B points : ${chartB.points.length}`);

ok("carte A complète", () => {
  assert.equal(chartA.points.length, 10);
});

ok("carte B complète", () => {
  assert.equal(chartB.points.length, 10);
});

const syn = makeSynastry(chartA, chartB);

console.log(`Aspects synthétisés : ${syn.aspects.length}`);

ok("synastrie réelle non vide", () => {
  assert.ok(syn.aspects.length > 0);
});

const score = computeScore(syn, cfg);

console.log("");
console.log("Score réel produit par le moteur :");
console.log("-----------------------------------");
console.log("Global :", score.global_score);

for (const d of score.domain_scores) {
  console.log(
    `${d.domain.padEnd(14)} score=${d.score} +${d.raw_positive} -${d.raw_negative} contributions=${d.contributions.length}`
  );
}

/* ==================================================
   1. RECONSTRUCTION DES CONTRIBUTIONS
================================================== */

ok("toutes les contributions sont reconstructibles", () => {
  for (const d of score.domain_scores) {
    for (const c of d.contributions) {
      const rule = getRule(c.rule_id);

      assert.equal(c.base_points, rule.base_points);
      assert.equal(c.aspect_type, rule.aspect_type);

      const expectedPlanetWeight =
        (
          cfg.planet_weights[c.planet_a] +
          cfg.planet_weights[c.planet_b]
        ) / 2;

      approx(
        c.planet_weight,
        expectedPlanetWeight,
        0.0001,
        `planet_weight ${c.rule_id}`
      );

      const expectedFinal =
        Number(
          (
            rule.base_points *
            c.orb_strength *
            c.planet_weight *
            c.house_weight
          ).toFixed(2)
        );

      approx(
        c.final_points,
        expectedFinal,
        0.01,
        `final_points ${c.rule_id}`
      );
    }
  }
});

/* ==================================================
   2. RECONSTRUCTION RAW POSITIVE / NEGATIVE
================================================== */

ok("raw_positive reconstructible domaine par domaine", () => {
  for (const d of score.domain_scores) {
    let expected = 0;

    for (const c of d.contributions) {
      if (c.doctrine_polarity === "MIXED_TENSION_REVIEW") {
        expected += Math.abs(c.final_points) * 0.35;
      } else if (c.final_points >= 0) {
        expected += c.final_points;
      }
    }

    approx(
      d.raw_positive,
      expected,
      0.02,
      `raw_positive ${d.domain}`
    );
  }
});

ok("raw_negative reconstructible domaine par domaine", () => {
  for (const d of score.domain_scores) {
    let expected = 0;

    for (const c of d.contributions) {
      if (c.doctrine_polarity === "MIXED_TENSION_REVIEW") {
        expected += Math.abs(c.final_points) * 0.65;
      } else if (c.final_points < 0) {
        expected += Math.abs(c.final_points);
      }
    }

    approx(
      d.raw_negative,
      expected,
      0.02,
      `raw_negative ${d.domain}`
    );
  }
});

/* ==================================================
   3. RECONSTRUCTION SATURATION
================================================== */

ok("saturation reconstructible pour chaque domaine", () => {
  const K = cfg.k_saturation;

  for (const d of score.domain_scores) {
    const sPos =
      50 * (
        1 -
        Math.exp(-d.raw_positive / K)
      );

    const sNeg =
      50 * (
        1 -
        Math.exp(-d.raw_negative / K)
      );

    const expected =
      d.domain === "frictions"
        ? clamp(
            sPos * 1.6 -
            sNeg * 0.4,
            0,
            100
          )
        : clamp(
            50 +
            sPos -
            sNeg,
            0,
            100
          );

    approx(
      d.score,
      Number(expected.toFixed(2)),
      0.02,
      `score domaine ${d.domain}`
    );
  }
});

/* ==================================================
   4. RECONSTRUCTION DU GLOBAL
================================================== */

ok("score global reconstructible", () => {
  const weights = {
    love: 0.25,
    emotions: 0.20,
    communication: 0.20,
    passion: 0.15,
    daily: 0.10,
    projects: 0.10,
    frictions: -0.20
  };

  let expectedGlobal = 0;

  for (const d of score.domain_scores) {
    expectedGlobal +=
      (weights[d.domain] ?? 0) *
      d.score;
  }

  expectedGlobal =
    Number(
      clamp(
        expectedGlobal,
        0,
        100
      ).toFixed(2)
    );

  approx(
    score.global_score,
    expectedGlobal,
    0.02,
    "global_score"
  );
});

/* ==================================================
   5. COHÉRENCE COMPLÈTE
================================================== */

ok("chaque aspect matché possède une contribution valide", () => {
  for (const d of score.domain_scores) {
    for (const c of d.contributions) {
      assert.ok(c.rule_id);
      assert.ok(c.aspect_id);
      assert.ok(c.domain);
      assert.ok(c.aspect_type);

      assert.ok(Number.isFinite(c.orb));
      assert.ok(Number.isFinite(c.orb_strength));
      assert.ok(Number.isFinite(c.planet_weight));
      assert.ok(Number.isFinite(c.house_weight));
      assert.ok(Number.isFinite(c.final_points));
    }
  }
});

ok("score global borné", () => {
  assert.ok(
    score.global_score >= 0 &&
    score.global_score <= 100
  );
});

ok("tous les scores domaines bornés", () => {
  for (const d of score.domain_scores) {
    assert.ok(d.score >= 0 && d.score <= 100);
  }
});

/* ==================================================
   6. DÉTERMINISME NUMÉRIQUE
================================================== */

const syn2 = makeSynastry(chartA, chartB);

const score2 =
  computeScore(syn2, cfg);

function numericSnapshot(s) {
  return {
    global_score: s.global_score,
    domains: s.domain_scores.map(d => ({
      domain: d.domain,
      score: d.score,
      raw_positive: d.raw_positive,
      raw_negative: d.raw_negative,
      contributions: d.contributions.map(c => ({
        rule_id: c.rule_id,
        aspect_id: c.aspect_id,
        final_points: c.final_points,
        planet_weight: c.planet_weight,
        house_weight: c.house_weight,
        orb_strength: c.orb_strength,
        doctrine_polarity: c.doctrine_polarity
      }))
    }))
  };
}

ok("déterminisme numérique réel", () => {
  assert.deepEqual(
    numericSnapshot(score),
    numericSnapshot(score2)
  );
});

/* ==================================================
   7. TRACE FINALE
================================================== */

const totalContributions =
  score.domain_scores.reduce(
    (sum, d) => sum + d.contributions.length,
    0
  );

console.log("");
console.log("==================================================");
console.log("RÉSULTAT TEST 63");
console.log("==================================================");
console.log(`Aspects : ${syn.aspects.length}`);
console.log(`Contributions : ${totalContributions}`);
console.log(`PASS : ${pass}`);
console.log(`FAIL : ${fail}`);
console.log("==================================================");

if (fail === 0) {
  console.log("TEST 63 FINAL — PASS COMPLET");
  console.log("Cartes réelles : OK");
  console.log("Synastrie réelle : OK");
  console.log("Contributions : OK");
  console.log("Raw + / - : OK");
  console.log("Saturation : OK");
  console.log("Domaines : OK");
  console.log("Global : OK");
  console.log("Déterminisme : OK");
} else {
  console.log("TEST 63 FINAL — ECHEC");
  process.exitCode = 1;
}
