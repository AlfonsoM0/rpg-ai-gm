'use client';

import CardCharacter from 'components/card-character';
import H1 from 'components/h1';
import Main from 'components/Main';
import TTSControls from 'components/tts/tts-controls';
import { useLibraryStore } from 'hooks/use-library-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import CardCharacterBody from 'src/components/card-character/card-character-body';
import CardCharacterContainer from 'src/components/card-character/card-character-container';
import MultiplayerChatWindow from 'src/components/multiplayer/multiplayer-chat-window';
import useFirebase from 'src/hooks/firebase';

export default function Page() {
  const t = useTranslations('Page_Book');

  const { multiplayerBookSelected } = useLibraryStore();
  const { isTTSEnabled, handleStop, setTTS, handlePlay } = useTTSStore();
  const { user } = useFirebase();

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
  }, []);

  if (!multiplayerBookSelected) return <></>;
  const { storyName, players, content } = multiplayerBookSelected;
  const characters = players.map((p) => p.character);

  return (
    <Main>
      <H1>
        {t('h1_Book')} <br /> <span className="font-semibold">{storyName}</span>
      </H1>

      {isTTSEnabled ? (
        <section className="my-[-1rem]">
          <TTSControls customTTS={t('play_audio_tip')} />
        </section>
      ) : null}

      <section>
        <MultiplayerChatWindow
          multiplayerStory={multiplayerBookSelected}
          currentUserId={user?.uid}
        />
      </section>

      <section className="mb-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {characters.map((character) => (
            <CardCharacterContainer key={character.id} isSelected={false}>
              <CardCharacterBody character={character}>
                <></>
              </CardCharacterBody>
            </CardCharacterContainer>
          ))}
        </div>
      </section>
    </Main>
  );
}
