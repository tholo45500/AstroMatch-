import fr from "./fr.js";
import en from "./en.js";

export const locales = {
  fr,
  en
};

export const supportedLocales = Object.freeze([
  {
    code: "fr",
    label: "Français",
    direction: "ltr"
  },
  {
    code: "en",
    label: "English",
    direction: "ltr"
  }
]);
