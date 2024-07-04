import { Content } from '@google/generative-ai';
import ChatMessage from './chat-message';

interface ChatWindowProps {
  content: Content[];
}

export default function ChatWindow({ content }: ChatWindowProps) {
  return (
    <div>
      {content.map((msg, index) => {
        const position = msg.role === 'model' ? 'start' : 'end';
        const userName = msg.role === 'model' ? 'Game Master' : 'Player';

        return (
          <ChatMessage
            key={index}
            message={msg.parts as unknown as string}
            position={position}
            userName={userName}
          />
        );
      })}
    </div>
  );
}
