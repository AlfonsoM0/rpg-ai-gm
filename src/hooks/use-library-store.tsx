import { Book } from 'types/library';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LibraryState {
  library: Book[];
  bookSelected?: Book;
}

interface LibraryActions {
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  changeBookName: (id: string, newName: string) => void;
  setBookSelected: (book?: Book) => void;
}

export const useLibraryStore = create<LibraryState & LibraryActions>()(
  devtools(
    persist(
      (set, get) => ({
        library: [],
        bookSelected: undefined,

        // Actions
        addBook: (book) => set((state) => ({ library: [book, ...state.library] })),

        removeBook: (id) =>
          set((state) => ({ library: state.library.filter((book) => book.id !== id) })),

        changeBookName: (id, newName) => {
          const updatedLibrary = get().library.map((book) =>
            book.id === id ? ({ ...book, title: newName } as Book) : book
          );
          set({ library: updatedLibrary });
        },

        setBookSelected: (book) => set(() => ({ bookSelected: book })),
      }),
      { name: 'library-storage' }
    )
  )
);
