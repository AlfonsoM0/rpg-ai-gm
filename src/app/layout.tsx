import 'regenerator-runtime/runtime'; // This is necesary for Build STT.

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { app_metadata } from 'config/app-metadata';
import { Footer } from 'components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = app_metadata;

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        {children}

        <Footer />
      </body>
    </html>
  );
}
