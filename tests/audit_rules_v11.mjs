import fs from "node:fs";

const cfg = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1.json","utf8")
);

console.log("\n=== ASTROMATCH · AUDIT DES RÈGLES ===\n");

const ids = new Set();

let ok = 0;
let ko = 0;

for (const rule of cfg.rules) {

  let errors = [];

  if (!rule.rule_id)
    errors.push("rule_id manquant");

  if (ids.has(rule.rule_id))
    errors.push("rule_id dupliqué");

  ids.add(rule.rule_id);

  if (!rule.domain)
    errors.push("domain manquant");

  if (!rule.planet_a)
    errors.push("planet_a manquant");

  if (!rule.planet_b)
    errors.push("planet_b manquant");

  if (!rule.aspect_type)
    errors.push("aspect_type manquant");

  if (typeof rule.base_points !== "number")
    errors.push("base_points invalide");

  if (typeof rule.orb_max !== "number")
    errors.push("orb_max invalide");

  if (errors.length) {
    ko++;
    console.log("❌", rule.rule_id ?? "(sans id)");
    for (const e of errors)
      console.log("   -", e);
  } else {
    ok++;
  }
}

console.log("\n────────────────────────────");
console.log("Règles :", cfg.rules.length);
console.log("OK     :", ok);
console.log("KO     :", ko);
console.log("────────────────────────────\n");
