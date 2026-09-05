/**
 * ASTROMATCH V1.2
 * Match Result Engine
 *
 * Rôle :
 * - Construire le résultat métier final d'un match.
 * - Consomme uniquement Interpretation Engine.
 * - Aucun recalcul astrologique.
 * - Aucun recalcul de score.
 * - Aucun appel IA.
 *
 * Architecture :
 *
 * Scoring
 *    ↓
 * Interpretation
 *    ↓
 * Match Result
 *    ↓
 * UI / AI narration
 */

const DOMAIN_ORDER = [
  "love",
  "emotions",
  "communication",
  "passion",
  "daily",
  "projects",
  "frictions"
];

const DOMAIN_META = {
  love: {
    icon: "❤️",
    label: "Amour"
  },

  emotions: {
    icon: "🌙",
    label: "Émotions"
  },

  communication: {
    icon: "🗣️",
    label: "Communication"
  },

  passion: {
    icon: "🔥",
    label: "Passion"
  },

  daily: {
    icon: "🏠",
    label: "Quotidien"
  },

  projects: {
    icon: "🚀",
    label: "Projets"
  },

  frictions: {
    icon: "⚠️",
    label: "Frictions"
  }
};

function clamp(value, min = 0, max = 100) {
  const n = Number(value);

  if (Number.isNaN(n)) return 50;
  if (n === Infinity) return max;
  if (n === -Infinity) return min;

  return Math.min(max, Math.max(min, n));
}

function normalizeDomain(domain) {
  const meta = DOMAIN_META[domain.domain] ?? {
    icon: "•",
    label: domain.domain ?? "Inconnu"
  };

  return {
    domain: domain.domain ?? null,
    icon: meta.icon,
    label: meta.label,
    score: clamp(domain.score),
    level: domain.level ?? "balanced",
    score_label: domain.label ?? "Équilibré",

    strengths: Array.isArray(domain.strengths)
      ? domain.strengths
      : [],

    tensions: Array.isArray(domain.tensions)
      ? domain.tensions
      : [],

    mixed_factors: Array.isArray(domain.mixed_factors)
      ? domain.mixed_factors
      : [],

    key_factors: Array.isArray(domain.key_factors)
      ? domain.key_factors
      : [],

    contribution_count:
      Number.isFinite(Number(domain.contribution_count))
        ? Number(domain.contribution_count)
        : 0
  };
}

function orderDomains(domains) {
  const map = new Map(
    domains.map(domain => [domain.domain, domain])
  );

  const ordered = [];

  for (const name of DOMAIN_ORDER) {
    if (map.has(name)) {
      ordered.push(map.get(name));
    }
  }

  // Conserver d'éventuels domaines inconnus
  for (const domain of domains) {
    if (!DOMAIN_ORDER.includes(domain.domain)) {
      ordered.push(domain);
    }
  }

  return ordered;
}

function extractTopStrengths(domains) {
  return domains
    .flatMap(domain =>
      domain.strengths.map(factor => ({
        ...factor,
        source_domain: domain.domain,
        source_domain_label: domain.label,
        source_domain_icon: domain.icon
      }))
    )
    .sort(
      (a, b) =>
        Number(b.final_points) - Number(a.final_points)
    )
    .slice(0, 5);
}

function extractTopTensions(domains) {
  return domains
    .flatMap(domain =>
      domain.tensions.map(factor => ({
        ...factor,
        source_domain: domain.domain,
        source_domain_label: domain.label,
        source_domain_icon: domain.icon
      }))
    )
    .sort(
      (a, b) =>
        Number(a.final_points) - Number(b.final_points)
    )
    .slice(0, 5);
}

function buildSummary(global, strengths, tensions) {
  if (global.score >= 80) {
    return "Une compatibilité exceptionnellement forte se dégage de ce match.";
  }

  if (global.score >= 70) {
    return "Une compatibilité particulièrement élevée se dégage de ce match.";
  }

  if (global.score >= 60) {
    return "Le potentiel relationnel apparaît globalement favorable.";
  }

  if (global.score >= 50) {
    return "Le profil du match apparaît globalement équilibré.";
  }

  if (global.score >= 40) {
    return "Le match présente un potentiel réel, avec plusieurs points de vigilance.";
  }

  if (strengths.length > 0 && tensions.length > 0) {
    return "Le match présente des forces identifiables mais aussi des tensions importantes.";
  }

  return "Le potentiel relationnel apparaît actuellement limité.";
}

export function buildMatchResult(interpretation) {
  if (!interpretation || typeof interpretation !== "object") {
    throw new TypeError(
      "buildMatchResult: interpretation object required"
    );
  }

  const globalSource = interpretation.global ?? {};

  const global = {
    score: clamp(globalSource.score),
    label: globalSource.label ?? "Équilibré",
    level: globalSource.level ?? "balanced"
  };

  const rawDomains = Array.isArray(interpretation.domains)
    ? interpretation.domains
    : [];

  const domains = orderDomains(
    rawDomains.map(normalizeDomain)
  );

  const strengths = extractTopStrengths(domains);
  const tensions = extractTopTensions(domains);

  const reliability = {
    ...(interpretation.reliability ?? {
      partial: false,
      level: "full",
      notes: []
    }),

    notes: Array.isArray(
      interpretation.reliability?.notes
    )
      ? interpretation.reliability.notes
      : []
  };

  return {
    match_result_version: "1.0",

    interpretation_id:
      interpretation.interpretation_id ?? null,

    score_id:
      interpretation.score_id ?? null,

    global,

    summary: buildSummary(
      global,
      strengths,
      tensions
    ),

    domains,

    highlights: Array.isArray(interpretation.highlights)
      ? interpretation.highlights
      : [],

    warnings: Array.isArray(interpretation.warnings)
      ? interpretation.warnings
      : [],

    top_strengths: strengths,

    top_tensions: tensions,

    reliability
  };
}
