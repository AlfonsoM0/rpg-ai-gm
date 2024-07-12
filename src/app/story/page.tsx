'use client';

import CardPlayCharacter from 'components/card-play-character';
import ChatInputMsg from 'components/chat/chat-input-msg';
import ChatOptionsABC from 'components/chat/chat-options-abc';
import ChatWindow from 'components/chat/chat-window';
import H1 from 'components/h1';
import Main from 'components/Main';
import TTSControls from 'components/tts/tts-controls';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useEffect } from 'react';

export default function Page() {
  const { inGameCharacters } = useCharacterStore();
  const { content, isLoadingContent } = useGmAiStore();
  const { isTTSEnabled, handlePlay, setTTS } = useTTSStore();

  useEffect(() => {
    if (isTTSEnabled && content.length > 0) {
      const lastContent = content[content.length - 1];
      const isLastContentIsModel = lastContent.role === 'model';
      if (isLastContentIsModel) {
        const tts = lastContent.parts[0].text || '';
        setTTS(tts);
        handlePlay();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <Main>
      <H1>¡Narrando la Historia!</H1>

      {isTTSEnabled ? (
        <section className="my-[-1rem]">
          <TTSControls />
        </section>
      ) : null}

      <section>
        <ChatWindow content={content.slice(1)} isLoadingContent={isLoadingContent} />
        <ChatInputMsg />
      </section>

      <section>
        <ChatOptionsABC />
      </section>

      <section>
        <div className="flex flex-wrap gap-4 justify-center">
          {inGameCharacters.map((character) => (
            <CardPlayCharacter key={character.id} character={character} />
          ))}
        </div>
      </section>
    </Main>
  );
}
