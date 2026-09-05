// js/synastry/aspect_rules.js
//
// Définitions purement géométriques des aspects. Aucune appréciation de
// "bon" ou "mauvais" contextuel au-delà de la polarité générale de la
// figure — le jugement fin (base_points, domaine) appartient au scoring.

import { wOrbe } from "../utils/math.js";

export const ASPECT_DEFINITIONS = [
  { type: "conjunction", exact_angle: 0, orb_max: 8, polarity: "neutral" },
  { type: "sextile", exact_angle: 60, orb_max: 4, polarity: "harmonious" },
  { type: "square", exact_angle: 90, orb_max: 6, polarity: "tense" },
  { type: "trine", exact_angle: 120, orb_max: 7, polarity: "harmonious" },
  { type: "opposition", exact_angle: 180, orb_max: 7, polarity: "tense" }
];

/**
 * Détecte le meilleur aspect correspondant à un écart angulaire donné
 * (déjà réduit à [0,180] par angularDistance), ou null si aucun aspect
 * n'est dans son orbe maximal. En cas de chevauchement possible entre
 * deux définitions, celle avec l'orbe le plus petit (aspect le plus
 * exact) est retenue.
 *
 * @returns { type, exact_angle, actual_angle, orb, orb_max, orb_strength, polarity } | null
 */
export function matchAspect(actualAngle) {
  let best = null;
  for (const def of ASPECT_DEFINITIONS) {
    const orb = Math.abs(actualAngle - def.exact_angle);
    if (orb <= def.orb_max) {
      if (!best || orb < best.orb) {
        best = {
          type: def.type,
          exact_angle: def.exact_angle,
          actual_angle: actualAngle,
          orb,
          orb_max: def.orb_max,
          orb_strength: wOrbe(orb, def.orb_max),
          polarity: def.polarity
        };
      }
    }
  }
  return best;
}
