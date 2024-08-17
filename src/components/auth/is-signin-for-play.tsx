'use client';

import useFirebase from 'hooks/firebase';
import Main from '../Main';
import H1 from '../h1';

export default function IsSignInForPlay({ children }: { children: React.ReactNode }) {
  const { user } = useFirebase();

  if (!user)
    return (
      <Main>
        <H1>Debes iniciar sesión para jugar</H1>
      </Main>
    );

  return children;
}
