// js/interpretation/templates/templates.js
//
// Tous les textes utilisés par l'interprétation sont ici, associés soit à
// un domaine, soit à un rule_id précis. Aucun texte n'est généré
// aléatoirement ou par une IA — c'est un gabarit fixe et déterministe.

export const DOMAIN_LABELS = {
  love: "Amour",
  passion: "Passion",
  communication: "Communication",
  emotions: "Émotions",
  daily: "Quotidien",
  projects: "Projets",
  frictions: "Frictions"
};

export const DOMAIN_SUMMARY_TEMPLATES = {
  love: {
    high: "Plusieurs facteurs favorables sont présents dans cette dynamique amoureuse.",
    mid: "La dynamique amoureuse présente des éléments favorables et quelques nuances.",
    low: "La dynamique amoureuse présente davantage de points à ajuster."
  },
  passion: {
    high: "La dynamique de désir peut être particulièrement expressive entre les deux thèmes.",
    mid: "Une dynamique de désir est présente, avec des nuances selon les facteurs concernés.",
    low: "Les facteurs étudiés indiquent moins d'accent sur la dynamique de désir."
  },
  communication: {
    high: "Les facteurs étudiés favorisent une expression plus fluide des échanges.",
    mid: "La communication présente des éléments favorables, avec quelques différences à composer.",
    low: "Certains facteurs peuvent accentuer les différences de rythme ou de manière de communiquer."
  },
  emotions: {
    high: "Une compréhension intuitive des besoins affectifs de l'autre, un climat pouvant favoriser la stabilité émotionnelle.",
    mid: "La dynamique émotionnelle présente des éléments favorables, avec quelques ajustements possibles.",
    low: "Certains facteurs peuvent accentuer les différences dans l'expression des besoins émotionnels."
  },
  daily: {
    high: "Plusieurs facteurs peuvent favoriser la stabilité et l'organisation du quotidien.",
    mid: "Le quotidien présente des éléments favorables, avec quelques habitudes à harmoniser.",
    low: "Certains facteurs peuvent rendre l'organisation du quotidien plus exigeante."
  },
  projects: {
    high: "Plusieurs facteurs peuvent soutenir la structuration et les projets communs.",
    mid: "Les facteurs étudiés offrent des éléments favorables aux projets communs, avec de la coordination.",
    low: "Certains facteurs peuvent accentuer les différences de priorités ou de direction dans les projets."
  },
  frictions: {
    high: "Plusieurs facteurs de tension sont identifiés dans cette dynamique.",
    mid: "Quelques facteurs de friction sont présents et peuvent demander des ajustements.",
    low: "Peu de facteurs de friction majeurs sont identifiés par les règles actuellement actives."
  }
};

/**
 * Explication associée à chaque règle (rule_id). Utilisée telle quelle,
 * jamais reformulée aléatoirement.
 */
export const RULE_EXPLANATIONS = {
  AMOUR_VENUS_CONJ_VENUS: "Vos Vénus sont en conjonction : une façon très similaire d'aimer, d'apprécier et de se sentir valorisé dans la relation.",
  AMOUR_VENUS_TRI_SOLEIL: "Vénus en trigone avec le Soleil : un facteur d'harmonie possible entre l'expression affective de l'un et l'expression identitaire de l'autre.",
  AMOUR_SATURNE_CARRE_VENUS: "Saturne en carré avec Vénus : une tension possible entre retenue, responsabilité et expression affective.",
  PASSION_VENUS_CONJ_MARS: "Vénus conjointe à Mars : une combinaison traditionnellement associée à une dynamique amoureuse et au désir.",
  PASSION_MARS_TRI_PLUTON: "Mars en trigone avec Pluton : une dynamique d'action et d'intensité pouvant être renforcée ; interprétation moderne.",
  COMM_MERCURE_SEX_MERCURE: "Mercure en sextile avec Mercure : une disposition pouvant favoriser les échanges, la compréhension et la curiosité mutuelle.",
  COMM_MERCURE_CARRE_MARS: "Mercure en carré avec Mars : les échanges peuvent devenir vifs, voire abrupts, sous la pression du désaccord.",
  EMOTIONS_LUNE_CONJ_LUNE: "Lune conjointe à Lune : des besoins et réactions émotionnels pouvant présenter des ressemblances marquées.",
  EMOTIONS_LUNE_OPPO_NEPTUNE: "Lune en opposition avec Neptune : une tendance possible à la projection, à l'idéalisation ou à une lecture moins claire des émotions ; interprétation moderne.",
  QUOTIDIEN_SATURNE_TRI_LUNE: "Saturne en trigone avec la Lune : un sentiment de sécurité et de fiabilité dans le quotidien partagé.",
  PROJETS_SOLEIL_CONJ_SATURNE: "Soleil conjoint à Saturne : une dynamique pouvant mettre l'accent sur la responsabilité, la structure et la persévérance dans les projets.",
  FRICTIONS_MARS_OPPO_SATURNE: "Mars en opposition avec Saturne : une tension possible entre l'élan d'action de l'un et la retenue ou les limites de l'autre.",
  FRICTIONS_URANUS_CARRE_MARS: "Uranus en carré avec Mars : une imprévisibilité pouvant heurter le besoin d'action directe de l'autre ; interprétation moderne."
};

export function summaryLevelFor(score) {
  if (score >= 70) return "high";
  if (score >= 40) return "mid";
  return "low";
}

export function summaryFor(domain, score, context = {}) {
  const level = summaryLevelFor(score);
  const templates = DOMAIN_SUMMARY_TEMPLATES[domain];
  if (!templates) return "";

  const hasPositive = Number(context.positive_count ?? 0) > 0;
  const hasNegative = Number(context.negative_count ?? 0) > 0;
  const hasEvidence = hasPositive || hasNegative;

  if (!hasEvidence) {
    return "Aucun facteur interprétatif actif n'est identifié par les règles actuellement utilisées.";
  }

  return templates[level];
}

export function explanationFor(ruleId) {
  return RULE_EXPLANATIONS[ruleId] || "Cet aspect influence ce domaine de compatibilité.";
}
