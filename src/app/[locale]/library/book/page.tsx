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
      setTTS('Para reproducir los audios del libro, hay clic en los avatares de las respuestas.');
      handlePlay();
    }

    return () => {
      handleStop();
      setTTS('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!bookSelected) return <></>;
  const { title, characters, content } = bookSelected;

  return (
    <Main>
      <H1>
        {t('h1_Book')} <br /> <span className="font-semibold">{title}</span>
      </H1>

      {isTTSEnabled ? (
        <section className="my-[-1rem]">
          <TTSControls />
        </section>
      ) : null}

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
