'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useMemo } from 'react';
import { Character } from 'types/character';
import ModalCharacterInGame from '../card-character-modal/modal-character-in-game';
import ModalMaximumCharacters from '../card-character-modal/modal-maximun-characters';
import { useTranslations } from 'next-intl';

interface SelectCharacterProps {
  character: Character;
}

export default function ButtonSelectCharacter({ character }: SelectCharacterProps) {
  const t = useTranslations('CardCharacter.btn.select');

  const { removeACharacterFromInGame, inGameCharacters, addACharacterToInGame } =
    useCharacterStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { isStoryStarted } = useGmAiStore();

  const isInGame = useMemo(
    () => Boolean(inGameCharacters.find((c) => c.id === character.id)),
    [inGameCharacters, character.id]
  );

  function selectCharacter() {
    if (isStoryStarted) {
      setModalContent(<ModalCharacterInGame />);
      setModalIsOpen(true);
      return;
    }

    if (isInGame) {
      removeACharacterFromInGame(character.id);
    } else {
      if (inGameCharacters.length >= 2) {
        setModalContent(<ModalMaximumCharacters />);
        setModalIsOpen(true);
        return;
      }
      addACharacterToInGame(character);
    }
  }

  return (
    <button
      className="btn btn-sm btn-success"
      onClick={selectCharacter}
      aria-label={isInGame ? t('fire') : t('Recruit')}
    >
      {isInGame ? t('fire') : t('Recruit')}
    </button>
  );
}
