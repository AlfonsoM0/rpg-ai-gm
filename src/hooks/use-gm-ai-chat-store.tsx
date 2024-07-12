import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Content } from '@google/generative-ai';
import { AiModels } from 'utils/generate-ai-config';
import { createGmAiResponseContent } from 'utils/gmai-utils';

interface GmAiStore {
  // Chat history
  storyId: string;
  storyName: string;
  content: Content[];
  isLoadingContent: boolean;
  isStoryStarted: boolean;

  // AI config
  aiConfig: AiModels;

  // Player stats
  playersDiceRolls: number[];
}

interface GmAiActions {
  // Chat history
  setHistoryId: () => void;
  setStoryName: (storyName: string) => void;
  addContent: (newContent: Content) => void;
  resetChat: () => void;
  setIsStoryStarted: (isStoryStarted: boolean) => void;

  // AI config
  setAiConfig: (aiConfig: AiModels) => void;

  // Player stats
  addPlayersDiceRoll: (diceRoll: number) => void;
}

const initialGmAiState: GmAiStore = {
  storyId: '',
  storyName: '',
  content: [],
  isLoadingContent: false,
  isStoryStarted: false,
  aiConfig: 'Progresive_AI',
  playersDiceRolls: [],
};

export const useGmAiStore = create<GmAiStore & GmAiActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialGmAiState,

        // Actions
        setHistoryId: () => {
          const currentId = get().storyId;
          if (!currentId) set(() => ({ storyId: crypto.randomUUID() }));
        },

        setStoryName: (storyName) => set(() => ({ storyName })),

        addContent: async (newContent) => {
          set(() => ({ isLoadingContent: true }));

          const { content, aiConfig, playersDiceRolls } = get();

          const contentToSet = await createGmAiResponseContent(
            aiConfig,
            content,
            newContent,
            playersDiceRolls
          );

          set(() => ({
            content: contentToSet,
            isLoadingContent: false,
          }));
        },

        resetChat: () => set(() => initialGmAiState),

        setIsStoryStarted: (isStoryStarted) => set({ isStoryStarted }),

        setAiConfig: (aiConfig) => set({ aiConfig }),

        addPlayersDiceRoll: (playersDiceRoll) =>
          set((state) => ({ playersDiceRolls: [...state.playersDiceRolls, playersDiceRoll] })),
      }),
      { name: 'gm-ai' }
    )
  )
);
