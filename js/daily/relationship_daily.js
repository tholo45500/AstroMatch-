// js/daily/relationship_daily.js
//
// AstroMatch — climat relationnel du jour.
//
// Croise :
// - les transits quotidiens réels de la personne A,
// - les transits quotidiens réels de la personne B,
// - la dynamique de synastrie déjà calculée.
//
// Aucun calcul astronomique n'est effectué ici.
// Aucun changement du scoring de synastrie.

export const RELATIONSHIP_DAILY_VERSION =
  "relationship-daily@1.0.0";

const MODE_AXES = {

  love: [
    {
      key: "connection",
      icon: "💞",
      label: "Proximité",
      daily_domain: "heart",
      relationship_domains: ["love", "emotions"]
    },
    {
      key: "communication",
      icon: "💬",
      label: "Échanges",
      daily_domain: "communication",
      relationship_domains: ["communication"]
    },
    {
      key: "momentum",
      icon: "🔥",
      label: "Élan",
      daily_domain: "energy",
      relationship_domains: ["passion", "love"]
    }
  ],

  friendship: [
    {
      key: "connection",
      icon: "🤝",
      label: "Complicité",
      daily_domain: "heart",
      relationship_domains: ["emotions", "projects"]
    },
    {
      key: "communication",
      icon: "💬",
      label: "Échanges",
      daily_domain: "communication",
      relationship_domains: ["communication"]
    },
    {
      key: "momentum",
      icon: "⚡",
      label: "Disponibilité",
      daily_domain: "energy",
      relationship_domains: ["daily", "projects"]
    }
  ],

  family: [
    {
      key: "connection",
      icon: "🫶",
      label: "Soutien",
      daily_domain: "heart",
      relationship_domains: ["emotions"]
    },
    {
      key: "communication",
      icon: "💬",
      label: "Dialogue",
      daily_domain: "communication",
      relationship_domains: ["communication"]
    },
    {
      key: "momentum",
      icon: "🏠",
      label: "Rythme",
      daily_domain: "energy",
      relationship_domains: ["daily", "projects"]
    }
  ],

  flirt: [
    {
      key: "connection",
      icon: "✨",
      label: "Alchimie",
      daily_domain: "heart",
      relationship_domains: ["love", "passion"]
    },
    {
      key: "communication",
      icon: "💬",
      label: "Signaux",
      daily_domain: "communication",
      relationship_domains: ["communication"]
    },
    {
      key: "momentum",
      icon: "🔥",
      label: "Élan",
      daily_domain: "energy",
      relationship_domains: ["passion"]
    }
  ],

  professional: [
    {
      key: "connection",
      icon: "🤝",
      label: "Climat d'équipe",
      daily_domain: "heart",
      relationship_domains: ["emotions", "projects"]
    },
    {
      key: "communication",
      icon: "💬",
      label: "Communication",
      daily_domain: "communication",
      relationship_domains: ["communication"]
    },
    {
      key: "momentum",
      icon: "⚙️",
      label: "Coordination",
      daily_domain: "energy",
      relationship_domains: ["daily", "projects"]
    }
  ]

};


function clamp(value) {
  return Math.max(
    0,
    Math.min(100, Number(value))
  );
}


function dailyDomainScore(
  daily,
  domain
) {

  const value =
    daily?.interpretation
      ?.domains?.[domain]?.score ??
    daily?.scores?.[domain]?.score;

  return Number.isFinite(Number(value))
    ? clamp(value)
    : 50;
}


function relationshipMap(result) {

  const map = {};

  for (
    const domain of
    Array.isArray(result?.domains)
      ? result.domains
      : []
  ) {
    if (domain?.domain) {
      map[domain.domain] = domain;
    }
  }

  return map;
}


function relationshipAnchor(
  result,
  domains
) {

  const map =
    relationshipMap(result);

  const values =
    domains
      .map(key =>
        Number(
          map?.[key]?.score
        )
      )
      .filter(
        Number.isFinite
      );

  if (!values.length) {
    return 50;
  }

  return clamp(
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    ) / values.length
  );
}


function axisState(score) {

  if (score >= 68) {
    return {
      key: "strong",
      label: "Très porteur"
    };
  }

  if (score >= 57) {
    return {
      key: "good",
      label: "Plutôt fluide"
    };
  }

  if (score >= 44) {
    return {
      key: "mixed",
      label: "Nuancé"
    };
  }

  if (score >= 33) {
    return {
      key: "delicate",
      label: "Plus sensible"
    };
  }

  return {
    key: "tense",
    label: "Sous tension"
  };
}


function calculateAxis(
  definition,
  primaryDaily,
  targetDaily,
  matchResult
) {

  const a =
    dailyDomainScore(
      primaryDaily,
      definition.daily_domain
    );

  const b =
    dailyDomainScore(
      targetDaily,
      definition.daily_domain
    );

  const mean =
    (a + b) / 2;

  /*
   * 100 = même climat du jour.
   * 0 = dynamiques quotidiennes opposées.
   */
  const alignment =
    clamp(
      100 -
      Math.abs(a - b)
    );

  const anchor =
    relationshipAnchor(
      matchResult,
      definition.relationship_domains
    );

  /*
   * Le JOUR reste majoritaire.
   *
   * 70 % : climat actuel des deux personnes
   * 20 % : dynamique relationnelle de fond
   * 10 % : synchronisation des rythmes du jour
   */
  const score =
    clamp(
      mean * 0.70 +
      anchor * 0.20 +
      alignment * 0.10
    );

  return {
    ...definition,
    score:
      Math.round(score),
    state:
      axisState(score),
    primary_score:
      Math.round(a),
    target_score:
      Math.round(b),
    alignment:
      Math.round(alignment),
    relationship_anchor:
      Math.round(anchor)
  };
}


