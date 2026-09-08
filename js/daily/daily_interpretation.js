// js/daily/daily_interpretation.js
//
// Responsabilité : transformer les scores quotidiens et leurs contributions
// en une lecture courte, déterministe et traçable.
// Aucun calcul astronomique ni scoring n'est effectué ici.

const BODY_FR = {
  sun: "Soleil",
  moon: "Lune",
  mercury: "Mercure",
  venus: "Vénus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturne",
  uranus: "Uranus",
  neptune: "Neptune",
  pluto: "Pluton"
};

const ASPECT_FR = {
  conjunction: "conjonction",
  sextile: "sextile",
  square: "carré",
  trine: "trigone",
  opposition: "opposition"
};

const DOMAIN_FR = {
  heart: "Cœur",
  communication: "Échanges",
  energy: "Énergie"
};

function scoreBand(score) {
  if (score >= 68) return "high";
  if (score >= 56) return "good";
  if (score <= 32) return "low";
  if (score <= 44) return "delicate";
  return "balanced";
}

const DOMAIN_TEXT = {
  heart: {
    high: "Le climat affectif est très porteur : les émotions circulent avec plus de naturel.",
    good: "Le cœur bénéficie d'un courant favorable, propice aux rapprochements et aux élans sincères.",
    balanced: "Le climat affectif reste nuancé : avance avec naturel sans chercher à provoquer les choses.",
    delicate: "Le terrain affectif demande un peu plus de souplesse et de recul aujourd'hui.",
    low: "Le cœur est plus sensible aujourd'hui : évite les réactions à chaud et laisse de l'espace."
  },
  communication: {
    high: "Les échanges sont particulièrement fluides : c'est un bon moment pour dire les choses clairement.",
    good: "La communication est bien soutenue, avec davantage de facilité pour faire passer tes idées.",
    balanced: "Les échanges sont globalement neutres : la qualité dépendra surtout du ton et du timing.",
    delicate: "Les mots peuvent partir plus vite que prévu : vérifie ce que tu veux vraiment faire passer.",
    low: "La communication demande de la prudence : mieux vaut clarifier que supposer."
  },
  energy: {
    high: "L'énergie est très présente : utilise-la pour avancer concrètement sur ce qui compte.",
    good: "Tu disposes d'un bon élan pour agir, décider et faire bouger les choses.",
    balanced: "Le rythme est stable : inutile de forcer, avance régulièrement.",
    delicate: "L'énergie peut être irrégulière : dose l'effort plutôt que de tout pousser d'un coup.",
    low: "Le niveau d'énergie invite à ralentir et à privilégier l'essentiel."
  }
};

const PHRASES = {
  heart: {
    positive: "Aujourd'hui, le cœur gagne à suivre ce qui semble simple et sincère.",
    neutral: "Aujourd'hui, laisse les émotions se poser avant de leur donner une direction.",
    negative: "Aujourd'hui, protège l'essentiel sans transformer chaque tension en verdict."
  },
  communication: {
    positive: "Aujourd'hui, les bons mots peuvent ouvrir plus de portes que la force.",
    neutral: "Aujourd'hui, choisis bien ton moment : le fond compte autant que la manière.",
    negative: "Aujourd'hui, clarifie avant de conclure et écoute avant de répondre."
  },
  energy: {
    positive: "Aujourd'hui, ton élan est un moteur : dirige-le vers ce qui mérite vraiment ton énergie.",
    neutral: "Aujourd'hui, avance à ton rythme et garde ton énergie pour ce qui compte.",
    negative: "Aujourd'hui, canalise l'impulsion plutôt que de lutter contre elle."
  }
};

function scoreTone(score) {
  if (score >= 56) return "positive";
  if (score <= 44) return "negative";
  return "neutral";
}

