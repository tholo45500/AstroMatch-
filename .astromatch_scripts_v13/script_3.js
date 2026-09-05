
/*
 * ============================================================
 * ASTROMATCH RELATIONSHIP VIEW ENGINE
 * ------------------------------------------------------------
 * PRESENTATION ONLY
 *
 * Les scores utilisés ici proviennent exclusivement des
 * domaines déjà calculés par l'API AstroMatch.
 *
 * Aucun recalcul astrologique.
 * Aucun changement du scoring V1.2.
 * Aucun nouveau facteur astrologique.
 * ============================================================
 */

let ASTROMATCH_RESULT = null;
let CURRENT_RELATIONSHIP_MODE = "love";

function relationshipEscapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const RELATIONSHIP_META = {
  love: {
    icon: "❤️",
    title: "Amour",
    subtitle: "Affection, proximité et construction du couple"
  },
  friendship: {
    icon: "🤝",
    title: "Amitié",
    subtitle: "Complicité, confiance et qualité des échanges"
  },
  flirt: {
    icon: "🔥",
    title: "Flirt",
    subtitle: "Attirance, alchimie et dynamique de séduction"
  }
};

const RELATIONSHIP_WEIGHTS = {
  love: {
    love: 0.30,
    emotions: 0.20,
    communication: 0.15,
    passion: 0.20,
    daily: 0.10,
    projects: 0.05,
    frictions: 0.20
  },

  friendship: {
    love: 0.05,
    emotions: 0.25,
    communication: 0.30,
    passion: 0.05,
    daily: 0.20,
    projects: 0.15,
    frictions: 0.15
  },

  flirt: {
    love: 0.35,
    emotions: 0.10,
    communication: 0.15,
    passion: 0.40,
    daily: 0.00,
    projects: 0.00,
    frictions: 0.15
  }
};

function relationshipDomainMap(result) {
  const map = {};

  for (const d of (result?.domains || [])) {
    if (d?.domain) map[d.domain] = d;
  }

  return map;
}

function numericScore(domain, fallback = 50) {
  const n = Number(domain?.score);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(100, n));
}

function calculateRelationshipScore(mode, result) {
  const domains = relationshipDomainMap(result);
  const weights = RELATIONSHIP_WEIGHTS[mode];

  if (!weights) return 50;

  let total = 0;
  let weightTotal = 0;

  for (const domain of [
    "love",
    "emotions",
    "communication",
    "passion",
    "daily",
    "projects"
  ]) {
    const weight = Number(weights[domain] || 0);

    if (!weight) continue;

    total += numericScore(domains[domain]) * weight;
    weightTotal += weight;
  }

  let score = weightTotal ? total / weightTotal : 50;

  /*
   * IMPORTANT :
   * Dans l'Interpretation Engine actuel, frictions = 0 avec
   * contribution_count = 0 signifie qu'aucune règle dédiée
   * de friction n'a contribué.
   *
   * Ce n'est PAS un score de "zéro friction".
   * On ne pénalise donc que lorsqu'un vrai domaine de friction
   * contient des contributions.
   */
  const frictionWeight = Number(weights.frictions || 0);
  const frictionDomain = domains.frictions;
  const frictionContributions = Number(
    frictionDomain?.contribution_count || 0
  );

  if (frictionWeight > 0 && frictionContributions > 0) {
    const friction = numericScore(frictionDomain);
    score -= Math.max(0, 50 - friction) * frictionWeight;
  }

  return Math.round(Math.max(0, Math.min(100, score)) * 100) / 100;
}

function relationshipLevel(score) {
  if (score >= 80) return "Exceptionnel";
  if (score >= 70) return "Très élevé";
  if (score >= 60) return "Élevé";
  if (score >= 50) return "Équilibré";
  if (score >= 40) return "Modéré";
  if (score >= 30) return "Faible";
  return "Très faible";
}


