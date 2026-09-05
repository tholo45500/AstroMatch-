import { computeAstronomyEngineEphemeris } from "./js/astrology/ephemeris/astronomy_engine_provider.js";
import { computeSynastry } from "./js/synastry/synastry_engine.js";
import { computeScore } from "./js/scoring/scoring_engine.js";
import fs from "node:fs";

const CONFIG = JSON.parse(
  fs.readFileSync("./js/scoring/config/weighting_v1_2.json", "utf8")
);

let PASS = 0;
let FAIL = 0;

function ok(condition, msg) {
  if (condition) {
    PASS++;
    console.log("PASS — " + msg);
  } else {
    FAIL++;
    console.log("FAIL — " + msg);
  }
}

function finite(x) {
  return Number.isFinite(x);
}

function close(a, b, eps = 1e-9) {
  return Math.abs(a - b) <= eps;
}

function makeInput(id, date, time, lat, lon, tz) {
  return {
    chart_id: id,
    date,
    time: { known: true, value: time },
    place: {
      resolved: {
        resolution_status: "resolved",
        latitude: lat,
        longitude: lon,
        timezone_id: tz
      }
    }
  };
}

function makeUnknown(id, date, lat, lon, tz) {
  return {
    chart_id: id,
    date,
    time: { known: false, value: null },
    place: {
      resolved: {
        resolution_status: "resolved",
        latitude: lat,
        longitude: lon,
        timezone_id: tz
      }
    }
  };
}

function real(input) {
  return computeAstronomyEngineEphemeris(input);
}

function scoreSafe(syn) {
  try {
    return computeScore(syn, CONFIG);
  } catch (e) {
    return { __error: e };
  }
}

function aspectTuple(a) {
  return [
    a.aspect_type,
    a.body_a?.body,
    a.body_b?.body,
    Number(a.orb).toFixed(2)
  ].join("|");
}

function normalizedTuple(a) {
  return [
    a.aspect_type,
    [a.body_a?.body, a.body_b?.body].sort().join("|"),
    Number(a.orb).toFixed(2)
  ].join("|");
}

function allContributions(score) {
  return (score.domain_scores || []).flatMap(
    d => (d.contributions || []).map(c => ({ ...c, __domain: d.domain }))
  );
}

const profiles = [
  makeInput("P73-A", "1975-01-15", "06:40", 48.8566, 2.3522, "Europe/Paris"),
  makeInput("P73-B", "1985-07-22", "18:25", 40.4168, -3.7038, "Europe/Madrid"),
  makeInput("P73-C", "1990-04-12", "14:35", 45.764, 23.44055538, "Europe/Bucharest"),
  makeInput("P73-D", "2000-01-01", "11:00", 35.6762, 139.6503, "Asia/Tokyo"),
  makeInput("P73-E", "2010-06-21", "23:15", -33.8688, 151.2093, "Australia/Sydney"),
  makeInput("P73-F", "1965-11-03", "09:10", 41.9028, 12.4964, "Europe/Rome"),
  makeInput("P73-G", "2026-09-04", "08:30", 45.4642, 9.1900, "Europe/Rome"),
  makeInput("P73-H", "1940-02-29", "22:45", 51.5074, -0.1278, "Europe/London"),
  makeInput("P73-I", "2035-08-17", "03:25", 40.7128, -74.0060, "America/New_York"),
  makeInput("P73-J", "1999-12-31", "23:59", -23.5505, -46.6333, "America/Sao_Paulo")
];

console.log("");
console.log("==================================================");
console.log("ASTROMATCH TESTS 73 → 100");
console.log("==================================================");

/* ==================================================
   73 — STRUCTURE NATAL
================================================== */

console.log("");
console.log("=== TEST 73 — CONTRAT NATAL ===");

const charts = profiles.map(real);

