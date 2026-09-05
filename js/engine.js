// Public AstroMatch engine facade.
// Single entry point intended for an application/backend.
import { buildProfile, applyProfileUpdate } from "./profiles/profile_service.js";
import { computeNatalChart } from "./astrology/natal_chart_engine.js";
import { computeSynastry } from "./synastry/synastry_engine.js";
import { computeScore, loadWeightingConfig } from "./scoring/scoring_engine.js";
import { buildInterpretation } from "./interpretation/interpretation_engine.js";
import { generateNarrative } from "./ai_layer/narrative_generator.js";
import { runFullComparison, onPrimaryProfileChanged, compareSingleTarget } from "./orchestration/comparison_orchestrator.js";
import { getEphemerisCapabilities } from "./astrology/ephemeris/ephemeris_adapter.js";

export function createProfile(input) {
  return buildProfile(input);
}

export function updateProfile(profile, patch) {
  return applyProfileUpdate(profile, patch);
}

export function natalChart(profile) {
  return computeNatalChart(profile);
}

export function compareStoredProfiles() {
  return runFullComparison();
}

export function recalculateAfterPrimaryChange() {
  return onPrimaryProfileChanged();
}

export function compareStoredTarget(targetProfileId) {
  return compareSingleTarget(targetProfileId);
}

export function engineCapabilities() {
  return getEphemerisCapabilities();
}

export async function compatibility(profileA, profileB) {
  const chartA = computeNatalChart(profileA);
  const chartB = computeNatalChart(profileB);
  const synastry = computeSynastry(chartA, chartB);
  const weightingConfig = await loadWeightingConfig();
  const score = computeScore(synastry, weightingConfig);
  const interpretation = buildInterpretation(score, synastry);
  const narrative = generateNarrative(
    interpretation,
    profileB.identity.first_name
  );

  return {
    chartA,
    chartB,
    synastry,
    score,
    interpretation,
    narrative
  };
}

export async function compare(primary, target) {
  return compatibility(primary, target);
}
