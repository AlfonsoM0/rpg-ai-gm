'use client';

import { useEffect, useMemo, useState } from 'react';
import ChatInputMsg from 'src/components/chat/chat-input-msg';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import CardCharacterLobby from 'src/components/multiplayer/lobby/card-character-loby';
import MultiplayerChatWindow from 'src/components/multiplayer/multiplayer-chat-window';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { useRouter } from 'src/navigation';

export default function Page() {
  const router = useRouter();

  const { multiplayerStory, userCurrentMpGame, isMultiplayerLoading } = useMultiplayer();
  const { startGame } = usePlayerAcctions();

  const aiConfigObj = useGenerateAiConfigObj();

  const [isShowChat, setIsShowChat] = useState(false);

  const isHost = multiplayerStory?.players[0].userId === userCurrentMpGame?.player.userId;

  useEffect(() => {
    // If started, go to Game!
    if (multiplayerStory?.isStoryStarted) router.push('/multiplayer/game');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplayerStory?.isStoryStarted]);

  if (!multiplayerStory) return NoGameLoad;

  const { players, storyName, storyDescription, userCratorName, aiRole, aiConfig } =
    multiplayerStory;

  const aiConfigTitle = aiConfigObj.find((obj) => obj.name === aiConfig)!.title;

  function onStartClick() {
    if (!isHost) return;

    startGame();
  }

  return (
    <Main>
      <H1>Lobby</H1>

      <section>
        <button className="btn btn-xs btn-ghost w-full" onClick={() => setIsShowChat(!isShowChat)}>
          {isShowChat ? 'Ocultar chat' : 'Abrir chat'}
        </button>
        {isShowChat ? (
          <div>
            <MultiplayerChatWindow />
            <ChatInputMsg isMultiplayer />
          </div>
        ) : null}
      </section>

      <section className="p-4">
        <H2>Información de la partida</H2>

        <p className="mb-4">
          <strong>Creada por:</strong> {userCratorName}
        </p>
        <p className="mb-4">
          <strong>Anfitrión:</strong> {players[0].userName}
        </p>
        <p className="mb-4">
          <strong>GmAi:</strong> {aiRole} | {aiConfigTitle}
        </p>

        <h3 className="font-bold text-lg">{storyName}</h3>
        <p>{storyDescription}</p>
      </section>

      {isHost ? (
        <section>
          <button
            className="btn btn-primary"
            onClick={onStartClick}
            disabled={isMultiplayerLoading}
          >
            COMENZAR PARTIDA
          </button>
        </section>
      ) : null}

      <section>
        <H2>Personajes</H2>

        <div className="flex flex-wrap gap-4 justify-center">
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
