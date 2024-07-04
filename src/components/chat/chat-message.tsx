import Markdown from 'markdown-to-jsx';

interface ChatMsgStart {
  userName: string;
  message: string;
  position: 'start' | 'end';
  avatarAlt?: string;
  avatarSrc?: string;
}

export default function ChatMessage({ userName, message, position }: ChatMsgStart) {
  return (
    <div className={`chat chat-${position}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-header">{userName}</div>
      <div className="chat-bubble">
        <Markdown options={mdOpt}>{message}</Markdown>
      </div>
    </div>
  );
}

const mdOpt = {
  overrides: {
    strong: {
      props: { className: 'text-blue-500 text-lg' },
    },
    li: {
      props: { className: 'list-disc ml-5' },
    },
    p: {
      props: { className: 'mb-2' },
    },
    a: {
      props: { className: 'text-blue-500' },
    },
  },
};
