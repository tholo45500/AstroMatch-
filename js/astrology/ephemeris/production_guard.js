// Garde-fou : empêche de présenter le provider simulé comme un moteur de production.
export function assertProductionEphemeris(capabilities) {
  if (!capabilities?.production_ready || !capabilities?.real_astronomical_positions) {
    const err = new Error("Le moteur d'éphémérides actuellement configuré n'est pas autorisé en production.");
    err.type = "EPHEMERIS_NOT_PRODUCTION_READY";
    throw err;
  }
  return true;
}
