import { Metadata, Viewport } from 'next';
import { AI_NAME_TO_SHOW } from './constants';

const APP_DESCRIPTION = `Play your story with ${AI_NAME_TO_SHOW}`;
const APP_KEYWORDS = 'rpg, roleplay, game, master,ai, dice, roll, 1d6, 2d6';

const APP_NAME = AI_NAME_TO_SHOW;
const APP_DEFAULT_TITLE = AI_NAME_TO_SHOW;
const APP_TITLE_TEMPLATE = 'GmAi | %s';

const APP_URL =
  process.env.NODE_ENV === 'development'
    ? (process.env.NEXT_PUBLIC_URL_DEV as string)
    : (process.env.NEXT_PUBLIC_URL_PRO as string);

export const app_metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  icons: {
    icon: '/android-chrome-192x192.png',
    shortcut: '/android-chrome-512x512.png',
    apple: '/apple-touch-icon.png',
  },

  referrer: 'origin-when-cross-origin',
  authors: {
    name: 'Alfonso Montes de Oca',
    url: 'https://alfonso.ar',
  },
  creator: 'Alfonso Montes de Oca',
  publisher: 'Alfonso Montes de Oca',
  other: {
    copyright: 'Alfonso Montes de Oca 2024',
    'google-site-verification': '', // TODO:
    'reply-to': 'montesdeoca.alfonso.dev+alfonsoweb@gmail.com',
    'theme-color': '#ffffff',
    'msapplication-TileColor': '#000000',
    'apple-mobile-web-app-status-bar': '#ffffff',
  },
  robots: 'all, follow, index',
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'es-AR': '/es',
    },
  },

  //PWA => Generate Dynamic Metadata
  // manifest: '/manifest.json',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },

  openGraph: {
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    type: 'website',
    siteName: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    images: ['https://gmai.rpg.ar/favicon.ico'],
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const app_viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};
