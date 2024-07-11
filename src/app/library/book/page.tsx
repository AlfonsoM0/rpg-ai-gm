'use client';

import CardCharacter from 'components/card-character';
import ChatWindow from 'components/chat/chat-window';
import H1 from 'components/h1';
import Main from 'components/Main';
import { useLibraryStore } from 'hooks/use-library-store';

export default function Page() {
  const { bookSelected } = useLibraryStore();
  if (!bookSelected) return <></>;

  const { title, characters, content } = bookSelected;

  return (
    <Main>
      <H1>
        Libro <br /> <span className="font-semibold">{title}</span>
      </H1>

      <section>
        <ChatWindow content={content.slice(1)} isLoadingContent={false} />
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
