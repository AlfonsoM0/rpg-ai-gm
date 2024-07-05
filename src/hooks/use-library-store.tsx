import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Content } from '@google/generative-ai';
import { Character } from 'types/character';

type Book = {
  id: string;
  title: string;
  characters: Character[];
  content: Content[];
};

interface LibraryState {
  library: Book[];
}

interface LibraryActions {
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
}

export const useLibraryStore = create<LibraryState & LibraryActions>()(
  devtools(
    persist(
      (set, get) => ({
        library: [],

        // Actions
        addBook: (book) => set((state) => ({ library: [book, ...state.library] })),

        removeBook: (id) =>
          set((state) => ({ library: state.library.filter((book) => book.id !== id) })),
      }),
      { name: 'library-store' }
    )
  )
);
