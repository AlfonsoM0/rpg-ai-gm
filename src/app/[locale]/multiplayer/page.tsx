'use client';

import { useTranslations } from 'next-intl';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import { APP_URL } from 'src/config/constants';
import useFirebase from 'src/hooks/firebase';
import useMultiplayer, { useCreateMultiplayer } from 'src/hooks/multiplayer';
import { useGmAiStore } from 'src/hooks/use-gm-ai-chat-store';
import { Link, useRouter } from 'src/navigation';

export default function Page() {
  const t = useTranslations('Page_Multiplayer');

  const router = useRouter();

  const { multiplayerStory } = useMultiplayer();
  const { isFireLoading } = useFirebase();
  const { setCreateMultiplayerState } = useCreateMultiplayer();
  const { aiConfig, locale } = useGmAiStore();

  function onCreateGameClick() {
    setCreateMultiplayerState({ aiConfig, locale });
    router.push(APP_URL.MULTIPLAYER_CREATE);
  }

  const NoGame = (
    <Main>
      <H1>{t('h1_Multiplayer')}</H1>

      <section className="flex flex-col gap-10">
        <button className="btn" onClick={onCreateGameClick}>
          {t('link_Create_Game')}
        </button>

        <Link className="btn" href={APP_URL.MULTIPLAYER_JOIN}>
          {t('link_Join_Game')}
        </Link>
      </section>

      <div></div>
      <div></div>
    </Main>
  );

  if (isFireLoading) return Loading;
  if (!multiplayerStory) return NoGame;

  const isInLobby = !multiplayerStory.isStoryStarted;

  return (
    <Main>
      <H1>{t('h1_Multiplayer')}</H1>

      <section className="flex flex-col gap-10">
        {isInLobby ? (
          <Link className="btn" href={APP_URL.MULTIPLAYER_LOBBY}>
            {t('link_Return_Lobby')}
          </Link>
        ) : (
          <Link className="btn" href={APP_URL.MULTIPLAYER_GAME}>
            {t('link_Return_Game')}
          </Link>
        )}
      </section>

      <div></div>
      <div></div>
    </Main>
  );
}

const Loading = (
  <Main>
    <H1>
      <span className="loading loading-spinner loading-lg" aria-label="Loading..."></span>
    </H1>
  </Main>
);
