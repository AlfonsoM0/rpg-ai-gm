'use client';

import useAuthObserver from 'hooks/firebase/use-auth-observer';
import useFirebaseAutoSync from 'hooks/firebase/use-firebase-autosync';

export default function UserFirebaseSync() {
  useAuthObserver();
  useFirebaseAutoSync();

  return <></>;
}
