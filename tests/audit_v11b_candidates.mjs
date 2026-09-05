import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const baseConfig = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1_1.json",
    "utf8"
  )
);

/*
 * V1.1-B — CANDIDATS TRANSPERSONNELS
 *
 * Aucun de ces candidats n'est encore dans le fichier physique.
 *
 * Format:
 * [rule_id, domain, planet_a, aspect, planet_b, base_points, orb_max]
 *
 * Les valeurs sont volontairement prudentes.
 */

const candidates = [
  // JUPITER ↔ URANUS
  ["V11B_JUPITER_URANUS_CONJ", "projects", "jupiter", "conjunction", "uranus", 8, 8],
  ["V11B_JUPITER_URANUS_TRINE", "projects", "jupiter", "trine", "uranus", 7, 7],
  ["V11B_JUPITER_URANUS_SQUARE", "projects", "jupiter", "square", "uranus", -6, 6],

  // JUPITER ↔ NEPTUNE
  ["V11B_JUPITER_NEPTUNE_CONJ", "emotions", "jupiter", "conjunction", "neptune", 8, 8],
  ["V11B_JUPITER_NEPTUNE_TRINE", "emotions", "jupiter", "trine", "neptune", 7, 7],
  ["V11B_JUPITER_NEPTUNE_SQUARE", "emotions", "jupiter", "square", "neptune", -5, 6],

  // JUPITER ↔ PLUTO
  ["V11B_JUPITER_PLUTO_CONJ", "projects", "jupiter", "conjunction", "pluto", 9, 8],
  ["V11B_JUPITER_PLUTO_TRINE", "projects", "jupiter", "trine", "pluto", 7, 7],
  ["V11B_JUPITER_PLUTO_SQUARE", "projects", "jupiter", "square", "pluto", -7, 6],

  // SATURNE ↔ URANUS
  ["V11B_SATURN_URANUS_TRINE", "projects", "saturn", "trine", "uranus", 6, 7],
  ["V11B_SATURN_URANUS_SQUARE", "projects", "saturn", "square", "uranus", -7, 6],

  // SATURNE ↔ NEPTUNE
  ["V11B_SATURN_NEPTUNE_TRINE", "projects", "saturn", "trine", "neptune", 6, 7],
  ["V11B_SATURN_NEPTUNE_SQUARE", "projects", "saturn", "square", "neptune", -6, 6],

  // SATURNE ↔ PLUTO
  ["V11B_SATURN_PLUTO_TRINE", "projects", "saturn", "trine", "pluto", 7, 7],
  ["V11B_SATURN_PLUTO_SQUARE", "projects", "saturn", "square", "pluto", -8, 6]
];

function makeAspect(id, a, b, type, exact, orb, orbMax) {
  return {
    aspect_id: id,
    body_a: {
      owner: "primary",
      body: a
    },
    body_b: {
      owner: "target",
      body: b
    },
    aspect_type: type,
    exact_angle: exact,
    actual_angle: exact + orb,
    orb,
    orb_max: orbMax,
    orb_strength:
      0.5 *
      (
        1 +
        Math.cos(
          Math.PI * orb / orbMax
        )
      ),
    polarity:
      ["square", "opposition"].includes(type)
        ? "tense"
        : "harmonious"
  };
}

function makeSynastry(id, aspect) {
  return {
    synastry_id: id,
    reliability: {
      degraded_mode: false,
      quality: "full"
    },
    aspects: [aspect],
    house_overlays: [],
    angle_contacts: []
  };
}

function configWithCandidate(candidate) {
  const [
    rule_id,
    domain,
    planet_a,
    aspect_type,
    planet_b,
    base_points,
    orb_max
  ] = candidate;

  return {
    ...baseConfig,
    version: "v1.1b-audit",
    rules: [
      ...baseConfig.rules,
      {
        rule_id,
        domain,
        planet_a,
        aspect_type,
        planet_b,
        base_points,
        orb_max,
        overlay_house: 1,
        house_bonus: 0
      }
    ]
  };
}

console.log("=== ASTROMATCH · AUDIT V1.1-B ===");
console.log("");
console.log("Base V1.1 rules :", baseConfig.rules.length);
console.log("Candidats       :", candidates.length);
console.log("");

let errors = 0;

for (const candidate of candidates) {
  const [
    rule_id,
    domain,
    planet_a,
    aspect_type,
    planet_b,
    base_points,
    orbMax
  ] = candidate;

  const exact =
    ["conjunction"].includes(aspect_type)
      ? 0
      : ["trine"].includes(aspect_type)
        ? 120
        : 90;

  const testConfig =
    configWithCandidate(candidate);

  const result = computeScore(
    makeSynastry(
      rule_id,
      makeAspect(
        rule_id,
        planet_a,
        planet_b,
        aspect_type,
        exact,
        0,
        orbMax
      )
    ),
    testConfig
  );

  const contributions =
    result.domain_scores.flatMap(
      d => d.contributions
    );

  const hit =
    contributions.find(
      c => c.rule_id === rule_id
    );

  const expectedImpact =
    base_points >= 0
      ? "positive"
      : "negative";

  const ok =
    !!hit &&
    hit.base_points === base_points &&
    hit.impact === expectedImpact &&
    Number.isFinite(hit.final_points) &&
    Number.isFinite(result.global_score);

  if (!ok) errors++;

  console.log(
    rule_id.padEnd(38),
    ok ? "PASS" : "FAIL",
    `base=${base_points}`,
    `final=${hit?.final_points ?? "NA"}`,
    `global=${result.global_score.toFixed(2)}`,
    `impact=${hit?.impact ?? "NA"}`
  );
}

console.log("");
console.log(
  "Résultat :",
  errors === 0
    ? "V1.1-B CANDIDATS OK"
    : `KO (${errors} erreurs)`
);

if (errors !== 0) {
  process.exit(1);
}
