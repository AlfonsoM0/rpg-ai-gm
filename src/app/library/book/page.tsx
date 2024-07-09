'use client';

import CardCharacter from 'components/card-character';
import ChatWindow from 'components/chat/chat-window';
import Main from 'components/Main';
import { useLibraryStore } from 'hooks/use-library-store';

export default function Page() {
  const { bookSelected } = useLibraryStore();
  if (!bookSelected) return <></>;

  const { title, characters, content } = bookSelected;

  return (
    <Main>
      <h1>{title}</h1>

      <section>
        <ChatWindow content={content} isLoadingContent={false} />
      </section>

      <section className="mb-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {characters.map((character) => (
            <CardCharacter character={character} key={character.id} isViewOnly />
          ))}
        </div>
      </section>
    </Main>
  );
}
