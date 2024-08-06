import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Locale, locales } from './i18n-config';

// https://www.sitepoint.com/next-js-internationalization/#languageroutingandslugs
// https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/i18n.ts

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (
      await (locale === 'en'
        ? // When using Turbopack, this will enable HMR for `en`

          import('../content/en.json')
        : import(`../content/${locale}.json`))
    ).default,
  };
});
