'use client';

import { useEffect } from 'react';
import useFirebase from '.';

/**
 * Control the authentication state of a user and observe changes in real time.
 */
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
