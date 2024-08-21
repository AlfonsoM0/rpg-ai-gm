'use client';

import { useTranslations } from 'next-intl';
import Navbar, { NavbarLinks } from './navbar';
import { APP_URL } from 'src/config/constants';

export default function Header() {
  const t = useTranslations('Header.Navbar_links');

  const navbarLinks: NavbarLinks = [
    {
      name: t('/'),
      url: APP_URL.HOME,
    },
    {
      name: t('/tutorial'),
      url: APP_URL.HOME_TUTORIAL,
    },
    {
      name: t('/library'),
      url: APP_URL.HOME_LIBRARY,
    },
    {
      name: t('/multiplayer'),
      url: APP_URL.HOME_MULTIPLAYER,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      <Navbar navbarLinks={navbarLinks} />
    </header>
  );
}
