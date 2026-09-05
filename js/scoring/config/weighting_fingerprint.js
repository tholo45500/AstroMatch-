import { deterministicHash } from "../../utils/id.js";

export function weightingConfigFingerprint(config) {
  const canonical = JSON.stringify({
    version: config.version,
    k_saturation: config.k_saturation,
    frictions_penalty_global: config.frictions_penalty_global,
    domains: config.domains,
    domain_weights_global: config.domain_weights_global,
    planet_weights: config.planet_weights,
    aspect_orbs: config.aspect_orbs,
    rules: config.rules
  });
  return deterministicHash(canonical).toString(16);
}
