'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { Character } from 'types/character';
import ModalCharacterInGame from '../card-character-modal/modal-character-in-game';
import ModalDeleteCharacter from '../card-character-modal/modal-delete-character';
import { useTranslations } from 'next-intl';

interface DeleteCharacterProps {
  character: Character;
}

export default function ButtonDeleteCharacter({ character }: DeleteCharacterProps) {
  const t = useTranslations('CardCharacter.btn');

  const { setModalContent, setModalIsOpen } = useModalState();
  const { isStoryStarted } = useGmAiStore();

  function deleteCharacter() {
    if (isStoryStarted) {
      setModalContent(<ModalCharacterInGame />);
      setModalIsOpen(true);
      return;
    }
    setModalContent(<ModalDeleteCharacter id={character.id} />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-sm btn-error" onClick={deleteCharacter}>
      {t('delete')}
    </button>
  );
}
