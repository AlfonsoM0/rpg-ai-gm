'use client';

import { Button } from 'components/button';
import { Icon } from 'components/icons';
import { AI_ROLE } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import SR from 'react-speech-recognition';
import { useTranslations } from 'next-intl';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';

export default function ChatInputMsg({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('buttons');

  const { handleStop } = useTTSStore();
  const [chatMsg, setChatMsg] = useState('');
  const [isListening, setIsListening] = useState(false);

  /**
   * Single Player Settings
   */
  const { addContent, isLoadingContent } = useGmAiStore();
  function submitChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStop();
    SR.stopListening();
    addContent({
      role: AI_ROLE.USER,
      parts: [{ text: chatMsg }],
    });
    setChatMsg('');
  }

  /**
   * Multiplayer Settings
   */
  const { isMultiplayerLoading, userCurrentMpGame } = useMultiplayer();
  const { sendMessage } = usePlayerAcctions();
  const [isInGameMsg, setIsInGameMsg] = useState(true);
  function submitMpChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStop();
    SR.stopListening();
    sendMessage(chatMsg, isInGameMsg);
    setChatMsg('');
  }

  /**
   *  Rendering
   */
  const submitFunction = isMultiplayer ? submitMpChat : submitChat;

  const isTextAreaDisable = isLoadingContent || isMultiplayerLoading || isListening;
  const isBtnDisable = isLoadingContent || isMultiplayerLoading;

  const btnIcon = isMultiplayer ? (
    <Icon.MsgCirgleUp className="w-6 h-6 stroke-info" />
  ) : (
    <Icon.Stars className="w-6 h-6 fill-info" />
  );

  const sendAs = isInGameMsg ? 'Enviar como Personaje: ' : 'Enviar como Jugador: ';
  const sendMsgAs =
    (isInGameMsg ? userCurrentMpGame?.player.character.name : userCurrentMpGame?.player.userName) ||
    '';

  return (
    <form className="p-2 max-w-[90vw]" onSubmit={submitFunction}>
      {isMultiplayer ? (
        <div className="flex justify-between my-2">
          <p className="text-xs">
            {sendAs}
            {sendMsgAs}
          </p>
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setIsInGameMsg(!isInGameMsg)}
            checked={isInGameMsg}
          />
        </div>
      ) : null}

      <div className="flex gap-2">
        <TextareaAutosize
          autoFocus // text area should automatically get focus when the page loads
          className="textarea textarea-bordered w-full min-h-20"
          placeholder="..."
          value={chatMsg}
          onChange={(e) => setChatMsg(e.target.value)}
          disabled={isTextAreaDisable}
        />

        <div className="flex flex-col gap-2">
          <button
            className="btn btn-sm h-12"
            type="submit"
            disabled={isBtnDisable}
            aria-label={t('Send_message')}
          >
            {isLoadingContent ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              btnIcon
            )}
          </button>

          <Button.STT text={chatMsg} setText={setChatMsg} setIsListening={setIsListening} />
        </div>
      </div>
    </form>
  );
}
//min-h-28 sm:min-h-24 md:min-h-20 lg:min-h-16 xl:min-h-12
