'use client';

import CardPlayCharacter from 'components/card-play-character';
import ChatInputMsg from 'components/chat/chat-input-msg';
import ChatOptionsABC from 'components/chat/chat-options-abc';
import ChatWindow from 'components/chat/chat-window';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';

export default function Page() {
  const { inGameCharacters } = useCharacterStore();

  const { content, isLoadingContent } = useGmAiStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Historia</h1>

      <section>
        <ChatWindow content={content.slice(2)} isLoadingContent={isLoadingContent} />
        <ChatInputMsg />
      </section>

      <ChatOptionsABC />

      <section className="my-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {inGameCharacters.map((character) => (
            <CardPlayCharacter key={character.id} character={character} />
          ))}
        </div>
      </section>
    </main>
  );
}
