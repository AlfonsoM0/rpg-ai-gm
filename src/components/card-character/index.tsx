'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useMemo } from 'react';
import { Character } from 'types/character';
import ButtonShareCharacter from './card-character-buttons/button-share-character';
import ButtonCopyCharacter from './card-character-buttons/button-copy-character';
import ButtonDeleteCharacter from './card-character-buttons/button-delete-character';
import ButtonEditCharacter from './card-character-buttons/button-edit-character';
import ButtonSelectCharacter from './card-character-buttons/button-select-character';
import CardContainer from './card-character-container';
import CardCharacterBody from './card-character-body';

interface CardCharacterProps {
  character: Character;
  isViewOnly?: boolean;
  isFromAnotherUser?: boolean;
}

export default function CardCharacter({
  character,
  isViewOnly,
  isFromAnotherUser,
}: CardCharacterProps) {
  const { inGameCharacters } = useCharacterStore();

  const { id } = character;

  const isInGame = useMemo(
    () => Boolean(inGameCharacters.find((c) => c.id === id)),
    [inGameCharacters, id]
  );

  return (
    <CardContainer isSelected={isInGame}>
      <CardCharacterBody character={character}>
        {isViewOnly ? null : (
          <div className="card-actions justify-between">
            <ButtonDeleteCharacter character={character} />

            <ButtonEditCharacter character={character} />

            <ButtonSelectCharacter character={character} />
          </div>
        )}

        <div className="card-actions justify-center">
          {isFromAnotherUser ? (
            <ButtonCopyCharacter character={character} />
          ) : (
            <ButtonShareCharacter character={character} />
          )}
        </div>
      </CardCharacterBody>
    </CardContainer>
  );
}

export const Skeleton_CardCharacter = () => (
  <div className="flex w-80 flex-col gap-4">
    <div className="flex items-center gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
    <div className="skeleton h-44 w-full"></div>
  </div>
);
