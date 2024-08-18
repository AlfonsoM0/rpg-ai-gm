'use client';

import { useEffect } from 'react';
import CardCharacterBody from 'src/components/card-character/card-character-body';
import CardCharacterContainer from 'src/components/card-character/card-character-container';
import CardPlayCharacter from 'src/components/card-play-character';
import ChatInputMsg from 'src/components/chat/chat-input-msg';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import MultiplayerChatWindow from 'src/components/multiplayer/multiplayer-chat-window';
import TTSControls from 'src/components/tts/tts-controls';
import { AI_ROLE } from 'src/config/constants';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGmAiAcctions from 'src/hooks/multiplayer/use-gm-ai-actions';
import { useTTSStore } from 'src/hooks/use-tts-store';

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
    gmAiGenerateMsg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplayerStory?.players]);

  /**
   * Player
   */
  if (!multiplayerStory || !userCurrentMpGame) return NoGameLoad;

  const { storyName, players } = multiplayerStory;
  const player = players.filter((p) => p.userId === userCurrentMpGame.player.userId)[0];
  const othersPlayers = players.filter((p) => p.userId !== userCurrentMpGame.player.userId);
  const isGmAiRolGM = multiplayerStory.aiRole === 'Game Master';

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

      <section>
        {isGmAiRolGM ? (
          <CardCharacterContainer isSelected={player.isRedyForAiResponse}>
            <CardPlayCharacter character={player.character} isMultiplayer />

            <button className="btn btn-ghost" onClick={onSetRedyForGMClick}>
              {player.isRedyForAiResponse ? (
                <div className="text-center text-success">Esperando respuesta del GM</div>
              ) : (
                <div className="text-center text-error">No estás listo</div>
              )}
            </button>
          </CardCharacterContainer>
        ) : null}

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {othersPlayers.map((player) => (
            <CardCharacterContainer isSelected={player.isRedyForAiResponse} key={player.userId}>
              <CardCharacterBody character={player.character}>
                {player.isRedyForAiResponse ? (
                  <div className="text-center text-success">Esperando respuesta del GM</div>
                ) : (
                  <div className="text-center text-error">No está listo</div>
                )}
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
