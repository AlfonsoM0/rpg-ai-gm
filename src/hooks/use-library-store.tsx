import { Book } from 'types/library';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
      { name: 'library-storage' }
    )
  )
);
