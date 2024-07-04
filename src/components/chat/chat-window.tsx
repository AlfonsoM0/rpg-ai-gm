'use client';

import { Content } from '@google/generative-ai';
import ChatMessage from './chat-message';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';

export default function ChatWindow() {
  const { content } = useGmAiStore();
  const contentToRender = content.slice(0); //TODO: chage to 2 (delete prompt and characters info)

  return (
    <div className="h-[50vh] w-[90vw] flex flex-col">
      <div className="overflow-y-scroll">
        {contentToRender.map((msg, index) => {
          const position = msg.role === 'model' ? 'start' : 'end';
          const userName = msg.role === 'model' ? 'Game Master' : 'Player';

          return (
            <ChatMessage
              key={index}
              message={msg.parts.map((p) => p.text).join('\n')}
              position={position}
              userName={userName}
            />
          );
        })}
      </div>
    </div>
  );
}
