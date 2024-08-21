'use client';

import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';
import ChatInputMsg from 'src/components/chat/chat-input-msg';
import ChatOptionsConfig from 'src/components/chat/chat-options-config';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import CardCharacterLobby from 'src/components/multiplayer/lobby/card-character-loby';
import MultiplayerChatWindow from 'src/components/multiplayer/multiplayer-chat-window';
import { MarkdownOptions } from 'src/config/constants';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { useRouter } from 'src/navigation';

export default function Page() {
  const router = useRouter();

  const { multiplayerStory, userCurrentMpGame, isMultiplayerLoading } = useMultiplayer();
  const { startGame } = usePlayerAcctions();

  const aiConfigObj = useGenerateAiConfigObj();

  const isHost = multiplayerStory?.players[0].userId === userCurrentMpGame?.player.userId;

  useEffect(() => {
    // If started, go to Game!
    if (multiplayerStory?.isStoryStarted) router.push('/multiplayer/game');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplayerStory?.isStoryStarted]);

  if (!multiplayerStory || !userCurrentMpGame)
    return (
      <Main>
        <H1>Juego no disponible</H1>
      </Main>
    );

  const { players, storyName, storyDescription, userCratorName, aiRole, aiConfig } =
    multiplayerStory;

  const aiConfigTitle = aiConfigObj.find((obj) => obj.name === aiConfig)!.title;

  function onStartClick() {
    if (!isHost) return;

    startGame();
  }

  const isAiGM = multiplayerStory.aiRole === 'Game Master';

  return (
    <Main>
      <H1>Lobby</H1>

      <section>
        <MultiplayerChatWindow
          currentUserId={userCurrentMpGame.player.userId}
          multiplayerStory={multiplayerStory}
        />
        <ChatInputMsg isMultiplayer />
      </section>

      <section className="w-[90vw] max-w-[723px] flex flex-wrap justify-around gap-2">
        <ChatOptionsConfig isMultiplayer />
      </section>

      {isHost ? (
        <section>
          <button
            className="btn btn-primary"
            onClick={onStartClick}
            disabled={isMultiplayerLoading || players.length < 2}
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

      <section className="p-4">
        <H2>Información de la partida</H2>

        <h3 className="font-bold text-lg">{storyName}</h3>
        <Markdown options={MarkdownOptions}>{storyDescription}</Markdown>

        <p className="my-4">
          <strong className="text-info">Creada por:</strong> {userCratorName}
        </p>
        <p className="mb-4">
          <strong className="text-info">{isAiGM ? 'Anfitrión' : 'Anfitrión/Game Master'}:</strong>{' '}
          {players[0].userName}
        </p>
        <p className="mb-4">
          <strong className="text-info">GmAi:</strong> {aiRole} | {aiConfigTitle}
        </p>
      </section>
    </Main>
  );
}
