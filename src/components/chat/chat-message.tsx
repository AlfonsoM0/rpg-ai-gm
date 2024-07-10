import { Icon } from 'components/icons';
import { Player_Characters } from 'config/constants';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import Image from 'next/image';

interface ChatMsgStart {
  userName: string;
  message: string;
  position: 'start' | 'end';
  avatarSrc?: string;
  avatarAlt?: string;
}

export default function ChatMessage({
  userName,
  message,
  position,
  avatarSrc,
  avatarAlt,
}: ChatMsgStart) {
  if (message.includes(Player_Characters))
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
          {avatarSrc ? ( // TODO: TTS on click and border animation.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarSrc} alt={avatarAlt || ''} width="10" height="10" />
          ) : (
            <Icon.User />
          )}
        </div>
      </div>
      <div className="chat-header">{userName}</div>
      <div className="chat-bubble bg-primary-content text-primary text-sm">
        <Markdown options={mdOpt}>{message}</Markdown>
      </div>
    </div>
  );
}

const mdOpt: MarkdownToJSX.Options = {
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
    pre: {
      component: 'div',
    },
    code: {
      component: Markdown,
    },
  },
};
