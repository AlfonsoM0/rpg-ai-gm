import type { Content } from 'types/ai';
import { Character } from 'types/character';

export type Book = {
  id: string;
  title: string;
  characters: Character[];
  content: Content[];
  playersDiceRolls: number[];
};
