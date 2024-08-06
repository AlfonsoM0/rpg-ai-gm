import 'server-only';
import { Locale as Lc } from 'src/i18n-config';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
};

export const getContent = async (locale: Lc) => dictionaries[locale]();

export type Locale = Lc;
