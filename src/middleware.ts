import createMiddleware from 'next-intl/middleware';

// https://www.sitepoint.com/next-js-internationalization/#languageroutingandslugs

const middleware = createMiddleware({
  // Add locales you want in the app
  locales: ['en', 'es'],

  // Default locale if no match
  defaultLocale: 'en',
});

export default middleware;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:page*'],
};
