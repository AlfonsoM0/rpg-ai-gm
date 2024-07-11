'use client';

import { Icon } from 'components/icons';
import { CODE_CHARACTERS_CHANGE, CODE_DONT_SHOW_IN_CHAT, CODE_STORY_END } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import Image from 'next/image';
import { calculateStoryXp } from 'utils/calculate-story-xp';

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
  const { playersDiceRolls } = useGmAiStore();
  const { totalFailures, totalSuccesses, storyXp } = calculateStoryXp(playersDiceRolls);

  if (message.includes(CODE_CHARACTERS_CHANGE))
    return (
      <div>
        <p className="text-center">Actualizando los personajes de la historia...</p>
      </div>
    );
  else if (message.includes(CODE_STORY_END))
    return (
      <div className="card bg-secondary-content w-80 shadow-xl m-auto my-4">
        <div className="card-body">
          <h2 className="card-title text-info">Fin de la historia</h2>
          <p className="text-center text-primary">
            <strong>Total de fallos:</strong> {totalFailures}. <br />
            <strong>Total de éxito:</strong> {totalSuccesses}. <br />
            <strong>Experiencia de la historia:</strong> {storyXp}XP. <br />
          </p>
        </div>
      </div>
    );
  else if (message.includes(CODE_DONT_SHOW_IN_CHAT)) return <></>;

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
      <div className="chat-bubble bg-secondary-content text-primary text-sm">
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
