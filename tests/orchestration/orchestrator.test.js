// tests/orchestration/orchestrator.test.js

import test from "node:test";
import assert from "node:assert/strict";

import { createProfile, updateProfile } from "../../js/profiles/profile_service.js";
import { repository } from "../../js/storage/repository.js";
import { runFullComparison } from "../../js/orchestration/comparison_orchestrator.js";

const PRIMARY_INPUT = {
  role: "primary",
  first_name: "Anthony",
  date: "1990-04-12",
  time: "14:35",
  time_known: true,
  place: "Lyon, France"
};

function targetInput(firstName, place) {
  return {
    role: "target",
    first_name: firstName,
    date: "1992-08-03",
    time: "09:10",
    time_known: true,
    place
  };
}

test("runFullComparison traite toutes les cibles et isole les erreurs (une cible invalide n'affecte pas les autres)", async () => {
  repository.clearAll();
  createProfile(PRIMARY_INPUT);
  createProfile(targetInput("Julie", "Paris, France"));
  createProfile(targetInput("Sarah", "Marseille, France"));
  createProfile(targetInput("Emma", "Ville Introuvable")); // lieu non résolu -> doit échouer
  createProfile(targetInput("Clara", "Tokyo, Japan"));

  const results = await runFullComparison();

  assert.equal(results.length, 4);

  const emma = results.find((r) => r.target_name === "Emma");
  assert.equal(emma.status, "error");
  assert.ok(emma.error.length > 0);

  const okResults = results.filter((r) => r.status === "done");
  assert.equal(okResults.length, 3);

  repository.clearAll();
});

test("runFullComparison : un seul thème principal est calculé, quel que soit le nombre de cibles (test avec 50 cibles)", async () => {
  repository.clearAll();
  createProfile(PRIMARY_INPUT);

  for (let i = 0; i < 50; i++) {
    createProfile(targetInput(`Cible${i}`, "Paris, France"));
  }

  const results = await runFullComparison();

  assert.equal(results.length, 50);
  const doneResults = results.filter((r) => r.status === "done");
  assert.equal(doneResults.length, 50);

  // Toutes les synastries doivent référencer EXACTEMENT le même
  // primary_chart_id : preuve qu'un seul thème principal a été calculé
  // et réutilisé pour les 50 comparaisons.
  const primaryChartIds = new Set(doneResults.map((r) => r.synastry.primary_chart_id));
  assert.equal(primaryChartIds.size, 1, "un seul thème principal aurait dû être calculé pour les 50 cibles");

  repository.clearAll();
});

test("runFullComparison : chaque résultat contient un score complet et une interprétation traçable", async () => {
  repository.clearAll();
  createProfile(PRIMARY_INPUT);
  createProfile(targetInput("Julie", "Paris, France"));

  const results = await runFullComparison();
  const result = results[0];

  assert.equal(result.status, "done");
  assert.ok(result.score.global_score >= 0 && result.score.global_score <= 100);
  assert.equal(result.interpretation.length, 7); // 7 domaines
  assert.ok(typeof result.narrative === "string" && result.narrative.length > 0);

  repository.clearAll();
});

test("runFullComparison échoue proprement si aucun profil principal n'est défini", async () => {
  repository.clearAll();
  createProfile(targetInput("Julie", "Paris, France"));

  await assert.rejects(
    () => runFullComparison(),
    (err) => err.type === "NO_PRIMARY_PROFILE"
  );

  repository.clearAll();
});
test("runFullComparison réutilise le thème d'une cible inchangée", async () => {
  repository.clearAll();
  createProfile(PRIMARY_INPUT);
  const target = createProfile(targetInput("Julie", "Paris, France"));

  const first = await runFullComparison();
  const firstChartId = first[0].synastry.target_chart_id;

  const second = await runFullComparison();
  const secondChartId = second[0].synastry.target_chart_id;

  assert.equal(secondChartId, firstChartId);
  assert.equal(repository.getChartHistory(target.profile_id).length, 0);

  repository.clearAll();
});

test("une modification de cible invalide son thème en cache", async () => {
  repository.clearAll();
  createProfile(PRIMARY_INPUT);
  const target = createProfile(targetInput("Julie", "Paris, France"));

  const first = await runFullComparison();
  const firstChartId = first[0].synastry.target_chart_id;

  updateProfile(target.profile_id, { date: "1992-08-04" });

  const second = await runFullComparison();
  assert.notEqual(second[0].synastry.target_chart_id, firstChartId);
  assert.equal(repository.getChartHistory(target.profile_id).length, 1);

  repository.clearAll();
});


test("un second profil principal est refusé", () => {
  repository.clearAll();
  createProfile(PRIMARY_INPUT);
  assert.throws(
    () => createProfile(PRIMARY_INPUT),
    (err) => err.type === "PRIMARY_ALREADY_EXISTS"
  );
  repository.clearAll();
});

test("runFullComparison réutilise aussi le thème principal inchangé", async () => {
  repository.clearAll();
  const primary = createProfile(PRIMARY_INPUT);
  createProfile(targetInput("Julie", "Paris, France"));

  const first = await runFullComparison();
  const firstChartId = first[0].synastry.primary_chart_id;
  const second = await runFullComparison();
  const secondChartId = second[0].synastry.primary_chart_id;

  assert.equal(secondChartId, firstChartId);
  assert.equal(repository.getChartHistory(primary.profile_id).length, 0);
  repository.clearAll();
});

test("le résultat de comparaison conserve l'empreinte de configuration de scoring", async () => {
  repository.clearAll();
  createProfile(PRIMARY_INPUT);
  createProfile(targetInput("Julie", "Paris, France"));
  const results = await runFullComparison();
  assert.equal(typeof results[0].score.weighting_config_fingerprint, "string");
  assert.ok(results[0].score.weighting_config_fingerprint.length > 0);
  repository.clearAll();
});
