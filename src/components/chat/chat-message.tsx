'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useModalState } from 'hooks/use-modal-state';
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
  const { inGameCharacters, findCharacterByIdAndIcrementXp } = useCharacterStore();
  const { setModalContent, setModalIsOpen } = useModalState();

  const win1XP = message.includes('⬆️UP+1XP') ? 1 : 0;
  const win2XP = message.includes('⬆️UP+2XP') ? 2 : 0;

  if (win1XP || win2XP) {
    const winXp = win1XP + win2XP;
    inGameCharacters.forEach((character) => {
      findCharacterByIdAndIcrementXp(character.id, winXp);
    });

    setModalContent(ModalWinXp);
    setModalIsOpen(true);
  }

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
          <Image
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

const ModalWinXp = (
  <div>
    <h3 className="font-bold text-lg">Has ganado Puntos de Experiencia (XP)</h3>
    <p className="py-4">Regresa a la pagina principal para editar tu personaje.</p>
  </div>
);