function debugFactorObject(value) {
  try {
    const root = value ?? {};
    const item = root?.item ?? root ?? {};

    const candidates = {
      root_rule_id: root?.rule_id,
      root_ruleId: root?.ruleId,
      root_factor_id: root?.factor_id,
      root_factorId: root?.factorId,
      root_id: root?.id,
      root_code: root?.code,
      root_key: root?.key,

      item_rule_id: item?.rule_id,
      item_ruleId: item?.ruleId,
      item_factor_id: item?.factor_id,
      item_factorId: item?.factorId,
      item_id: item?.id,
      item_code: item?.code,
      item_key: item?.key
    };

    console.log(
      "ASTROMATCH FACTOR DEBUG",
      JSON.stringify({
        root,
        item,
        candidates
      }, null, 2)
    );

    return {
      root,
      item,
      candidates
    };
  } catch (error) {
    console.error("ASTROMATCH FACTOR DEBUG ERROR", error);
    return null;
  }
}

function factorText(item) {
  /*
   * ASTROMATCH V1.2
   *
   * factorText() appartient au script classique.
   * humanFactorLabel() appartient au script module.
   *
   * Le pont officiel entre les deux est :
   * window.__astromatchHumanFactorLabel
   */

  if (
    typeof window !== "undefined" &&
    typeof window.__astromatchHumanFactorLabel === "function"
  ) {
    return window.__astromatchHumanFactorLabel(item);
  }

  /*
   * Fallback de sécurité si le module n'est pas encore chargé.
   */
  if (typeof item === "string") {
    return item;
  }

  return (
    item?.label ||
    item?.title ||
    item?.name ||
    "Un facteur astrologique influence cette relation"
  );
}

function getAllFactors(result) {
  const factors = [];

  for (const domain of (result?.domains || [])) {
    for (const item of (domain?.strengths || [])) {
      factors.push({
        domain: domain.domain,
        type: "strength",
        item
      });
    }

    for (const item of (domain?.tensions || [])) {
      factors.push({
        domain: domain.domain,
        type: "tension",
        item
      });
    }

    for (const item of (domain?.mixed_factors || [])) {
      factors.push({
        domain: domain.domain,
        type: "mixed",
        item
      });
    }

    for (const item of (domain?.key_factors || [])) {
      factors.push({
        domain: domain.domain,
        type: "key",
        item
      });
    }
  }

  return factors;
}

