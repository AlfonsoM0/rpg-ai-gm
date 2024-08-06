import { Pathnames, LocalePrefix } from 'next-intl/routing';

// https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/config.ts

export const defaultLocale = 'en' as const;
export const locales = ['en', 'es'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/pathnames': {
    en: '/en',
    es: '/es',
  },
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export type Locale = 'en' | 'es';
