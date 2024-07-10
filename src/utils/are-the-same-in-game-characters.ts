import { Character } from 'types/character';

export function areTheSameInGameCharacters(
  allCharacters: Character[],
  inGameCharacters: Character[]
): boolean {
  const newInGameCharacters = inGameCharacters.map(
    (character) => allCharacters.find((char) => char.id === character.id) || character
  );

  return JSON.stringify(newInGameCharacters) === JSON.stringify(inGameCharacters);
}
