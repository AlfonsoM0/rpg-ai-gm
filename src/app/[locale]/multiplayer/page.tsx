'use client';

import { useTranslations } from 'next-intl';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import { APP_URL } from 'src/config/constants';
import useFirebase from 'src/hooks/firebase';
import useMultiplayer, { useCreateMultiplayer } from 'src/hooks/multiplayer';
import { useGmAiStore } from 'src/hooks/use-gm-ai-chat-store';
import { Link, useRouter } from 'src/navigation';
import imgCreateGame from 'public/img/create-game.jpeg';
import imgJoinGame from 'public/img/join-game.jpeg';
import { ReactNode } from 'react';

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

      <section className="flex flex-wrap justify-center gap-10">
        <ImgCircleAndButton src={imgCreateGame.src} alt={t('link_Create_Game')}>
          <button className="btn btn-lg btn-accent" onClick={onCreateGameClick}>
            {t('link_Create_Game')}
          </button>
        </ImgCircleAndButton>

        <ImgCircleAndButton src={imgJoinGame.src} alt={t('link_Join_Game')}>
          <Link className="btn btn-lg btn-accent" href={APP_URL.MULTIPLAYER_JOIN}>
            {t('link_Join_Game')}
          </Link>
        </ImgCircleAndButton>
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

      <section className="flex flex-wrap justify-center gap-10">
        {isInLobby ? (
          <ImgCircleAndButton src={imgJoinGame.src} alt={t('link_Return_Lobby')}>
            <Link className="btn btn-lg btn-accent" href={APP_URL.MULTIPLAYER_LOBBY}>
              {t('link_Return_Lobby')}
            </Link>
          </ImgCircleAndButton>
        ) : (
          <ImgCircleAndButton src={imgJoinGame.src} alt={t('link_Return_Game')}>
            <Link className="btn btn-lg btn-accent" href={APP_URL.MULTIPLAYER_GAME}>
              {t('link_Return_Game')}
            </Link>
          </ImgCircleAndButton>
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

function ImgCircleAndButton({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="max-w-xs mask mask-hexagon border-2" src={src} alt={alt} />

      <div className="mt-[-2rem] mb-2" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
