// js/synastry/synastry_schema.js
//
// Schéma de référence d'une `synastry` (documentation).
//
// {
//   synastry_id, primary_chart_id, target_chart_id, computed_at,
//   reliability: { degraded_mode, reason },
//   aspects: [{
//     aspect_id, body_a: {owner, body}, body_b: {owner, body},
//     aspect_type, exact_angle, actual_angle, orb, orb_max, orb_strength, polarity
//   }],
//   house_overlays: [{ owner_of_planet, planet, falls_in_house_of, house_number }],
//   angle_contacts: [{ owner_of_planet, planet, contacts_angle_of, angle, orb }]
// }

export function isSynastryDegraded(synastry) {
  return Boolean(synastry && synastry.reliability && synastry.reliability.degraded_mode);
}
