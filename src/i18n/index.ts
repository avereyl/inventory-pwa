
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';

export const DEFAULT_LANGUAGE_KEY: string = 'fr';

const resources: any = {
    fr,
  };

i18n.use(initReactI18next).init({
    lng: DEFAULT_LANGUAGE_KEY,
    resources,
    keySeparator: '.',
    fallbackLng: DEFAULT_LANGUAGE_KEY,
    interpolation: {
      escapeValue: false,
    },
});