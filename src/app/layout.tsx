import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Modal } from 'components/modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Game Master AI',
  description: 'Play your historys with Game Master AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light">
      <body className={inter.className}>
        {children}
        <Modal />
      </body>
    </html>
  );
}
