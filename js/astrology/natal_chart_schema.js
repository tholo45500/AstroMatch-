// js/astrology/natal_chart_schema.js
//
// Schéma de référence d'un `natal_chart` (documentation, pas de
// validateur externe dans ce prototype).

export const NATAL_CHART_BODIES = [
  "sun", "moon", "mercury", "venus", "mars",
  "jupiter", "saturn", "uranus", "neptune", "pluto"
];

/**
 * Forme canonique :
 * {
 *   chart_id, profile_id, source_profile_updated_at, source_profile_fingerprint, computed_at, engine_version,
 *   calculation: { provider, status, requested_house_system, used_house_system, astrologically_valid },
 *   reliability: { time_known, houses_valid, ascendant_valid },
 *   points: [{ body, sign, degree_in_sign, absolute_degree, house, retrograde }],
 *   angles: { ascendant, midheaven, descendant, imum_coeli },
 *   houses: [{ number, cusp_degree, sign }]
 * }
 */
export function isChartReliableForHouses(chart) {
  return Boolean(chart && chart.reliability && chart.reliability.houses_valid);
}
