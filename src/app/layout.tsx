import 'regenerator-runtime/runtime'; // This is necesary for Build STT.

import './globals.css';
import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import { app_metadata } from 'config/app-metadata';
import { Footer } from 'components/footer';

const font = Merriweather({ subsets: ['latin'], weight: '300' });

export const metadata: Metadata = app_metadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" data-theme="light">
      <body className={font.className}>
        {children}

        <Footer />
      </body>
    </html>
  );
}
