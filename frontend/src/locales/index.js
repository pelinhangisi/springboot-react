import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import tr from './translations/tr.json';

const initialLanguage =
  localStorage.getItem('lang') || navigator.language || 'tr';

export const i18nIntance = i18n.use(initReactI18next);

i18nIntance.init({
  resources: {
    en: {
      translation: en,
    },
    tr: {
      translation: tr,
    },
  },
  fallbackLng: initialLanguage,
  interpolation: {
    escapeValue: false,
  },
});
