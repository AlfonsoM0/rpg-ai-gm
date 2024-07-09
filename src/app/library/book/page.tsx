'use client';

import CardCharacter from 'components/card-character';
import ChatWindow from 'components/chat/chat-window';
import { useLibraryStore } from 'hooks/use-library-store';

export default function Page() {
  const { bookSelected } = useLibraryStore();
  if (!bookSelected) return <></>;

  const { title, characters, content } = bookSelected;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4">
      <h1>{title}</h1>

      <section>
        <ChatWindow content={content} isLoadingContent={false} />
      </section>

      <section>
        <div className="flex flex-wrap gap-4 justify-center">
          {characters.map((character) => (
            <CardCharacter character={character} key={character.id} isViewOnly />
          ))}
        </div>
      </section>
    </main>
  );
}
