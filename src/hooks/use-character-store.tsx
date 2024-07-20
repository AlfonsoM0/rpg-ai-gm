import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Character } from 'types/character';
import { UserCharacters } from 'types/firebase-db';

interface CharacterStore {
  inGameCharacters: Character[];
  charactersCollection: Character[]; //old name => allCharacters

  updatedAt: number;
}

interface CharacterActions {
  addACharacterToInGame: (character: Character) => void;
  removeACharacterFromInGame: (id: string) => void;
  removeAllInGameCharacters: () => void;

  addACharacterToCollection: (character: Character) => void;
  removeACharacterFromCollection: (id: string) => void;

  findCharacterByIdAndIcrementXp: (id: string, amount: number) => void;

  setCharactersCollection: (userCharacters?: UserCharacters) => void;
  setUpdatedAtTo0: () => void;
}

export const useCharacterStore = create<CharacterStore & CharacterActions>()(
  devtools(
    persist(
      (set, get) => ({
        inGameCharacters: [],
        charactersCollection: [],
        updatedAt: 0,

        // Actions
        addACharacterToInGame: (character) =>
          set((state) => ({ inGameCharacters: [...state.inGameCharacters, character] })),

        removeACharacterFromInGame: (id) =>
          set((state) => ({ inGameCharacters: state.inGameCharacters.filter((c) => c.id !== id) })),

        removeAllInGameCharacters: () => set(() => ({ inGameCharacters: [] })),

        addACharacterToCollection: (character) =>
          set((state) => ({
            charactersCollection: [character, ...state.charactersCollection],
            updatedAt: new Date().getTime(),
          })),

        removeACharacterFromCollection: (id) =>
          set((state) => ({
            charactersCollection: state.charactersCollection.filter((c) => c.id !== id),
            updatedAt: new Date().getTime(),
          })),

        findCharacterByIdAndIcrementXp: (id, amount) => {
          const character = get().charactersCollection.find((c) => c.id === id);
          if (character) {
            set((state) => ({
              charactersCollection: state.charactersCollection.map((c) =>
                c.id === id ? { ...c, xp: c.xp + amount } : c
              ),
              updatedAt: new Date().getTime(),
            }));

            // Update inGameCharacters if the character is currently in game
            const inGameCharacter = get().inGameCharacters.find((c) => c.id === id);
            if (inGameCharacter) {
              set((state) => ({
                inGameCharacters: state.inGameCharacters.map((c) =>
                  c.id === id ? { ...c, xp: c.xp + amount } : c
                ),
              }));
            }
          }
        },

        setCharactersCollection: (userCharacters) =>
          set(() => ({
            charactersCollection: userCharacters?.charactersCollection || [],
            updatedAt: userCharacters?.updatedAt || new Date().getTime(),
          })),

        setUpdatedAtTo0: () => set(() => ({ updatedAt: 0 })),
      }),
      { name: 'character-storage' }
    )
  )
);
