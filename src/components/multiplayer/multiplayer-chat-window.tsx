'use client';

import useMultiplayer from 'src/hooks/multiplayer';
import ChatWindowFrame from '../chat/chat-window-frame';
import { useEffect } from 'react';
import ChatMessage from '../chat/chat-message';
import { deleteCodesFromText } from 'src/utils/delete-text-from-text';

export default function MultiplayerChatWindow() {
  const { userCurrentMpGame, multiplayerStory, isMultiplayerLoading } = useMultiplayer();

  useEffect(() => {
    console.log('userCurrentMpGame => ', userCurrentMpGame);
    console.log('multiplayerStory => ', multiplayerStory);
  }, [userCurrentMpGame, multiplayerStory]);

  if (!userCurrentMpGame || !multiplayerStory) return ChatNotAvailable;

  return (
    <div>
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
          const message = deleteCodesFromText(parts[0].text || '');
          const position = userCurrentMpGame.player.userId === userId ? 'end' : 'start';
          const userName = isInGameMsg ? charName : uName;
          const avatarSrc = isInGameMsg ? charAvatarSrc : userAvatarSrc;
          const avatarAlt = isInGameMsg ? charAvatarAlt : userAvatarAlt;
          return (
            <ChatMessage
              key={msg.id}
              message={message}
              position={position}
              userName={userName}
              avatarSrc={avatarSrc}
              avatarAlt={avatarAlt}
              isInGameMsg={isInGameMsg}
            />
          );
        })}

        {isMultiplayerLoading ? (
          <div
            className="flex justify-center items-center h-[70vh]"
            // ref={refLoader}
          >
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : null}
      </ChatWindowFrame>
    </div>
  );
}

const ChatNotAvailable = <p className="text-center">Chat no disponible.</p>;
