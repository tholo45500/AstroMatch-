import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const { computeScore } =
  await import("./js/scoring/scoring_engine.js");

const cfg = JSON.parse(
  await readFile("./js/scoring/config/weighting_v1_2.json", "utf8")
);

console.log("==================================================");
console.log("TEST 60 FINAL — ROBUSTESSE AUX ENTRÉES MALFORMÉES");
console.log("==================================================");

function baseSynastry() {
  return {
    synastry_id: "TEST60",
    primary_chart_id: "A",
    target_chart_id: "B",
    computed_at: "2026-01-01T00:00:00.000Z",
    reliability: {
      degraded_mode: false,
      reason: null
    },
    aspects: [],
    house_overlays: [],
    angle_contacts: []
  };
}

function makeValidAspect() {
  return {
    aspect_id: "TEST60_ASPECT",
    body_a: {
      owner: "primary",
      body: "venus"
    },
    body_b: {
      owner: "target",
      body: "venus"
    },
    aspect_type: "conjunction",
    exact_angle: 0,
    actual_angle: 2,
    orb: 2,
    orb_max: 8,
    orb_strength: 0.75,
    polarity: "positive"
  };
}

function makeValidSynastry() {
  const s = baseSynastry();
  s.aspects = [makeValidAspect()];
  s.house_overlays = [{
    owner_of_planet: "primary",
    planet: "venus",
    falls_in_house_of: "target",
    house_number: 7
  }];
  return s;
}

function runCase(name, synastry, expected) {
  try {
    const result = computeScore(synastry, cfg);

    const json = JSON.stringify(result);

    assert.ok(result, `${name}: résultat absent`);
    assert.ok(Number.isFinite(result.global_score),
      `${name}: global_score non fini`);
    assert.ok(
      result.global_score >= 0 &&
      result.global_score <= 100,
      `${name}: global_score hors [0,100]`
    );
    assert.ok(!json.includes("NaN"),
      `${name}: NaN détecté dans la sortie`);
    assert.ok(!json.includes("Infinity"),
      `${name}: Infinity détecté dans la sortie`);

    if (expected === "score") {
      assert.ok(Array.isArray(result.domain_scores),
        `${name}: domain_scores absent`);
    }

    console.log(`PASS :: ${name}`);
    return true;

  } catch (err) {
    if (expected === "reject") {
      console.log(`PASS :: ${name} :: rejet propre`);
      return true;
    }

    console.log(`FAIL :: ${name} :: ${err.message}`);
    return false;
  }
}

let pass = 0;
let fail = 0;

function test(name, synastry, expected = "score") {
  if (runCase(name, synastry, expected)) pass++;
  else fail++;
}

/* --------------------------------------------------
   1. CAS NORMAUX / VIDES
-------------------------------------------------- */

test(
  "Synastrie vide",
  baseSynastry()
);

test(
  "Aspect valide",
  makeValidSynastry()
);

/* --------------------------------------------------
   2. STRUCTURES ABSENTES / NULL
-------------------------------------------------- */

{
  const s = baseSynastry();
  delete s.aspects;
  test("aspects absents", s, "reject");
}

{
  const s = baseSynastry();
  s.aspects = null;
  test("aspects null", s, "reject");
}

{
  const s = baseSynastry();
  delete s.house_overlays;
  test("house_overlays absents", s, "score");
}

{
  const s = baseSynastry();
  s.house_overlays = null;
  test("house_overlays null", s, "reject");
}

/* --------------------------------------------------
   3. ASPECTS MALFORMÉS
-------------------------------------------------- */

{
  const s = baseSynastry();
  s.aspects = [null];
  test("aspect null", s, "reject");
}

{
  const s = baseSynastry();
  s.aspects = [{}];
  test("aspect objet vide", s, "reject");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb = NaN;
  s.aspects = [a];
  test("orb NaN", s, "reject");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb = Infinity;
  s.aspects = [a];
  test("orb Infinity", s, "reject");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb = -1;
  s.aspects = [a];
  test("orb négatif", s, "score");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb = 999999;
  s.aspects = [a];
  test("orb énorme", s, "score");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.aspect_type = "UNKNOWN_ASPECT";
  s.aspects = [a];
  test("aspect inconnu", s, "score");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.body_a.body = "unknown_planet";
  s.aspects = [a];
  test("planète inconnue A", s, "score");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.body_b.body = "unknown_planet";
  s.aspects = [a];
  test("planète inconnue B", s, "score");
}

/* --------------------------------------------------
   4. VALEURS NUMÉRIQUES EXTRÊMES
-------------------------------------------------- */

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb_strength = NaN;
  s.aspects = [a];
  test("orb_strength NaN", s, "reject");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb_strength = Infinity;
  s.aspects = [a];
  test("orb_strength Infinity", s, "reject");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb_strength = -1000;
  s.aspects = [a];
  test("orb_strength négatif extrême", s, "score");
}

{
  const s = baseSynastry();
  const a = makeValidAspect();
  a.orb_strength = 1000;
  s.aspects = [a];
  test("orb_strength extrême", s, "score");
}

/* --------------------------------------------------
   5. IDENTITÉS / TYPES
-------------------------------------------------- */

{
  const s = baseSynastry();
  s.synastry_id = null;
  test("synastry_id null", s, "score");
}

{
  const s = baseSynastry();
  s.reliability = null;
  test("reliability null", s, "score");
}

{
  const s = baseSynastry();
  s.reliability.degraded_mode = "false";
  test("degraded_mode string", s, "score");
}

{
  const s = baseSynastry();
  s.reliability.degraded_mode = 1;
  test("degraded_mode numérique", s, "score");
}

/* --------------------------------------------------
   6. TABLEAUX EXTRÊMES
-------------------------------------------------- */

{
  const s = baseSynastry();
  s.aspects = Array.from({ length: 1000 }, () => makeValidAspect());
  test("1000 aspects identiques", s, "score");
}

{
  const s = baseSynastry();
  s.aspects = [];
  s.house_overlays = Array.from({ length: 1000 }, () => ({
    owner_of_planet: "primary",
    planet: "venus",
    falls_in_house_of: "target",
    house_number: 7
  }));
  test("1000 overlays", s, "score");
}

/* --------------------------------------------------
   7. DÉTERMINISME APRÈS CAS POURRIS
-------------------------------------------------- */

{
  const s = makeValidSynastry();

  const a = computeScore(s, cfg);
  const b = computeScore(s, cfg);

  assert.deepEqual(
    {
      global_score: a.global_score,
      domain_scores: a.domain_scores
    },
    {
      global_score: b.global_score,
      domain_scores: b.domain_scores
    }
  );

  console.log("PASS :: déterminisme après entrées malformées");
  pass++;
}

/* --------------------------------------------------
   RÉSULTAT
-------------------------------------------------- */

console.log("");
console.log("==================================================");
console.log("RÉSULTAT TEST 60");
console.log("==================================================");
console.log(`PASS : ${pass}`);
console.log(`FAIL : ${fail}`);
console.log("==================================================");

if (fail === 0) {
  console.log("TEST 60 FINAL — PASS COMPLET");
} else {
  console.log("TEST 60 FINAL — ECHEC");
  process.exitCode = 1;
}