for (const [i, c] of charts.entries()) {
  ok(Array.isArray(c.points), `Natal ${i + 1}: points[]`);
  ok(c.points.length === 10, `Natal ${i + 1}: 10 points`);
  ok(c.reliability && typeof c.reliability === "object",
    `Natal ${i + 1}: reliability`);
  ok(c.calculation_meta && typeof c.calculation_meta === "object",
    `Natal ${i + 1}: calculation_meta`);

  for (const p of c.points) {
    ok(typeof p.body === "string", `Natal ${i + 1}: body valide`);
    ok(typeof p.sign === "string", `Natal ${i + 1}: sign valide`);
    ok(finite(p.absolute_degree), `Natal ${i + 1}: longitude finie`);
    ok(p.absolute_degree >= 0 && p.absolute_degree < 360,
      `Natal ${i + 1}: longitude [0,360)`);
  }
}

/* ==================================================
   74 — MAISONS NATALES
================================================== */

console.log("");
console.log("=== TEST 74 — MAISONS NATALES ===");

for (const [i, c] of charts.entries()) {
  ok(Array.isArray(c.houses), `Maisons ${i + 1}: tableau`);

  if (c.houses.length === 12) {
    for (const h of c.houses) {
      ok(Number.isInteger(h.number) && h.number >= 1 && h.number <= 12,
        `Maison ${i + 1}: numéro valide`);
      ok(finite(h.cusp_degree),
        `Maison ${i + 1}: cuspide finie`);
      ok(h.cusp_degree >= 0 && h.cusp_degree < 360,
        `Maison ${i + 1}: cuspide [0,360)`);
    }
  }
}

/* ==================================================
   75 — SYN ASTRIES 10 PROFILS
================================================== */

console.log("");
console.log("=== TEST 75 — 45 SYN ASTRIES ===");

const syns = [];

for (let i = 0; i < charts.length; i++) {
  for (let j = i + 1; j < charts.length; j++) {
    try {
      const syn = computeSynastry(charts[i], charts[j]);
      syns.push({ i, j, syn });

      ok(Array.isArray(syn.aspects),
        `Couple ${i + 1}-${j + 1}: aspects[]`);

      ok(Array.isArray(syn.house_overlays),
        `Couple ${i + 1}-${j + 1}: overlays[]`);

      ok(Array.isArray(syn.angle_contacts),
        `Couple ${i + 1}-${j + 1}: contacts[]`);

      ok(syn.aspects.length > 0,
        `Couple ${i + 1}-${j + 1}: aspects présents`);

      ok(syn.reliability?.degraded_mode === false,
        `Couple ${i + 1}-${j + 1}: non dégradé`);
    } catch (e) {
      ok(false, `Couple ${i + 1}-${j + 1}: aucune exception`);
    }
  }
}

ok(syns.length === 45, "45/45 couples calculés");

/* ==================================================
   76 — ASPECTS NATIFS : INVARIANTS
================================================== */

console.log("");
console.log("=== TEST 76 — INVARIANTS ASPECTS ===");

let invalidAspects = 0;
let duplicateIds = 0;

for (const { syn } of syns) {
  const ids = new Set();

  for (const a of syn.aspects) {
    if (!a.aspect_id) invalidAspects++;
    if (ids.has(a.aspect_id)) duplicateIds++;
    ids.add(a.aspect_id);

    if (!a.body_a?.body || !a.body_b?.body) invalidAspects++;
    if (!a.aspect_type) invalidAspects++;
    if (!finite(a.orb) || !finite(a.orb_max)) invalidAspects++;
    if (!finite(a.orb_strength)) invalidAspects++;
    if (a.orb < 0 || a.orb > a.orb_max) invalidAspects++;
    if (a.orb_strength < 0 || a.orb_strength > 1) invalidAspects++;
  }
}

ok(invalidAspects === 0, "Aucun aspect natif invalide");
ok(duplicateIds === 0, "Aucun aspect_id dupliqué");

/* ==================================================
   77 — SYMÉTRIE PROFONDE
================================================== */

console.log("");
console.log("=== TEST 77 — SYMÉTRIE PROFONDE ===");

for (const { i, j, syn } of syns) {
  const reverse = computeSynastry(charts[j], charts[i]);

  ok(syn.aspects.length === reverse.aspects.length,
    `Symétrie aspects ${i + 1}-${j + 1}`);

  ok(syn.house_overlays.length === reverse.house_overlays.length,
    `Symétrie overlays ${i + 1}-${j + 1}`);

  ok(syn.angle_contacts.length === reverse.angle_contacts.length,
    `Symétrie contacts ${i + 1}-${j + 1}`);

  const a = new Set(syn.aspects.map(normalizedTuple));
  const b = new Set(reverse.aspects.map(normalizedTuple));

  ok(a.size === b.size,
    `Symétrie ensemble ${i + 1}-${j + 1}`);

  let same = true;
  for (const k of a) {
    if (!b.has(k)) same = false;
  }

  ok(same, `Symétrie contenu ${i + 1}-${j + 1}`);
}

