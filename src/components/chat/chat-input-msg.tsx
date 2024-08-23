'use client';

import { Button } from 'components/button';
import { Icon } from 'components/icons';
import { AI_ROLE } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import SR from 'react-speech-recognition';
import { useTranslations } from 'next-intl';
import useMultiplayer, { useGmAiAcctions, usePlayerAcctions } from 'src/hooks/multiplayer';
import ButtonAiImprove from '../form-new-character/form-character-description-steps-ai-button/button-ai-improve';
import { areAllPlayersReadyForAiResponse } from 'src/utils/gmai-utils-mp';
import Loading from '../loading';

export default function ChatInputMsg({
  isMultiplayer,
  isUserGM,
}: {
  isMultiplayer?: boolean;
  isUserGM?: boolean;
}) {
  const t = useTranslations('buttons');
  const c = useTranslations('Page_Multiplayer_Game');

  const { handleStop } = useTTSStore();
  const [chatMsg, setChatMsg] = useState('');
  const [isListening, setIsListening] = useState(false);

  /**
   * Single Player Settings
   */
  const { addContent, isLoadingContent } = useGmAiStore();
  function submitChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chatMsg) return;
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
  const { isMultiplayerLoading, userCurrentMpGame, isInGameMsg, setIsInGameMsg, multiplayerStory } =
    useMultiplayer();
  const { sendMessage } = usePlayerAcctions();
  const { gmAiGenerateMsg, sendAiMsg } = useGmAiAcctions();
  function submitMpChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chatMsg) return;

    handleStop();
    SR.stopListening();

    if (isUserGM) sendAiMsg(chatMsg, isInGameMsg);
    else sendMessage(chatMsg, isInGameMsg);

    setChatMsg('');
  }
  // Disable Characters Msg when Story is Ended
  useEffect(() => {
    if (multiplayerStory?.isStoryEnded) setIsInGameMsg(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplayerStory?.isStoryEnded]);

  /**
   * USER GAME MASTER
   */
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  async function onAiImproveClick() {
    setIsAiLoading(true);
    const res = await gmAiGenerateMsg(chatMsg, true);
    res && setChatMsg(res);
    setIsAiLoading(false);
  }

  function setChatMsgWhenAiIsNotWorking(text: string) {
    if (isAiLoading) return;
    setChatMsg(text);
  }

  /**
   *  Rendering
   */
  const submitFunction = isMultiplayer ? submitMpChat : submitChat;

  const isCurrentPlayerRedy = isUserGM
    ? false
    : multiplayerStory?.players.find((p) => p.userId === userCurrentMpGame?.player.userId)
        ?.isRedyForAiResponse;

  const isBtnDisable =
    (isUserGM ? false : isCurrentPlayerRedy) ||
    isLoadingContent ||
    isMultiplayerLoading ||
    isAiLoading;

  const isToggleDisable = isUserGM ? false : multiplayerStory?.isStoryEnded;
  const isTextAreaDisable = isListening || isAiLoading;

  const btnIcon = isMultiplayer ? (
    <Icon.MsgCirgleUp className="w-6 h-6 stroke-info" />
  ) : (
    <Loading.IconStars className="w-6 h-6 fill-info" isloading={isLoadingContent} />
  );

  const characterOrGM = isUserGM ? c('Send_msg_as_GM') : c('Send_msg_as_Character');
  const sendAs = isInGameMsg ? characterOrGM : c('Send_msg_as_Player');
  const sendMsgAs =
    (isInGameMsg ? userCurrentMpGame?.player.character.name : userCurrentMpGame?.player.userName) ||
    '';

  const sendAsStyle = isInGameMsg ? 'text-xs text-info' : 'text-xs text-error';

  return (
    <form className="p-2 max-w-[90vw]" onSubmit={submitFunction}>
      {/* 
        MULTIPLAYER 
      */}
      {isUserGM && isInGameMsg ? (
        <div className="text-center text-xs mt-[-0.5rem]">
          {areAllPlayersReadyForAiResponse(multiplayerStory) ? (
            <p className="text-success">{c('All_Players_Redy_for_GM_Response')}</p>
          ) : (
            <p className="text-error">{c('All_Players_Not_Ready_for_GM_Response')}</p>
          )}
        </div>
      ) : null}

      {isMultiplayer ? (
        <div className="flex justify-between gap-2 items-center my-2">
          <p className={sendAsStyle}>
            {sendAs}
            {sendMsgAs}
          </p>

          {/* USER GAME MASTER */}
          {isUserGM && isInGameMsg ? (
            <button
              className="btn btn-xs btn-ghost"
              type="button"
              aria-label="Game Master AI generate story"
              onClick={onAiImproveClick}
              disabled={isAiLoading}
            >
              <ButtonAiImprove
                isHorizontalConfig
                isLoadingContent={isAiLoading}
                contentLength={chatMsg.length}
              />
            </button>
          ) : null}

          <input
            type="checkbox"
            className="toggle toggle-info"
            onChange={() => setIsInGameMsg(!isInGameMsg)}
            checked={isInGameMsg}
            disabled={isToggleDisable}
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
            {btnIcon}
          </button>

          <Button.STT
            text={chatMsg}
            setText={setChatMsgWhenAiIsNotWorking}
            setIsListening={setIsListening}
          />
        </div>
      </div>
    </form>
  );
}
//min-h-28 sm:min-h-24 md:min-h-20 lg:min-h-16 xl:min-h-12
