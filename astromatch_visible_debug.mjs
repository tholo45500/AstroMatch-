

const API_URL = "http://127.0.0.1:3000/api/match";

const diagnostic = document.getElementById("jsDiagnostic");

function status(message) {
  if (diagnostic) {
    diagnostic.textContent = message;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   PROFILS REELS
   ========================================================= */

function getStoredProfiles() {
  const raw = localStorage.getItem("astromatch:profiles");

  if (!raw) {
    throw new Error("AUCUN_PROFIL_STOCKE");
  }

  let profiles;

  try {
    profiles = JSON.parse(raw);
  } catch {
    throw new Error("PROFILS_JSON_INVALIDE");
  }

  if (!Array.isArray(profiles)) {
    throw new Error("PROFILS_FORMAT_INVALIDE");
  }

  return profiles;
}

function getRealProfiles() {
  const profiles = getStoredProfiles();

  const primary = profiles.find(
    profile => profile?.role === "primary"
  );

  if (!primary) {
    throw new Error("PROFIL_PRINCIPAL_INTRouvable");
  }

  const linkedTargets = profiles.filter(
    profile =>
      profile?.role === "target" &&
      profile?.linked_primary_id === primary.profile_id
  );

  /*
   * Compatibilité avec d'anciens profils target
   * ne possédant pas encore linked_primary_id.
   */
  const fallbackTargets = profiles.filter(
    profile =>
      profile?.role === "target" &&
      !profile?.linked_primary_id
  );

  const targets = [
    ...linkedTargets,
    ...fallbackTargets.filter(
      fallback =>
        !linkedTargets.some(
          target => target?.profile_id === fallback?.profile_id
        )
    )
  ];

  if (!targets.length) {
    throw new Error("AUCUN_PROFIL_CIBLE");
  }

  return {
    primary,
    targets
  };
}

/* =========================================================
   PROFIL STOCKE -> INPUT API
   ========================================================= */

function profileToApiInput(profile) {
  if (!profile) {
    throw new Error("PROFIL_INVALIDE");
  }

  const birth = profile.birth_data || {};
  const time = birth.time || {};
  const place = birth.place || {};
  const resolved = place.resolved || {};

  return {
    role: profile.role,

    first_name:
      profile.identity?.first_name || "",

    last_name:
      profile.identity?.last_name || "",

    date:
      birth.date || "",

    time:
      time.value || "",

    time_known:
      Boolean(time.known),

    place:
      place.raw_input || "",

    latitude:
      resolved.latitude,

    longitude:
      resolved.longitude,

    timezone_id:
      resolved.timezone_id,

    house_system:
      profile.house_system || "whole_sign",

    linked_primary_id:
      profile.linked_primary_id || null
  };
}

/* =========================================================
   RENDU DES DOMAINES
   ========================================================= */


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

const LEVEL_LABELS = {
  exceptional: "Exceptionnel",
  very_high: "Très élevé",
  high: "Élevé",
  balanced: "Équilibré",
  moderate: "Modéré",
  low: "Faible",
  very_low: "Très faible"
};

const FACTOR_LABELS = {
  V11_SUN_VENUS_OPPOSITION: "Soleil — Vénus en opposition",
  V11_VENUS_JUPITER_TRINE: "Vénus — Jupiter en trigone",
  V11_MERCURY_MOON_SQUARE: "Mercure — Lune en carré",
  V11_VENUS_MARS_SQUARE: "Vénus — Mars en carré",
  V11B_JUPITER_NEPTUNE_TRINE: "Jupiter — Neptune en trigone",
  V11B_JUPITER_URANUS_TRINE: "Jupiter — Uranus en trigone"
};


const FACTOR_FALLBACK_LABELS = {
  "SUN_VENUS_OPPOSITION": "Soleil — Vénus en opposition",
  "VENUS_JUPITER_TRINE": "Vénus — Jupiter en trigone",
  "MERCURY_MOON_SQUARE": "Mercure — Lune en carré",
  "VENUS_MARS_SQUARE": "Vénus — Mars en carré",
  "JUPITER_NEPTUNE_TRINE": "Jupiter — Neptune en trigone",
  "JUPITER_URANUS_TRINE": "Jupiter — Uranus en trigone"
};

/*
 * ============================================================
 * ASTROMATCH V1.2 — HUMAN FACTORS
 * ------------------------------------------------------------
 * Les rule_id sont internes au moteur.
 * L'utilisateur final voit une formulation naturelle.
 *
 * 51 / 51 règles V1.2 couvertes.
 * Aucun impact sur le scoring ou le calcul astrologique.
 * ============================================================
 */

const ASTROMATCH_HUMAN_FACTORS = {

  AMOUR_VENUS_CONJ_VENUS:
    "Une façon d’aimer très proche",

  AMOUR_VENUS_TRI_SOLEIL:
    "Une belle harmonie entre affection et personnalité",

  AMOUR_SATURNE_CARRE_VENUS:
    "L’affection peut parfois sembler retenue",

  PASSION_VENUS_CONJ_MARS:
    "Une forte alchimie et une attirance naturelle",

  PASSION_MARS_TRI_PLUTON:
    "Une énergie passionnée et profondément intense",

  COMM_MERCURE_SEX_MERCURE:
    "Une communication fluide et complémentaire",

  COMM_MERCURE_CARRE_MARS:
    "Les discussions peuvent parfois devenir très vives",

  EMOTIONS_LUNE_CONJ_LUNE:
    "Une forte résonance émotionnelle",

  EMOTIONS_LUNE_OPPO_NEPTUNE:
    "Les émotions peuvent parfois manquer de clarté",

  QUOTIDIEN_SATURNE_TRI_LUNE:
    "Un bon équilibre entre stabilité et émotions",

  PROJETS_SOLEIL_CONJ_SATURNE:
    "Une capacité à construire quelque chose de solide",

  FRICTIONS_MARS_OPPO_SATURNE:
    "Des blocages peuvent apparaître face aux initiatives",

  FRICTIONS_URANUS_CARRE_MARS:
    "Une dynamique imprévisible peut créer des tensions",

  V11_SUN_MOON_CONJ:
    "Une forte connexion entre identité et émotions",

  V11_SUN_MOON_TRINE:
    "Une belle harmonie entre personnalité et émotions",

  V11_SUN_MOON_SQUARE:
    "La personnalité et les émotions peuvent parfois diverger",

  V11_SUN_VENUS_CONJ:
    "Une affection naturelle et spontanée",

  V11_SUN_VENUS_SEXTILE:
    "Une bonne entente entre personnalité et affection",

  V11_SUN_VENUS_OPPOSITION:
    "Une forte attirance, avec des différences de fonctionnement",

  V11_MOON_VENUS_CONJ:
    "Une grande douceur et une affection naturelle",

  V11_MOON_VENUS_TRINE:
    "Une belle harmonie affective",

  V11_MOON_VENUS_SQUARE:
    "Les besoins affectifs peuvent parfois se heurter",

  V11_MERCURY_MOON_TRINE:
    "Une bonne compréhension entre pensées et émotions",

  V11_MERCURY_MOON_SQUARE:
    "Les émotions peuvent parfois compliquer les échanges",

  V11_MERCURY_VENUS_CONJ:
    "Une communication naturellement chaleureuse",

  V11_MERCURY_VENUS_TRINE:
    "Une communication naturelle et agréable",

  V11_MERCURY_MARS_TRINE:
    "Des échanges dynamiques et stimulants",

  V11_MOON_MARS_TRINE:
    "Une énergie émotionnelle qui circule naturellement",

  V11_MOON_MARS_SQUARE:
    "Les émotions peuvent parfois provoquer des réactions fortes",

  V11_VENUS_MARS_TRINE:
    "Une belle alchimie entre affection et passion",

  V11_VENUS_MARS_SQUARE:
    "Une attirance intense et parfois électrique",

  V11_VENUS_JUPITER_CONJ:
    "Une grande générosité dans les sentiments",

  V11_VENUS_JUPITER_TRINE:
    "Une belle harmonie affective et généreuse",

  V11_SUN_JUPITER_TRINE:
    "Une énergie positive qui encourage la confiance",

  V11_MOON_JUPITER_TRINE:
    "Une chaleur émotionnelle et une belle générosité",

  V11_JUPITER_SATURN_TRINE:
    "Une bonne capacité à faire grandir des projets durables",

  V11B_JUPITER_URANUS_CONJ:
    "Une relation qui encourage le changement et la découverte",

  V11B_JUPITER_URANUS_TRINE:
    "Une énergie qui pousse à découvrir de nouvelles choses",

  V11B_JUPITER_URANUS_SQUARE:
    "Des envies différentes peuvent créer de l’instabilité",

  V11B_JUPITER_NEPTUNE_CONJ:
    "Une forte capacité à partager des rêves et des idéaux",

  V11B_JUPITER_NEPTUNE_TRINE:
    "Une vision commune qui peut nourrir les rêves",

  V11B_JUPITER_NEPTUNE_SQUARE:
    "Les attentes et les idéaux peuvent parfois manquer de réalisme",

  V11B_JUPITER_PLUTO_CONJ:
    "Une relation qui peut provoquer de profondes transformations",

  V11B_JUPITER_PLUTO_TRINE:
    "Une dynamique puissante qui favorise l’évolution",

  V11B_JUPITER_PLUTO_SQUARE:
    "Les ambitions peuvent parfois provoquer des rapports de force",

  V11B_SATURN_URANUS_TRINE:
    "Un bon équilibre entre stabilité et changement",

  V11B_SATURN_URANUS_SQUARE:
    "Le besoin de stabilité peut entrer en conflit avec l’envie de liberté",

  V11B_SATURN_NEPTUNE_TRINE:
    "La stabilité peut donner une forme concrète aux rêves",

  V11B_SATURN_NEPTUNE_SQUARE:
    "Les responsabilités peuvent parfois freiner les aspirations",

  V11B_SATURN_PLUTO_TRINE:
    "Une grande capacité à traverser les changements ensemble",

  V11B_SATURN_PLUTO_SQUARE:
    "Les périodes de changement peuvent créer une forte pression",

};


/*
 * Retourne uniquement le libellé humain destiné à l'interface.
 * Le rule_id reste accessible dans les données techniques.
 */
function humanFactorLabel(value) {
  const root = value ?? {};
  const item = root?.item ?? root ?? {};

  /*
   * ==========================================================
   * RESOLUTION HUMAN FACTOR — PRIORITE AU VRAI RULE_ID
   * ==========================================================
   *
   * IMPORTANT :
   * "id", "code" et "key" peuvent être des identifiants
   * techniques d'objet et ne doivent jamais prendre priorité
   * sur le rule_id AstroMatch.
   */

  const ruleIdCandidates = [
    root?.rule_id,
    root?.ruleId,

    item?.rule_id,
    item?.ruleId,

    root?.contribution?.rule_id,
    root?.contribution?.ruleId,

    root?.rule?.rule_id,
    root?.rule?.ruleId,

    root?.factor?.rule_id,
    root?.factor?.ruleId,

    item?.contribution?.rule_id,
    item?.contribution?.ruleId,

    item?.rule?.rule_id,
    item?.rule?.ruleId,

    item?.factor?.rule_id,
    item?.factor?.ruleId
  ];

  const ruleId = ruleIdCandidates.find(
    v =>
      v !== undefined &&
      v !== null &&
      String(v).trim() !== ""
  );

  const normalizedRuleId = String(
    ruleId ?? ""
  ).trim().toUpperCase();

  /*
   * PRIORITE ABSOLUE :
   * dictionnaire humain V1.2.
   */
  if (
    normalizedRuleId &&
    typeof ASTROMATCH_HUMAN_FACTORS !== "undefined" &&
    ASTROMATCH_HUMAN_FACTORS[normalizedRuleId]
  ) {
    const factor =
      ASTROMATCH_HUMAN_FACTORS[normalizedRuleId];

    if (typeof factor === "string") {
      return factor;
    }

    if (factor?.title) {
      return String(factor.title);
    }
  }

  /*
   * Fallback court pour compatibilité avec les anciennes
   * structures de facteurs.
   */
  const shortRuleId = normalizedRuleId
    .replace(/^V11B_/, "")
    .replace(/^V11_/, "")
    .replace(/^V\d+_/, "");

  if (
    shortRuleId &&
    typeof FACTOR_FALLBACK_LABELS !== "undefined" &&
    FACTOR_FALLBACK_LABELS[shortRuleId]
  ) {
    return FACTOR_FALLBACK_LABELS[shortRuleId];
  }

  /*
   * Seulement maintenant :
   * champs humains éventuellement fournis directement
   * par le backend.
   */
  const humanFields = [
    root?.name,
    root?.label,
    root?.title,

    item?.name,
    item?.label,
    item?.title
  ];

  const humanValue = humanFields.find(
    v =>
      v !== undefined &&
      v !== null &&
      String(v).trim() !== ""
  );

  if (humanValue) {
    return String(humanValue);
  }

  /*
   * Dernier recours :
   * aucun identifiant technique ne doit apparaître
   * dans l'interface utilisateur.
   */
  return "Un facteur astrologique influence cette relation";
}

/*
 * ==========================================================
 * ASTROMATCH V1.2 — BRIDGE SCRIPT CLASSIQUE -> MODULE
 * ==========================================================
 *
 * factorText() vit dans le script classique.
 * humanFactorLabel() vit dans le module.
 *
 * Exposition volontaire et contrôlée via window.
 */
if (typeof window !== "undefined") {
  window.__astromatchHumanFactorLabel = humanFactorLabel;
}



function humanLevelLabel(level) {
  return LEVEL_LABELS[String(level || "").toLowerCase()] || level || "";
}

function domainIcon(domain) {
  return DOMAIN_META[domain]?.icon || "✨";
}

function domainLabel(domain, fallback) {
  return DOMAIN_META[domain]?.label || fallback || domain || "";
}

function scoreProgressClass(score) {
  const n = Number(score);
  if (n >= 80) return "bg-emerald-400";
  if (n >= 60) return "bg-green-400";
  if (n >= 50) return "bg-violet-400";
  if (n >= 40) return "bg-amber-400";
  return "bg-rose-400";
}


function humanReliabilityLabel(level) {
  const labels = {
    full: "Complète",
    partial: "Partielle",
    degraded: "Dégradée",
    unknown: "Indisponible"
  };

  return labels[String(level || "").toLowerCase()] || level || "";
}

function factorCountLabel(count) {
  const n = Number(count) || 0;
  return `${n} ${n === 1 ? "facteur" : "facteurs"}`;
}

function renderDomains(domains) {
  const container = document.getElementById("domains");

  if (!container) return;

  if (!Array.isArray(domains) || domains.length === 0) {
    container.innerHTML =
      '<div class="text-gray-400">Aucun domaine disponible.</div>';
    return;
  }

  const html = domains.map(domain => {
    const score = Math.round(Number(domain?.score) || 0);
    const level = humanLevelLabel(domain?.level);

    const meta = DOMAIN_META[domain?.domain] || {};
    const icon = meta.icon || "✨";
    const label = meta.label || domain?.label || domain?.domain || "";

    const strengths = Array.isArray(domain?.strengths)
      ? domain.strengths
      : [];

    const tensions = Array.isArray(domain?.tensions)
      ? domain.tensions
      : [];

    const mixed = Array.isArray(domain?.mixed_factors)
      ? domain.mixed_factors
      : [];

    const keyFactors = Array.isArray(domain?.key_factors)
      ? domain.key_factors
      : [];

    const count = Number(domain?.contribution_count) || 0;

    /*
     * =========================================================
     * FACTEURS — DEDUPLICATION PAR FACTEUR
     * =========================================================
     *
     * Un même rule_id peut être présent simultanément dans :
     *   - strengths
     *   - tensions
     *   - mixed_factors
     *   - key_factors
     *
     * Ici on attribue chaque facteur à UNE SEULE catégorie.
     *
     * Priorité :
     *   1. mixed / tension
     *   2. key
     *   3. strength
     *
     * L'ID technique reste interne.
     * L'utilisateur ne voit que humanFactorLabel().
     */

    const factorIdentity = (item) => {
      if (typeof item === "string") {
        return item.trim().toUpperCase();
      }

      return String(
        item?.rule_id ??
        item?.ruleId ??
        item?.factor_id ??
        item?.factorId ??
        item?.id ??
        item?.code ??
        item?.key ??
        humanFactorLabel(item)
      ).trim().toUpperCase();
    };

    const usedFactors = new Set();

    const takeUnique = (items) => {
      const output = [];

      for (const item of items) {
        const key = factorIdentity(item);

        if (usedFactors.has(key)) {
          continue;
        }

        usedFactors.add(key);
        output.push(item);
      }

      return output;
    };

    /*
     * IMPORTANT :
     * On consomme les catégories dans l'ordre de priorité.
     * Ainsi un facteur MIXED qui est aussi KEY ne sera affiché
     * qu'une seule fois, dans "Facteurs mixtes".
     */
    const uniqueMixed = takeUnique(mixed);
    const uniqueTensions = takeUnique(tensions);
    const uniqueKeyFactors = takeUnique(keyFactors);
    const uniqueStrengths = takeUnique(strengths);

    const strengthHtml = uniqueStrengths.length
      ? `
        <div class="mt-4">
          <div class="text-sm font-semibold text-green-300">
            Points forts
          </div>

          <ul class="mt-2 space-y-2 text-sm text-gray-300">
            ${uniqueStrengths.map(item => `
              <li class="flex items-start gap-2">
                <span class="text-green-300 shrink-0">✓</span>
                <span class="factor-human">
                  ${escapeHtml(humanFactorLabel(item))}
                </span>
              </li>
            `).join("")}
          </ul>
        </div>
      `
      : "";

    const tensionHtml = uniqueTensions.length
      ? `
        <div class="mt-4">
          <div class="text-sm font-semibold text-red-300">
            Tensions
          </div>

          <ul class="mt-2 space-y-2 text-sm text-gray-300">
            ${uniqueTensions.map(item => `
              <li class="flex items-start gap-2">
                <span class="text-red-300 shrink-0">⚠</span>
                <span class="factor-human">
                  ${escapeHtml(humanFactorLabel(item))}
                </span>
              </li>
            `).join("")}
          </ul>
        </div>
      `
      : "";

    const mixedHtml = uniqueMixed.length
      ? `
        <div class="mt-4">
          <div class="text-sm font-semibold text-yellow-300">
            Facteurs mixtes
          </div>

          <ul class="mt-2 space-y-2 text-sm text-gray-300">
            ${uniqueMixed.map(item => `
              <li class="flex items-start gap-2">
                <span class="text-yellow-300 shrink-0">◆</span>
                <span class="factor-human">
                  ${escapeHtml(humanFactorLabel(item))}
                </span>
              </li>
            `).join("")}
          </ul>
        </div>
      `
      : "";

    const keyFactorHtml = uniqueKeyFactors.length
      ? `
        <div class="mt-4">
          <div class="text-sm font-semibold text-blue-300">
            Facteurs clés
          </div>

          <ul class="mt-2 space-y-2 text-sm text-gray-300">
            ${uniqueKeyFactors.map(item => `
              <li class="flex items-start gap-2">
                <span class="text-blue-300 shrink-0">•</span>
                <span class="factor-human">
                  ${escapeHtml(humanFactorLabel(item))}
                </span>
              </li>
            `).join("")}
          </ul>
        </div>
      `
      : "";

    return `
      <article class="domain-card rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">

        <div class="flex items-center justify-between gap-4">

          <div class="flex items-center gap-3 min-w-0">

            <div class="text-2xl shrink-0">
              ${icon}
            </div>

            <div class="min-w-0">

              <h3 class="font-bold text-lg truncate">
                ${escapeHtml(label)}
              </h3>

              <div class="text-xs text-gray-400 mt-0.5">
                ${escapeHtml(level)} · ${factorCountLabel(count)}
              </div>

            </div>

          </div>

          <div class="text-right shrink-0">

            <div class="text-2xl font-bold">
              ${score}
            </div>

            <div class="text-[10px] text-gray-500">
              /100
            </div>

          </div>

        </div>

        <div class="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">

          <div
            class="score-progress h-full rounded-full ${scoreProgressClass(score)} transition-all duration-700"
            style="width:${Math.max(0, Math.min(100, score))}%">
          </div>

        </div>

        ${strengthHtml}
        ${tensionHtml}
        ${mixedHtml}
        ${keyFactorHtml}

      </article>
    `;
  }).join("");

  container.innerHTML = html;
}

/* =========================================================
   HIGHLIGHTS / WARNINGS
   ========================================================= */

function renderList(elementId, items, emptyText) {
  const element = document.getElementById(elementId);

  if (!element) return;

  if (!Array.isArray(items) || items.length === 0) {
    element.innerHTML =
      `<div class="text-gray-400">${escapeHtml(emptyText)}</div>`;
    return;
  }

  element.innerHTML = items.map(item => `
    <div class="rounded-xl bg-white/5 p-3">
      ${escapeHtml(
        typeof item === "string"
          ? item
          : item?.label ||
            item?.text ||
            item?.description ||
            item?.rule_id ||
            JSON.stringify(item)
      )}
    </div>
  `).join("");
}

/* =========================================================
   RELIABILITY
   ========================================================= */

function renderReliability(reliability) {
  const element =
    document.getElementById("reliability") ||
    document.getElementById("reliabilityBox");

  if (!element) return;

  if (!reliability) {
    element.innerHTML =
      '<div class="text-gray-400">Fiabilité indisponible.</div>';
    return;
  }

  const notes = Array.isArray(reliability.notes)
    ? reliability.notes
    : [];

  element.innerHTML = `
    <div class="font-semibold">
      Fiabilité :
      ${escapeHtml(reliability.level || "Inconnue")}
    </div>

    <div class="mt-1 text-sm text-gray-400">
      ${reliability.partial ? "Calcul partiel" : "Calcul complet"}
    </div>

    ${
      notes.length
        ? `
          <ul class="mt-2 space-y-1 text-sm text-gray-300">
            ${notes.map(note =>
              `<li>• ${escapeHtml(note)}</li>`
            ).join("")}
          </ul>
        `
        : ""
    }
  `;
}


let ASTROMATCH_PRIMARY_PROFILE = null;
let ASTROMATCH_TARGET_PROFILES = [];
let ASTROMATCH_SELECTED_TARGET = null;
let ASTROMATCH_CALCULATION_TOKEN = 0;



function setTargetCalculationState(state) {
  const element =
    document.getElementById("targetCalculationState");

  const hint =
    document.getElementById("targetSelectionHint");

  const selector =
    document.getElementById("targetSelector");

  if (state === "loading") {
    if (element) {
      element.textContent = "Calcul…";
      element.className =
        "text-xs text-slate-300 whitespace-nowrap";
    }

    if (hint) {
      hint.textContent =
        "Calcul réel en cours…";
    }

    if (selector) {
      selector.disabled = true;
      selector.classList.add("opacity-70");
    }

    return;
  }

  if (state === "done") {
    if (element) {
      element.textContent = "✓ Calculé";
      element.className =
        "text-xs text-slate-300 whitespace-nowrap";
    }

    if (hint) {
      hint.textContent =
        "Compatibilité recalculée pour cette cible.";
    }

    if (selector) {
      selector.disabled = false;
      selector.classList.remove("opacity-70");
    }

    return;
  }

  if (state === "error") {
    if (element) {
      element.textContent = "Erreur";
      element.className =
        "text-xs text-red-400 whitespace-nowrap";
    }

    if (hint) {
      hint.textContent =
        "Le calcul n’a pas pu être terminé.";
    }

    if (selector) {
      selector.disabled = false;
      selector.classList.remove("opacity-70");
    }

    return;
  }

  if (element) {
    element.textContent = "Prêt";
    element.className =
      "text-xs text-slate-500 whitespace-nowrap";
  }

  if (hint) {
    hint.textContent =
      "La sélection recalcule automatiquement la compatibilité.";
  }

  if (selector) {
    selector.disabled = false;
    selector.classList.remove("opacity-70");
  }
}


function updateTargetSelectionVisual(target) {
  const hint =
    document.getElementById("targetSelectionHint");

  if (!hint || !target) return;

  const firstName =
    target.identity?.first_name ||
    "Profil cible";

  const lastName =
    target.identity?.last_name ||
    "";

  const fullName =
    `${firstName}${lastName ? " " + lastName : ""}`.trim();

  hint.textContent =
    `Analyse active : ${fullName}.`;

  refreshTargetCards();
}



function calculateAge(profile) {
  const date = profile?.birth_data?.date;
  if (!date) return null;

  const birth = new Date(`${date}T00:00:00`);
  if (!Number.isFinite(birth.getTime())) return null;

  const now = new Date();

  let age = now.getFullYear() - birth.getFullYear();

  const month = now.getMonth() - birth.getMonth();

  if (
    month < 0 ||
    (month === 0 && now.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age >= 0 && age < 150 ? age : null;
}

function zodiacFromDate(dateValue) {
  if (!dateValue) return null;

  const date = String(dateValue).slice(0, 10);
  const [year, month, day] = date.split("-").map(Number);

  if (!month || !day) return null;

  const signs = [
    { name: "Capricorne", symbol: "♑", element: "🌍 Terre", start: [12, 22], end: [1, 19] },
    { name: "Verseau", symbol: "♒", element: "🌬️ Air", start: [1, 20], end: [2, 18] },
    { name: "Poissons", symbol: "♓", element: "💧 Eau", start: [2, 19], end: [3, 20] },
    { name: "Bélier", symbol: "♈", element: "🔥 Feu", start: [3, 21], end: [4, 19] },
    { name: "Taureau", symbol: "♉", element: "🌍 Terre", start: [4, 20], end: [5, 20] },
    { name: "Gémeaux", symbol: "♊", element: "🌬️ Air", start: [5, 21], end: [6, 20] },
    { name: "Cancer", symbol: "♋", element: "💧 Eau", start: [6, 21], end: [7, 22] },
    { name: "Lion", symbol: "♌", element: "🔥 Feu", start: [7, 23], end: [8, 22] },
    { name: "Vierge", symbol: "♍", element: "🌍 Terre", start: [8, 23], end: [9, 22] },
    { name: "Balance", symbol: "♎", element: "🌬️ Air", start: [9, 23], end: [10, 22] },
    { name: "Scorpion", symbol: "♏", element: "💧 Eau", start: [10, 23], end: [11, 21] },
    { name: "Sagittaire", symbol: "♐", element: "🔥 Feu", start: [11, 22], end: [12, 21] }
  ];

  for (const sign of signs) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;

    if (
      (sm <= em && (
        (month > sm || (month === sm && day >= sd)) &&
        (month < em || (month === em && day <= ed))
      )) ||
      (sm > em && (
        (month > sm || (month === sm && day >= sd)) ||
        (month < em || (month === em && day <= ed))
      ))
    ) {
      return sign;
    }
  }

  return null;
}

function parseTime(profile) {
  const value = profile?.birth_data?.time?.value;
  if (!value) return null;

  const match = String(value).match(/^(\d{1,2}):(\d{2})/);

  if (!match) return null;

  return {
    hour: Number(match[1]),
    minute: Number(match[2])
  };
}

/*
 * Ascendant d'affichage uniquement.
 *
 * IMPORTANT :
 * - utilisé uniquement pour la fiche UI
 * - jamais envoyé au scoring
 * - jamais utilisé dans computeSynastry()
 * - jamais utilisé dans computeScore()
 *
 * Calcul astronomique classique à partir de :
 * date + heure locale + longitude + latitude + obliquité.
 */
function calculateDisplayAscendant(profile) {
  if (!profile?.birth_data?.time?.known) return null;

  const date = profile?.birth_data?.date;
  const lat = Number(profile?.birth_data?.place?.resolved?.latitude);
  const lon = Number(profile?.birth_data?.place?.resolved?.longitude);
  const time = parseTime(profile);

  if (!date || !Number.isFinite(lat) || !Number.isFinite(lon) || !time) {
    return null;
  }

  const [Y, M, D] = String(date).slice(0, 10).split("-").map(Number);

  if (!Y || !M || !D) return null;

  // Conversion en JD UTC approximative.
  // Europe/Paris est gérée ici via le décalage saisonnier.
  // Cette valeur reste strictement présentationnelle.
  const localDate = new Date(
    Y,
    M - 1,
    D,
    time.hour,
    time.minute,
    0,
    0
  );

  if (!Number.isFinite(localDate.getTime())) return null;

  const jan = new Date(Y, 0, 1);
  const jul = new Date(Y, 6, 1);

  const parisOffset =
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

  const utcMs =
    localDate.getTime() +
    parisOffset * 60000;

  const utc = new Date(utcMs);

  const jd =
    utc.getTime() / 86400000 +
    2440587.5;

  const T = (jd - 2451545.0) / 36525;

  let gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;

  gmst = ((gmst % 360) + 360) % 360;

  const lst = ((gmst + lon) % 360 + 360) % 360;

  const rad = Math.PI / 180;

  const obliquity =
    23.439291 -
    0.0130042 * T;

  const phi = lat * rad;
  const eps = obliquity * rad;
  const theta = lst * rad;

  const asc =
    Math.atan2(
      -Math.cos(theta),
      Math.sin(theta) * Math.cos(eps) +
      Math.tan(phi) * Math.sin(eps)
    ) / rad;

  const degree = ((asc + 180) % 360 + 360) % 360;

  const signs = [
    "Bélier", "Taureau", "Gémeaux", "Cancer",
    "Lion", "Vierge", "Balance", "Scorpion",
    "Sagittaire", "Capricorne", "Verseau", "Poissons"
  ];

  const symbols = [
    "♈", "♉", "♊", "♋", "♌", "♍",
    "♎", "♏", "♐", "♑", "♒", "♓"
  ];

  const index = Math.floor(degree / 30);

  return {
    name: signs[index],
    symbol: symbols[index],
    degree
  };
}

function formatBirthDate(profile) {
  const date = profile?.birth_data?.date;

  if (!date) return "Date inconnue";

  const parts = String(date).slice(0, 10).split("-");

  if (parts.length !== 3) return date;

  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatBirthTime(profile) {
  if (!profile?.birth_data?.time?.known) {
    return "heure inconnue";
  }

  return profile?.birth_data?.time?.value || "heure inconnue";
}

function profileFullName(profile) {
  const first =
    profile?.identity?.first_name ||
    "Profil cible";

  const last =
    profile?.identity?.last_name ||
    "";

  return `${first}${last ? " " + last : ""}`.trim();
}

function genderLabel(profile) {
  if (profile?.identity?.gender === "male") {
    return "♂ Homme";
  }

  if (profile?.identity?.gender === "female") {
    return "♀ Femme";
  }

  return "";
}

function relationshipContextLabel(profile) {
  const context =
    profile?.relationship?.context ||
    "romantic";

  if (context === "family") {
    return "👨‍👩‍👧‍👦 Famille";
  }

  if (context === "friendship") {
    return "🤝 Amitié";
  }

  return "❤️ Relation";
}

function renderProfileCard(target, selectedTarget) {
  const id =
    String(target?.profile_id || "");

  const selected =
    selectedTarget?.profile_id === target?.profile_id;

  const name =
    profileFullName(target);

  const zodiac =
    zodiacFromDate(target?.birth_data?.date);

  const age =
    calculateAge(target);

  const asc =
    calculateDisplayAscendant(target);

  const gender =
    genderLabel(target);

  const context =
    relationshipContextLabel(target);

  const place =
    target?.birth_data?.place?.raw_input ||
    "Lieu inconnu";

  const birth =
    `${formatBirthDate(target)} · ${formatBirthTime(target)}`;

  return `
    <button
      type="button"
      data-target-id="${escapeHtml(id)}"
      aria-pressed="${selected ? "true" : "false"}"
      class="astromatch-profile-card target-profile-card w-full text-left p-4 ${
        selected ? "selected" : ""
      }"
    >

      <div class="flex items-start gap-3">

        <div class="zodiac-art">
          <span class="zodiac-symbol">
            ${zodiac?.symbol || "✦"}
          </span>
        </div>

        <div class="min-w-0 flex-1">

          <div class="flex items-start justify-between gap-2">

            <div class="min-w-0">
              <div class="font-black text-base text-white truncate">
                ${escapeHtml(name)}
              </div>

              <div class="text-[11px] text-slate-400 mt-1">
                ${gender ? escapeHtml(gender) : "Profil cible"}
              </div>
            </div>

            <div class="text-slate-500 text-xl leading-none">
              ›
            </div>

          </div>

          <div class="text-xs text-slate-400 mt-2">
            ${escapeHtml(
              age === null
                ? birth
                : `${age} ans · ${birth}`
            )}
          </div>

          <div class="text-xs text-slate-300 mt-1">
            ${escapeHtml(place)}
          </div>

          <div class="profile-meta-grid mt-3">

            <div class="profile-meta-pill">
              <strong>${escapeHtml(zodiac?.symbol || "—")}</strong>
              ${escapeHtml(zodiac?.name || "Signe inconnu")}
            </div>

            <div class="profile-meta-pill">
              <strong>↑ ${escapeHtml(asc?.symbol || "—")}</strong>
              ${escapeHtml(asc?.name || "Ascendant")}
            </div>

            <div class="profile-meta-pill">
              <strong>${escapeHtml(zodiac?.element || "—")}</strong>
            </div>

            <div class="profile-meta-pill">
              <strong>${escapeHtml(context)}</strong>
            </div>

          </div>

        </div>

      </div>

    </button>
  `;
}

function renderTargetSelector(targets, selectedTarget) {
  const container =
    document.getElementById("targetSelector");

  if (!container) return;

  const safeTargets =
    Array.isArray(targets)
      ? targets
      : [];

  const men =
    safeTargets.filter(
      target =>
        target?.identity?.gender === "male"
    );

  const women =
    safeTargets.filter(
      target =>
        target?.identity?.gender === "female"
    );

  const unknown =
    safeTargets.filter(
      target =>
        !["male", "female"].includes(
          target?.identity?.gender
        )
    );

  const groupHtml = (
    icon,
    title,
    list
  ) => {

    if (!list.length) return "";

    return `
      <div class="target-group-title">
        <span>${icon}</span>
        ${title}
        <span class="text-slate-600">
          ${list.length}
        </span>
      </div>

      <div class="space-y-3">
        ${list
          .map(target =>
            renderProfileCard(
              target,
              selectedTarget
            )
          )
          .join("")}
      </div>
    `;
  };

  container.innerHTML = `
    ${groupHtml("♂", "Hommes", men)}

    ${groupHtml("♀", "Femmes", women)}

    ${
      unknown.length
        ? groupHtml("•", "À CLASSER", unknown)
        : ""
    }

    ${
      !safeTargets.length
        ? `<div class="target-empty">
             Aucun profil cible disponible.
           </div>`
        : ""
    }
  `;

  container
    .querySelectorAll("[data-target-id]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {
          selectTargetProfile(
            button.dataset.targetId
          );
        }
      );

    });

  updateTargetSelectionVisual(
    selectedTarget
  );
}


function refreshTargetCards() {
  const selectedId =
    String(
      ASTROMATCH_SELECTED_TARGET?.profile_id || ""
    );

  document
    .querySelectorAll("[data-target-id]")
    .forEach(button => {

      const isSelected =
        String(button.dataset.targetId) ===
        selectedId;

      button.setAttribute(
        "aria-pressed",
        isSelected ? "true" : "false"
      );

      button.classList.toggle(
        "selected",
        isSelected
      );

    });
}

function selectTargetProfile(profileId) {
  const target = ASTROMATCH_TARGET_PROFILES.find(
    profile =>
      String(profile?.profile_id) === String(profileId)
  );

  if (!target) {
    console.error(
      "AstroMatch: profil cible introuvable",
      profileId
    );
    return;
  }

  ASTROMATCH_SELECTED_TARGET = target;

  /*
   * Le contexte relationnel appartient au profil cible.
   * Il pilote uniquement la présentation.
   *
   * Aucun impact sur le moteur astrologique/scoring.
   */
  normalizeRelationshipModeForTarget(target);

  renderTargetSelector(
    ASTROMATCH_TARGET_PROFILES,
    ASTROMATCH_SELECTED_TARGET
  );

  setTargetCalculationState("loading");

  const targetElement =
    document.getElementById("targetName");

  if (targetElement) {
    targetElement.textContent =
      target.identity?.first_name ||
      "Profil cible";
  }

  calculateSelectedTarget().catch(error => {
    console.error(
      "AstroMatch target calculation error:",
      error
    );
    setTargetCalculationState("error");

    status(
      `Erreur calcul : ${error.message || error}`
    );
  });
}


function initializeTargetSelector(targets) {
  ASTROMATCH_TARGET_PROFILES = Array.isArray(targets)
    ? targets
    : [];

  if (!ASTROMATCH_TARGET_PROFILES.length) {
    throw new Error("AUCUN_PROFIL_CIBLE");
  }

  ASTROMATCH_SELECTED_TARGET =
    ASTROMATCH_TARGET_PROFILES[0];

  renderTargetSelector(
    ASTROMATCH_TARGET_PROFILES,
    ASTROMATCH_SELECTED_TARGET
  );


}


async function calculateSelectedTarget() {
  if (!ASTROMATCH_PRIMARY_PROFILE) {
    throw new Error("PROFIL_PRINCIPAL_INTRouvable");
  }

  if (!ASTROMATCH_SELECTED_TARGET) {
    throw new Error("AUCUN_PROFIL_CIBLE");
  }

  const primary =
    ASTROMATCH_PRIMARY_PROFILE;

  const target =
    ASTROMATCH_SELECTED_TARGET;

  const primaryInput =
    profileToApiInput(primary);

  const targetInput =
    profileToApiInput(target);

  const primaryName =
    primary.identity?.first_name ||
    "Profil principal";

  const targetName =
    target.identity?.first_name ||
    "Profil cible";

  const primaryElement =
    document.getElementById("primaryName");

  const targetElement =
    document.getElementById("targetName");

  if (primaryElement) {
    primaryElement.textContent =
      primaryName;
  }

  if (targetElement) {
    targetElement.textContent =
      targetName;
  }

  const token =
    ++ASTROMATCH_CALCULATION_TOKEN;

  /*
   * Bridge vers le Relationship View Engine.
   * Le script module ne partage pas directement ses variables
   * avec le script classique.
   */
  if (typeof window !== "undefined") {
    window.__astromatchSelectedTargetId =
      String(target?.profile_id || "");
  }

  setTargetCalculationState("loading");

  status(
    `Calcul réel : ${primaryName} × ${targetName}…`
  );

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      primary: primaryInput,
      target: targetInput
    })
  });

  if (!response.ok) {
    throw new Error(
      `API HTTP ${response.status}`
    );
  }

  const payload =
    await response.json();

  if (!payload.ok) {
    throw new Error(
      payload.error ||
      "Erreur API inconnue"
    );
  }

  const result =
    payload.result;

  if (!result || !result.global) {
    throw new Error(
      "RESULTAT_MATCH_INVALIDE"
    );
  }

  /*
   * Une réponse ancienne ne doit jamais écraser
   * le résultat du profil sélectionné ensuite.
   */
  if (token !== ASTROMATCH_CALCULATION_TOKEN) {
    return null;
  }

  const global =
    result.global;

  status(
    `Calcul réel terminé — ${Math.round(Number(global.score) || 0)}/100`
  );

  const globalScore =
    document.getElementById("globalScore");

  if (globalScore) {
    globalScore.textContent =
      Math.round(Number(global.score) || 0);
  }

  const globalLabel =
    document.getElementById("globalLabel");

  if (globalLabel) {
    globalLabel.textContent =
      global.label || "";
  }

  const summary =
    document.getElementById("summary");

  if (summary) {
    summary.textContent =
      result.summary ||
      "Compatibilité calculée par le moteur AstroMatch.";
  }

  if (
    result.profiles?.primary?.name &&
    primaryElement
  ) {
    primaryElement.textContent =
      result.profiles.primary.name;
  }

  if (
    result.profiles?.target?.name &&
    targetElement
  ) {
    targetElement.textContent =
      result.profiles.target.name;
  }

  renderDomains(result.domains);

  if (
    typeof window.setAstroMatchRelationshipResult ===
    "function"
  ) {
    window.setAstroMatchRelationshipResult(result);
  }


  renderList(
    "highlights",
    result.highlights,
    "Aucun point marquant."
  );

  renderList(
    "warnings",
    result.warnings,
    "Aucun avertissement."
  );

  renderList(
    "topStrengths",
    result.top_strengths,
    "Aucun point fort majeur."
  );

  renderList(
    "topTensions",
    result.top_tensions,
    "Aucune tension majeure."
  );

  renderReliability(
    result.reliability
  );

  setTargetCalculationState("done");
  updateTargetSelectionVisual(target);

  console.log(
    "ASTROMATCH REAL PROFILE",
    {
      primary,
      target
    }
  );

  console.log(
    "ASTROMATCH API RESULT",
    result
  );

  return result;
}




