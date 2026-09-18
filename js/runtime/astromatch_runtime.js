import { buildProfile } from "../profiles/profile_service.js";
import { computeNatalChart } from "../astrology/natal_chart_engine.js";
import { computeSynastry } from "../synastry/synastry_engine.js";

import {
  loadWeightingConfig,
  computeScore
} from "../scoring/scoring_engine.js";

import {
  buildInterpretation
} from "../interpretation/interpretation_engine.js";

import {
  buildMatchResult
} from "../match/match_result_engine.js";

import {
  computeDailyTransits
} from "../daily/transit_engine.js";

import {
  computeDailyScores
} from "../daily/daily_scoring.js";

import {
  buildDailyInterpretation
} from "../daily/daily_interpretation.js";


function localDateInTimeZone(timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const get = type =>
    parts.find(part => part.type === type)?.value;

  return `${get("year")}-${get("month")}-${get("day")}`;
}


export async function natal(input) {
  const source = input?.profile || input;

  if (!source) {
    throw new Error("PROFILE_REQUIRED");
  }

  const profile = buildProfile(source);
  const chart = computeNatalChart(profile);

  return {
    ok: true,
    result: {
      profile: {
        id: profile.profile_id,
        name: profile.identity.first_name
      },
      chart
    }
  };
}


export async function match(input) {
  if (!input?.primary || !input?.target) {
    throw new Error("PRIMARY_AND_TARGET_REQUIRED");
  }

  const primary = buildProfile(input.primary);
  const target = buildProfile(input.target);

  const chartA = computeNatalChart(primary);
  const chartB = computeNatalChart(target);

  const synastry =
    computeSynastry(chartA, chartB);

  const weightingConfig =
    await loadWeightingConfig();

  const score =
    computeScore(synastry, weightingConfig);

  const interpretation =
    buildInterpretation(score, synastry);

  const matchResult =
    buildMatchResult(interpretation);

  return {
    ok: true,
    result: {
      ...matchResult,

      narrative: null,

      /*
       * ASTROMATCH_MUTUAL_IMPACT_V1
       * Données directionnelles déjà calculées
       * par le moteur de synastrie.
       */
      synastry_context: {
        reliability:
          synastry.reliability,


        aspects:
          synastry.aspects,

        house_overlays:
          synastry.house_overlays,

        angle_contacts:
          synastry.angle_contacts
      },

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
    }
  };
}


export async function daily(input) {
  if (!input?.profile) {
    throw new Error("PROFILE_REQUIRED");
  }

  const profile =
    buildProfile(input.profile);

  const chart =
    computeNatalChart(profile);

  const timezoneId =
    profile.birth_data.place.resolved.timezone_id;

  if (!timezoneId) {
    throw new Error("TIMEZONE_REQUIRED");
  }

  const date =
    input.date ||
    localDateInTimeZone(timezoneId);

  const transits =
    computeDailyTransits(
      profile,
      chart,
      date
    );

  const scoring =
    computeDailyScores(transits);

  const interpretation =
    buildDailyInterpretation(
      transits,
      scoring
    );

  return {
    ok: true,
    result: {
      date,

      profile: {
        id: profile.profile_id,
        name: profile.identity.first_name
      },

      reference_time_local:
        transits.reference_time_local,

      timezone_id:
        transits.timezone_id,

      provider:
        transits.provider,

      reliability:
        transits.reliability,

      scores:
        scoring.scores,

      dominant_domain:
        scoring.dominant_domain,

      interpretation,

      main_influences:
        scoring.contributions.slice(0, 5),

      transits: {
        planetary: transits.transits,
        houses: transits.house_transits,
        angles: transits.angle_transits
      }
    }
  };
}


export const AstroMatchRuntime =
  Object.freeze({
    natal,
    match,
    daily
  });
