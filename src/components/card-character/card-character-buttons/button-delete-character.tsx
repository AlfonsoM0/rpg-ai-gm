'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { Character } from 'types/character';
import ModalCharacterInPlay from '../card-character-modal/modal-character-in-play';
import ModalDeleteCharacter from '../card-character-modal/modal-delete-character';

interface DeleteCharacterProps {
  character: Character;
}

export default function ButtonDeleteCharacter({ character }: DeleteCharacterProps) {
  const { setModalContent, setModalIsOpen } = useModalState();
  const { isStoryStarted } = useGmAiStore();

  function deleteCharacter() {
    if (isStoryStarted) {
      setModalContent(<ModalCharacterInPlay />);
      setModalIsOpen(true);
      return;
    }
    setModalContent(<ModalDeleteCharacter id={character.id} />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-sm btn-error" onClick={deleteCharacter}>
      Borrar
    </button>
  );
}
