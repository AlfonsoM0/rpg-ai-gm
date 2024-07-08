import { create } from 'zustand';
import { Character } from 'types/character';

type CharacterKey = keyof Character;

const initialCharacterState: Character & { step: number } = {
  id: crypto.randomUUID(),
  xp: 60,
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

  step: 0,
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
  setStep: (step: number | ((state: number) => number)) => void;
}

export const useCreateNewCharacterStore = create<
  CreateNewCharacterStore & CreateNewCharacterStoreActions
>((set) => ({
  ...initialCharacterState,

  // Actions
  setAllCharacterInfo: (character) => set(character),

  clearAllCharacterInfo: () => set(initialCharacterState),

  setDescription: ({ key, value }) => set((state) => ({ ...state, [key]: value })),

  setCharacteristic: ({ key, value }) =>
    set((state) => ({ ...state, characteristics: { ...state.characteristics, [key]: value } })),

  setStep: (step: number | ((state: number) => number)) => {
    set((state) => ({ step: typeof step === 'function' ? step(state.step) : step }));
  },
}));
