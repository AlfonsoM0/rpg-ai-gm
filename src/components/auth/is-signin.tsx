'use client';

import useFirebase from 'hooks/firebase';

export default function IsSignIn({ children }: { children: React.ReactNode }) {
  const { user } = useFirebase();

  if (!user) return <></>;

  return children;
}
