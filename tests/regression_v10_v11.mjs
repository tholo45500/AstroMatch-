import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const v10 = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1.json",
    "utf8"
  )
);

const v11 = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1_1.json",
    "utf8"
  )
);

function aspect(id, a, b, type, exact, orb, orbMax) {
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

function syn(id, aspects) {
  return {
    synastry_id: id,

    reliability: {
      degraded_mode: false,
      quality: "full"
    },

    aspects,
    house_overlays: [],
    angle_contacts: []
  };
}

const cases = [
  {
    name: "V1.0 ONLY · VENUS CONJ MARS",
    syn: syn("r1", [
      aspect(
        "r1a",
        "venus",
        "mars",
        "conjunction",
        0,
        0,
        8
      )
    ])
  },

  {
    name: "V1.0 ONLY · VENUS TRINE PLUTO",
    syn: syn("r2", [
      aspect(
        "r2a",
        "mars",
        "pluto",
        "trine",
        120,
        0,
        7
      )
    ])
  },

  {
    name: "V1.1 ONLY · SUN MOON TRINE",
    syn: syn("r3", [
      aspect(
        "r3a",
        "sun",
        "moon",
        "trine",
        120,
        0,
        7
      )
    ])
  },

  {
    name: "V1.1 ONLY · JUPITER SATURN",
    syn: syn("r4", [
      aspect(
        "r4a",
        "jupiter",
        "saturn",
        "trine",
        120,
        0,
        7
      )
    ])
  },

  {
    name: "MIXED · V1.0 + V1.1",
    syn: syn("r5", [
      aspect(
        "r5a",
        "venus",
        "mars",
        "conjunction",
        0,
        0,
        8
      ),
      aspect(
        "r5b",
        "sun",
        "moon",
        "trine",
        120,
        0,
        7
      ),
      aspect(
        "r5c",
        "jupiter",
        "saturn",
        "trine",
        120,
        0,
        7
      )
    ])
  }
];

let errors = 0;

console.log("=== ASTROMATCH · RÉGRESSION V1.0 / V1.1 ===");
console.log("");
console.log("V1.0 rules :", v10.rules.length);
console.log("V1.1 rules :", v11.rules.length);
console.log("");

for (const c of cases) {

  const a = computeScore(c.syn, v10);
  const b = computeScore(c.syn, v11);

  const v10Contrib =
    a.domain_scores.flatMap(
      d => d.contributions
    );

  const v11Contrib =
    b.domain_scores.flatMap(
      d => d.contributions
    );

  const v10Ids =
    v10Contrib.map(x => x.rule_id).sort();

  const v11Ids =
    v11Contrib.map(x => x.rule_id).sort();

  const v10StillPresent =
    v10Ids.every(
      id => v11Ids.includes(id)
    );

  const ok =
    v10StillPresent &&
    Number.isFinite(a.global_score) &&
    Number.isFinite(b.global_score) &&
    a.global_score >= 0 &&
    a.global_score <= 100 &&
    b.global_score >= 0 &&
    b.global_score <= 100;

  if (!ok) errors++;

  console.log(
    c.name.padEnd(34),
    ok ? "PASS" : "FAIL",
    `V1.0=${a.global_score.toFixed(2)}`,
    `V1.1=${b.global_score.toFixed(2)}`
  );

  console.log(
    "  V1.0 contributions:",
    v10Ids.length
  );

  console.log(
    "  V1.1 contributions:",
    v11Ids.length
  );

  if (!v10StillPresent) {
    console.log(
      "  ERREUR: une règle V1.0 a disparu dans V1.1"
    );
  }
}

console.log("");

console.log(
  "Résultat :",
  errors === 0
    ? "RÉGRESSION OK"
    : `KO (${errors} erreurs)`
);

if (errors !== 0) {
  process.exit(1);
}
