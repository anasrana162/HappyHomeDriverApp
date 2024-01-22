import i18n from 'i18next';
import {I18nManager} from 'react-native';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import ar from './ar.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    ar: ar,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  //   react: {
  //     useSuspense: false,
  //   },
});

export default i18n;