/* ==================================================
   78 — ORBES
================================================== */

console.log("");
console.log("=== TEST 78 — ORBES ===");

let orbBad = 0;

for (const { syn } of syns) {
  for (const a of syn.aspects) {
    if (a.orb > a.orb_max) orbBad++;
    if (a.orb < 0) orbBad++;
    if (a.orb_strength < 0 || a.orb_strength > 1) orbBad++;
  }
}

ok(orbBad === 0, "Tous les orbes natifs respectent leurs limites");

/* ==================================================
   79 — OVERLAYS
================================================== */

console.log("");
console.log("=== TEST 79 — HOUSE OVERLAYS ===");

let overlayBad = 0;

for (const { syn } of syns) {
  for (const o of syn.house_overlays) {
    if (!["primary", "target"].includes(o.owner_of_planet)) overlayBad++;
    if (!["primary", "target"].includes(o.falls_in_house_of)) overlayBad++;
    if (!o.planet) overlayBad++;
    if (!Number.isInteger(o.house_number) ||
        o.house_number < 1 ||
        o.house_number > 12) overlayBad++;
  }
}

ok(overlayBad === 0, "Tous les overlays sont structurellement valides");

/* ==================================================
   80 — CONTACTS ASCENDANT
================================================== */

console.log("");
console.log("=== TEST 80 — CONTACTS D'ANGLE ===");

let contactBad = 0;

for (const { syn } of syns) {
  for (const c of syn.angle_contacts) {
    if (!["primary", "target"].includes(c.owner_of_planet)) contactBad++;
    if (!c.planet) contactBad++;
    if (c.angle !== "ascendant") contactBad++;
    if (!finite(c.orb) || c.orb < 0 || c.orb > 3) contactBad++;
  }
}

ok(contactBad === 0, "Tous les contacts ASC sont dans l'orbe 3°");

/* ==================================================
   81 — SCORING DES 45 COUPLES
================================================== */

console.log("");
console.log("=== TEST 81 — SCORING 45 COUPLES ===");

const scores = [];

for (const { i, j, syn } of syns) {
  const s = scoreSafe(syn);

  ok(!s.__error, `Score ${i + 1}-${j + 1} sans exception`);

  if (!s.__error) {
    scores.push({ i, j, score: s });

    ok(finite(s.global_score),
      `Score ${i + 1}-${j + 1}: global fini`);

    ok(s.global_score >= 0 && s.global_score <= 100,
      `Score ${i + 1}-${j + 1}: global borné`);

    ok(Array.isArray(s.domain_scores),
      `Score ${i + 1}-${j + 1}: domaines présents`);

    ok(s.domain_scores.length === 7,
      `Score ${i + 1}-${j + 1}: 7 domaines`);
  }
}

ok(scores.length === 45, "45/45 scores valides");

/* ==================================================
   82 — DOMAINES
================================================== */

console.log("");
console.log("=== TEST 82 — DOMAINES ===");

const expectedDomains = new Set([
  "love",
  "passion",
  "communication",
  "emotions",
  "daily",
  "projects",
  "frictions"
]);

for (const { score } of scores) {
  const domains = new Set(score.domain_scores.map(d => d.domain));

  ok(domains.size === 7, "7 domaines uniques");

  let exact = domains.size === expectedDomains.size;

  for (const d of expectedDomains) {
    if (!domains.has(d)) exact = false;
  }

  ok(exact, "Ensemble des 7 domaines correct");

  for (const d of score.domain_scores) {
    ok(finite(d.score), `Domaine ${d.domain}: fini`);
    ok(d.score >= 0 && d.score <= 100,
      `Domaine ${d.domain}: borné`);
  }
}

/* ==================================================
   83 — CONTRIBUTIONS
================================================== */

