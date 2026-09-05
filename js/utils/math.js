// js/utils/math.js
//
// Fonctions mathématiques pures, sans dépendance à un module métier.
// Toute formule utilisée par le moteur astrologique ou le scoring passe
// par ici — aucune constante magique dupliquée ailleurs.

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Ramène un angle quelconque dans l'intervalle [0, 360).
 */
export function normalizeDegrees(deg) {
  return ((deg % 360) + 360) % 360;
}

/**
 * Distance angulaire minimale entre deux degrés absolus (0-360),
 * toujours comprise entre 0 et 180.
 */
export function angularDistance(a, b) {
  const diff = Math.abs(normalizeDegrees(a) - normalizeDegrees(b)) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/**
 * Orbe = écart entre l'angle réel observé entre deux planètes et
 * l'angle exact théorique d'un aspect (0°, 60°, 90°, 120°, 180°...).
 */
export function computeOrb(actualAngle, exactAngle) {
  return Math.abs(actualAngle - exactAngle);
}

/**
 * W_orbe : poids de force d'un aspect en fonction de son orbe.
 *
 *   - orb >= orb_max  -> 0
 *   - sinon           -> 0.5 * (1 + cos(PI * orb / orb_max))
 *
 * Vaut 1 à orb = 0 (aspect exact) et décroît en douceur (courbe cosinus)
 * jusqu'à 0 à orb = orb_max.
 */
export function wOrbe(orb, orbMax) {
  if (orb >= orbMax) return 0;
  return 0.5 * (1 + Math.cos((Math.PI * orb) / orbMax));
}
