import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n-config';

// https://www.sitepoint.com/next-js-internationalization/#languageroutingandslugs
// https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/middleware.ts

const middleware = createMiddleware({
  // Add locales you want in the app
  locales,

  // Default locale if no match
  defaultLocale,
});

export default middleware;

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|es)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
