import type { Content } from '@google/generative-ai';
import { Character } from 'types/character';

export type Book = {
  id: string;
  title: string;
  characters: Character[];
  content: Content[];
  playersDiceRolls: number[];
};
