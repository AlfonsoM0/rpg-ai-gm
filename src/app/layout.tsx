import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Modal } from 'components/modal';
import { Game_Master_AI } from 'config/constants';
import { Footer } from 'components/footer';
import Navbar from 'components/navbar';
import { navbarLinks } from 'config/navbar-links';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: Game_Master_AI,
  description: `Play your historys with ${Game_Master_AI}`,
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

        <Footer />
      </body>
    </html>
  );
}
