'use client';

import { Icon } from 'components/icons';
import { ModalContentContainer } from 'components/modal';
import useFirebase from 'hooks/firebase';
import { useCharacterStore } from 'hooks/use-character-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useTranslations } from 'next-intl';

export default function ModalUserConnect() {
  const t = useTranslations('User.modal.ModalUserConnect');

  const { setModalIsOpen } = useModalState();
  const { handleSignInWithGooglePopup, isFireLoading } = useFirebase();

  const { setUpdatedAtTo0: suat0Pref } = useUserPreferencesStore();
  const { setUpdatedAtTo0: suat0Char } = useCharacterStore();
  const { setUpdatedAtTo0: suat0Libr } = useLibraryStore();

  function onSinInWithGoogle() {
    // Reset updatedAt to 0 for all stores
    // => lower priority than the ones in Firebase.
    suat0Pref();
    suat0Char();
    suat0Libr();

    handleSignInWithGooglePopup().then(() => {
      setModalIsOpen(false);
    });
  }

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="py-4 text-sm">{t('p1')}</p>
        <p className="pb-4 text-sm">{t('p2')}</p>

        <p className="text-sm mb-1 text-warning">{t('p3_⚠️')}</p>
        <p className="text-sm mb-4 text-warning">{t('p4_⚠️')}</p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* SinIn Options */}
          <button
            className="btn btn-lg btn-outline btn-primary text-2xl p-2 m-2"
            onClick={onSinInWithGoogle}
            disabled={isFireLoading}
            aria-label={t('Sign_in_with_Google')}
          >
            {isFireLoading ? (
              <>
                <span className="loading loading-spinner loading-lg"></span> Google
              </>
            ) : (
              <>
                <Icon.Google className="w-10 h-10" /> Google
              </>
            )}
          </button>
        </div>
      </>
    </ModalContentContainer>
  );
}
