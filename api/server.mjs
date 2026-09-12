import http from "node:http";

import { buildProfile } from "../js/profiles/profile_service.js";
import { geocodePlace, searchPlaces } from "../js/location/geocoding_service.js";
import { computeNatalChart } from "../js/astrology/natal_chart_engine.js";
import { computeSynastry } from "../js/synastry/synastry_engine.js";
import { loadWeightingConfig, computeScore } from "../js/scoring/scoring_engine.js";
import { buildInterpretation } from "../js/interpretation/interpretation_engine.js";
import { buildMatchResult } from "../js/match/match_result_engine.js";
import { computeDailyTransits } from "../js/daily/transit_engine.js";
import { computeDailyScores } from "../js/daily/daily_scoring.js";
import { buildDailyInterpretation } from "../js/daily/daily_interpretation.js";

const PORT = 3000;
const HOST = "127.0.0.1";

function localDateInTimeZone(timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const get = type => parts.find(part => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);

  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  });

  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("REQUEST_TOO_LARGE"));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("INVALID_JSON"));
      }
    });

    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    });

    return res.end();
  }

  // Health
  if (req.method === "GET" && req.url === "/api/health") {
    return sendJson(res, 200, {
      ok: true,
      service: "AstroMatch API",
      version: "3.1.0"
    });
  }

  // Natal chart
  if (req.method === "POST" && req.url === "/api/natal") {
    try {
      const input = await readBody(req);

      if (!input.profile) {
        return sendJson(res, 400, {
          ok: false,
          error: "PROFILE_REQUIRED"
        });
      }

      console.log("API /api/natal — calcul...");

      const profile =
        buildProfile(input.profile);

      const chart =
        computeNatalChart(profile);

      console.log(
        "API /api/natal — OK:",
        profile.identity.first_name
      );

      return sendJson(res, 200, {
        ok: true,
        result: {
          profile: {
            id: profile.profile_id,
            name: profile.identity.first_name
          },
          chart
        }
      });

    } catch (error) {
      console.error(
        "AstroMatch Natal API error:",
        error
      );

      return sendJson(res, 500, {
        ok: false,
        error: error?.message || String(error),
        type: error?.type || "ASTROMATCH_ERROR"
      });
    }
  }


  // Geocoding search (ambiguous places)
  if (req.method === "POST" && req.url === "/api/geocode/search") {
    try {
      const input = await readBody(req);
      const query = String(input.query || input.place || "").trim();

      if (query.length < 2) {
        return sendJson(res, 400, {
          ok: false,
          error: "QUERY_REQUIRED"
        });
      }

      const results = await searchPlaces(query, { limit: 3 });

      return sendJson(res, 200, {
        ok: true,
        results
      });

    } catch (error) {
      console.error("AstroMatch Geocode Search API error:", error);

      return sendJson(res, 500, {
        ok: false,
        error: error?.message || String(error),
        type: error?.type || "GEOCODING_ERROR"
      });
    }
  }

  // Geocoding
  if (req.method === "POST" && req.url === "/api/geocode") {
    try {
      const input = await readBody(req);
      const query = String(input.query || input.place || "").trim();

      if (query.length < 2) {
        return sendJson(res, 400, {
          ok: false,
          error: "QUERY_REQUIRED"
        });
      }

      console.log("API /api/geocode — recherche:", query);

      const result = await geocodePlace(query);

      if (!result || result.resolution_status !== "resolved") {
        return sendJson(res, 404, {
          ok: false,
          error: "PLACE_NOT_FOUND"
        });
      }

      console.log(
        "API /api/geocode — OK:",
        result.display_name,
        result.timezone_id
      );

      return sendJson(res, 200, {
        ok: true,
        result
      });

    } catch (error) {
      console.error("AstroMatch Geocode API error:", error);

      return sendJson(res, 500, {
        ok: false,
        error: error?.message || String(error),
        type: error?.type || "GEOCODING_ERROR"
      });
    }
  }

  // Daily horoscope / transits
  if (req.method === "POST" && req.url === "/api/daily") {
    try {
      const input = await readBody(req);

      if (!input.profile) {
        return sendJson(res, 400, {
          ok: false,
          error: "PROFILE_REQUIRED"
        });
      }

      console.log("API /api/daily — calcul...");

      const profile = buildProfile(input.profile);
      const chart = computeNatalChart(profile);

      const timezoneId =
        profile.birth_data.place.resolved.timezone_id;

      const date =
        input.date || localDateInTimeZone(timezoneId);

      const transits =
        computeDailyTransits(profile, chart, date);

      const scoring =
        computeDailyScores(transits);

      const interpretation =
        buildDailyInterpretation(transits, scoring);

      const result = {
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
      };

      console.log(
        "API /api/daily — OK:",
        result.date,
        result.profile.name,
        result.dominant_domain
      );

      return sendJson(res, 200, {
        ok: true,
        result
      });

    } catch (error) {
      console.error(
        "AstroMatch Daily API error:",
        error
      );

      return sendJson(res, 500, {
        ok: false,
        error: error?.message || String(error),
        type: error?.type || "ASTROMATCH_ERROR"
      });
    }
  }

  // Match
  if (req.method === "POST" && req.url === "/api/match") {
    try {
      const input = await readBody(req);

      if (!input.primary || !input.target) {
        return sendJson(res, 400, {
          ok: false,
          error: "PRIMARY_AND_TARGET_REQUIRED"
        });
      }

      console.log("API /api/match — calcul...");

      // 1. Profiles
      const primary = buildProfile(input.primary);
      const target = buildProfile(input.target);

      // 2. Natal charts
      const chartA = computeNatalChart(primary);
      const chartB = computeNatalChart(target);

      // 3. Synastry
      const synastry = computeSynastry(chartA, chartB);

      // 4. Scoring
      const weightingConfig = await loadWeightingConfig();
      const score = computeScore(synastry, weightingConfig);

      // 5. Interpretation
      const interpretation = buildInterpretation(score, synastry);

      // 6. Match Result
      const matchResult = buildMatchResult(interpretation);

      // IMPORTANT :
      // On ne passe PAS par compatibility()
      // et donc pas par l'ancien narrative_generator.

      const result = {
        ...matchResult,

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

      console.log(
        "API /api/match — OK:",
        result.global?.score,
        result.global?.label
      );

      return sendJson(res, 200, {
        ok: true,
        result
      });

    } catch (error) {

      console.error("AstroMatch API error:", error);

      return sendJson(res, 500, {
        ok: false,
        error: error?.message || String(error),
        type: error?.type || "ASTROMATCH_ERROR"
      });
    }
  }

  return sendJson(res, 404, {
    ok: false,
    error: "NOT_FOUND"
  });
});

server.listen(PORT, HOST, () => {
  console.log(
    `AstroMatch API running on http://${HOST}:${PORT}`
  );
});
