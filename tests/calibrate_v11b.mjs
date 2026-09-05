import fs from "node:fs";
import { computeScore } from "../js/scoring/scoring_engine.js";

const baseConfig = JSON.parse(
  fs.readFileSync(
    "./js/scoring/config/weighting_v1_1.json",
    "utf8"
  )
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

function makeAspect(id,a,b,type,exact,orb,orbMax) {
  return {
    aspect_id:id,
    body_a:{owner:"primary",body:a},
    body_b:{owner:"target",body:b},
    aspect_type:type,
    exact_angle:exact,
    actual_angle:exact+orb,
    orb,
    orb_max:orbMax,
    orb_strength:
      0.5 *
      (
        1 +
        Math.cos(
          Math.PI * orb / orbMax
        )
      ),
    polarity:
      ["square","opposition"].includes(type)
        ? "tense"
        : "harmonious"
  };
}

function makeSynastry(id,aspect) {
  return {
    synastry_id:id,
    reliability:{
      degraded_mode:false,
      quality:"full"
    },
    aspects:[aspect],
    house_overlays:[],
    angle_contacts:[]
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
    version:"v1.1b-calibration",
    rules:[
      ...baseConfig.rules,
      {
        rule_id,
        domain,
        planet_a,
        aspect_type,
        planet_b,
        base_points,
        orb_max,
        overlay_house:1,
        house_bonus:0
      }
    ]
  };
}

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
    aspect_type === "conjunction"
      ? 0
      : aspect_type === "trine"
        ? 120
        : 90;

  const cfg =
    configWithCandidate(candidate);

  console.log("");
  console.log(rule_id);
  console.log(
    `domain=${domain} base=${base_points} orbMax=${orbMax}`
  );

  for (const ratio of [0,0.25,0.5,0.75,1]) {

    const orb = orbMax * ratio;

    const result = computeScore(
      makeSynastry(
        `${rule_id}-${ratio}`,
        makeAspect(
          `${rule_id}-aspect`,
          planet_a,
          planet_b,
          aspect_type,
          exact,
          orb,
          orbMax
        )
      ),
      cfg
    );

    const contributions =
      result.domain_scores.flatMap(
        d => d.contributions
      );

    const hit =
      contributions.find(
        c => c.rule_id === rule_id
      );

    console.log(
      `  ${(ratio*100).toFixed(0).padStart(3)}%`,
      `orb=${orb.toFixed(2).padStart(5)}`,
      `strength=${hit.orb_strength.toFixed(4)}`,
      `final=${hit.final_points.toFixed(2).padStart(6)}`,
      `global=${result.global_score.toFixed(2).padStart(6)}`
    );
  }
}
