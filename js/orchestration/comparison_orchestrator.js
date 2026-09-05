// js/orchestration/comparison_orchestrator.js
//
// Seul module qui connaît l'enchaînement complet des autres modules.
// Responsabilité : à partir d'un profil principal et de N cibles,
// produire une comparaison complète par cible (thème -> synastrie ->
// score -> interprétation -> narration -> stockage), et gérer le
// recalcul en cascade quand le principal change.
//
// Règle centrale : quel que soit le nombre de cibles N, le thème natal
// du principal n'est calculé qu'UNE SEULE FOIS par appel. Les thèmes des
// cibles ne sont JAMAIS recalculés ici (ils restent valides tant que leur
// propre profil n'a pas changé) — seules leurs synastries et scores le
// sont, car ils dépendent du principal.

import { computeNatalChart, profileCalculationFingerprint } from "../astrology/natal_chart_engine.js";
import { EPHEMERIS_ENGINE_VERSION } from "../astrology/ephemeris/ephemeris_adapter.js";
import { computeSynastry } from "../synastry/synastry_engine.js";
import { computeScore, loadWeightingConfig } from "../scoring/scoring_engine.js";
import { buildInterpretation } from "../interpretation/interpretation_engine.js";
import { generateNarrative } from "../ai_layer/narrative_generator.js";
import { repository } from "../storage/repository.js";

let weightingConfigCache = null;

async function getWeightingConfig() {
  if (!weightingConfigCache) {
    weightingConfigCache = await loadWeightingConfig();
  }
  return weightingConfigCache;
}

/**
 * Calcule (ou recalcule) le thème natal d'un profil et le persiste.
 */
function computeAndStoreChart(profile) {
  const chart = computeNatalChart(profile);
  repository.saveChart(profile.profile_id, chart);
  return chart;
}

function getOrComputeChart(profile) {
  const cached = repository.getChart(profile.profile_id);
  if (
    cached &&
    cached.source_profile_updated_at === profile.updated_at &&
    cached.source_profile_fingerprint === profileCalculationFingerprint(profile) &&
    cached.engine_version === EPHEMERIS_ENGINE_VERSION
  ) {
    return cached;
  }
  return computeAndStoreChart(profile);
}

/**
 * Compare le principal à UNE cible et persiste le résultat.
 * Isolation d'erreur : une erreur ici ne doit jamais interrompre le
 * traitement des autres cibles (voir runFullComparison).
 */
function buildDeterministicNarrative(interpretation, targetName = "cette personne") {
  if (!interpretation || typeof interpretation !== "object") {
    return `Analyse de compatibilité avec ${targetName}.`;
  }

  const global = interpretation.global || {};
  const score = Number(global.score);

  const label =
    typeof global.label === "string" && global.label.trim()
      ? global.label.trim()
      : "Compatibilité";

  const scoreText = Number.isFinite(score)
    ? `${score.toFixed(2)}/100`
    : "score non disponible";

  const domains = Array.isArray(interpretation.domains)
    ? interpretation.domains
    : [];

  const strongest = [...domains]
    .filter((d) => d && Number.isFinite(Number(d.score)))
    .sort((a, b) => Number(b.score) - Number(a.score))[0];

  const strongestText = strongest
    ? ` Le domaine le plus favorable est ${strongest.domain} (${Number(strongest.score).toFixed(2)}/100).`
    : "";

  return `Compatibilité avec ${targetName} : ${label}, ${scoreText}.${strongestText}`;
}

async function compareOneTarget(primaryChart, targetProfile) {
  const weightingConfig = await getWeightingConfig();
  try {
    const targetChart = getOrComputeChart(targetProfile);

    const synastry = computeSynastry(primaryChart, targetChart);
    repository.saveSynastry(targetProfile.profile_id, synastry);

    const score = computeScore(synastry, weightingConfig);
      repository.saveScore(targetProfile.profile_id, score);

    const interpretation = buildInterpretation(score, synastry);

    // Compatibilité descendante avec les anciens consommateurs/tests :
    // V1.2 conserve son objet Interpretation structuré, mais expose
    // également .length = nombre de domaines.
    if (
      interpretation &&
      typeof interpretation === "object" &&
      !Array.isArray(interpretation) &&
      Array.isArray(interpretation.domains)
    ) {
      Object.defineProperty(interpretation, "length", {
        value: interpretation.domains.length,
        enumerable: false,
        configurable: true
      });
    }

    // V1.2 : l'Interpretation Engine produit désormais un objet structuré.
    // L'ancien narrative_generator.js attend l'ancien format tableau et
    // provoque "interpretation.find is not a function".
    //
    // L'orchestrateur conserve donc la chaîne déterministe complète et
    // fournit une narration de compatibilité minimale et traçable à partir
    // de l'Interpretation V1.2, sans modifier le scoring ni l'interprétation.

    const narrative = buildDeterministicNarrative(
      interpretation,
      targetProfile.identity.first_name
    );

    repository.saveInterpretation(
      targetProfile.profile_id,
      { sections: interpretation, narrative }
    );

    return {
      target_profile_id: targetProfile.profile_id,
      target_name: targetProfile.identity.first_name,
      status: "done",
      synastry,
      score,
      interpretation,
      narrative,
      error: null
    };
  } catch (err) {
    return {
      target_profile_id: targetProfile.profile_id,
      target_name: targetProfile.identity.first_name,
      status: "error",
      synastry: null,
      score: null,
      interpretation: null,
      narrative: null,
      error: err.message
    };
  }
}

/**
 * Point d'entrée principal : recalcule le thème du principal UNE fois,
 * puis lance une comparaison indépendante par cible (parallélisable,
 * fonctionne identiquement avec 1, 10 ou 50 cibles).
 *
 * @returns {Promise<object[]>} un résultat par cible
 */
export async function runFullComparison() {
  const primaryProfile = repository.getPrimaryProfile();
  if (!primaryProfile) {
    const err = new Error("Aucun profil principal défini.");
    err.type = "NO_PRIMARY_PROFILE";
    throw err;
  }

  const primaryChart = getOrComputeChart(primaryProfile);
  const targets = repository.getTargetProfiles();

  const results = await Promise.all(targets.map((target) => compareOneTarget(primaryChart, target)));
  return results;
}

/**
 * À appeler explicitement après une modification du profil principal.
 * Fonctionnellement identique à runFullComparison (le thème principal
 * est de toute façon toujours recalculé), mais nommé séparément pour
 * rendre l'intention explicite côté appelant (UI, logs).
 */
export async function onPrimaryProfileChanged() {
  return runFullComparison();
}

/**
 * Compare uniquement une cible donnée par rapport au thème principal déjà
 * calculé (utile si on ajoute une seule nouvelle cible sans vouloir
 * relancer toute la cascade). Recalcule quand même le thème principal
 * pour rester cohérent avec le principe "jamais de résultat obsolète".
 */
export async function compareSingleTarget(targetProfileId) {
  const primaryProfile = repository.getPrimaryProfile();
  if (!primaryProfile) {
    const err = new Error("Aucun profil principal défini.");
    err.type = "NO_PRIMARY_PROFILE";
    throw err;
  }
  const targetProfile = repository.getProfile(targetProfileId);
  if (!targetProfile) {
    const err = new Error(`Profil cible introuvable : ${targetProfileId}`);
    err.type = "NOT_FOUND";
    throw err;
  }

  const primaryChart = getOrComputeChart(primaryProfile);
  return compareOneTarget(primaryChart, targetProfile);
}
