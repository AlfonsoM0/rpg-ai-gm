import { UserLibrary } from 'types/firebase-db';
import { Book } from 'types/library';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LibraryState {
  library: Book[];
  bookSelected?: Book;
  updatedAt: number;
}

interface LibraryActions {
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  changeBookName: (id: string, newName: string) => void;
  setBookSelected: (book?: Book) => void;
  removeBookSelected: () => void;

  setLibrary: (userLibrary?: UserLibrary) => void;
}

export const useLibraryStore = create<LibraryState & LibraryActions>()(
  devtools(
    persist(
      (set, get) => ({
        library: [],
        bookSelected: undefined,
        updatedAt: 0,

        // Actions
        addBook: (book) =>
          set((state) => ({ library: [book, ...state.library], updatedAt: new Date().getTime() })),

        removeBook: (id) =>
          set((state) => ({
            library: state.library.filter((book) => book.id !== id),
            updatedAt: new Date().getTime(),
          })),

        changeBookName: (id, newName) => {
          const updatedLibrary = get().library.map((book) =>
            book.id === id ? ({ ...book, title: newName } as Book) : book
          );
          set({ library: updatedLibrary, updatedAt: new Date().getTime() });
        },

        setBookSelected: (book) => set(() => ({ bookSelected: book })),

        removeBookSelected: () => set({ bookSelected: undefined }),

        setLibrary: (userLibrary) =>
          set({
            library: userLibrary?.library || [],
            updatedAt: userLibrary?.updatedAt || new Date().getTime(),
          }),
      }),
      { name: 'library-storage' }
    )
  )
);
