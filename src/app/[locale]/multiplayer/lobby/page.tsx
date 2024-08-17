'use client';

import { useMemo } from 'react';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import CardCharacterLobby from 'src/components/multiplayer/lobby/card-character-loby';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { useRouter } from 'src/navigation';

export default function Page() {
  const router = useRouter();

  const { multiplayerStory, userCurrentMpGame, isMultiplayerLoading } = useMultiplayer();
  const { startGame } = usePlayerAcctions();

  const aiConfigObj = useGenerateAiConfigObj();

  const isUserHost = useMemo(() => {
    if (!userCurrentMpGame || !multiplayerStory) return false;
    const userId = userCurrentMpGame?.player.userId;
    const hostId = multiplayerStory?.userHostId;
    return userId === hostId;
  }, [userCurrentMpGame, multiplayerStory]);

  if (!multiplayerStory) return NoGameLoad;

  const { players, storyName, storyDescription, userHostName, userHostId, aiRole, aiConfig } =
    multiplayerStory;

  const aiConfigTitle = aiConfigObj.find((obj) => obj.name === aiConfig)!.title;

  function onStartClick() {
    if (!isUserHost) return;

    startGame();

    router.push('/multiplayer/game');
  }

  return (
    <Main>
      <H1>Lobby</H1>

      <section className="p-4">
        <H2>Información de la partida</H2>

        <p className="mb-4">
          <strong>Anfitrión:</strong> {userHostName}
        </p>
        <p className="mb-4">
          <strong>GmAi:</strong> {aiRole} | {aiConfigTitle}
        </p>

        <h3 className="font-bold text-lg">{storyName}</h3>
        <p>{storyDescription}</p>
      </section>

      {isUserHost ? (
        <section>
          <button className="btn btn-primary" onClick={onStartClick}>
            COMENZAR
          </button>
        </section>
      ) : null}

      <section>
        <H2>Personajes</H2>

        <div>
          {players.map((player) => (
            <CardCharacterLobby key={player.userId} player={player} />
          ))}
        </div>
      </section>
    </Main>
  );
}

const NoGameLoad = (
  <Main>
    <H1>Juego no disponible</H1>
  </Main>
);
