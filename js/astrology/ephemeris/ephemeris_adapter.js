import { SimulatedEphemeris, ENGINE_VERSION as SIMULATED_ENGINE_VERSION } from "./simulated_ephemeris.js";
import { computeAstronomyEngineEphemeris, ENGINE_VERSION as AE_ENGINE_VERSION } from "./astronomy_engine_provider.js";

// Commercial-zero-license distribution: Astronomy Engine (MIT) is the real provider.
// The simulated provider remains available only for deterministic offline tests.
export const EPHEMERIS_PROVIDER = process.env.ASTROMATCH_EPHEMERIS_PROVIDER || "astronomy-engine";
export const EPHEMERIS_ENGINE_VERSION = EPHEMERIS_PROVIDER === "astronomy-engine"
  ? AE_ENGINE_VERSION
  : `adapter-2.2.0+${SIMULATED_ENGINE_VERSION}`;

export function computeEphemeris(birthData, options = {}) {
  if (!birthData?.place?.resolved || birthData.place.resolved.resolution_status !== "resolved") {
    const err = new Error("Données de naissance insuffisantes pour calculer les éphémérides.");
    err.type = "EPHEMERIS_INPUT_INVALID";
    throw err;
  }
  if (EPHEMERIS_PROVIDER === "astronomy-engine") return computeAstronomyEngineEphemeris(birthData, options);
  if (EPHEMERIS_PROVIDER === "simulated") return SimulatedEphemeris.computePlanetPositions(birthData);
  const err = new Error(`EPHEMERIS_PROVIDER_UNSUPPORTED: ${EPHEMERIS_PROVIDER}`);
  err.type = "EPHEMERIS_PROVIDER_UNSUPPORTED";
  throw err;
}

export function getEphemerisCapabilities() {
  if (EPHEMERIS_PROVIDER === "astronomy-engine") return {
    provider: EPHEMERIS_PROVIDER, engine_version: EPHEMERIS_ENGINE_VERSION,
    production_ready: true, real_astronomical_positions: true,
    license_profile: "MIT", supported_house_systems: ["whole_sign", "equal", "porphyry", "placidus"],
    unsupported_house_systems: []
  };
  return {
    provider: "simulated", engine_version: EPHEMERIS_ENGINE_VERSION,
    production_ready: false, real_astronomical_positions: false,
    license_profile: "internal-test-only", supported_house_systems: ["equal_simulated"]
  };
}
