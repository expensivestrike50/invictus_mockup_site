import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import it from './locales/it.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import ar from './locales/ar.json';

export const languages = [
  { code: 'en', label: 'English', dir: 'ltr' as const },
  { code: 'es', label: 'Español', dir: 'ltr' as const },
  { code: 'it', label: 'Italiano', dir: 'ltr' as const },
  { code: 'fr', label: 'Français', dir: 'ltr' as const },
  { code: 'pt', label: 'Português', dir: 'ltr' as const },
  { code: 'ar', label: 'العربية', dir: 'rtl' as const },
];

export const rtlLanguages = languages.filter((l) => l.dir === 'rtl').map((l) => l.code);

export function applyDocumentDirection(lang: string) {
  const isRtl = rtlLanguages.includes(lang);
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      it: { translation: it },
      fr: { translation: fr },
      pt: { translation: pt },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'it', 'fr', 'pt', 'ar'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'invictus-language',
    },
  });

applyDocumentDirection(i18n.resolvedLanguage ?? 'en');

i18n.on('languageChanged', (lng) => {
  applyDocumentDirection(lng);
});

export default i18n;
