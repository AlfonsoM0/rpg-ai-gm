'use client';

import 'regenerator-runtime/runtime';

import CardCharacter from 'components/card-character';
import H1 from 'components/h1';
import H2 from 'components/h2';
import Main from 'components/Main';
import useFirebase from 'hooks/firebase';
import { useState } from 'react';
import { Character } from 'types/character';

// http://localhost:3000/library/book/nuiZGpNaSmaZLv4fJGvxZS701d23_cf32dc59-367a-4ea7-9cd3-67de33d6f65d
export default function ClientPage({ params }: { params: { uid_bid: string } }) {
  const [uid, bid] = params.uid_bid.split('_');

  const { getFireDoc } = useFirebase();

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [character, setCharacter] = useState<Character | null>(null);
  const [userName, setUserName] = useState<string>('');

  async function findAndSetUserName(): Promise<void> {
    const user = await getFireDoc('USER_ACCOUNT', uid);
    if (user) {
      setUserName(user.displayName);
    } else setUserName('Autor desconocido');
  }

  async function findAndSetCharacter() {
    const charCollection = await getFireDoc('USER_CHARACTERS', uid);

    if (typeof charCollection === 'boolean' && !charCollection)
      return setErrorMsg('Error: Personaje no encontrado.');
    if (!charCollection) return setErrorMsg('No hay una colección de donde obtener un personaje.');

    const character = charCollection.charactersCollection.find(
      (char: Character) => char.id === bid
    );

    if (!character) return setErrorMsg('No se encontró el personaje en la colección.');

    setCharacter(character);
  }

  async function findAndSetUserAndCharacter(): Promise<void> {
    setErrorMsg('');
    setIsLoading(true);

    await findAndSetUserName();

    await findAndSetCharacter();

    setIsLoading(false);
  }

  if (isLoading)
    return (
      <Main>
        <H1>
          Cargando... <span className="loading loading-spinner loading-xs"></span>
        </H1>
      </Main>
    );
  if (errorMsg)
    return (
      <Main>
        <H1>{errorMsg}</H1>
      </Main>
    );
  if (!character)
    return (
      <Main>
        <div className="flex flex-col items-center justify-center">
          <H1>Se compartió un personaje de rol contigo...</H1>

          <button className="btn h-fit btn-ghost text-info" onClick={findAndSetUserAndCharacter}>
            <H2>✨ Haz cick aquí para ver el personaje ✨</H2>
          </button>
        </div>
      </Main>
    );
  return (
    <Main>
      <H1>{`Un personaje de ${userName}`}</H1>

      <section className="mb-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <CardCharacter character={character} key={character.id} isViewOnly isFromAnotherUser />
        </div>
      </section>

      <div></div>
    </Main>
  );
}
