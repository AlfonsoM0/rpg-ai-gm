'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
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
  useAutoplayAiTTS(multiplayerStory?.content || [], -1);

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
  if (!multiplayerStory || !userCurrentMpGame) return <NoGameLoad />;

  const { storyName, players, aiRole, userCratorId } = multiplayerStory;
  const isGmAiRolGM = aiRole === 'Game Master';
  const player = players.filter((p) => p.userId === userCurrentMpGame.player.userId)[0];
  const othersPlayers = players
    .filter((p) => p.userId !== player.userId)
    .filter((p) => {
      if (isGmAiRolGM) return true;
      else return p.userId !== userCratorId;
    });

  function onSetRedyForGMClick() {
    setIsReadyForAiResponse(!player.isRedyForAiResponse);
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
        <MultiplayerChatWindow currentUserId={player.userId} multiplayerStory={multiplayerStory} />
        <ChatInputMsg isMultiplayer />
      </section>

      <section className="w-[90vw] max-w-[723px] flex flex-wrap justify-around gap-2">
        <ChatOptionsABC isMultiplayer />
        <ChatOptionsConfig isMultiplayer />
      </section>

      <section>
        {isGmAiRolGM ? (
          <CardCharacterContainer isSelected={player.isRedyForAiResponse}>
            <button
              className="btn btn-ghost mb-[-2rem] z-10"
              onClick={onSetRedyForGMClick}
              disabled={multiplayerStory.isStoryEnded}
            >
              {player.isRedyForAiResponse ? <WaitingForResponse /> : <NotRediForResponse1 />}
            </button>
            <CardPlayCharacter character={player.character} isMultiplayer />
            <></>
          </CardCharacterContainer>
        ) : null}

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
