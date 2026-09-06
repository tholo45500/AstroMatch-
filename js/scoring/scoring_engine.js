// js/scoring/scoring_engine.js
//
// Responsabilité EXACTE : transformer une `synastry` + une configuration
// de pondération (weighting_v1.json) en un `score` complet et traçable.
// Ne fait AUCUN calcul astrologique, n'appelle JAMAIS d'IA.
//
// Formules AstroMatch V1.0 :
//
//   final_points  = base_points * W_orbe * planet_weight * house_weight
//   S_pos         = 50 * (1 - exp(-RawPositive / K))
//   S_neg         = 50 * (1 - exp(-RawNegative / K))
//   domaine normal: score = clamp(50 + S_pos - S_neg, 0, 100)
//   frictions     : score = clamp((S_neg * 1.6) - (S_pos * 0.4), 0, 100)
//   score global  : clamp(
//                     0.25*love + 0.20*emotions + 0.20*communication
//                     + 0.15*passion + 0.10*daily + 0.10*projects
//                     - 0.20*frictions, 0, 100)

import { clamp } from "../utils/math.js";
import { generateId, nowIso } from "../utils/id.js";
import { validateWeightingConfig } from "./config/weighting_validator.js";
import { weightingConfigFingerprint } from "./config/weighting_fingerprint.js";

/**
 * Charge la configuration de pondération V1.0 depuis son fichier JSON.
 * Utilise les import attributes (`with { type: "json" }`), supportés par
 * Node 20.10+/22 et par les navigateurs modernes (Chrome/Edge 123+).
 */
export async function loadWeightingConfig() {
  const mod = await import("./config/weighting_v1_2.json", { with: { type: "json" } });
  validateWeightingConfig(mod.default);
  return mod.default;
}

function bodiesMatchRule(ruleA, ruleB, bodyA, bodyB) {
  return (ruleA === bodyA && ruleB === bodyB) || (ruleA === bodyB && ruleB === bodyA);
}

/**
 * Un aspect de la synastrie déclenche une règle si le type d'aspect
 * correspond exactement et si les deux planètes correspondent à la paire
 * de la règle, dans n'importe quel ordre. Une règle ne s'applique qu'une
 * seule fois par aspect (les interactions planète identique — ex :
 * Vénus/Vénus — ne sont donc jamais comptées deux fois, puisqu'il n'existe
 * qu'un seul aspect Vénus-Vénus par comparaison de thèmes).
 */
function ruleMatchesAspect(rule, aspect) {
  if (rule.aspect_type !== aspect.aspect_type) return false;
  if (!bodiesMatchRule(rule.planet_a, rule.planet_b, aspect.body_a.body, aspect.body_b.body)) return false;

  // La règle peut avoir une orb plus restrictive que l'aspect générique.
  // Elle ne doit donc jamais se déclencher au-delà de son propre orb_max.
  return Number.isFinite(rule.orb_max) && aspect.orb <= rule.orb_max;
}

function planetWeightFor(aspect, weightingConfig) {
  const wA = weightingConfig.planet_weights[aspect.body_a.body] ?? 1.0;
  const wB = weightingConfig.planet_weights[aspect.body_b.body] ?? 1.0;
  return (wA + wB) / 2;
}

/**
 * Le bonus de maison (house_weight) s'applique si, et seulement si, la
 * synastrie n'est pas en mode dégradé ET qu'un overlay existe pour la
 * maison exigée par la règle, impliquant l'une des deux planètes de
 * l'aspect (peu importe le sens : planète du principal dans une maison
 * de la cible, ou l'inverse — voir synastry_engine.js).
 */
function houseWeightFor(rule, aspect, synastry) {
  if (synastry.reliability?.degraded_mode) return 1.0;
  const relevant = synastry.house_overlays.some(
    (overlay) =>
      overlay.house_number === rule.overlay_house &&
      (overlay.planet === aspect.body_a.body || overlay.planet === aspect.body_b.body)
  );
  return relevant && rule.house_bonus > 0
    ? rule.house_bonus
    : 1.0;
}

