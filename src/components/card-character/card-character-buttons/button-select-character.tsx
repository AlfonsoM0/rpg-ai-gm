'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useMemo } from 'react';
import { Character } from 'types/character';
import ModalCharacterInPlay from '../card-character-modal/modal-character-in-play';
import ModalMaximumCharacters from '../card-character-modal/modal-maximun-characters';

interface SelectCharacterProps {
  character: Character;
}

export default function ButtonSelectCharacter({ character }: SelectCharacterProps) {
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
      setModalContent(<ModalCharacterInPlay />);
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
    <button className="btn btn-sm btn-success" onClick={selectCharacter}>
      {isInGame ? 'Despedir' : 'Reclutar'}
    </button>
  );
}
