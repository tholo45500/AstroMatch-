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

function toRule(r) {
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

const candidateRules = [
  ...additions.map(toRule),
  ...frictionRules.map(toRule)
];

const ANGLES = {
  conjunction: 0,
  sextile: 60,
  square: 90,
  trine: 120,
  opposition: 180
};

function makeAspect(rule) {
  return {
    aspect_id: `audit-${rule.rule_id}`,
    body_a: {
      owner: "primary",
      body: rule.planet_a
    },
    body_b: {
      owner: "target",
      body: rule.planet_b
    },
    aspect_type: rule.aspect_type,
    exact_angle: ANGLES[rule.aspect_type],
    actual_angle: ANGLES[rule.aspect_type],
    orb: 0,
    orb_max: rule.orb_max,
    orb_strength: 1,
    polarity:
      rule.domain === "frictions" || rule.base_points < 0
        ? "tense"
        : "harmonious"
  };
}

function findDomain(result, domain) {
  return result.domain_scores.find(
    d => d.domain === domain
  );
}

console.log("\n=== ASTROMATCH · AUDIT RUNTIME V1.1 ===\n");

let passed = 0;
let failed = 0;

for (const rule of candidateRules) {

  const testConfig = {
    ...v10,
    version: `audit-${rule.rule_id}`,
    rules: [
      ...v10.rules,
      rule
    ]
  };

  const synastry = {
    synastry_id: `audit-${rule.rule_id}`,
    reliability: {
      degraded_mode: false
    },
    aspects: [
      makeAspect(rule)
    ],
    house_overlays: []
  };

  try {

    const result = computeScore(
      synastry,
      testConfig
    );

    const domain = findDomain(
      result,
      rule.domain
    );

    const contribution = domain?.contributions?.find(
      c => c.rule_id === rule.rule_id
    );

    const expectedSign =
      rule.domain === "frictions"
        ? "negative"
        : rule.base_points >= 0
          ? "positive"
          : "negative";

    const actualSign =
      contribution?.impact;

    const errors = [];

    if (!contribution) {
      errors.push("contribution absente");
    }

    if (
      contribution &&
      actualSign !== expectedSign
    ) {
      errors.push(
        `impact=${actualSign}, attendu=${expectedSign}`
      );
    }

    if (
      domain &&
      !Number.isFinite(domain.score)
    ) {
      errors.push("score domaine invalide");
    }

    if (errors.length) {
      failed++;

      console.log(`❌ ${rule.rule_id}`);

      for (const error of errors) {
        console.log(`   - ${error}`);
      }

    } else {
      passed++;

      console.log(
        `✓ ${rule.rule_id.padEnd(34)} ` +
        `${rule.domain.padEnd(14)} ` +
        `base=${String(rule.base_points).padStart(4)} ` +
        `final=${contribution.final_points}`
      );
    }

  } catch (error) {

    failed++;

    console.log(`❌ ${rule.rule_id}`);
    console.log(`   - EXCEPTION: ${error.message}`);
  }
}

console.log("\n────────────────────────────────────────");
console.log(`Règles V1.1 candidates : ${candidateRules.length}`);
console.log(`PASS                   : ${passed}`);
console.log(`FAIL                   : ${failed}`);
console.log("────────────────────────────────────────");

if (failed > 0) {
  process.exitCode = 1;
}

console.log("\n=== FIN ===\n");
