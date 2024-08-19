'use client';

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
import { AI_ROLE } from 'src/config/constants';
import useMultiplayer, { useGmAiAcctions, usePlayerAcctions } from 'src/hooks/multiplayer';
import { useTTSStore } from 'src/hooks/use-tts-store';
import { isGmAiAutomaticResponse } from 'src/utils/gmai-utils-mp';

export default function Page() {
  const { multiplayerStory, userCurrentMpGame } = useMultiplayer();
  const { setIsReadyForAiResponse } = usePlayerAcctions();
  const { gmAiGenerateMsg } = useGmAiAcctions();

  /**
   * TTS Config
   */
  const { isTTSEnabled, handlePlay, setTTS, handleStop } = useTTSStore();
  useEffect(() => {
    if (multiplayerStory) {
      const { content } = multiplayerStory;

      if (isTTSEnabled && content.length > 0) {
        const lastAIContent = content[content.length - 1];
        const isLastContentIsModel = lastAIContent.role === AI_ROLE.MODEL;
        if (isLastContentIsModel) {
          const tts = lastAIContent.parts[0].text || '';
          setTTS(tts);
          handlePlay();
        }
      }
    }

    return () => {
      handleStop();
      setTTS('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplayerStory?.content]);

  /**
   * GMAI automatic response
   */
  useEffect(() => {
    if (isGmAiAutomaticResponse(multiplayerStory)) gmAiGenerateMsg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplayerStory?.players]);

  /**
   * Player
   */
  if (!multiplayerStory || !userCurrentMpGame) return NoGameLoad;

  const { storyName, players, aiRole, userCratorId } = multiplayerStory;
  const isGmAiRolGM = aiRole === 'Game Master';
  const player = players.filter((p) => p.userId === userCurrentMpGame.player.userId)[0];
  const othersPlayers = players
    .filter((p) => p.userId !== userCurrentMpGame.player.userId)
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
        <MultiplayerChatWindow />
        <ChatInputMsg isMultiplayer />
      </section>

      <section className="w-[90vw] max-w-[723px] flex flex-wrap justify-around gap-2">
        <ChatOptionsABC isMultiplayer />
        <ChatOptionsConfig isMultiplayer />
      </section>

      <section>
        {isGmAiRolGM ? (
          <CardCharacterContainer isSelected={player.isRedyForAiResponse}>
            <CardPlayCharacter character={player.character} isMultiplayer />

            <button
              className="btn btn-ghost"
              onClick={onSetRedyForGMClick}
              disabled={multiplayerStory.isStoryEnded}
            >
              {player.isRedyForAiResponse ? WaitingForResponse : NotRediForResponse}
            </button>
          </CardCharacterContainer>
        ) : null}

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {othersPlayers.map((player) => (
            <CardCharacterContainer isSelected={player.isRedyForAiResponse} key={player.userId}>
              <CardCharacterBody character={player.character}>
                {player.isRedyForAiResponse ? WaitingForResponse : NotRediForResponse}
              </CardCharacterBody>
            </CardCharacterContainer>
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

const WaitingForResponse = (
  <div className="text-center text-success">
    Esperando respuesta del GM...
    <span className="loading loading-spinner loading-xs"></span>
  </div>
);

const NotRediForResponse = <div className="text-center text-error">No está listo</div>;
