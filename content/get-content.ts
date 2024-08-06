import 'server-only';
import { Locale } from 'src/i18n';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
};

export const getContent = async (locale: Locale) => dictionaries[locale]();
export * from 'src/i18n';
