import Markdown from 'markdown-to-jsx';
import Image from 'next/image';

interface ChatMsgStart {
  userName: string;
  message: string;
  position: 'start' | 'end';
  avatarAlt?: string;
  avatarSrc?: string;
}

export default function ChatMessage({ userName, message, position }: ChatMsgStart) {
  if (message.includes('**Player Characters**'))
    return (
      <div>
        <p className="text-center">Actualizando personajes de la historia...</p>
      </div>
    );

  const chatPosition = position === 'start' ? 'chat chat-start' : 'chat chat-end';

  return (
    <div className={chatPosition}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img //TODO: Change this
            alt={userName}
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            width={10}
            height={10}
          />
        </div>
      </div>
      <div className="chat-header">{userName}</div>
      <div className="chat-bubble bg-primary-content text-inherit text-sm">
        <Markdown options={mdOpt}>{message}</Markdown>
      </div>
    </div>
  );
}

const mdOpt = {
  overrides: {
    strong: {
      props: { className: 'text-info text-md' },
    },
    li: {
      props: { className: 'list-disc ml-5' },
    },
    p: {
      props: { className: 'my-2' },
    },
    a: {
      props: { className: 'text-info' },
    },
  },
};
