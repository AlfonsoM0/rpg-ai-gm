import { create } from 'zustand';
import { Character } from 'types/character';

type CharacterKey = keyof Character;

interface CreateNewCharacterStoreActions {
  setDescription: ({ key, value }: { key: CharacterKey; value: string }) => void;
  setCharacteristic: ({
    key,
    value,
  }: {
    key: keyof Character['characteristics'];
    value: number;
  }) => void;
}

export const useCreateNewCharacterStore = create<Character & CreateNewCharacterStoreActions>(
  (set) => ({
    id: '',
    xp: 60,
    name: '',
    appareance: '',
    background: '',
    equipment: '',
    personality: '',
    profession: '',
    powers: '',
    characteristics: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },

    // Actions
    setDescription: ({ key, value }) => set((state) => ({ ...state, [key]: value })),

    setCharacteristic: ({ key, value }) =>
      set((state) => ({ ...state, characteristics: { ...state.characteristics, [key]: value } })),
  })
);
