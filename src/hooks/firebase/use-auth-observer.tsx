'use client';

import { useEffect } from 'react';
import useFirebase from '.';

export default function useAuthObserver() {
  const { fireAuth, initializeFirebaseApp, setObserverUser } = useFirebase();

  useEffect(() => {
    if (!fireAuth) initializeFirebaseApp();

    const unsusbscribe = setObserverUser();

    return () => {
      unsusbscribe && unsusbscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireAuth]);
}
