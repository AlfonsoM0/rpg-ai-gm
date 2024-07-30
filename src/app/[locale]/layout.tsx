import 'regenerator-runtime/runtime'; // This is necesary for Build STT.

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Modal } from 'components/modal';
import { Footer } from 'components/footer';
import Navbar from 'components/navbar';
import { navbarLinks } from 'config/navbar-links';
import TTSLoader from 'components/tts/tts-loader';
import TestComponent from '../(TEST)/testComponent';
import FixComponent from '../(FIX)/FixComponent';
import UserFirebaseSync from 'components/user/user-fire-sync';
import { app_metadata } from 'config/app-metadata';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = app_metadata;

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();

  return (
    <html lang={params.locale} data-theme="light">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <header className="fixed top-0 left-0 right-0 z-10">
            <Navbar menuOps={navbarLinks} />
          </header>
          <TestComponent />
          <FixComponent />

          {children}

          <Modal />
          <UserFirebaseSync />
          <TTSLoader />

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
