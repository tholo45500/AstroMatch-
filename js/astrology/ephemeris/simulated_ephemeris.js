// js/astrology/ephemeris/simulated_ephemeris.js
//
// ⚠️ SIMULATION — à remplacer plus tard par un vrai moteur (ex: Swiss
// Ephemeris via WASM, ou un appel API). L'interface exposée ici
// (SimulatedEphemeris.computePlanetPositions) est celle qui doit rester
// stable quand on branchera le vrai calcul : même signature d'entrée
// (birth_data), même forme de sortie.
//
// Le calcul est déterministe (hash des données de naissance) afin que
// les tests soient reproductibles : même profil -> exactement mêmes
// positions, toujours.

import { deterministicHash } from "../../utils/id.js";
import { normalizeDegrees } from "../../utils/math.js";

export const ENGINE_VERSION = "simulated-ephemeris@1.0.0";

const BODIES = [
  "sun", "moon", "mercury", "venus", "mars",
  "jupiter", "saturn", "uranus", "neptune", "pluto"
];

const SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

function degreeToSign(absoluteDegree) {
  const normalized = normalizeDegrees(absoluteDegree);
  const signIndex = Math.floor(normalized / 30);
  const degreeInSign = normalized - signIndex * 30;
  return { sign: SIGNS[signIndex], degree_in_sign: Number(degreeInSign.toFixed(2)) };
}

function seedFor(birthData, suffix) {
  const timeKnown = Boolean(birthData.time && birthData.time.known);
  const base = [
    birthData.date,
    timeKnown ? birthData.time.value : "unknown-time",
    birthData.place.resolved.latitude,
    birthData.place.resolved.longitude
  ].join("|");
  return base + "|" + suffix;
}

export const SimulatedEphemeris = {
  /**
   * @param {object} birthData - profile.birth_data (date, time, place résolu)
   * @returns {{ points: object[], angles: object, houses: object[], reliability: object }}
   */
  computePlanetPositions(birthData) {
    const timeKnown = Boolean(birthData.time && birthData.time.known);

    const points = BODIES.map((body) => {
      const hash = deterministicHash(seedFor(birthData, body));
      const absoluteDegree = (hash % 36000) / 100; // 0.00 - 359.99
      const { sign, degree_in_sign } = degreeToSign(absoluteDegree);
      return {
        body,
        sign,
        degree_in_sign,
        absolute_degree: Number(absoluteDegree.toFixed(2)),
        house: timeKnown ? (Math.floor(hash / 7) % 12) + 1 : null,
        retrograde: hash % 11 === 0
      };
    });

    let angles = { ascendant: null, midheaven: null, descendant: null, imum_coeli: null };
    let houses = [];

    if (timeKnown) {
      const ascHash = deterministicHash(seedFor(birthData, "ascendant"));
      const ascDegree = (ascHash % 36000) / 100;
      const mcHash = deterministicHash(seedFor(birthData, "midheaven"));
      const mcDegree = (mcHash % 36000) / 100;

      angles = {
        ascendant: { ...degreeToSign(ascDegree), absolute_degree: Number(ascDegree.toFixed(2)) },
        midheaven: { ...degreeToSign(mcDegree), absolute_degree: Number(mcDegree.toFixed(2)) },
        descendant: {
          ...degreeToSign(normalizeDegrees(ascDegree + 180)),
          absolute_degree: Number(normalizeDegrees(ascDegree + 180).toFixed(2))
        },
        imum_coeli: {
          ...degreeToSign(normalizeDegrees(mcDegree + 180)),
          absolute_degree: Number(normalizeDegrees(mcDegree + 180).toFixed(2))
        }
      };

      houses = Array.from({ length: 12 }, (_, i) => {
        const cusp = normalizeDegrees(ascDegree + i * 30);
        return { number: i + 1, cusp_degree: Number(cusp.toFixed(2)), sign: degreeToSign(cusp).sign };
      });
    }

    return {
      points,
      angles,
      houses,
      reliability: {
        time_known: timeKnown,
        houses_valid: timeKnown,
        ascendant_valid: timeKnown
      }
    };
  }
};
