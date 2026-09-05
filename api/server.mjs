import http from "node:http";

import { buildProfile } from "../js/profiles/profile_service.js";
import { computeNatalChart } from "../js/astrology/natal_chart_engine.js";
import { computeSynastry } from "../js/synastry/synastry_engine.js";
import { loadWeightingConfig, computeScore } from "../js/scoring/scoring_engine.js";
import { buildInterpretation } from "../js/interpretation/interpretation_engine.js";
import { buildMatchResult } from "../js/match/match_result_engine.js";

const PORT = 3000;
const HOST = "127.0.0.1";

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
