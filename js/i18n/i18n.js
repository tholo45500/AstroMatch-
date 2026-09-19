import { locales, supportedLocales } from "./locales/index.js";

const STORAGE_KEY = "astromatch.language";
const DEFAULT_LOCALE = "fr";

const RTL_LOCALES = new Set([
  "ar",
  "fa",
  "he",
  "ur"
]);

let currentLocale = DEFAULT_LOCALE;

function normalizeLocale(locale) {
  if (!locale || typeof locale !== "string") {
    return DEFAULT_LOCALE;
  }

  const normalized =
    locale
      .trim()
      .toLowerCase()
      .split("-")[0]
      .split("_")[0];

  return locales[normalized]
    ? normalized
    : DEFAULT_LOCALE;
}

function readStoredLocale() {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    return normalizeLocale(
      window.localStorage.getItem(STORAGE_KEY)
    );
  } catch {
    return DEFAULT_LOCALE;
  }
}

function saveLocale(locale) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      locale
    );
  } catch {
    // L'application continue même si localStorage
    // est momentanément indisponible.
  }
}

function resolveKey(dictionary, key) {
  if (!dictionary || !key) {
    return undefined;
  }

  return dictionary[key];
}

export function t(key, variables = {}) {
  const activeDictionary =
    locales[currentLocale] ||
    locales[DEFAULT_LOCALE];

  let value =
    resolveKey(activeDictionary, key) ??
    resolveKey(locales[DEFAULT_LOCALE], key) ??
    key;

  if (typeof value !== "string") {
    return String(value);
  }

  for (const [name, replacement] of Object.entries(variables)) {
    value = value.replaceAll(
      `{${name}}`,
      String(replacement)
    );
  }

  return value;
}

function applyDocumentLanguage(locale) {
  if (typeof document === "undefined") {
    return;
  }

  const direction =
    RTL_LOCALES.has(locale)
      ? "rtl"
      : "ltr";

  document.documentElement.lang = locale;
  document.documentElement.dir = direction;
}

export function translateDocument(root = document) {
  if (typeof document === "undefined" || !root) {
    return;
  }

  root
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key =
        element.getAttribute("data-i18n");

      if (key) {
        element.textContent = t(key);
      }
    });

  root
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((element) => {
      const key =
        element.getAttribute(
          "data-i18n-placeholder"
        );

      if (key) {
        element.setAttribute(
          "placeholder",
          t(key)
        );
      }
    });

  root
    .querySelectorAll("[data-i18n-title]")
    .forEach((element) => {
      const key =
        element.getAttribute(
          "data-i18n-title"
        );

      if (key) {
        element.setAttribute(
          "title",
          t(key)
        );
      }
    });

  root
    .querySelectorAll("[data-i18n-aria-label]")
    .forEach((element) => {
      const key =
        element.getAttribute(
          "data-i18n-aria-label"
        );

      if (key) {
        element.setAttribute(
          "aria-label",
          t(key)
        );
      }
    });
}

export function setLocale(locale, options = {}) {
  const normalized =
    normalizeLocale(locale);

  currentLocale = normalized;

  if (options.persist !== false) {
    saveLocale(normalized);
  }

  applyDocumentLanguage(normalized);

  if (
    options.translate !== false &&
    typeof document !== "undefined"
  ) {
    translateDocument(document);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(
        "astromatch:languagechange",
        {
          detail: {
            locale: normalized,
            direction:
              RTL_LOCALES.has(normalized)
                ? "rtl"
                : "ltr"
          }
        }
      )
    );
  }

  return normalized;
}

export function getLocale() {
  return currentLocale;
}

export function getDirection(
  locale = currentLocale
) {
  return RTL_LOCALES.has(
    normalizeLocale(locale)
  )
    ? "rtl"
    : "ltr";
}

export function getSupportedLocales() {
  return [...supportedLocales];
}

export function initI18n() {
  currentLocale =
    readStoredLocale();

  applyDocumentLanguage(
    currentLocale
  );

  if (typeof document !== "undefined") {
    translateDocument(document);
  }

  return currentLocale;
}

export {
  DEFAULT_LOCALE,
  STORAGE_KEY,
  normalizeLocale
};
