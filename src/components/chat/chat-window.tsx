'use client';

import { Content } from '@google/generative-ai';
import ChatMessage from './chat-message';
import { useEffect, useRef } from 'react';

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
    <div className="h-[50vh] w-[90vw] flex flex-col">
      <div className="overflow-y-scroll">
        {content.map((msg, index) => {
          const position = msg.role === 'model' ? 'start' : 'end';
          const userName = msg.role === 'model' ? 'Game Master AI' : 'Player';

          return (
            <ChatMessage
              key={index}
              message={msg.parts.map((p) => p.text).join('\n')}
              position={position}
              userName={userName}
            />
          );
        })}

        {isLoadingContent ? (
          <div className="flex justify-center items-center h-[40vh]" ref={refLoader}>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
