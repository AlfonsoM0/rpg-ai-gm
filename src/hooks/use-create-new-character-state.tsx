import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Character } from 'types/character';

type CharacterKey = keyof Character;

const initialCharacterState: Character & {
  step: number;
  isEdit: boolean;
  previousCharacteristics: Character['characteristics'];
} = {
  id: crypto.randomUUID(),
  xp: 250,
  name: '',
  appearance: '',
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

  previousCharacteristics: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },

  step: 0,
  isEdit: false,
};

type CreateNewCharacterStore = typeof initialCharacterState;

interface CreateNewCharacterStoreActions {
  setAllCharacterInfo: (character: Character) => void;
  clearAllCharacterInfo: () => void;
  setDescription: ({ key, value }: { key: CharacterKey; value: string }) => void;
  setCharacteristic: ({
    key,
    value,
  }: {
    key: keyof Character['characteristics'];
    value: number;
  }) => void;

  setPreviousCharacteristics: (previousCharacteristics: Character['characteristics']) => void;

  setStep: (step: number | ((state: number) => number)) => void;
  setIsEdit: (isEdit: boolean) => void;
}

export const useCreateNewCharacterStore = create<
  CreateNewCharacterStore & CreateNewCharacterStoreActions
>()(
  devtools(
    persist(
      (set) => ({
        ...initialCharacterState,

        // Actions
        setAllCharacterInfo: (character) => set(character),

        clearAllCharacterInfo: () => set(initialCharacterState),

        setDescription: ({ key, value }) => set((state) => ({ ...state, [key]: value })),

        setCharacteristic: ({ key, value }) =>
          set((state) => ({
            ...state,
            characteristics: { ...state.characteristics, [key]: value },
          })),

        setPreviousCharacteristics: (previousCharacteristics) => set({ previousCharacteristics }),

        setStep: (step: number | ((state: number) => number)) => {
          set((state) => ({ step: typeof step === 'function' ? step(state.step) : step }));
        },

        setIsEdit: (isEdit) => set({ isEdit }),
      }),
      { name: 'new-character-storage' }
    )
  )
);
