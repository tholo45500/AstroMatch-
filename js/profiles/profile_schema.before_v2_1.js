// js/profiles/profile_schema.js
//
// Schéma de référence d'un `profile`. Ce n'est pas un validateur JSON
// Schema complet (pas de dépendance externe dans ce prototype) — c'est
// la définition canonique de forme, utilisée pour la documentation et
// pour construire un objet profil par défaut.

export const PROFILE_SCHEMA_VERSION = "1.0";

export const HOUSE_SYSTEMS = ["placidus", "whole_sign", "equal", "porphyry"];

/**
 * Forme canonique d'un profil (à titre de documentation) :
 *
 * {
 *   profile_id: string,
 *   role: "primary" | "target",
 *   identity: { first_name: string, last_name: string },
 *   birth_data: {
 *     date: "YYYY-MM-DD",
 *     time: { value: "HH:MM" | null, known: boolean, precision: "exact"|"approximate"|"unknown" },
 *     place: {
 *       raw_input: string,
 *       resolved: { latitude: number|null, longitude: number|null, timezone_id: string|null, resolution_status: "resolved"|"ambiguous"|"failed" }
 *     }
 *   },
 *   house_system: string,
 *   created_at: ISO-8601,
 *   updated_at: ISO-8601,
 *   linked_primary_id: string|null
 * }
 */
export function emptyProfileShape() {
  return {
    profile_id: null,
    role: "target",
    identity: { first_name: "", last_name: "" },
    birth_data: {
      date: null,
      time: { value: null, known: false, precision: "unknown" },
      place: {
        raw_input: "",
        resolved: { latitude: null, longitude: null, timezone_id: null, resolution_status: "failed" }
      }
    },
    house_system: "whole_sign",
    created_at: null,
    updated_at: null,
    linked_primary_id: null
  };
}