console.log("");
console.log("=== TEST 83 — CONTRIBUTIONS ===");

let contributionBad = 0;

for (const { syn } of syns) {
  const s = scoreSafe(syn);
  if (s.__error) continue;

  const nativeIds = new Set(syn.aspects.map(a => a.aspect_id));

  for (const c of allContributions(s)) {
    if (!nativeIds.has(c.aspect_id)) contributionBad++;
    if (!finite(c.final_points)) contributionBad++;
    if (!finite(c.orb_strength)) contributionBad++;
    if (!finite(c.planet_weight)) contributionBad++;
    if (!finite(c.house_weight)) contributionBad++;
  }
}

ok(contributionBad === 0,
  "Toutes les contributions sont cohérentes avec les aspects natifs");

/* ==================================================
   84 — HOUSE WEIGHT
================================================== */

console.log("");
console.log("=== TEST 84 — HOUSE WEIGHT ===");

let houseBad = 0;

for (const { syn } of syns) {
  const s = scoreSafe(syn);
  if (s.__error) continue;

  for (const c of allContributions(s)) {
    if (!finite(c.house_weight)) houseBad++;
  }
}

ok(houseBad === 0, "Tous les house_weight sont numériques");

/* ==================================================
   85 — MODE DÉGRADÉ
================================================== */

console.log("");
console.log("=== TEST 85 — MODE DÉGRADÉ ===");

const unknown = real(
  makeUnknown("T85-U", "1985-07-22", 40.4168, -3.7038, "Europe/Madrid")
);

const synDeg = computeSynastry(charts[0], unknown);
const scoreDeg = scoreSafe(synDeg);

ok(unknown.reliability?.time_known === false,
  "Heure inconnue détectée");

ok(Array.isArray(unknown.houses) && unknown.houses.length === 0,
  "Heure inconnue : 0 maisons");

ok(synDeg.reliability?.degraded_mode === true,
  "Synastrie dégradée");

ok(synDeg.house_overlays.length === 0,
  "Dégradé : 0 overlays");

ok(synDeg.angle_contacts.length === 0,
  "Dégradé : 0 contacts angle");

ok(!scoreDeg.__error,
  "Dégradé : scoring OK");

if (!scoreDeg.__error) {
  ok(finite(scoreDeg.global_score),
    "Dégradé : score fini");
}

/* ==================================================
   86 — DOUBLE DÉGRADÉ
================================================== */

console.log("");
console.log("=== TEST 86 — DOUBLE DÉGRADÉ ===");

const u1 = real(makeUnknown(
  "T86-U1", "1975-01-15", 48.8566, 2.3522, "Europe/Paris"
));

const u2 = real(makeUnknown(
  "T86-U2", "2000-01-01", 35.6762, 139.6503, "Asia/Tokyo"
));

const su = computeSynastry(u1, u2);
const scu = scoreSafe(su);

ok(su.reliability?.degraded_mode === true,
  "Double inconnu : degraded=true");

ok(su.house_overlays.length === 0,
  "Double inconnu : 0 overlays");

ok(su.angle_contacts.length === 0,
  "Double inconnu : 0 contacts");

ok(!scu.__error,
  "Double inconnu : scoring OK");

/* ==================================================
   87 — DÉTERMINISME SCORE
================================================== */

console.log("");
console.log("=== TEST 87 — DÉTERMINISME SCORE ===");

for (const { i, j } of syns.slice(0, 10)) {
  const a = computeSynastry(charts[i], charts[j]);
  const b = computeSynastry(charts[i], charts[j]);

  const sa = computeScore(a, CONFIG);
  const sb = computeScore(b, CONFIG);

  ok(sa.global_score === sb.global_score,
    `Déterminisme score ${i + 1}-${j + 1}`);
}

/* ==================================================
   88 — DÉTERMINISME ASPECTS
================================================== */

console.log("");
console.log("=== TEST 88 — DÉTERMINISME ASPECTS ===");

for (const { i, j } of syns.slice(0, 10)) {
  const a = computeSynastry(charts[i], charts[j]);
  const b = computeSynastry(charts[i], charts[j]);

  const ka = a.aspects.map(normalizedTuple).sort().join("||");
  const kb = b.aspects.map(normalizedTuple).sort().join("||");

  ok(ka === kb,
    `Déterminisme aspects ${i + 1}-${j + 1}`);
}

