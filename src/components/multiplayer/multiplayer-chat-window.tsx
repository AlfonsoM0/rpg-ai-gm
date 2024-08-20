'use client';

import useMultiplayer from 'src/hooks/multiplayer';
import ChatWindowFrame from '../chat/chat-window-frame';
import ChatMessage from '../chat/chat-message';
import {
  CODE_CHARACTERS_CHANGE,
  CODE_DONT_SHOW_IN_CHAT,
  CODE_STORY_END,
} from 'src/config/constants';
import MsgLoadingCharacters from '../chat/chat-message-loading-characterts';
import MsgStoryEnd from '../chat/chat-message-end';
import { deleteCodesFromText } from 'src/utils/delete-text-from-text';
import { isGmAiAutomaticResponse } from 'src/utils/gmai-utils-mp';
import { useEffect, useRef } from 'react';

export default function MultiplayerChatWindow() {
  const { userCurrentMpGame, multiplayerStory } = useMultiplayer();

  // AI msg center
  const refWindow = useRef<HTMLDivElement>(null);
  const refLoader = useRef<HTMLDivElement>(null);
  const isPlayersRedy = isGmAiAutomaticResponse(multiplayerStory);

  useEffect(() => {
    // If isLoadingContent is true, scroll to the bottom.
    isPlayersRedy && refLoader.current?.scrollIntoView({ behavior: 'smooth' });
    !isPlayersRedy && refWindow.current?.scrollIntoView({ behavior: 'smooth' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayersRedy]);

  /**
   * Render
   */
  if (!userCurrentMpGame || !multiplayerStory) return ChatNotAvailable;

  return (
    <div className="pt-2" ref={refWindow}>
      <ChatWindowFrame>
        {multiplayerStory.content.map((msg) => {
          const {
            isInGameMsg,
            parts,
            userId,
            charName,
            userName: uName,
            charAvatarSrc,
            charAvatarAlt,
            userAvatarSrc,
            userAvatarAlt,
          } = msg;
          const message = parts.map((p) => p.text).join('\n');
          const position = userCurrentMpGame.player.userId === userId ? 'end' : 'start';
          const userName = isInGameMsg ? charName : uName;
          const avatarSrc = isInGameMsg ? charAvatarSrc : userAvatarSrc;
          const avatarAlt = isInGameMsg ? charAvatarAlt : userAvatarAlt;

          if (message.includes(CODE_CHARACTERS_CHANGE))
            return <MsgLoadingCharacters key={msg.id} />;
          else if (message.includes(CODE_STORY_END))
            return <MsgStoryEnd key={msg.id} isMultiplayer />;
          else if (message.includes(CODE_DONT_SHOW_IN_CHAT)) return <div key={msg.id} />;
          return (
            <ChatMessage
              key={msg.id}
              message={deleteCodesFromText(message)}
              position={position}
              userName={userName}
              avatarSrc={avatarSrc}
              avatarAlt={avatarAlt}
              isInGameMsg={isInGameMsg}
            />
          );
        })}

        {isPlayersRedy ? (
          <div className="flex justify-center items-center h-[70vh]" ref={refLoader}>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : null}
      </ChatWindowFrame>
    </div>
  );
}

const ChatNotAvailable = <p className="text-center">Chat no disponible.</p>;
