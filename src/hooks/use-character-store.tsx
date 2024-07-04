import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Character } from 'types/character';

interface CharacterStore {
  inGameCharacters: Character[];
  allCharacters: Character[];
}

interface CharacterActions {
  addInGameCharacter: (character: Character) => void;
  removeInGameCharacter: (id: string) => void;

  addAllCharacter: (character: Character) => void;
  removeAllCharacter: (id: string) => void;

  findCharacterByIdAndIcrementXp: (id: string, amount: number) => void;
}

export const useCharacterStore = create<CharacterStore & CharacterActions>()(
  devtools(
    persist(
      (set, get) => ({
        inGameCharacters: [],
        allCharacters: [],

        // Actions
        addInGameCharacter: (character) =>
          set((state) => ({ inGameCharacters: [...state.inGameCharacters, character] })),

        removeInGameCharacter: (id) =>
          set((state) => ({ inGameCharacters: state.inGameCharacters.filter((c) => c.id !== id) })),

        addAllCharacter: (character) =>
          set((state) => ({ allCharacters: [character, ...state.allCharacters] })),

        removeAllCharacter: (id) =>
          set((state) => ({ allCharacters: state.allCharacters.filter((c) => c.id !== id) })),

        findCharacterByIdAndIcrementXp: (id, amount) => {
          const character = get().allCharacters.find((c) => c.id === id);
          if (character) {
            set((state) => ({
              allCharacters: state.allCharacters.map((c) =>
                c.id === id ? { ...c, xp: c.xp + amount } : c
              ),
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
      }),
      { name: 'character-storage' }
    )
  )
);