/* ==================================================
   89 — IMMUTABILITÉ
================================================== */

console.log("");
console.log("=== TEST 89 — IMMUTABILITÉ ===");

for (const { syn } of syns.slice(0, 10)) {
  const before = JSON.stringify(syn);
  computeScore(syn, CONFIG);
  const after = JSON.stringify(syn);

  ok(before === after, "Synastrie immuable après scoring");
}

/* ==================================================
   90 — SATURATION
================================================== */

console.log("");
console.log("=== TEST 90 — SATURATION ===");

const sat = {
  synastry_id: "T90",
  primary_chart_id: "A",
  target_chart_id: "B",
  computed_at: "TEST",
  reliability: { degraded_mode: true, reason: null },
  aspects: [],
  house_overlays: [],
  angle_contacts: []
};

for (let i = 0; i < 500; i++) {
  sat.aspects.push({
    aspect_id: "SAT-" + i,
    body_a: { owner: "primary", body: "venus" },
    body_b: { owner: "target", body: "jupiter" },
    aspect_type: "conjunction",
    exact_angle: 0,
    actual_angle: 0,
    orb: 0,
    orb_max: 8,
    orb_strength: 1,
    polarity: "positive"
  });
}

const ssat = computeScore(sat, CONFIG);

ok(finite(ssat.global_score), "Saturation : global fini");
ok(ssat.global_score >= 0 && ssat.global_score <= 100,
  "Saturation : global borné");

for (const d of ssat.domain_scores) {
  ok(d.score >= 0 && d.score <= 100,
    `Saturation : ${d.domain} borné`);
}

/* ==================================================
   91 — EMPTY SYN ASTRIE
================================================== */

console.log("");
console.log("=== TEST 91 — SYN ASTRIE VIDE ===");

const empty = {
  synastry_id: "T91",
  primary_chart_id: "A",
  target_chart_id: "B",
  computed_at: "TEST",
  reliability: { degraded_mode: false, reason: null },
  aspects: [],
  house_overlays: [],
  angle_contacts: []
};

const se = computeScore(empty, CONFIG);

ok(se.global_score === 50,
  "Synastrie vide = global 50");

for (const d of se.domain_scores) {
  const expected = d.domain === "frictions" ? 0 : 50;
  ok(d.score === expected,
    `Synastrie vide : ${d.domain}=${expected}`);
}

/* ==================================================
   92 — BORNES DES DONNÉES
================================================== */

console.log("");
console.log("=== TEST 92 — BORNES 0/360 ===");

let longitudeBad = 0;

for (const c of charts) {
  for (const p of c.points) {
    if (p.absolute_degree < 0 || p.absolute_degree >= 360) {
      longitudeBad++;
    }
  }
}

ok(longitudeBad === 0, "Toutes les longitudes natales sont normalisées");

/* ==================================================
   93 — 100 COUPLES RAPIDES
================================================== */

console.log("");
console.log("=== TEST 93 — 100 CALCULS SYN ===");

let c100 = 0;
let c100bad = 0;

for (let i = 0; i < 100; i++) {
  const a = charts[i % charts.length];
  const b = charts[(i * 3 + 1) % charts.length];

  try {
    const syn = computeSynastry(a, b);
    const sc = computeScore(syn, CONFIG);

    c100++;

    if (!finite(sc.global_score) ||
        sc.global_score < 0 ||
        sc.global_score > 100) {
      c100bad++;
    }
  } catch {
    c100bad++;
  }
}

ok(c100 === 100, "100/100 calculs effectués");
ok(c100bad === 0, "100/100 calculs valides");

/* ==================================================
   94 — 1000 RECALCULS SCORE
================================================== */

console.log("");
console.log("=== TEST 94 — 1000 SCORE ===");

const reference = syns[0].syn;
const referenceScore = computeScore(reference, CONFIG);

let bad1000 = 0;

for (let i = 0; i < 1000; i++) {
  const s = computeScore(reference, CONFIG);
  if (s.global_score !== referenceScore.global_score) bad1000++;
}

ok(bad1000 === 0, "1000 scores identiques");

