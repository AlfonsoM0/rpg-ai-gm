'use client';

import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';

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
  const { theme, setTheme } = useUserPreferencesStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} type="button" className="btn btn-ghost">
        Tema
      </button>
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
              onChange={() => setTheme(themeName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// function ThemeOptions() {
//   const { setModalIsOpen } = useModalState();
//   const { theme, setTheme } = useUserPreferencesStore();
//   return (
//     <div>
//       <h3 className="font-bold text-lg mb-4">Elige un tema para ambientar tus historias</h3>
//       <div className="flex flex-wrap justify-around items-center gap-4">
//         {themes.map((themeName) => (
//           <input
//             key={themeName}
//             type="radio"
//             name="theme-buttons"
//             className="btn theme-controller join-item"
//             aria-label={themeName.toUpperCase()}
//             value={themeName}
//             checked={themeName === theme}
//             onClick={() => setTheme(themeName)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
