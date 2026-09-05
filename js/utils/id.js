// js/utils/id.js
//
// Génération d'identifiants et d'horodatages, utilisée dans tout le
// projet. Aucune dépendance externe.

export function generateId(prefix = "id") {
  const random = Math.random().toString(36).slice(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${random}`;
}

export function nowIso() {
  return new Date().toISOString();
}

/**
 * Hash déterministe simple (FNV-1a). Utilisé uniquement par l'adaptateur
 * d'éphémérides simulé, pour produire des résultats reproductibles à
 * partir d'une chaîne de caractères (les données de naissance).
 * Même entrée -> toujours la même sortie.
 */
export function deterministicHash(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}
