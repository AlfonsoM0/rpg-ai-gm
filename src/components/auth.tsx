'use client';

import useFirebase from 'hooks/firebase';
import { useEffect, useMemo, useState } from 'react';

export default function Auth() {
  const {
    initializeFirebaseApp,
    fireAuth,
    handleSignInWithGooglePopup,
    handleSignOut,
    fireErrorMsg,
    setObserverUser,
    consoleLogAllState,
    user,
  } = useFirebase();

  useEffect(() => {
    if (!fireAuth) initializeFirebaseApp();

    const unsusbscribe = setObserverUser();

    return () => {
      unsusbscribe && unsusbscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireAuth]);

  return (
    <div>
      <p>Hola {`${user?.displayName || 'Usuario'} (${user?.email || '@...'})`}</p>
      {user?.photoURL ? <img className="w-20 h-20" src={user.photoURL} alt="User" /> : null}

      <div className="flex gap-2">
        <button className="btn" onClick={consoleLogAllState}>
          Console State
        </button>
        <button className="btn" onClick={handleSignInWithGooglePopup}>
          Google Auth
        </button>
        <button className="btn" onClick={handleSignOut}>
          Sign Out
        </button>
        <p>Error: {fireErrorMsg}</p>
      </div>
    </div>
  );
}
