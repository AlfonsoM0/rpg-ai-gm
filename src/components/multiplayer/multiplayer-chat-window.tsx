'use client';

import useMultiplayer from 'src/hooks/multiplayer';
import ChatWindowFrame from '../chat/chat-window-frame';
import ChatMessage from '../chat/chat-message';
import { deleteCodesFromText } from 'src/utils/delete-text-from-text';
import {
  CODE_CHARACTERS_CHANGE,
  CODE_DONT_SHOW_IN_CHAT,
  CODE_STORY_END,
} from 'src/config/constants';
import MsgLoadingCharacters from '../chat/chat-message-loading-characterts';
import MsgStoryEnd from '../chat/chat-message-end';

export default function MultiplayerChatWindow() {
  const { userCurrentMpGame, multiplayerStory, isMultiplayerLoading } = useMultiplayer();

  if (!userCurrentMpGame || !multiplayerStory) return ChatNotAvailable;

  const messagesToShow = multiplayerStory.content.slice(1);

  return (
    <div>
      <ChatWindowFrame>
        {messagesToShow.map((msg) => {
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

          if (message.includes(CODE_CHARACTERS_CHANGE))
            return <MsgLoadingCharacters key={msg.id} />;
          else if (message.includes(CODE_STORY_END)) return <MsgStoryEnd key={msg.id} />;
          else if (message.includes(CODE_DONT_SHOW_IN_CHAT)) return <div key={msg.id} />;
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
