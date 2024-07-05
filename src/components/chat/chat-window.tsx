'use client';

import ChatMessage from './chat-message';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';

export default function ChatWindow() {
  const { content, isLoadingContent } = useGmAiStore();
  const contentToRender = content.slice(2);

  return (
    <div className="h-[50vh] w-[90vw] flex flex-col">
      <div className="overflow-y-scroll">
        {contentToRender.map((msg, index) => {
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
          <div className="flex justify-center items-center h-[10vh]">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
