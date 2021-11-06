import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { utils } from 'helpers';
import id from './locales/id';
import en from './locales/en';

const lng = utils.getLang();

i18next
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
      format: (value, format) => {
        if (format === 'ucfirst') return value[0].toUpperCase() + value.toLowerCase().slice(1);
        if (format === 'lowerCase') return value.toLowerCase();
        return value;
      },
    },
    lng,
    fallbackLng: 'id',
    resources: { id, en },
  });

export default i18next;
