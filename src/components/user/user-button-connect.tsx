'use client';

import { Icon } from 'components/icons';
import useFirebase from 'hooks/firebase';
import { useModalState } from 'hooks/use-modal-state';

export default function UserButtonConnect() {
  const { setModalContent, setModalIsOpen } = useModalState();
  const { user, isFireLoading, fireErrorMsg, handleSignOut } = useFirebase();

  function handleClick() {
    setModalContent(<ModalConnect />);
    setModalIsOpen(true);
  }

  if (isFireLoading)
    return (
      <button className="btn w-full" disabled>
        <span className="loading loading-dots loading-xs"></span>
      </button>
    );

  if (user)
    return (
      <div>
        <button className="btn btn-error w-full" onClick={handleSignOut}>
          Cerrar sesión
        </button>
        {fireErrorMsg ? <p className="text-error text-center">{'fireErrorMsg'}</p> : null}
      </div>
    );

  return (
    <div>
      <button className="btn btn-success w-full" onClick={handleClick}>
        Conectar
      </button>
      {fireErrorMsg ? <p className="text-error text-center">{'fireErrorMsg'}</p> : null}
    </div>
  );
}

function ModalConnect() {
  const { setModalIsOpen } = useModalState();
  const { handleSignInWithGooglePopup } = useFirebase();

  return (
    <div>
      <h3 className="font-bold text-lg">Conectar</h3>
      <p className="py-4 text-sm">
        Al iniciar sesión, tus personajes y biblioteca se guardarán para que estén disponibles en
        cualquier lugar.
      </p>
      <p className="text-sm mb-4 text-info">⚠️ Se abrirá una nueva ventana para autenticación.</p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* SinIn Options */}
        <button
          className="btn btn-outline btn-primary p-2"
          onClick={() => {
            handleSignInWithGooglePopup();
            setModalIsOpen(false);
          }}
        >
          <Icon.Google className="w-8 h-8" /> Google
        </button>
      </div>
    </div>
  );
}
