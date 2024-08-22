import { Locale } from 'src/i18n-config';
import { AiRole } from 'src/types/multiplayer';
import { AiModels } from 'src/utils/generate-ai-config';
import { create } from 'zustand';

interface CreateMpGameState {
  storyName: string;
  storyDescription: string;
  locale: Locale;
  aiConfig: AiModels;
  aiRole: AiRole;
}

interface CreateMpGameActions {
  setStoryName: (storyName: string) => void;
  setStoryDescription: (storyDescription: string) => void;
  setLocale: (locale: Locale) => void;
  setAiConfig: (aiConfig: AiModels) => void;
  setAiRole: (aiRole: AiRole) => void;

  setCreateMultiplayerState: (newState?: Partial<CreateMpGameState>) => void;
}

const initialCreateMpGameState: CreateMpGameState = {
  storyName: '',
  storyDescription: '',
  locale: 'en',
  aiConfig: 'Progresive_AI',
  aiRole: 'Game Master',
};

export const useCreateMultiplayerState = create<CreateMpGameState & CreateMpGameActions>((set) => ({
  ...initialCreateMpGameState,

  // Actions

  setStoryName: (storyName) => set({ storyName }),

  setStoryDescription: (storyDescription) => set({ storyDescription }),

  setLocale: (locale) => set({ locale }),

  setAiConfig: (aiConfig) => set({ aiConfig }),

  setAiRole: (aiRole) => set({ aiRole }),

  setCreateMultiplayerState: (newState) => {
    if (newState) set({ ...initialCreateMpGameState, ...newState });
    else set(initialCreateMpGameState);
  },
}));
