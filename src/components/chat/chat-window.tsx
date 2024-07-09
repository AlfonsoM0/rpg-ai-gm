'use client';

import { Content } from '@google/generative-ai';
import ChatMessage from './chat-message';
import { useEffect, useRef } from 'react';
import imgGmAi from 'public/android-chrome-512x512.png';
import { Game_Master_AI } from 'config/constants';

interface ChatWindowProps {
  content: Content[];
  isLoadingContent: boolean;
}

export default function ChatWindow({ content, isLoadingContent }: ChatWindowProps) {
  const refLoader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If isLoadingContent is true, scroll to the bottom.
    if (isLoadingContent) {
      if (refLoader.current) {
        refLoader.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingContent]);

  return (
    <div className="h-[70vh] w-[90vw] flex flex-col">
      <div className="overflow-y-scroll">
        {content.map((msg, index) => {
          const position = msg.role === 'model' ? 'start' : 'end';
          const userName = msg.role === 'model' ? Game_Master_AI : 'Player';
          const avatarSrc = msg.role === 'model' ? imgGmAi.src : undefined;
          const avatarAlt = msg.role === 'model' ? `${Game_Master_AI} Avatar` : 'Player Avatar';

          return (
            <ChatMessage
              key={index}
              message={msg.parts.map((p) => p.text).join('\n')}
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
