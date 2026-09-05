import { createProfile } from "../js/engine.js";
import { computeNatalChart } from "../js/astrology/natal_chart_engine.js";
import { computeSynastry } from "../js/synastry/synastry_engine.js";
import { loadWeightingConfig, computeScore } from "../js/scoring/scoring_engine.js";
import { buildInterpretation } from "../js/interpretation/interpretation_engine.js";
import { buildMatchResult } from "../js/match/match_result_engine.js";

export async function runMatch(primaryInput, targetInput) {
  const primary = createProfile(primaryInput);
  const target = createProfile(targetInput);

  const chartA = computeNatalChart(primary);
  const chartB = computeNatalChart(target);

  const synastry = computeSynastry(chartA, chartB);

  const weightingConfig = await loadWeightingConfig();
  const score = computeScore(synastry, weightingConfig);

  const interpretation = buildInterpretation(score, synastry);

  const matchResult = buildMatchResult(interpretation);

  return {
    ...matchResult,

    // Narrative désactivé temporairement :
    // l'ancien générateur attend une ancienne structure.
    narrative: null,

    profiles: {
      primary: {
        id: primary.profile_id,
        name: primary.identity.first_name
      },
      target: {
        id: target.profile_id,
        name: target.identity.first_name
      }
    }
  };
}
