'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatOptionsABC() {
  const { addContent, isLoadingContent } = useGmAiStore();
  const { setModalContent, setModalIsOpen } = useModalState();

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    addContent({
      role: 'user',
      parts: [{ text: `Elijo la opción **"${option}"**.` }],
    });
  }

  function onEndHistoryClick(): void {
    setModalContent(<ModalEndHistory />);
    setModalIsOpen(true);
  }

  return (
    <section className="flex flex-wrap justify-center items-center gap-4">
      <h3 className="font-bold">Opciones: </h3>

      <div className="flex gap-2">
        <button
          className="btn btn-circle"
          onClick={() => onHistoryOptionClick('A')}
          disabled={isLoadingContent}
        >
          A
        </button>
        <button
          className="btn btn-circle"
          onClick={() => onHistoryOptionClick('B')}
          disabled={isLoadingContent}
        >
          B
        </button>
        <button
          className="btn btn-circle"
          onClick={() => onHistoryOptionClick('C')}
          disabled={isLoadingContent}
        >
          C
        </button>
      </div>

      <button className="btn btn-error" onClick={onEndHistoryClick} disabled={isLoadingContent}>
        Finalizar Historia
      </button>
    </section>
  );
}

function ModalEndHistory() {
  const router = useRouter();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { storyName, storyId, setStoryName, setHistoryId, content, resetChat } = useGmAiStore();
  const { inGameCharacters, findCharacterByIdAndIcrementXp } = useCharacterStore();

  const { addBook } = useLibraryStore();

  useEffect(() => {
    setHistoryId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSaveBookClick() {
    // save book to library
    if (storyName)
      addBook({
        id: storyId,
        title: storyName,
        characters: inGameCharacters,
        content,
      });

    // give XP to characters
    const modelMsgs = content
      .filter((c) => c.role === 'model')
      .map((c) => c.parts[0].text)
      .join(' | ');
    const win1XP = modelMsgs.includes('⬆️UP+1XP') ? 1 : 0;
    const win2XP = modelMsgs.includes('⬆️UP+2XP') ? 2 : 0;
    const winXp = win1XP + win2XP;

    if (winXp) {
      inGameCharacters.forEach((character) => {
        findCharacterByIdAndIcrementXp(character.id, winXp);
      });

      setModalContent(<ModalWinXp xp={winXp} />);
      setModalIsOpen(true);

      resetChat();
      router.push('/');
    } else {
      // reset all states to initial state
      resetChat(); // reset to inital state
      setModalIsOpen(false);
      router.push('/');
    }
  }

  return (
    <div>
      <h3 className="font-bold text-lg">Fin de la Historia</h3>
      <p className="py-4">
        Una vez finalices la historia, no podras volver a ella para seguir jugándola. <br />
        Si colocas un nombre a tu historia, podrás guardarla para leerla en tu biblioteca. <br />
        <strong>Elige un nombre original.</strong>
      </p>

      <input
        className="input input-bordered w-full text-center"
        type="text"
        placeholder="Nombre de la Historia"
        value={storyName}
        onChange={(e) => setStoryName(e.target.value)}
      />

      <div className="modal-action justify-around">
        <button className="btn btn-error" onClick={onSaveBookClick}>
          Si, finalizar historia
        </button>
        <button className="btn btn-success" onClick={() => setModalIsOpen(false)}>
          No, seguir jugando
        </button>
      </div>
    </div>
  );
}

const ModalWinXp = ({ xp }: { xp: number }) => (
  <div>
    <h3 className="font-bold text-lg">Has ganado {xp} Puntos de Experiencia (XP)</h3>
    <p className="py-4">Edita tu personaje para mejorar tus caracteristicas.</p>
  </div>
);
