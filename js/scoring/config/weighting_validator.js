// Validation structurelle de la configuration de scoring.
// Aucun effet de bord : lève une erreur typée si la configuration est invalide.

const REQUIRED_DOMAINS = ["love", "passion", "communication", "emotions", "daily", "projects", "frictions"];
const REQUIRED_ASPECTS = ["conjunction", "opposition", "trine", "square", "sextile"];
const REQUIRED_BODIES = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

export function validateWeightingConfig(config) {
  const errors = [];
  const fail = (message) => errors.push(message);

  if (!config || typeof config !== "object") fail("configuration absente");
  if (!config?.version || typeof config.version !== "string") fail("version manquante");
  if (!Number.isFinite(config?.k_saturation) || config.k_saturation <= 0) fail("k_saturation doit être > 0");
  if (!Number.isFinite(config?.frictions_penalty_global) || config.frictions_penalty_global < 0) fail("frictions_penalty_global invalide");

  const domains = config?.domains;
  if (!Array.isArray(domains) || domains.length !== REQUIRED_DOMAINS.length || REQUIRED_DOMAINS.some((d) => !domains.includes(d))) {
    fail("domains incomplets ou invalides");
  }

  const weights = config?.domain_weights_global;
  if (!weights || typeof weights !== "object") {
    fail("domain_weights_global manquant");
  } else {
    const sum = REQUIRED_DOMAINS.filter((d) => d !== "frictions").reduce((sum, d) => sum + Number(weights[d] ?? 0), 0);
    for (const domain of REQUIRED_DOMAINS.filter((d) => d !== "frictions")) {
      if (!Number.isFinite(weights[domain]) || weights[domain] < 0) fail(`poids global invalide: ${domain}`);
    }
    if (Math.abs(sum - 1) > 1e-9) fail("les poids globaux hors frictions doivent totaliser 1");
  }

  for (const body of REQUIRED_BODIES) {
    if (!Number.isFinite(config?.planet_weights?.[body]) || config.planet_weights[body] <= 0) {
      fail(`poids planétaire invalide: ${body}`);
    }
  }

  for (const aspect of REQUIRED_ASPECTS) {
    if (!Number.isFinite(config?.aspect_orbs?.[aspect]) || config.aspect_orbs[aspect] <= 0) {
      fail(`orb d'aspect invalide: ${aspect}`);
    }
  }

  if (!Array.isArray(config?.rules) || config.rules.length === 0) {
    fail("rules manquantes");
  } else {
    const ids = new Set();
    for (const rule of config.rules) {
      if (!rule?.rule_id || ids.has(rule.rule_id)) fail(`rule_id manquant ou dupliqué: ${rule?.rule_id ?? "inconnu"}`);
      ids.add(rule?.rule_id);
      if (!REQUIRED_DOMAINS.includes(rule?.domain)) fail(`domaine de règle invalide: ${rule?.rule_id}`);
      if (!REQUIRED_BODIES.includes(rule?.planet_a) || !REQUIRED_BODIES.includes(rule?.planet_b)) fail(`planète de règle invalide: ${rule?.rule_id}`);
      if (!REQUIRED_ASPECTS.includes(rule?.aspect_type)) fail(`aspect de règle invalide: ${rule?.rule_id}`);
      if (!Number.isFinite(rule?.base_points) || rule.base_points === 0) fail(`base_points invalide: ${rule?.rule_id}`);
      if (!Number.isFinite(rule?.orb_max) || rule.orb_max <= 0) fail(`orb_max invalide: ${rule?.rule_id}`);
      if (Number.isFinite(config?.aspect_orbs?.[rule?.aspect_type]) && rule.orb_max > config.aspect_orbs[rule.aspect_type]) {
        fail(`orb_max de règle supérieur à l'orb générique: ${rule.rule_id}`);
      }
      if (!Number.isInteger(rule?.overlay_house) || rule.overlay_house < 1 || rule.overlay_house > 12) fail(`overlay_house invalide: ${rule?.rule_id}`);
      if (!Number.isFinite(rule?.house_bonus) || rule.house_bonus < 0) fail(`house_bonus invalide: ${rule?.rule_id}`);
    }
  }

  if (errors.length) {
    const err = new Error(`Configuration de pondération invalide : ${errors.join("; ")}`);
    err.type = "INVALID_WEIGHTING_CONFIG";
    err.details = errors;
    throw err;
  }

  return true;
}
