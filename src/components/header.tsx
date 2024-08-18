'use client';

import { useTranslations } from 'next-intl';
import Navbar, { NavbarLinks } from './navbar';

export default function Header() {
  const t = useTranslations('Header.Navbar_links');

  const navbarLinks: NavbarLinks = [
    {
      name: t('/'),
      url: '/',
    },
    {
      name: t('/tutorial'),
      url: '/tutorial',
    },
    {
      name: t('/library'),
      url: '/library',
    },
    {
      name: t('/multiplayer'),
      url: '/multiplayer',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      <Navbar navbarLinks={navbarLinks} />
    </header>
  );
}
