import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa le traduzioni
import en from "./locales/en.json";
import it from "./locales/it.json";

const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
};

// Recupera la lingua salvata nel localStorage, o usa 'it' come default
const savedLanguage = localStorage.getItem("i18nextLng") || "it";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // usa la lingua salvata
  fallbackLng: "en", // lingua di fallback
  interpolation: {
    escapeValue: false, // react già fa l'escape dei valori
  },
});

// Salva la lingua nel localStorage quando cambia
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