const openComparisonButton =
  document.getElementById(
    "openTargetComparison"
  );

if (openComparisonButton) {
  openComparisonButton.addEventListener(
    "click",
    openTargetComparison
  );
}


const closeComparisonButton =
  document.getElementById(
    "closeTargetComparison"
  );

if (closeComparisonButton) {
  closeComparisonButton.addEventListener(
    "click",
    closeTargetComparison
  );
}

window.selectTargetProfile =
  selectTargetProfile;

/* =========================================================
   MATCH
   ========================================================= */

async 
function renderPrimaryProfileCard(profile) {
  if (!profile) return;

  const name =
    profileFullName(profile);

  const age =
    calculateAge(profile);

  const zodiac =
    zodiacFromDate(
      profile?.birth_data?.date
    );

  const asc =
    calculateDisplayAscendant(profile);

  const gender =
    genderLabel(profile);

  const element =
    zodiac?.element || "";

  const birthLine =
    `${age === null ? "" : age + " ans · "}` +
    `${formatBirthDate(profile)} · ` +
    `${formatBirthTime(profile)} · ` +
    `${profile?.birth_data?.place?.raw_input || "Lieu inconnu"}`;

  const astroLine =
    `${zodiac?.symbol || "✦"} ` +
    `${zodiac?.name || "Signe inconnu"}` +
    `${asc ? ` · ↑ ${asc.symbol} ${asc.name}` : ""}`;

  const nameEl =
    document.getElementById("primaryName");

  const genderEl =
    document.getElementById("primaryGender");

  const birthEl =
    document.getElementById("primaryBirthLine");

  const astroEl =
    document.getElementById("primaryAstroLine");

  const elementEl =
    document.getElementById("primaryElement");

  const symbolEl =
    document.getElementById("primaryZodiacSymbol");

  if (nameEl) {
    nameEl.textContent = name;
  }

  if (genderEl) {
    genderEl.textContent = gender;
  }

  if (birthEl) {
    birthEl.textContent = birthLine;
  }

  if (astroEl) {
    astroEl.textContent = astroLine;
  }

  if (elementEl) {
    elementEl.textContent = element;
  }

  if (symbolEl) {
    symbolEl.textContent =
      zodiac?.symbol || "✦";
  }
}