function uniqueFactors(items) {
  const seen = new Set();

  return items.filter(entry => {
    const text = factorText(entry.item || entry);

    if (!text) return false;

    const key = text.toLowerCase().trim();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function modeRelevantDomains(mode) {
  if (mode === "love") {
    return ["love", "emotions", "communication", "passion", "daily", "projects"];
  }

  if (mode === "friendship") {
    return ["communication", "emotions", "daily", "projects", "love"];
  }

  return ["passion", "love", "communication", "emotions"];
}



function uniqueDisplayFactors(factors) {
  const seen = new Set();

  return (Array.isArray(factors) ? factors : []).filter((factor) => {
    const item = factor?.item ?? factor;

    const key = String(
      item?.rule_id ??
      item?.ruleId ??
      item?.factor_id ??
      item?.factorId ??
      item?.id ??
      item?.code ??
      item?.key ??
      humanFactorLabel(item)
    ).toUpperCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function factorTypeIcon(type) {
  switch (String(type || "").toLowerCase()) {
    case "key":
      return "◆";
    case "strength":
      return "✓";
    case "tension":
      return "⚠";
    case "mixed":
      return "⚖";
    default:
      return "•";
  }
}

function factorTypeLabel(type) {
  switch (String(type || "").toLowerCase()) {
    case "key":
      return "Facteur clé";
    case "strength":
      return "Point favorable";
    case "tension":
      return "Point de vigilance";
    case "mixed":
      return "Facteur mixte";
    default:
      return "Facteur";
  }
}

function modeFactors(mode, result) {
  const domains = modeRelevantDomains(mode);
  const factors = getAllFactors(result)
    .filter(f => domains.includes(f.domain));

  const factorKey = (entry) => {
    const item = entry?.item ?? entry;

    return String(
      item?.rule_id ??
      item?.ruleId ??
      item?.factor_id ??
      item?.factorId ??
      item?.id ??
      item?.code ??
      item?.key ??
      humanFactorLabel(item)
    ).toUpperCase();
  };

  /*
   * Un même facteur peut apparaître dans plusieurs catégories
   * internes (strength / key / mixed / tension).
   *
   * Pour l'utilisateur final :
   * → une seule occurrence par facteur.
   *
   * On conserve la catégorie la plus pertinente :
   * tension/mixed > strength > key.
   */
  const priority = {
    tension: 3,
    mixed: 3,
    strength: 2,
    key: 1
  };

  const byKey = new Map();

  for (const factor of factors) {
    const key = factorKey(factor);
    const current = byKey.get(key);

    if (!current) {
      byKey.set(key, factor);
      continue;
    }

    const currentPriority = priority[current.type] || 0;
    const factorPriority = priority[factor.type] || 0;

    if (factorPriority > currentPriority) {
      byKey.set(key, factor);
    }
  }

  const typePriority = {
    key: 4,
    strength: 3,
    tension: 2,
    mixed: 1
  };

  const contributionOf = (f) =>
    Number(
      f?.item?.contribution?.score ??
      f?.item?.score ??
      f?.score ??
      0
    );

  const unique = [...byKey.values()].sort((a, b) => {
    const pa = typePriority[a.type] ?? 0;
    const pb = typePriority[b.type] ?? 0;

    if (pb !== pa) return pb - pa;

    return contributionOf(b) - contributionOf(a);
  });

  const positives = unique.filter(
    f => f.type === "strength" || f.type === "key"
  );

  const negatives = unique.filter(
    f => f.type === "tension" || f.type === "mixed"
  );

  return {
    all: unique,
    positives,
    negatives
  };
}

function itemHtml(title, text, badge = "") {
  return `
    <div class="relationship-item">
      <div class="flex items-start justify-between gap-3">
        <div class="relationship-item-title">${relationshipEscapeHtml(title)}</div>
        ${badge ? `<span class="relationship-badge">${relationshipEscapeHtml(badge)}</span>` : ""}
      </div>
      <div class="relationship-item-text">${relationshipEscapeHtml(text)}</div>
    </div>
  `;
}

function emptyHtml(text) {
  return `
    <div class="relationship-empty">
      ${relationshipEscapeHtml(text)}
    </div>
  `;
}

function buildPositiveExplanation(mode, factor, score) {
  const specific = relationshipSpecificExplanation(
    factor,
    mode,
    factor?.type
  );

  if (specific) return specific;

  if (mode === "love") {
    return "Cette dynamique peut soutenir l'attirance, la complicité ou la construction du couple.";
  }

  if (mode === "friendship") {
    return "Cette dynamique peut soutenir la complicité, la confiance et une relation naturelle.";
  }

  return "Cette dynamique peut faciliter la connexion et les échanges dans une dynamique de séduction.";
}

function buildNegativeExplanation(mode, factor) {
  const specific = relationshipSpecificExplanation(
    factor,
    mode,
    factor?.type
  );

  if (specific) return specific;

  if (mode === "love") {
    return "Cette dynamique peut créer des incompréhensions ou des tensions si elle est mal gérée.";
  }

  if (mode === "friendship") {
    return "Cette dynamique demande surtout de respecter le rythme et la façon de communiquer de chacun.";
  }

  return "Cette dynamique peut créer de la tension dans la séduction si elle devient un rapport de force.";
}

function buildAdvice(mode, score, factors) {
  const advice = [];

  const hasFactor = (...patterns) =>
    factors.all.some(f => {
      const text = factorText(f.item);
      return patterns.some(pattern => pattern.test(text));
    });

  if (mode === "love") {
    advice.push({
      title: "Communique clairement",
      text: "Quand quelque chose est important, dis-le directement plutôt que de laisser l'autre deviner."
    });

    advice.push({
      title: "Laisse respirer la relation",
      text: "La complémentarité fonctionne mieux quand chacun conserve son espace et son rythme."
    });

    if (
      hasFactor(
        /v[ée]nus.*jupiter/i,
        /jupiter.*v[ée]nus/i,
        /harmonie affective/i,
        /chaleureuse/i
      )
    ) {
      advice.push({
        title: "Entretiens la générosité",
        text: "Quand l'affection et la générosité circulent naturellement, prends le temps de les entretenir sans les considérer comme acquises."
      });
    }

    if (
      hasFactor(
        /lune.*v[ée]nus/i,
        /v[ée]nus.*lune/i,
        /harmonie.*affective/i
      )
    ) {
      advice.push({
        title: "Nourris la proximité",
        text: "Les petites attentions et les moments de douceur peuvent renforcer naturellement le sentiment de proximité."
      });
    }

    if (
      factors.negatives.some(f =>
        /mercury.*moon|moon.*mercury|mercure.*lune|lune.*mercure/i
          .test(factorText(f.item))
      )
    ) {
      advice.push({
        title: "En cas de malentendu",
        text: "Reviens aux faits, reformule et demande ce que l'autre voulait réellement dire."
      });
    }
  }

  if (mode === "friendship") {
    advice.push({
      title: "Misez sur la simplicité",
      text: "Les meilleurs moments viennent souvent des échanges naturels, sans chercher à surinterpréter chaque réaction."
    });

    advice.push({
      title: "Entretenez la complicité",
      text: "Une activité partagée ou un projet commun peut renforcer la dynamique."
    });

    advice.push({
      title: "Respecte le rythme",
      text: "Une bonne amitié n'a pas besoin d'être constamment présente pour rester solide."
    });

    if (
      hasFactor(
        /mercure.*v[ée]nus/i,
        /v[ée]nus.*mercure/i,
        /mercure.*mars/i,
        /mars.*mercure/i
      )
    ) {
      advice.push({
        title: "Profite de la fluidité",
        text: "Quand les échanges sont naturellement stimulants, laisse la conversation et les activités communes créer la complicité."
      });
    }
  }

  if (mode === "flirt") {
    advice.push({
      title: "Joue sur la légèreté",
      text: "Humour, curiosité et échanges naturels sont généralement plus efficaces que la pression ou les déclarations trop rapides."
    });

    advice.push({
      title: "Observe la réciprocité",
      text: "Avance lorsque l'intérêt est partagé et laisse de l'espace lorsque les signaux sont ambigus."
    });

    if (
      factors.negatives.some(f =>
        /venus.*mars|mars.*venus|v[ée]nus.*mars/i
          .test(factorText(f.item))
      )
    ) {
      advice.push({
        title: "Canalise l'intensité",
        text: "La tension peut être séduisante, mais évite les provocations, les jalousies fabriquées et les rapports de force."
      });
    }

    if (
      hasFactor(
        /venus.*mars/i,
        /mars.*venus/i,
        /attirance.*intense/i,
        /chimie/i
      )
    ) {
      advice.push({
        title: "Laisse monter l'alchimie",
        text: "Une forte attirance gagne souvent à rester spontanée : montre ton intérêt sans chercher à forcer le rythme."
      });
    }

    if (
      hasFactor(
        /jupiter.*uranus/i,
        /uranus.*jupiter/i,
        /spontan[ée]it[ée]/i,
        /curiosit[ée]/i
      )
    ) {
      advice.push({
        title: "Garde une part de surprise",
        text: "La curiosité et la nouveauté peuvent nourrir l'attirance : laisse de la place à l'imprévu."
      });
    }
  }

  return advice.slice(0, 3);
}
function relationshipSpecificExplanation(factor, mode, classification) {
  const item = factor?.item ?? factor;

  const id = String(
    item?.rule_id ??
    item?.ruleId ??
    item?.factor_id ??
    item?.factorId ??
    item?.id ??
    item?.code ??
    item?.key ??
    ""
  ).toUpperCase();

  const texts = {
    "V11_SUN_VENUS_OPPOSITION": {
      mixed:
        "Attirance et complémentarité peuvent être fortes, mais chacun peut avoir une façon différente d'exprimer l'affection ou de définir la proximité.",
      advice:
        "Cherche l'équilibre entre rapprochement et liberté personnelle."
    },

    "V11_VENUS_JUPITER_TRINE": {
      favorable:
        "Une dynamique naturellement chaleureuse peut faciliter la générosité, l'affection et le plaisir d'être ensemble.",
      advice:
        "Entretiens cette facilité sans prendre les bons moments pour acquis."
    },

    "V11B_JUPITER_NEPTUNE_TRINE": {
      favorable:
        "Cette dynamique peut favoriser la bienveillance, l'ouverture et une vision positive de l'autre.",
      advice:
        "Profite de cette ouverture tout en gardant les attentes réalistes."
    },

    "V11_MERCURY_MOON_SQUARE": {
      tension:
        "Le risque principal est le décalage entre ce qui est dit et ce qui est ressenti. Une parole peut être comprise différemment de l'intention initiale.",
      advice:
        "Quand un sujet compte, dis clairement ce que tu ressens et vérifie ce que l'autre a compris."
    },

    "V11_VENUS_MARS_SQUARE": {
      tension:
        "La chimie et l'attirance peuvent être fortes, mais elles peuvent aussi créer de l'impatience, des réactions vives ou des rapports de force.",
      advice:
        "Entretiens la tension positive sans transformer les désaccords en compétition."
    },

    "V11B_JUPITER_URANUS_TRINE": {
      favorable:
        "Cette dynamique peut apporter ouverture, curiosité et envie d'expérimenter de nouvelles choses ensemble.",
      advice:
        "Laisse de la place à la spontanéité et aux projets nouveaux."
    }
  };

  const data = texts[id];

  if (!data) return null;

  if (classification === "mixed") {
    return data.mixed || data.advice || null;
  }

  if (classification === "tension") {
    return data.tension || data.advice || null;
  }

  return data.favorable || data.advice || null;
}

function renderRelationshipMode() {
  const result = ASTROMATCH_RESULT;

  if (!result) return;

  const meta = RELATIONSHIP_META[CURRENT_RELATIONSHIP_MODE];
  const score = calculateRelationshipScore(
    CURRENT_RELATIONSHIP_MODE,
    result
  );

  const factors = modeFactors(
    CURRENT_RELATIONSHIP_MODE,
    result
  );

  const scoreEl = document.getElementById("relationshipScore");
  const levelEl = document.getElementById("relationshipLevel");
  const iconEl = document.getElementById("relationshipIcon");
  const titleEl = document.getElementById("relationshipTitle");
  const subtitleEl = document.getElementById("relationshipSubtitle");

  if (iconEl) iconEl.textContent = meta.icon;
  if (titleEl) titleEl.textContent = meta.title;
  if (subtitleEl) subtitleEl.textContent = meta.subtitle;

  if (scoreEl) {
    scoreEl.textContent = Number(score).toFixed(0);
  }

  if (levelEl) {
    levelEl.textContent = relationshipLevel(score);
  }

  for (const id of ["love", "friendship", "flirt"]) {
    const tab = document.getElementById(`tab-${id}`);

    if (tab) {
      tab.classList.toggle(
        "active",
        id === CURRENT_RELATIONSHIP_MODE
      );
    }
  }

  const whyMatch = document.getElementById("whyMatch");
  const whyNot = document.getElementById("whyNot");
  const advice = document.getElementById("advice");
  const doList = document.getElementById("doList");
  const dontList = document.getElementById("dontList");
  const relationshipFactors = document.getElementById("relationshipFactors");

  if (whyMatch) {
    if (!factors.positives.length) {
      whyMatch.innerHTML = emptyHtml(
        "Aucune dynamique favorable particulièrement marquée n’a été détectée ici."
      );
    } else {
      whyMatch.innerHTML = factors.positives
        .slice(0, 4)
        .map(f =>
          itemHtml(
            factorText(f.item),
            buildPositiveExplanation(
              CURRENT_RELATIONSHIP_MODE,
              f,
              score
            ),
            null
          )
        )
        .join("");
    }
  }

  if (whyNot) {
    if (!factors.negatives.length) {
      whyNot.innerHTML = emptyHtml(
        "Aucun facteur de tension majeur n’a été détecté dans les domaines qui comptent le plus pour cette dynamique."
      );
    } else {
      whyNot.innerHTML = factors.negatives
        .slice(0, 4)
        .map(f =>
          itemHtml(
            factorText(f.item),
            buildNegativeExplanation(
              CURRENT_RELATIONSHIP_MODE,
              f
            ),
            null
          )
        )
        .join("");
    }
  }

  const adviceItems = buildAdvice(
    CURRENT_RELATIONSHIP_MODE,
    score,
    factors
  );

  if (advice) {
    advice.innerHTML = adviceItems
      .map(a => itemHtml(a.title, a.text))
      .join("");
  }

  if (doList) {
    const list = [];

    if (CURRENT_RELATIONSHIP_MODE === "love") {
      list.push("Exprime clairement tes intentions.");
      list.push("Laisse de l'espace à l'autre.");
      list.push("Privilégie les discussions directes.");
    }

    if (CURRENT_RELATIONSHIP_MODE === "friendship") {
      list.push("Entretenez une complicité simple.");
      list.push("Partagez des activités ou projets.");
      list.push("Respecte les moments de distance.");
    }

    if (CURRENT_RELATIONSHIP_MODE === "flirt") {
      list.push("Reste léger et naturel.");
      list.push("Observe la réciprocité.");
      list.push("Utilise l'humour plutôt que la pression.");
    }

    doList.innerHTML = list
      .map(x => `<div>• ${relationshipEscapeHtml(x)}</div>`)
      .join("");
  }

  if (dontList) {
    const list = [];

    if (CURRENT_RELATIONSHIP_MODE === "love") {
      list.push("Évite les non-dits importants.");
      list.push("Évite les rapports de force.");
      list.push("Évite de tout interpréter.");
    }

    if (CURRENT_RELATIONSHIP_MODE === "friendship") {
      list.push("Évite de mettre une pression affective.");
      list.push("Évite les tests ou sous-entendus.");
      list.push("Évite de dramatiser les silences.");
    }

    if (CURRENT_RELATIONSHIP_MODE === "flirt") {
      list.push("Évite de forcer le rapprochement.");
      list.push("Évite la jalousie provoquée.");
      list.push("Évite les jeux de pouvoir.");
    }

    dontList.innerHTML = list
      .map(x => `<div>• ${relationshipEscapeHtml(x)}</div>`)
      .join("");
  }

  if (relationshipFactors) {
    if (!factors.all.length) {
      relationshipFactors.innerHTML = emptyHtml(
        "Aucun facteur spécifique détecté pour ce mode."
      );
    } else {
      relationshipFactors.innerHTML = factors.all
        .slice(0, 8)
        .map(f =>
          `<div class="flex items-center gap-2 text-sm">
             <span class="text-slate-400">•</span>
             <span>${relationshipEscapeHtml(factorText(f.item))}</span>
           </div>`
        )
        .join("");
    }
  }
}

function selectRelationshipMode(mode) {
  if (!RELATIONSHIP_META[mode]) return;

  CURRENT_RELATIONSHIP_MODE = mode;
  renderRelationshipMode();
}

window.selectRelationshipMode = selectRelationshipMode;

window.setAstroMatchRelationshipResult = function(result) {
  ASTROMATCH_RESULT = result;
  renderRelationshipMode();
};
