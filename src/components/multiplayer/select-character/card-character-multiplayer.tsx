'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import CardCharacterBody from 'src/components/card-character/card-character-body';
import CardCharacterContainer from 'src/components/card-character/card-character-container';
import useMultiplayer from 'src/hooks/multiplayer';
import { Character } from 'src/types/character';

export default function CardCharacterMultiplayer({ character }: { character: Character }) {
  const t = useTranslations('CardCharacter.btn.select');

  const { characterSelected, setCharacterSelected } = useMultiplayer();

  const isSelected = useMemo(
    () => character.id === characterSelected?.id,
    [character, characterSelected]
  );

  const btnStyle = isSelected ? 'btn btn-success' : 'btn';

  function onSelectCharacterClick() {
    if (!characterSelected) setCharacterSelected(character);
    else setCharacterSelected();
  }

  return (
    <CardCharacterContainer isSelected={isSelected}>
      <CardCharacterBody character={character}>
        <button className={btnStyle} onClick={onSelectCharacterClick}>
          {isSelected ? t('Selected') : t('Recruit')}
        </button>
      </CardCharacterBody>
    </CardCharacterContainer>
  );
}
