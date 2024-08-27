'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import CardCharacterBody from 'src/components/card-character/card-character-body';
import CardCharacterContainer from 'src/components/card-character/card-character-container';
import CardPlayCharacter from 'src/components/card-play-character';
import ChatInputMsg from 'src/components/chat/chat-input-msg';
import ChatOptionsABC from 'src/components/chat/chat-options-abc';
import ChatOptionsConfig from 'src/components/chat/chat-options-config';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import MultiplayerChatWindow from 'src/components/multiplayer/multiplayer-chat-window';
import TTSControls from 'src/components/tts/tts-controls';
import useMultiplayer, { useGmAiAcctions, usePlayerAcctions } from 'src/hooks/multiplayer';
import useAutoplayAiTTS from 'src/hooks/use-tts-autoplay';
import { useTTSStore } from 'src/hooks/use-tts-store';
import { isGmAiAutomaticResponse } from 'src/utils/gmai-utils-mp';
import { useDebouncedCallback } from 'use-debounce';

export default function Page() {
  const { multiplayerStory, userCurrentMpGame } = useMultiplayer();
  const { setIsReadyForAiResponse } = usePlayerAcctions();
  const { gmAiGenerateMsg } = useGmAiAcctions();

  /**
   * TTS Config
   */
  const { isTTSEnabled } = useTTSStore();
  useAutoplayAiTTS(multiplayerStory?.content, -1);

  /**
   * GMAI automatic response
   * Send if Players are Redy, or Cancel if not.
   */
  const debounceAiMsg = useDebouncedCallback(gmAiGenerateMsg, 2000);
  useEffect(() => {
    if (isGmAiAutomaticResponse(multiplayerStory)) debounceAiMsg();
    else debounceAiMsg.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplayerStory?.players]);

  /**
   * Player
   */
  const isGmAiRoleGM = useMemo(
    () => multiplayerStory?.aiRole === 'Game Master',
    [multiplayerStory?.aiRole]
  );

  const isUserHost = useMemo(
    () => userCurrentMpGame?.player.userId !== multiplayerStory?.players[0].userId,
    [userCurrentMpGame?.player.userId, multiplayerStory?.players]
  );

  const othersPlayers = useMemo(() => {
    if (multiplayerStory?.players && userCurrentMpGame?.player.userId) {
      const userId = userCurrentMpGame?.player.userId;
      const players = multiplayerStory.players;
      return players.filter((p) => {
        const isCurrentPlayer = p.userId !== userId;
        if (isGmAiRoleGM) return isCurrentPlayer;
        else return isCurrentPlayer && p.userId !== players[0].userId;
      });
    } else return [];
  }, [multiplayerStory?.players, userCurrentMpGame?.player.userId, isGmAiRoleGM]);

  const currentPlayer = useMemo(
    () => multiplayerStory?.players.find((p) => p.userId === userCurrentMpGame?.player.userId),
    [multiplayerStory?.players, userCurrentMpGame?.player.userId]
  );

  /**
   * Render
   */
  if (!multiplayerStory || !currentPlayer) return <NoGameLoad />;

  const { storyName, isStoryEnded } = multiplayerStory;
  const { isRedyForAiResponse, character, userId } = currentPlayer;

  function onSetRedyForGMClick() {
    setIsReadyForAiResponse(!isRedyForAiResponse);
  }

  return (
    <Main>
      <H1>{storyName}</H1>

      {isTTSEnabled ? (
        <section className="my-[-1rem]">
          <TTSControls />
        </section>
      ) : null}

      <section>
        <MultiplayerChatWindow currentUserId={userId} multiplayerStory={multiplayerStory} />
        <ChatInputMsg isMultiplayer isUserGM={!isGmAiRoleGM && !isUserHost} />
      </section>

      <section className="w-[90vw] max-w-[723px] flex flex-wrap justify-around gap-2">
        {!isGmAiRoleGM && !isUserHost ? null : <ChatOptionsABC isMultiplayer />}
        <ChatOptionsConfig isMultiplayer />
      </section>

      <section>
        {!isGmAiRoleGM && !isUserHost ? null : (
          <div className="flex justify-center">
            <CardCharacterContainer isSelected={isRedyForAiResponse}>
              <button
                className="btn btn-ghost mb-[-2rem] z-10"
                onClick={onSetRedyForGMClick}
                disabled={isStoryEnded}
              >
                {isRedyForAiResponse ? <WaitingForResponse /> : <NotRediForResponse1 />}
              </button>
              <CardPlayCharacter character={character} isMultiplayer />
              <></>
            </CardCharacterContainer>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {othersPlayers.map((player) => (
            <CardCharacterContainer isSelected={player.isRedyForAiResponse} key={player.userId}>
              {player.isRedyForAiResponse ? <WaitingForResponse /> : <NotRediForResponse2 />}
              <CardCharacterBody character={player.character}>
                <></>
              </CardCharacterBody>
            </CardCharacterContainer>
          ))}
        </div>
      </section>
    </Main>
  );
}

const NoGameLoad = () => {
  const t = useTranslations('Page_Multiplayer_Game');
  return (
    <Main>
      <H1>{t('Game_not_available')}</H1>
    </Main>
  );
};

const WaitingForResponse = () => {
  const t = useTranslations('Page_Multiplayer_Game');
  return (
    <div className="text-center text-success p-2">
      {t('Waiting_GM_Response')}
      <span className="loading loading-spinner loading-xs"></span>
    </div>
  );
};

const NotRediForResponse1 = () => {
  const t = useTranslations('Page_Multiplayer_Game');
  return <div className="text-center text-error p-2">{t('Click_for_waiting')}</div>;
};

const NotRediForResponse2 = () => {
  const t = useTranslations('Page_Multiplayer_Game');
  return <div className="text-center text-error p-2 mb-[-1rem]">{t('Not_ready')}</div>;
};
