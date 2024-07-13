'use client';

import { Content } from '@google/generative-ai';
import ChatMessage from './chat-message';
import { useEffect, useRef } from 'react';
import imgGmAi from 'public/android-chrome-512x512.png';
import {
  AI_ROLE,
  CODE_CHARACTERS_CHANGE,
  CODE_DONT_SHOW_IN_CHAT,
  CODE_STORY_END,
  AI_NAME_TO_SHOW,
} from 'config/constants';
import MsgStoryEnd from './chat-message-end';

interface ChatWindowProps {
  content: Content[];
  isLoadingContent: boolean;
}

export default function ChatWindow({ content, isLoadingContent }: ChatWindowProps) {
  const refLoader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If isLoadingContent is true, scroll to the bottom.
    if (isLoadingContent) {
      if (refLoader.current) refLoader.current.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingContent]);

  return (
    <div className="h-[70vh] w-[90vw] flex flex-col border rounded-xl p-2">
      <div className="overflow-y-scroll">
        {content.map((cont, idx) => {
          const position = cont.role === AI_ROLE.MODEL ? 'start' : 'end';
          const userName = cont.role === AI_ROLE.MODEL ? AI_NAME_TO_SHOW : 'Player';
          const avatarSrc = cont.role === AI_ROLE.MODEL ? imgGmAi.src : undefined;
          const avatarAlt =
            cont.role === AI_ROLE.MODEL ? `${AI_NAME_TO_SHOW} Avatar` : 'Player Avatar';

          const message = cont.parts.map((p) => p.text).join('\n');

          if (message.includes(CODE_CHARACTERS_CHANGE)) return <MsgLoadingCharacters key={idx} />;
          else if (message.includes(CODE_STORY_END)) return <MsgStoryEnd key={idx} />;
          else if (message.includes(CODE_DONT_SHOW_IN_CHAT)) return <div key={idx} />;
          else
            return (
              <ChatMessage
                key={idx}
                message={message}
                position={position}
                userName={userName}
                avatarSrc={avatarSrc}
                avatarAlt={avatarAlt}
              />
            );
        })}
        {isLoadingContent ? (
          <div className="flex justify-center items-center h-[70vh]" ref={refLoader}>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MsgLoadingCharacters() {
  return (
    <div>
      <p className="text-center">Actualizando los personajes de la historia...</p>
    </div>
  );
}
