// https://ducanh-next-pwa.vercel.app/docs/next-pwa/configuring
import withPWAInit from '@ducanh2912/next-pwa';

// https://www.sitepoint.com/next-js-internationalization/
import i18n from 'next-intl/plugin';
const withI18n = i18n();

const withPWA = withPWAInit({
  disable: process.env.NODE_ENV === 'development',
  register: true,

  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: 'public',
  fallbacks: {
    //image: "/static/images/fallback.png",
    // document: "/offline", // if you want to fallback to a custom page rather than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  },

  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ['en', 'es'],
  //   defaultLocale: 'en',
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withI18n(withPWA(nextConfig));
