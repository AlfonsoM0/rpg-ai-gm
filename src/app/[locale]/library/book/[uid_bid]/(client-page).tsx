'use client';

import 'regenerator-runtime/runtime';

import CardCharacter from 'components/card-character';
import ChatWindow from 'components/chat/chat-window';
import H1 from 'components/h1';
import H2 from 'components/h2';
import Main from 'components/Main';
import TTSControls from 'components/tts/tts-controls';
import useFirebase from 'hooks/firebase';
import { useTTSStore } from 'hooks/use-tts-store';
import { useState } from 'react';
import { Book } from 'types/library';

// http://localhost:3000/library/book/nuiZGpNaSmaZLv4fJGvxZS701d23_cf32dc59-367a-4ea7-9cd3-67de33d6f65d
export default function ClientPage({ params }: { params: { uid_bid: string } }) {
  const { isTTSEnabled } = useTTSStore();

  const [uid, bid] = params.uid_bid.split('_');

  const { getFireDoc } = useFirebase();

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [book, setBook] = useState<Book | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userURLAvatar, setUserURLAvatar] = useState<string>('');

  async function findAndSetUserName(): Promise<void> {
    const user = await getFireDoc('USER_ACCOUNT', uid);
    if (user) {
      setUserName(user.displayName);
      setUserURLAvatar(user.photoURL);
    } else setUserName('Autor desconocido');
  }

  async function findAndSetBook() {
    const library = await getFireDoc('USER_LIBRARY', uid);

    if (typeof library === 'boolean' && !library)
      return setErrorMsg('Error: Librería no encontrada.');
    if (!library) return setErrorMsg('No hay una libreria de donde obtener un libro.');

    const book = library.library.find((book: Book) => book.id === bid);

    if (!book) return setErrorMsg('No se encontró el libro en la libreria.');

    setBook(book);
  }

  async function findAndSetUserAndBook(): Promise<void> {
    setErrorMsg('');
    setIsLoading(true);

    await findAndSetUserName();

    await findAndSetBook();

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
  if (!book)
    return (
      <Main>
        <div className="flex flex-col items-center justify-center">
          <H1>Se compartió una historia de rol contigo...</H1>

          <button className="btn h-fit btn-ghost text-info" onClick={findAndSetUserAndBook}>
            <H2>✨ Haz cick aquí para abrir el libro ✨</H2>
          </button>
        </div>
      </Main>
    );
  return (
    <Main>
      <H1>{`Una historia de ${userName}`}</H1>
      <H2>{book.title}</H2>

      {isTTSEnabled ? (
        <section className="my-[-1rem]">
          <TTSControls />
        </section>
      ) : null}

      <section>
        <ChatWindow
          content={book.content.slice(1)}
          isLoadingContent={false}
          userName={userName}
          userURLAvatar={userURLAvatar}
        />
      </section>

      <section className="mb-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {book.characters.map((character) => (
            <CardCharacter character={character} key={character.id} isViewOnly isFromAnotherUser />
          ))}
        </div>
      </section>
    </Main>
  );
}