/* ==================================================
   95 — MIXED DOCTRINE
================================================== */

console.log("");
console.log("=== TEST 95 — MIXED ===");

const mixedRules = CONFIG.rules.filter(
  r => r.doctrine_polarity === "MIXED_TENSION_REVIEW"
);

ok(mixedRules.length === 6,
  "Configuration : 6 règles MIXED");

const mixedContribs = [];

for (const { syn } of syns) {
  const s = computeScore(syn, CONFIG);
  for (const c of allContributions(s)) {
    if (c.doctrine_polarity === "MIXED_TENSION_REVIEW") {
      mixedContribs.push(c);
    }
  }
}

ok(mixedContribs.length > 0,
  "MIXED détecté dans les données réelles");

/* ==================================================
   96 — GÉNÉRATIONNEL
================================================== */

console.log("");
console.log("=== TEST 96 — GÉNÉRATIONNEL ===");

const genRules = CONFIG.rules.filter(r =>
  ["uranus", "neptune", "pluto"].includes(r.planet_a) ||
  ["uranus", "neptune", "pluto"].includes(r.planet_b)
);

ok(genRules.length >= 15,
  "Règles générationnelles présentes");

ok(genRules.every(r => finite(r.base_points)),
  "Poids générationnels numériques");

/* ==================================================
   97 — RÈGLES UNIQUES
================================================== */

console.log("");
console.log("=== TEST 97 — IDENTIFIANTS CONFIG ===");

const ruleIds = CONFIG.rules.map(r => r.rule_id);
const uniqueRuleIds = new Set(ruleIds);

ok(uniqueRuleIds.size === ruleIds.length,
  "Tous les rule_id sont uniques");

ok(ruleIds.length === 51,
  "V1.2 contient exactement 51 règles");

/* ==================================================
   98 — POLARITÉS
================================================== */

console.log("");
console.log("=== TEST 98 — POLARITÉS ===");

const validPolarity = new Set([
  undefined,
  null,
  "MIXED_TENSION_REVIEW"
]);

let polarityBad = 0;

for (const r of CONFIG.rules) {
  if (!validPolarity.has(r.doctrine_polarity)) polarityBad++;
}

ok(polarityBad === 0,
  "Doctrine polarity conforme");

/* ==================================================
   99 — END TO END
================================================== */

console.log("");
console.log("=== TEST 99 — END TO END ===");

let e2eBad = 0;

for (let i = 0; i < 20; i++) {
  const a = charts[i % charts.length];
  const b = charts[(i + 1) % charts.length];

  try {
    const syn = computeSynastry(a, b);
    const s = computeScore(syn, CONFIG);

    if (!finite(s.global_score)) e2eBad++;
    if (s.global_score < 0 || s.global_score > 100) e2eBad++;
    if (syn.aspects.length === 0) e2eBad++;
  } catch {
    e2eBad++;
  }
}

ok(e2eBad === 0,
  "20 pipelines Profil → Natal → Synastrie → Score");

/* ==================================================
   100 — FINAL INTEGRITY
================================================== */

console.log("");
console.log("=== TEST 100 — FINAL INTEGRITY ===");

const finalChecks = [
  CONFIG.version === "v1.2",
  CONFIG.rules.length === 51,
  mixedRules.length === 6,
  charts.length === 10,
  syns.length === 45,
  scores.length === 45,
  longitudeBad === 0,
  invalidAspects === 0,
  duplicateIds === 0,
  contributionBad === 0,
  houseBad === 0,
  overlayBad === 0,
  contactBad === 0,
  c100 === 100,
  c100bad === 0,
  bad1000 === 0,
  e2eBad === 0
];

ok(
  finalChecks.every(Boolean),
  "Intégrité globale AstroMatch"
);

console.log("");
console.log("==================================================");
console.log("RÉSULTAT TESTS 73 → 100");
console.log("==================================================");
console.log("PASS :", PASS);
console.log("FAIL :", FAIL);
console.log("==================================================");

if (FAIL === 0) {
  console.log("TESTS 73 → 100 — PASS COMPLET");
} else {
  console.log("TESTS 73 → 100 — ANOMALIES À ANALYSER");
}

console.log("==================================================");
