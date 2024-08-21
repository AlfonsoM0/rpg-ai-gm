'use client';

import Markdown from 'markdown-to-jsx';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import ChatInputMsg from 'src/components/chat/chat-input-msg';
import ChatOptionsConfig from 'src/components/chat/chat-options-config';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import CardCharacterLobby from 'src/components/multiplayer/lobby/card-character-loby';
import MultiplayerChatWindow from 'src/components/multiplayer/multiplayer-chat-window';
import { APP_URL, MarkdownOptions } from 'src/config/constants';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { useRouter } from 'src/navigation';

export default function Page() {
  const t = useTranslations('Page_Multiplayer_Lobby');
  const t2 = useTranslations('Page_Multiplayer_Join.Join_Collapse');

  const router = useRouter();

  const { multiplayerStory, userCurrentMpGame, isMultiplayerLoading } = useMultiplayer();
  const { startGame } = usePlayerAcctions();

  const aiConfigObj = useGenerateAiConfigObj();

  const isHost = multiplayerStory?.players[0].userId === userCurrentMpGame?.player.userId;

  useEffect(() => {
    // If started, go to Game!
    if (multiplayerStory?.isStoryStarted) router.push(APP_URL.MULTIPLAYER_GAME);
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
            {t('btn_Start_game')}
          </button>
        </section>
      ) : null}

      <section>
        <H2>{t('h2_Characters')}</H2>

        <div className="flex flex-wrap gap-4 justify-center">
          {players.map((player) => (
            <CardCharacterLobby key={player.userId} player={player} />
          ))}
        </div>
      </section>

      <section className="p-4">
        <H2>{t('h2_Game_info')}</H2>

        <h3 className="font-bold text-lg">{storyName}</h3>
        <Markdown options={MarkdownOptions}>{storyDescription}</Markdown>

        <p className="my-4">
          <strong className="text-info">{t2('Created_by')}:</strong> {userCratorName}
        </p>
        <p className="mb-4">
          <strong className="text-info">{isAiGM ? t2('Host') : t2('Host/GM')}:</strong>{' '}
          {players[0].userName}
        </p>
        <p className="mb-4">
          <strong className="text-info">GmAi:</strong> {aiRole} | {aiConfigTitle}
        </p>
      </section>
    </Main>
  );
}