async function start() {
  window.__astromatchDebug("1 — start() ENTRE");
  try {
    window.__astromatchDebug("2 — avant getRealProfiles()");
    status("Lecture des profils AstroMatch…");

    const {
      primary,
      targets
    } = getRealProfiles();

    window.__astromatchDebug(
      "3 — getRealProfiles OK : primary=" +
      !!primary +
      " targets=" +
      (Array.isArray(targets) ? targets.length : "NON_ARRAY")
    );

    ASTROMATCH_PRIMARY_PROFILE =
      primary;

    renderPrimaryProfileCard(primary);

    initializeTargetSelector(
      targets
    );

    const selectedTarget =
      ASTROMATCH_SELECTED_TARGET;

    const primaryName =
      primary.identity?.first_name ||
      "Profil principal";

    const targetName =
      selectedTarget?.identity?.first_name ||
      "Profil cible";

    const primaryElement =
      document.getElementById("primaryName");

    const targetElement =
      document.getElementById("targetName");

    if (primaryElement) {
      primaryElement.textContent =
        primaryName;
    }

    if (targetElement) {
      targetElement.textContent =
        targetName;
    }

    const result =
      window.__astromatchDebug("5 — avant calculateSelectedTarget()");
    await calculateSelectedTarget();
    window.__astromatchDebug("6 — calculateSelectedTarget OK");



    if (!result || !result.global) {
      throw new Error(
        "RESULTAT_MATCH_INVALIDE"
      );
    }

    const global = result.global;

    status(
      `Calcul réel terminé — ${Math.round(Number(global.score) || 0)}/100`
    );

    const globalScore =
      document.getElementById("globalScore");

    if (globalScore) {
      globalScore.textContent =
        Math.round(Number(global.score) || 0);
    }

    const globalLabel =
      document.getElementById("globalLabel");

    if (globalLabel) {
      globalLabel.textContent =
        global.label || "";
    }

    const summary =
      document.getElementById("summary");

    if (summary) {
      summary.textContent =
        result.summary ||
        "Compatibilité calculée par le moteur AstroMatch.";
    }

    /*
     * Les noms retournés par l'API deviennent
     * la source de vérité après calcul.
     */
    if (result.profiles?.primary?.name && primaryElement) {
      primaryElement.textContent =
        result.profiles.primary.name;
    }

    if (result.profiles?.target?.name && targetElement) {
      targetElement.textContent =
        result.profiles.target.name;
    }

    renderDomains(result.domains);
    if (typeof window.setAstroMatchRelationshipResult === "function") {
      window.setAstroMatchRelationshipResult(result);
    }

    renderList(
      "highlights",
      result.highlights,
      "Aucun point marquant."
    );

    renderList(
      "warnings",
      result.warnings,
      "Aucun avertissement."
    );

    renderList(
      "topStrengths",
      result.top_strengths,
      "Aucun point fort majeur."
    );

    renderList(
      "topTensions",
      result.top_tensions,
      "Aucune tension majeure."
    );

    renderReliability(
      result.reliability
    );

    console.log(
      "ASTROMATCH REAL PROFILE",
      {
        primary,
        target
      }
    );

    console.log(
      "ASTROMATCH API RESULT",
      result
    );

  } catch (error) {

    console.error(
      "AstroMatch UI error:",
      error
    );

    const message =
      error?.message ||
      String(error);

    status(
      "ERREUR — " +
      message
    );

    const summary =
      document.getElementById("summary");

    if (summary) {

      let readable =
        "Impossible de calculer ce match.";

      if (message === "AUCUN_PROFIL_STOCKE") {
        readable =
          "Aucun profil AstroMatch n’est encore enregistré.";
      }

      if (message === "PROFIL_PRINCIPAL_INTRouvable") {
        readable =
          "Aucun profil principal trouvé.";
      }

      if (message === "AUCUN_PROFIL_CIBLE") {
        readable =
          "Aucun profil cible trouvé.";
      }

      summary.textContent = readable;
    }

  }

}

window.addEventListener(
  "error",
  event => {
    console.error(
      "ASTROMATCH WINDOW ERROR",
      event.error || event.message
    );
  }
);

window.addEventListener(
  "unhandledrejection",
  event => {
    console.error(
      "ASTROMATCH UNHANDLED",
      event.reason
    );
  }
);

start();

