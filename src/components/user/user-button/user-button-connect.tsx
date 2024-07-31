'use client';

import useFirebase from 'hooks/firebase';
import { useCharacterStore } from 'hooks/use-character-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import UserButtonEditProfile from './user-button-edit';
import ModalUserConnect from '../user-modal/user-modal-connect';
import { useTranslations } from 'next-intl';

export default function UserButtonConnect() {
  const t = useTranslations('User.btn.UserButtonConnect');

  const { setModalContent, setModalIsOpen } = useModalState();
  const { user, isFireLoading, fireErrorMsg, handleSignOut } = useFirebase();

  const { clearOrSetUserPreferences } = useUserPreferencesStore();
  const { setCharactersCollection } = useCharacterStore();
  const { setLibrary } = useLibraryStore();

  function handleClick() {
    setModalContent(<ModalUserConnect />);
    setModalIsOpen(true);
  }

  function signOut() {
    handleSignOut().then(() => {
      clearOrSetUserPreferences();
      setCharactersCollection();
      setLibrary();
    });
  }

  if (isFireLoading)
    return (
      <button className="btn btn-warning w-full" disabled>
        <span className="loading loading-dots loading-xs"></span>
      </button>
    );

  if (user)
    return (
      <div className="flex flex-col gap-2">
        <UserButtonEditProfile />
        <button className="btn btn-error w-full" onClick={signOut}>
          {t('Logout')}
        </button>
        {fireErrorMsg ? <p className="text-error text-center">{fireErrorMsg}</p> : null}
      </div>
    );

  return (
    <div>
      <button className="btn btn-success w-full" onClick={handleClick}>
        {t('Login')}
      </button>
      {fireErrorMsg ? <p className="text-error text-center">{fireErrorMsg}</p> : null}
    </div>
  );
}
