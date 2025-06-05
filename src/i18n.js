import { createI18n } from 'vue-i18n';

const savedLocale = localStorage.getItem('locale') || 'en';

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en: { /* ... */ },
    kh: { /* ... */ },
  },
});

export default i18n;