function strongestInfluences(
  daily,
  owner,
  limit = 2
) {

  const list =
    daily?.interpretation?.why_today;

  if (!Array.isArray(list)) {
    return [];
  }

  return list
    .filter(Boolean)
    .slice(0, limit)
    .map(item => ({
      owner,
      label:
        item.label || "",
      text:
        item.text || "",
      impact:
        item.impact || null,
      domain:
        item.domain || null,
      transiting_body:
        item.transiting_body || null,
      natal_body:
        item.natal_body || null,
      aspect_type:
        item.aspect_type || null,
      orb:
        Number.isFinite(
          Number(item.orb)
        )
          ? Number(item.orb)
          : null,
      orb_strength:
        Number.isFinite(
          Number(item.orb_strength)
        )
          ? Number(item.orb_strength)
          : null,
      value:
        Number.isFinite(
          Number(item.value)
        )
          ? Number(item.value)
          : 0
    }));
}


function sharedActivations(
  primaryDaily,
  targetDaily
) {

  const a =
    strongestInfluences(
      primaryDaily,
      "primary",
      3
    );

  const b =
    strongestInfluences(
      targetDaily,
      "target",
      3
    );

  const bodiesA =
    new Set(
      a
        .map(item =>
          item.transiting_body
        )
        .filter(Boolean)
    );

  return [
    ...new Set(
      b
        .map(item =>
          item.transiting_body
        )
        .filter(body =>
          body &&
          bodiesA.has(body)
        )
    )
  ];
}


function climateHeadline(
  axes
) {

  const average =
    axes.reduce(
      (sum, axis) =>
        sum + axis.score,
      0
    ) / axes.length;

  if (average >= 67) {
    return "Le courant du jour vous porte plutôt dans le même sens";
  }

  if (average >= 56) {
    return "Le climat entre vous est plutôt favorable aujourd'hui";
  }

  if (average >= 44) {
    return "Une journée nuancée entre vous";
  }

  if (average >= 33) {
    return "Le climat demande un peu plus d'ajustement aujourd'hui";
  }

  return "Une journée plus sensible dans votre dynamique";
}


function climateSummary(
  axes
) {

  const sorted =
    [...axes].sort(
      (a, b) =>
        b.score - a.score
    );

  const strongest =
    sorted[0];

  const sensitive =
    sorted[
      sorted.length - 1
    ];

  if (
    strongest &&
    sensitive &&
    strongest.key !==
      sensitive.key &&
    Math.abs(
      strongest.score -
      sensitive.score
    ) >= 8
  ) {
    return (
      `${strongest.label} ressort comme le terrain le plus simple aujourd'hui. ` +
      `${sensitive.label} demande davantage d'attention ou de souplesse.`
    );
  }

  return (
    "Les différents aspects de votre dynamique évoluent aujourd'hui " +
    "sans qu'un seul terrain ne domine nettement."
  );
}


export function buildRelationshipDailyClimate({
  primaryDaily,
  targetDaily,
  matchResult,
  mode = "love",
  primaryName = "Toi",
  targetName = "L'autre"
}) {

  if (
    !primaryDaily ||
    !targetDaily
  ) {
    throw new TypeError(
      "PRIMARY_AND_TARGET_DAILY_REQUIRED"
    );
  }

  const normalizedMode =
    MODE_AXES[mode]
      ? mode
      : "love";

  const definitions =
    MODE_AXES[
      normalizedMode
    ];

  const axes =
    definitions.map(
      definition =>
        calculateAxis(
          definition,
          primaryDaily,
          targetDaily,
          matchResult
        )
    );

  const influences = [
    ...strongestInfluences(
      primaryDaily,
      "primary"
    ),
    ...strongestInfluences(
      targetDaily,
      "target"
    )
  ].sort(
    (a, b) =>
      Math.abs(b.value) -
      Math.abs(a.value)
  );

  return {
    version:
      RELATIONSHIP_DAILY_VERSION,

    date:
      primaryDaily.date ||
      targetDaily.date ||
      null,

    mode:
      normalizedMode,

    profiles: {
      primary: primaryName,
      target: targetName
    },

    headline:
      climateHeadline(
        axes
      ),

    summary:
      climateSummary(
        axes
      ),

    axes,

    shared_activations:
      sharedActivations(
        primaryDaily,
        targetDaily
      ),

    influences:
      influences.slice(0, 4),

    reliability: {
      primary_real_sky:
        primaryDaily?.reliability
          ?.real_astronomical_positions === true,

      target_real_sky:
        targetDaily?.reliability
          ?.real_astronomical_positions === true
    }
  };
}
