// js/utils/validation.js
//
// Petites fonctions de validation pures, réutilisées par profile_service
// (et potentiellement d'autres modules plus tard). Aucune ne lève
// d'exception : elles retournent des booléens, c'est à l'appelant de
// décider comment réagir.

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidDateString(value) {
  if (typeof value !== "string") return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function isPastOrTodayDate(value) {
  if (!isValidDateString(value)) return false;
  return new Date(value).getTime() <= Date.now();
}

export function isValidTimeString(value) {
  if (typeof value !== "string") return false;
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value.trim());
}

export function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function isValidLatitude(value) {
  return isFiniteNumber(value) && value >= -90 && value <= 90;
}

export function isValidLongitude(value) {
  return isFiniteNumber(value) && value >= -180 && value <= 180;
}
