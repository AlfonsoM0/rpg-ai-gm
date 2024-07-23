'use client';

import { Icon } from 'components/icons';
import useFirebase from 'hooks/firebase';
import { useCharacterStore } from 'hooks/use-character-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useState } from 'react';
import UserButtonEditProfile from './user-button-edit';
import { ModalContentContainer } from 'components/modal';

export default function UserButtonConnect() {
  const { setModalContent, setModalIsOpen } = useModalState();
  const { user, isFireLoading, fireErrorMsg, handleSignOut } = useFirebase();

  const { clearOrSetUserPreferences } = useUserPreferencesStore();
  const { setCharactersCollection } = useCharacterStore();
  const { setLibrary } = useLibraryStore();

  function handleClick() {
    setModalContent(<ModalConnect />);
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
          Cerrar Sesión
        </button>
        {fireErrorMsg ? <p className="text-error text-center">{fireErrorMsg}</p> : null}
      </div>
    );

  return (
    <div>
      <button className="btn btn-success w-full" onClick={handleClick}>
        Iniciar Sesión
      </button>
      {fireErrorMsg ? <p className="text-error text-center">{fireErrorMsg}</p> : null}
    </div>
  );
}

function ModalConnect() {
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
    <ModalContentContainer title="Inicio de Sesión" titleColor="info">
      <>
        <p className="py-4 text-sm">
          Al iniciar sesión por primera vez, cuando modificas tu colección de personajes o libros,
          estos se guardarán en la nube automáticamente cada pocos segundos. Los cambios se
          sincronizarán en todos los dispositivos conectados a tu cuenta.
        </p>
        <p className="pb-4 text-sm">
          Si ya tienes una cuenta, al iniciar sesión los datos locales se sobrescriben con los datos
          guardados en la nube.
        </p>

        <p className="text-sm mb-1 text-warning">
          ⚠️ Se abrirá una nueva ventana para autenticación. Asegurate de que tu navegador esté
          configurado para permitir ventanas emergentes.
        </p>
        <p className="text-sm mb-4 text-warning">
          ⚠️ Asegúrate de estar usando la mejor versión de tus personajes y libros antes de iniciar
          sesión por primera vez.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {/* SinIn Options */}
          <button
            className="btn btn-lg btn-outline btn-primary text-2xl p-2 m-2"
            onClick={onSinInWithGoogle}
            disabled={isFireLoading}
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
