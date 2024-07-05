import { Character } from 'types/character';

/**
 * Find the character in a Character[].
 * Return true if the character have the same information as the one it the list.
 * Return false otherwise.
 */
export function isCharacterHaveTheSameInfo(
  characters: Character[],
  characterToFind: Character
): boolean {
  const characterFinded = characters.find((char) => char.id === characterToFind.id);
  if (!characterFinded) return false;

  return JSON.stringify(characterFinded) === JSON.stringify(characterToFind);
}
