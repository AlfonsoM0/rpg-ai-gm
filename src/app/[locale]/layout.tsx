import 'regenerator-runtime/runtime'; // This is necesary for Build STT.

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Modal } from 'components/modal';
import TTSLoader from 'components/tts/tts-loader';
import TestComponent from '../(TEST)/testComponent';
import FixComponent from '../(FIX)/FixComponent';
import UserFirebaseSync from 'components/user/user-fire-sync';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from 'components/header';
import { Locale } from '../../i18n';
import { app_metadata } from 'config/app-metadata';
import { AI_NAME_TO_SHOW } from 'config/constants';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    ...app_metadata,
    description:
      locale === 'en'
        ? `Play your story with ${AI_NAME_TO_SHOW}`
        : `Juega tu historia con ${AI_NAME_TO_SHOW}`,

    manifest: locale === 'en' ? '/manifest_en.json' : '/manifest_es.json',
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="light">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />

          <TestComponent />
          <FixComponent locale={locale as Locale} />

          {children}

          <Modal />
          <UserFirebaseSync />
          <TTSLoader />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