/**
 * @param {object} synastry - conforme à synastry.schema.json
 * @param {object} weightingConfig - contenu de weighting_v1.json
 * @returns {object} score
 */
export function computeScore(synastry, weightingConfig) {
  validateWeightingConfig(weightingConfig);

  const weighting_config_fingerprint =
    weightingConfigFingerprint(weightingConfig);
  const domains = weightingConfig.domains;
  const contributionsByDomain = Object.fromEntries(domains.map((d) => [d, []]));

  for (const aspect of synastry.aspects) {
    for (const rule of weightingConfig.rules) {
      if (!ruleMatchesAspect(rule, aspect)) continue;

      const planetWeight = Number(planetWeightFor(aspect, weightingConfig).toFixed(4));
      const houseWeight = houseWeightFor(rule, aspect, synastry);
      const finalPoints = Number((rule.base_points * aspect.orb_strength * planetWeight * houseWeight).toFixed(2));

      contributionsByDomain[rule.domain].push({
        rule_id: rule.rule_id,
        aspect_id: aspect.aspect_id,
        domain: rule.domain,
        planet_a: aspect.body_a.body,
        planet_b: aspect.body_b.body,
        aspect_type: aspect.aspect_type,
        base_points: rule.base_points,
        orb: aspect.orb,
        orb_max: aspect.orb_max,
        orb_strength: aspect.orb_strength,
        planet_weight: planetWeight,
        house_weight: houseWeight,
        final_points: finalPoints,
        doctrine_polarity: rule.doctrine_polarity || null,
        // Dans le domaine "frictions", un point positif représente
        // davantage de friction et constitue donc un impact négatif.
        impact: rule.domain === "frictions" ? "negative" : (finalPoints >= 0 ? "positive" : "negative")
      });
    }
  }

  const K = weightingConfig.k_saturation;

  const domainScores = domains.map((domain) => {
    const contributions = contributionsByDomain[domain];
    const rawPositive = contributions.reduce((acc, c) => {
      if (c.doctrine_polarity === "MIXED_TENSION_REVIEW") {
        return acc + Math.abs(c.final_points) * 0.35;
      }
      return acc + (c.final_points >= 0 ? c.final_points : 0);
    }, 0);
    const rawNegative = contributions.reduce((acc, c) => {
      if (c.doctrine_polarity === "MIXED_TENSION_REVIEW") {
        return acc + Math.abs(c.final_points) * 0.65;
      }
      return acc + (c.final_points < 0 ? Math.abs(c.final_points) : 0);
    }, 0);

    const sPos = 50 * (1 - Math.exp(-rawPositive / K));
    const sNeg = 50 * (1 - Math.exp(-rawNegative / K));

    const score =
      domain === "frictions"
        // Les règles de friction V1.0 portent des base_points positifs :
        // rawPositive représente donc l'intensité des frictions.
        ? clamp(sPos * 1.6 - sNeg * 0.4, 0, 100)
        : clamp(50 + sPos - sNeg, 0, 100);

    return {
      domain,
      score: Math.round(score * 100) / 100,
      raw_positive: Number(rawPositive.toFixed(2)),
      raw_negative: Number(rawNegative.toFixed(2)),
      contributions
    };
  });

  const scoreByDomain = Object.fromEntries(domainScores.map((d) => [d.domain, d.score]));
  const weights = weightingConfig.domain_weights_global;

  const weightedSum =
    weights.love * scoreByDomain.love +
    weights.emotions * scoreByDomain.emotions +
    weights.communication * scoreByDomain.communication +
    weights.passion * scoreByDomain.passion +
    weights.daily * scoreByDomain.daily +
    weights.projects * scoreByDomain.projects -
    weightingConfig.frictions_penalty_global * scoreByDomain.frictions;

  const globalScore = clamp(Math.round(weightedSum * 100) / 100, 0, 100);

  return {
    score_id: generateId("score"),
    synastry_id: synastry.synastry_id,
    weighting_profile_version: weightingConfig.version,
    weighting_config_fingerprint,
    computed_at: nowIso(),
    partial: Boolean(synastry.reliability?.degraded_mode),
    global_score: globalScore,
    domain_scores: domainScores
  };
}
