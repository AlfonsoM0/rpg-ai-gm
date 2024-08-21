'use client';

import CardCharacter from 'components/card-character';
import ChatWindow from 'components/chat/chat-window';
import H1 from 'components/h1';
import Main from 'components/Main';
import TTSControls from 'components/tts/tts-controls';
import { useLibraryStore } from 'hooks/use-library-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Page() {
  const t = useTranslations('Page_Book');

  const { bookSelected } = useLibraryStore();
  const { isTTSEnabled, handleStop, setTTS, handlePlay } = useTTSStore();

  useEffect(() => {
    if (isTTSEnabled && content.length > 0) {
      setTTS(t('play_audio_tip'));
      handlePlay();
    }

    return () => {
      handleStop();
      setTTS('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTTSEnabled]);

  if (!bookSelected) return <></>;
  const { title, characters, content } = bookSelected;

  return (
    <Main>
      <H1>
        {t('h1_Book')} <br /> <span className="font-semibold">{title}</span>
      </H1>

      <section className="my-[-1rem]">
        <TTSControls customTTS={t('play_audio_tip')} />
      </section>

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
