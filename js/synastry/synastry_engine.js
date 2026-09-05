// js/synastry/synastry_engine.js
//
// Responsabilité EXACTE : comparer deux `natal_chart` et produire une
// `synastry`. Ne connaît RIEN du scoring ni de l'interprétation.
//
// Mode dégradé : si l'heure de naissance de l'un des deux profils est
// inconnue, les maisons et l'ascendant ne sont pas fiables (voir
// natal_chart.reliability). Dans ce cas, house_overlays et angle_contacts
// restent vides — jamais de "meilleur effort" silencieux sur une donnée
// invalide.

import { generateId, nowIso } from "../utils/id.js";
import { angularDistance } from "../utils/math.js";
import { matchAspect } from "./aspect_rules.js";

/**
 * @param {object} primaryChart
 * @param {object} targetChart
 * @returns {object} synastry
 */
export function computeSynastry(primaryChart, targetChart) {
  const degradedMode = !primaryChart.reliability.time_known || !targetChart.reliability.time_known;

  const aspects = [];
  for (const pointA of primaryChart.points) {
    for (const pointB of targetChart.points) {
      const diff = angularDistance(pointA.absolute_degree, pointB.absolute_degree);
      const match = matchAspect(diff);
      if (!match) continue;

      aspects.push({
        aspect_id: generateId("asp"),
        body_a: { owner: "primary", body: pointA.body },
        body_b: { owner: "target", body: pointB.body },
        aspect_type: match.type,
        exact_angle: match.exact_angle,
        actual_angle: Number(match.actual_angle.toFixed(2)),
        orb: Number(match.orb.toFixed(2)),
        orb_max: match.orb_max,
        orb_strength: Number(match.orb_strength.toFixed(4)),
        polarity: match.polarity
      });
    }
  }

  const houseOverlays = [];
  const angleContacts = [];

  if (!degradedMode) {
    // Overlay dans les deux sens : les planètes de la cible tombant dans
    // les maisons du principal, ET les planètes du principal tombant
    // dans les maisons de la cible.
    for (const pointB of targetChart.points) {
      const house = findHouseForDegree(primaryChart.houses, pointB.absolute_degree);
      if (house != null) {
        houseOverlays.push({
          owner_of_planet: "target",
          planet: pointB.body,
          falls_in_house_of: "primary",
          house_number: house
        });
      }
    }
    for (const pointA of primaryChart.points) {
      const house = findHouseForDegree(targetChart.houses, pointA.absolute_degree);
      if (house != null) {
        houseOverlays.push({
          owner_of_planet: "primary",
          planet: pointA.body,
          falls_in_house_of: "target",
          house_number: house
        });
      }
    }

    // Contacts d'angle dans les deux sens : planètes de l'un proches de
    // l'ascendant de l'autre (orbe fixe et resserrée, 3°).
    for (const pointA of primaryChart.points) {
      if (targetChart.angles.ascendant) {
        const diff = angularDistance(pointA.absolute_degree, targetChart.angles.ascendant.absolute_degree);
        if (diff <= 3) {
          angleContacts.push({
            owner_of_planet: "primary",
            planet: pointA.body,
            contacts_angle_of: "target",
            angle: "ascendant",
            orb: Number(diff.toFixed(2))
          });
        }
      }
    }
    for (const pointB of targetChart.points) {
      if (primaryChart.angles.ascendant) {
        const diff = angularDistance(pointB.absolute_degree, primaryChart.angles.ascendant.absolute_degree);
        if (diff <= 3) {
          angleContacts.push({
            owner_of_planet: "target",
            planet: pointB.body,
            contacts_angle_of: "primary",
            angle: "ascendant",
            orb: Number(diff.toFixed(2))
          });
        }
      }
    }
  }

  return {
    synastry_id: generateId("syn"),
    primary_chart_id: primaryChart.chart_id,
    target_chart_id: targetChart.chart_id,
    computed_at: nowIso(),
    reliability: {
      degraded_mode: degradedMode,
      reason: degradedMode ? "Heure de naissance inconnue pour au moins un des deux profils : maisons, ascendant, overlays et contacts d'angle non disponibles." : null
    },
    aspects,
    house_overlays: houseOverlays,
    angle_contacts: angleContacts
  };
}

function findHouseForDegree(houses, degree) {
  if (!houses || houses.length === 0) return null;
  for (let i = 0; i < houses.length; i++) {
    const start = houses[i].cusp_degree;
    const end = houses[(i + 1) % houses.length].cusp_degree;
    if (start < end) {
      if (degree >= start && degree < end) return houses[i].number;
    } else {
      // la maison traverse la limite 360°/0°
      if (degree >= start || degree < end) return houses[i].number;
    }
  }
  return null;
}
