import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// https://www.sitepoint.com/next-js-internationalization/#languageroutingandslugs

const locales: string[] = ['en', 'es'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../content/${locale}.json`)).default,
  };
});
