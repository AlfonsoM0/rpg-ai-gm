import { MultiplayerStory } from 'src/types/multiplayer';
import { Book } from './../types/library.d';

export function fromMpBookToSpBook(book: MultiplayerStory): Book {
  return {
    id: book.storyId,
    title: book.storyName,
    characters: book.players.map((p) => p.character),
    content: book.content,
    playersDiceRolls: [],
  };
}
