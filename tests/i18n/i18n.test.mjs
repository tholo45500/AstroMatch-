import test from "node:test";
import assert from "node:assert/strict";

import fr from "../../js/i18n/locales/fr.js";
import en from "../../js/i18n/locales/en.js";

import {
  DEFAULT_LOCALE,
  normalizeLocale,
  setLocale,
  getLocale,
  t
} from "../../js/i18n/i18n.js";

test("FR reste la langue par défaut", () => {
  assert.equal(DEFAULT_LOCALE, "fr");
});

test("normalisation des locales", () => {
  assert.equal(
    normalizeLocale("fr-FR"),
    "fr"
  );

  assert.equal(
    normalizeLocale("en-US"),
    "en"
  );

  assert.equal(
    normalizeLocale("zz-ZZ"),
    "fr"
  );
});

test("FR et EN possèdent exactement les mêmes clés", () => {
  assert.deepEqual(
    Object.keys(en).sort(),
    Object.keys(fr).sort()
  );
});

test("changement FR vers EN", () => {
  setLocale(
    "en",
    {
      persist: false,
      translate: false
    }
  );

  assert.equal(
    getLocale(),
    "en"
  );

  assert.equal(
    t("nav.today"),
    "Today"
  );
});

test("retour FR", () => {
  setLocale(
    "fr",
    {
      persist: false,
      translate: false
    }
  );

  assert.equal(
    t("nav.today"),
    "Aujourd’hui"
  );
});

test("une clé inconnue ne fait pas planter le moteur", () => {
  assert.equal(
    t("does.not.exist"),
    "does.not.exist"
  );
});
