'use client';

import { ModalContentContainer } from 'components/modal';
import { themes } from 'components/theme-controller';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useTranslations } from 'next-intl';

export default function ModaArtThemeConfig() {
  const t = useTranslations('ModaArtThemeConfig');

  const { theme, setTheme } = useUserPreferencesStore();
  const { setModalIsOpen } = useModalState();

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
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

        <button
          className="btn btn-sm btn-info w-full mt-4"
          onClick={() => setModalIsOpen(false)}
          aria-label={t('btn_Redy')}
        >
          {t('btn_Redy')}
        </button>
      </>
    </ModalContentContainer>
  );
}
