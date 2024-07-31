'use client';

import { Link } from '@/navigation';
import { useEffect, useRef } from 'react';
import srcLogo from 'public/android-chrome-512x512.png';
import UserButton from './user/user-button';
import LangSwitcher from './lang-switcher';

type SubOps = { name: string; url: string }[];

export type NavbarLinks = {
  name: string;
  url?: string;
  subOps?: SubOps;
}[];

interface NavbarProps {
  navbarLinks: NavbarLinks;
}

export function Navbar({ navbarLinks }: NavbarProps): JSX.Element {
  const ref = useRef<HTMLDetailsElement>(null);
  function toggleDetails(): void {
    if (ref.current) {
      ref.current.open = false;
    }
  }

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    let prevScrollPos = window.scrollY;

    const listen = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        navbar?.classList.remove('hidden');
      } else {
        navbar?.classList.add('hidden');
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', listen);

    return () => {
      window.removeEventListener('scroll', listen);
    };
  }, []);

  return (
    <nav className="navbar bg-base-100 shadow" id="navbar">
      {/* <!-- Navbar Start --> */}
      <div className="navbar-start">
        <details className="dropdown" ref={ref}>
          <summary className="btn btn-ghost lg:hidden" role="button" tabIndex={0}>
            {svgDropdown}
          </summary>

          <ul
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            // tabIndex={0}
          >
            {navbarLinks.map((item) => (
              <LiWithDetails
                isDetailsOpen
                item={item}
                key={item.name}
                onItemClick={toggleDetails}
              />
            ))}
          </ul>
        </details>

        <Link className="btn btn-ghost text-sm md:text-xl" href={'/'}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Game Master AI" src={srcLogo.src} width={32} />
          Game Master AI
        </Link>
      </div>

      {/* <!-- Navbar Center --> */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navbarLinks.map((item) => (
            <LiWithDetails item={item} key={item.name} />
          ))}
        </ul>
      </div>

      {/* <!-- Navbar End --> */}
      <div className="navbar-end">
        <LangSwitcher />
        <UserButton />
      </div>
    </nav>
  );
}

const svgDropdown = (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 6h16M4 12h8m-8 6h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

//#region LiWithDetails
function LiWithDetails({
  item,
  isDetailsOpen,
  onItemClick,
}: {
  item: NavbarLinks[0];
  isDetailsOpen?: boolean;
  onItemClick?: () => void;
}): JSX.Element {
  const ref = useRef<HTMLDetailsElement>(null);
  function toggleDetails(): void {
    if (ref.current) {
      ref.current.open = false;
    }
  }

  return (
    <li key={item.name}>
      {item.subOps ? (
        <details className="z-[1]" open={isDetailsOpen} ref={ref}>
          <summary>
            <strong>{item.name}</strong>
          </summary>
          <ul className="p-2">
            {item.subOps.map((subItem) => (
              <li key={subItem.name}>
                <Link onClick={onItemClick || toggleDetails} href={subItem.url}>
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ) : (
        <Link onClick={onItemClick || toggleDetails} href={item.url || '#'}>
          {item.name}
        </Link>
      )}
    </li>
  );
}

export default Navbar;
