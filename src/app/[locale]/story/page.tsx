'use client';

import CardPlayCharacter from 'components/card-play-character';
import ChatInputMsg from 'components/chat/chat-input-msg';
import ChatOptionsABC from 'components/chat/chat-options-abc';
import ChatOptionsConfig from 'components/chat/chat-options-config';
import ChatWindow from 'components/chat/chat-window';
import H1 from 'components/h1';
import Main from 'components/Main';
import TTSControls from 'components/tts/tts-controls';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useTranslations } from 'next-intl';
import useAutoplayAiTTS from 'src/hooks/use-tts-autoplay';

export default function Page() {
  const t = useTranslations('Page_Story');

  const { inGameCharacters } = useCharacterStore();
  const { content, isLoadingContent } = useGmAiStore();
  const { isTTSEnabled } = useTTSStore();

  useAutoplayAiTTS(content, -2);

  return (
    <Main>
      <H1>{t('h1_Telling_the_Story')}</H1>

      {isTTSEnabled ? (
        <section className="my-[-1rem]">
          <TTSControls />
        </section>
      ) : null}

      <section>
        <ChatWindow content={content.slice(1)} isLoadingContent={isLoadingContent} />
        <ChatInputMsg />
      </section>

      <section className="w-[90vw] max-w-[723px] flex flex-wrap justify-around gap-2">
        <ChatOptionsABC />
        <ChatOptionsConfig />
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
