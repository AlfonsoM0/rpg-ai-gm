'use client';

import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import useFirebase from 'src/hooks/firebase';
import useMultiplayer from 'src/hooks/multiplayer';
import { Link } from 'src/navigation';

export default function Page() {
  const { multiplayerStory } = useMultiplayer();
  const { isFireLoading } = useFirebase();

  if (isFireLoading) return Loading;
  if (!multiplayerStory) return NoGame;

  const isInLobby = !multiplayerStory.isStoryStarted;

  return (
    <Main>
      <H1>Multijugador</H1>

      <section className="flex flex-col gap-10">
        {isInLobby ? (
          <Link className="btn" href={'/multiplayer/lobby'}>
            Regresar al Lobby
          </Link>
        ) : (
          <Link className="btn" href={'/multiplayer/game'}>
            Regresar al Juego
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

const NoGame = (
  <Main>
    <H1>Multijugador</H1>

    <section className="flex flex-col gap-10">
      <Link className="btn" href={'/multiplayer/create'}>
        Crear a una partida
      </Link>

      <Link className="btn" href={'/multiplayer/join'}>
        Unirse a una partida
      </Link>
    </section>

    <div></div>
    <div></div>
  </Main>
);
