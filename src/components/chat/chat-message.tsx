'use client';

import { Button } from 'components/button';
import { Icon } from 'components/icons';
import { MarkdownOptions } from 'config/constants';
import { useTTSStore } from 'hooks/use-tts-store';
import Markdown from 'markdown-to-jsx';
import { useEffect, useMemo, useState } from 'react';

interface ChatMsgStart {
  userName: string;
  message: string;
  position: 'start' | 'end';
  avatarSrc?: string;
  avatarAlt?: string;
}

export default function ChatMessage({
  userName,
  message,
  position,
  avatarSrc,
  avatarAlt,
}: ChatMsgStart) {
  const { handleStop, handlePause, setTTS, handlePlay, isPlaying, isPaused, isStopped, tts } =
    useTTSStore();

  const isThisTTS = useMemo(() => tts === message, [tts, message]);

  // Avatar On/Off effect
  const avatarStylePlaying = 'w-12 btn btn-circle btn-success';
  const avatarStylePaused = 'w-12 btn btn-circle btn-warning';
  const avatarStyleStoped = 'w-12 btn btn-circle btn-ghost';

  const [avatarStyle, setAvatarStyle] = useState(avatarStylePaused);

  function onAvatarClick() {
    if (isThisTTS) {
      if (isPlaying) handlePause();
      else handlePlay();
      return;
    }

    if (isPlaying || isPaused) handleStop();
    setTTS(message);
    setAvatarStyle(avatarStylePlaying);
    handlePlay();
  }

  useEffect(() => {
    if (isStopped) setAvatarStyle(avatarStyleStoped);
    if (isThisTTS) {
      if (isPlaying) setAvatarStyle(avatarStylePlaying);
      if (isPaused) setAvatarStyle(avatarStylePaused);
    } else setAvatarStyle(avatarStyleStoped);
  }, [isStopped, isPlaying, isPaused, isThisTTS]);

  const chatPosition = position === 'start' ? 'chat chat-start my-2' : 'chat chat-end my-2';

  return (
    <div className={chatPosition}>
      <div className="chat-image avatar" onClick={onAvatarClick}>
        <div className={avatarStyle}>
          {avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarSrc} alt={avatarAlt || ''} width="10" height="10" />
          ) : (
            <Icon.User />
          )}
        </div>
      </div>

      <div className="chat-header">{userName}</div>

      <div className="chat-bubble bg-secondary-content text-primary text-sm">
        <Markdown options={MarkdownOptions}>{message}</Markdown>

        {message.length > 30 ? (
          <div className="flex justify-end mb-[-0.8rem] mt-[-0.5rem] mr-[-1rem]">
            <Button.Copy text={message} toolTipPosition="left" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