function contributionLabel(c) {
  const transit = BODY_FR[c.transiting_body] || c.transiting_body || "Transit";
  const natal = BODY_FR[c.natal_body] || c.natal_body || null;
  const aspect = ASPECT_FR[c.aspect_type] || c.aspect_type || null;

  if (c.kind === "planetary_aspect" && natal && aspect) {
    return `${transit} ${aspect} ${natal}`;
  }

  if (c.kind === "angle_aspect" && c.natal_angle && aspect) {
    const angle = c.natal_angle === "ascendant" ? "Ascendant" : c.natal_angle.toUpperCase();
    return `${transit} ${aspect} ${angle}`;
  }

  if (c.kind === "house_transit" && c.house_number) {
    return `${transit} en maison ${c.house_number}`;
  }

  return transit;
}

function contributionText(c) {
  const label = contributionLabel(c);
  const direction = Number(c.value) >= 0 ? "soutient" : "met sous tension";
  const domain = DOMAIN_FR[c.domain] || c.domain || "la journée";
  return `${label} ${direction} surtout ${domain.toLowerCase()}.`;
}

function topContributions(scoring, limit = 3) {
  const list = Array.isArray(scoring?.contributions) ? scoring.contributions : [];

  return [...list]
    .filter(c => c && Number.isFinite(Number(c.value)))
    .sort((a, b) => Math.abs(Number(b.value)) - Math.abs(Number(a.value)))
    .slice(0, limit)
    .map(c => ({
      kind: c.kind,
      domain: c.domain,
      domain_label: DOMAIN_FR[c.domain] || c.domain,
      impact: Number(c.value) >= 0 ? "supportive" : "tense",
      value: Number(Number(c.value).toFixed(3)),
      label: contributionLabel(c),
      text: contributionText(c),
      transiting_body: c.transiting_body || null,
      natal_body: c.natal_body || null,
      aspect_type: c.aspect_type || null,
      orb: Number.isFinite(Number(c.orb)) ? Number(c.orb) : null,
      orb_strength: Number.isFinite(Number(c.orb_strength)) ? Number(c.orb_strength) : null,
      house_number: c.house_number ?? null
    }));
}

function domainResult(scoring, domain) {
  const score = Number(scoring?.scores?.[domain]?.score);
  const safeScore = Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : 50;
  const band = scoreBand(safeScore);

  return {
    score: safeScore,
    label:
      band === "high" ? "Très favorable" :
      band === "good" ? "Favorable" :
      band === "balanced" ? "Équilibré" :
      band === "delicate" ? "À nuancer" :
      "Plus sensible",
    text: DOMAIN_TEXT[domain][band]
  };
}

export function buildDailyInterpretation(transits, scoring) {
  if (!transits || transits.provider !== "astronomy-engine") {
    const error = new Error("Une lecture quotidienne réelle exige le provider astronomy-engine.");
    error.type = "DAILY_REAL_PROVIDER_REQUIRED";
    throw error;
  }

  const domains = {
    heart: domainResult(scoring, "heart"),
    communication: domainResult(scoring, "communication"),
    energy: domainResult(scoring, "energy")
  };

  const requestedDominant = scoring?.dominant_domain;
  const dominantDomain = ["heart", "communication", "energy"].includes(requestedDominant)
    ? requestedDominant
    : Object.entries(domains).sort((a, b) => Math.abs(b[1].score - 50) - Math.abs(a[1].score - 50))[0][0];

  const dominantScore = domains[dominantDomain].score;
  const phrase = PHRASES[dominantDomain][scoreTone(dominantScore)];

  return {
    date: transits.date,
    phrase,
    summary: `${domains.heart.text} ${domains.communication.text} ${domains.energy.text}`,
    dominant_domain: dominantDomain,
    dominant_domain_label: DOMAIN_FR[dominantDomain],
    domains,
    why_today: topContributions(scoring, 3),
    meta: {
      provider: transits.provider,
      reference_time_local: transits.reference_time_local,
      timezone_id: transits.timezone_id,
      real_astronomical_positions: transits.reliability?.real_astronomical_positions === true,
      natal_time_known: transits.reliability?.natal_time_known === true
    }
  };
}
