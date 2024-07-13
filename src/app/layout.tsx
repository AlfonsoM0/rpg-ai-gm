import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Modal } from 'components/modal';
import { AI_NAME_TO_SHOW } from 'config/constants';
import { Footer } from 'components/footer';
import Navbar from 'components/navbar';
import { navbarLinks } from 'config/navbar-links';
import TTSLoader from 'components/tts/tts-loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: AI_NAME_TO_SHOW,
  description: `Play your historys with ${AI_NAME_TO_SHOW}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light">
      <body className={inter.className}>
        <header className="h-16">
          <Navbar menuOps={navbarLinks} />
        </header>

        {children}
        <Modal />
        <TTSLoader />

        <Footer />
      </body>
    </html>
  );
}
