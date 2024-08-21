'use client';

import { useTranslations } from 'next-intl';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import useFirebase from 'src/hooks/firebase';
import useMultiplayer from 'src/hooks/multiplayer';
import { Link } from 'src/navigation';

export default function Page() {
  const t = useTranslations('Page_Multiplayer');

  const { multiplayerStory } = useMultiplayer();
  const { isFireLoading } = useFirebase();

  const NoGame = (
    <Main>
      <H1>{t('h1_Multiplayer')}</H1>

      <section className="flex flex-col gap-10">
        <Link className="btn" href={'/multiplayer/create'}>
          {t('link_Create_Game')}
        </Link>

        <Link className="btn" href={'/multiplayer/join'}>
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
          <Link className="btn" href={'/multiplayer/lobby'}>
            {t('link_Return_Lobby')}
          </Link>
        ) : (
          <Link className="btn" href={'/multiplayer/game'}>
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
