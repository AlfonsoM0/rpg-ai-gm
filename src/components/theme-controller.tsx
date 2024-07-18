'use client';

import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { Icon } from './icons';
import { useState } from 'react';

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

export default function ThemeController() {
  const { theme, setTheme, isThemeButtonClicked, setIsThemeButtonClicked } =
    useUserPreferencesStore();

  const btnStyle = isThemeButtonClicked ? 'btn btn-circle btn-active' : 'btn btn-circle btn-ghost';

  return (
    <details className="dropdown" onClick={() => setIsThemeButtonClicked(!isThemeButtonClicked)}>
      <summary className={btnStyle}>
        <Icon.Art className="w-8 h-8 fill-primary" />
      </summary>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-secondary-content rounded-box z-[1] w-80 p-2 shadow"
      >
        <h3 className="font-bold text-lg mb-4 text-center text-primary">
          Elige un tema para ambientar tus historias
        </h3>
        <div className="flex flex-wrap justify-around items-center gap-4">
          {themes.map((themeName) => (
            <input
              key={themeName}
              type="radio"
              name="theme-buttons"
              className="btn btn-xs theme-controller join-item text-xs"
              aria-label={themeName.toUpperCase()}
              value={themeName}
              checked={themeName === theme}
              onChange={() => {
                setTheme(themeName);
                setIsThemeButtonClicked(true);
              }}
            />
          ))}
        </div>
      </div>
    </details>
  );
}
