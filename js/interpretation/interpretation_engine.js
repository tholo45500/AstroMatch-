/**
 * ASTROMATCH V1.2
 * Interpretation Engine
 *
 * Rôle :
 * - Transformer un résultat de scoring V1.2 en données interprétables.
 * - Aucun recalcul astrologique.
 * - Aucun recalcul de score.
 * - Aucun appel IA.
 * - Déterministe et auditable.
 */

function clamp(value, min = 0, max = 100, fallback = 50) {
  const n = Number(value);

  if (Number.isNaN(n)) {
    return fallback;
  }

  if (n === Infinity) {
    return max;
  }

  if (n === -Infinity) {
    return min;
  }

  return Math.min(max, Math.max(min, n));
}

function scoreLevel(score) {
  const s = clamp(score);

  if (s >= 80) return "exceptional";
  if (s >= 70) return "very_high";
  if (s >= 60) return "high";
  if (s >= 50) return "balanced";
  if (s >= 40) return "moderate";
  if (s >= 30) return "low";
  return "very_low";
}

function scoreLabel(score) {
  switch (scoreLevel(score)) {
    case "exceptional":
      return "Exceptionnel";
    case "very_high":
      return "Très élevé";
    case "high":
      return "Élevé";
    case "balanced":
      return "Équilibré";
    case "moderate":
      return "Modéré";
    case "low":
      return "Faible";
    case "very_low":
      return "Très faible";
    default:
      return "Indéterminé";
  }
}

function normalizeContribution(contribution) {
  if (!contribution || typeof contribution !== "object") {
    return null;
  }

  const finalPoints = Number(contribution.final_points);

  if (!Number.isFinite(finalPoints)) {
    return null;
  }

  return {
    rule_id: contribution.rule_id ?? null,
    aspect_id: contribution.aspect_id ?? null,
    domain: contribution.domain ?? null,
    planet_a: contribution.planet_a ?? null,
    planet_b: contribution.planet_b ?? null,
    aspect_type: contribution.aspect_type ?? null,
    final_points: finalPoints,
    doctrine_polarity: contribution.doctrine_polarity ?? null,
    impact:
      contribution.impact ??
      (finalPoints >= 0 ? "positive" : "negative")
  };
}

function extractContributions(domainScore) {
  if (!Array.isArray(domainScore?.contributions)) {
    return [];
  }

  return domainScore.contributions
    .map(normalizeContribution)
    .filter(Boolean);
}

function sortByImpactMagnitude(contributions) {
  return [...contributions].sort(
    (a, b) => Math.abs(b.final_points) - Math.abs(a.final_points)
  );
}

function buildDomainInterpretation(domainScore) {
  const score = clamp(domainScore?.score ?? 50);
  const contributions = extractContributions(domainScore);

  const positive = contributions
    .filter(c => c.final_points > 0)
    .sort((a, b) => b.final_points - a.final_points);

  const negative = contributions
    .filter(c => c.final_points < 0)
    .sort((a, b) => a.final_points - b.final_points);

  const mixed = contributions.filter(
    c => c.doctrine_polarity === "MIXED_TENSION_REVIEW"
  );

  const keyFactors = sortByImpactMagnitude(contributions)
    .slice(0, 5);

  return {
    domain: domainScore?.domain ?? null,
    score,
    label: scoreLabel(score),
    level: scoreLevel(score),

    strengths: positive.slice(0, 5),

    tensions: negative.slice(0, 5),

    mixed_factors: mixed.slice(0, 5),

    key_factors: keyFactors,

    contribution_count: contributions.length
  };
}

function buildReliability(score) {
  const partial = Boolean(score?.partial);

  return {
    partial,
    level: partial ? "degraded" : "full",
    notes: partial
      ? [
          "L'heure de naissance n'est pas suffisamment fiable pour utiliser les maisons et les contacts d'angles.",
          "L'interprétation reste calculable mais doit être considérée comme partielle."
        ]
      : []
  };
}

function buildHighlights(domains) {
  const highlights = [];

  for (const domain of domains) {
    if (domain.score >= 70) {
      highlights.push({
        type: "strength",
        domain: domain.domain,
        score: domain.score,
        message: `${domain.label} sur le domaine ${domain.domain}.`
      });
    }
  }

  return highlights
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function buildWarnings(domains, reliability) {
  const warnings = [];

  for (const domain of domains) {
    if (domain.score < 40) {
      warnings.push({
        type: "tension",
        domain: domain.domain,
        score: domain.score,
        message: `Vigilance sur le domaine ${domain.domain}.`
      });
    }
  }

  if (reliability.partial) {
    warnings.push({
      type: "reliability",
      message: "Interprétation partielle : données horaires insuffisamment fiables."
    });
  }

  return warnings;
}

/**
 * Transforme un score AstroMatch V1.2 en résultat d'interprétation.
 *
 * @param {object} score
 * @returns {object}
 */
export function interpretScore(score) {
  if (!score || typeof score !== "object") {
    throw new TypeError("interpretScore: score object required");
  }

  const globalScore = clamp(score.global_score ?? 50);

  const rawDomains = Array.isArray(score.domain_scores)
    ? score.domain_scores
    : [];

  const domains = rawDomains.map(buildDomainInterpretation);

  const reliability = buildReliability(score);

  return {
    interpretation_id: `interp_${score.score_id ?? "unknown"}`,
    score_id: score.score_id ?? null,

    global: {
      score: globalScore,
      label: scoreLabel(globalScore),
      level: scoreLevel(globalScore)
    },

    domains,

    reliability,

    highlights: buildHighlights(domains),

    warnings: buildWarnings(domains, reliability)
  };
}

// Backward-compatible public API.
// The validated implementation is interpretScore(); older pipeline modules
// still call buildInterpretation().
export function buildInterpretation(score, _synastry = null) {
  return interpretScore(score);
}

export {
  scoreLevel,
  scoreLabel
};
