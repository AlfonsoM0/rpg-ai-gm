'use client';

import useFirebase from 'hooks/firebase';
import { useRouter } from '@/navigation';
import { useEffect, useState } from 'react';
import { UserAccuntPartial } from 'types/firebase-db';

export default function UserFormInfo() {
  const router = useRouter();
  const { updateUserProfile, isFireLoading } = useFirebase();

  const [userAcc, setUserAcc] = useState<UserAccuntPartial>({});
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (userAcc.displayName && userAcc.displayName.length < 3)
      return setErrorMsg('El nombre debe tener al menos 3 caracteres.');

    // userAcc.photoURL mus be a valid image url.
    if (userAcc.photoURL && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(userAcc.photoURL) === false)
      return setErrorMsg('La URL de la imagen no es válida.');

    updateUserProfile(userAcc);

    setUserAcc({});

    router.push('/');
  }

  useEffect(() => {
    setErrorMsg('');
  }, [userAcc]);

  return (
    <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nuevo Nombre"
        className="input input-bordered w-full text-center"
        value={userAcc.displayName || ''}
        onChange={(e) => setUserAcc({ ...userAcc, displayName: e.target.value })}
        disabled={isFireLoading}
      />
      <input
        type="url"
        placeholder="Nueava URL de imagen de perfil"
        className="input input-bordered w-full text-center text-xs"
        value={userAcc.photoURL || ''}
        onChange={(e) => setUserAcc({ ...userAcc, photoURL: e.target.value })}
        disabled={isFireLoading}
      />

      <p className="text-xs text-error text-center">{errorMsg ? errorMsg : null}</p>

      <button className="btn btn-primary" type="submit" disabled={isFireLoading}>
        {isFireLoading ? <span className="loading loading-spinner"></span> : 'GUARDAR'}
      </button>
    </form>
  );
}
