import { Character } from 'types/character';

export function areTheSameInGameCharacters(
  charactersCollection: Character[],
  inGameCharacters: Character[]
): boolean {
  const newInGameCharacters = inGameCharacters.map(
    (character) => charactersCollection.find((char) => char.id === character.id) || character
  );

  return JSON.stringify(newInGameCharacters) === JSON.stringify(inGameCharacters);
}
