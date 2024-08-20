import { MultiplayerStory } from 'src/types/multiplayer';
import { UserLibrary } from 'types/firebase-db';
import { Book } from 'types/library';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LibraryState {
  updatedAt: number;
  isSinglePlayer: boolean;

  // Single Player
  library: Book[];
  bookSelected?: Book;

  // Multiplayer
  multiplayerLibrary: MultiplayerStory[];
  multiplayerBookSelected?: MultiplayerStory;
}

interface LibraryActions {
  setIsSinglePlayer: (isSinglePlayer: boolean) => void;
  // Single Player
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  changeBookName: (id: string, newName: string) => void;
  setBookSelected: (book?: Book) => void;
  removeBookSelected: () => void;

  // Multiplayer
  addBookMp: (book: MultiplayerStory) => void;
  removeBookMp: (id: string) => void;
  changeBookNameMp: (id: string, newName: string) => void;
  setBookSelectedMp: (book?: MultiplayerStory) => void;
  removeBookSelectedMp: () => void;

  setLibrary: (userLibrary?: UserLibrary) => void;
  setUpdatedAtTo0: () => void;
}

export const useLibraryStore = create<LibraryState & LibraryActions>()(
  devtools(
    persist(
      (set, get) => ({
        updatedAt: 0,
        isSinglePlayer: true,

        library: [],
        bookSelected: undefined,

        multiplayerLibrary: [],
        multiplayerBookSelected: undefined,

        // Actions
        setIsSinglePlayer: (isSinglePlayer) => set({ isSinglePlayer }),

        /**
         * Single Player Actions
         */

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

        /**
         * Multiplayer Actions
         */

        addBookMp: (book) =>
          set((state) => ({
            multiplayerLibrary: [book, ...state.multiplayerLibrary],
            updatedAt: new Date().getTime(),
          })),

        removeBookMp: (storyId) =>
          set((state) => ({
            multiplayerLibrary: state.multiplayerLibrary.filter((book) => book.storyId !== storyId),
            updatedAt: new Date().getTime(),
          })),

        changeBookNameMp: (storyId, newName) => {
          const updatedLibrary = get().multiplayerLibrary.map((book) =>
            book.storyId === storyId ? ({ ...book, storyName: newName } as MultiplayerStory) : book
          );
          set({ multiplayerLibrary: updatedLibrary, updatedAt: new Date().getTime() });
        },

        setBookSelectedMp: (book) => set(() => ({ multiplayerBookSelected: book })),

        removeBookSelectedMp: () => set({ multiplayerBookSelected: undefined }),

        /**
         * Other Actions
         */

        setLibrary: (userLibrary) =>
          set({
            library: userLibrary?.library || [],
            multiplayerLibrary: userLibrary?.multiplayerLibrary || [],
            updatedAt: userLibrary?.updatedAt || new Date().getTime(),
          }),

        setUpdatedAtTo0: () => set({ updatedAt: 0 }),
      }),
      { name: 'library-storage' }
    )
  )
);
