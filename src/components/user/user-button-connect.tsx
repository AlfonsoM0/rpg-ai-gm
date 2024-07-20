'use client';

import { Icon } from 'components/icons';
import useFirebase from 'hooks/firebase';
import { useModalState } from 'hooks/use-modal-state';
import { useState } from 'react';

export default function UserButtonConnect() {
  const { setModalContent, setModalIsOpen } = useModalState();
  const { user, isFireLoading, fireErrorMsg, handleSignOut } = useFirebase();

  function handleClick() {
    setModalContent(<ModalConnect />);
    setModalIsOpen(true);
  }

  if (isFireLoading)
    return (
      <button className="btn btn-warning w-full" disabled>
        <span className="loading loading-dots loading-xs"></span>
      </button>
    );

  if (user)
    return (
      <div>
        <button className="btn btn-error w-full" onClick={handleSignOut}>
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
  const { handleSignInWithGooglePopup } = useFirebase();

  const [isLoading, setIsLoading] = useState(false);

  function onSinInWithGoogle() {
    setIsLoading(true);
    handleSignInWithGooglePopup().then(() => {
      setIsLoading(false);
      setModalIsOpen(false);
    });
  }

  return (
    <div>
      <h3 className="font-bold text-lg text-info">Iniciar Sesión</h3>
      <p className="py-4 text-sm">
        Al iniciar sesión, cuando modificas tu colección de personajes o libros, estos se guardarán
        en la nube automáticamente cada pocos segundos.
      </p>
      <p className="pb-4 text-sm">
        Si ya tenías una cuenta, se cargarán tus datos si son más recientes que la versión local.
      </p>

      <p className="text-sm mb-1 text-warning">
        ⚠️ Se abrirá una nueva ventana para autenticación. Asegurate de que tu navegador esté
        configurado para permitir ventanas emergentes.
      </p>
      <p className="text-sm mb-4 text-warning">
        ⚠️ Asegúrate de estar usando la última versión de tus personajes y libros antes de iniciar
        sesión.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* SinIn Options */}
        <button
          className="btn btn-lg btn-outline btn-primary text-2xl p-2 m-2"
          onClick={onSinInWithGoogle}
          disabled={isLoading}
        >
          {isLoading ? (
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
    </div>
  );
}
