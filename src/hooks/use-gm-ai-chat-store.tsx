import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Content } from '@google/generative-ai';
import { AiModels, generateAiConfig } from 'utils/generate-ai-config';
import { createGmAiResponseContent } from 'utils/gmai-utils';
import { CharacterCreationDescription } from 'types/character';
import runAIChat from 'server/gm-ai';
import { descriptionIdeas } from './../components/form-new-character/form-description-ideas';

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
  resetChat: (newGmAiState?: GmAiStore) => void;
  setIsStoryStarted: (isStoryStarted: boolean) => void;

  // AI config
  setAiConfig: (aiConfig: AiModels) => void;

  // Player stats
  addPlayersDiceRoll: (diceRoll: number) => void;

  // Character Creation
  improveDescription: (
    characterName: string,
    description: string,
    descriptionType: CharacterCreationDescription
  ) => Promise<string>;
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
          if (!currentId) set({ storyId: crypto.randomUUID() });
        },

        setStoryName: (storyName) => set(() => ({ storyName })),

        addContent: async (newContent) => {
          set({ isLoadingContent: true });

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

        resetChat: (newGmAiState) => {
          const { aiConfig } = get();
          set(newGmAiState || { ...initialGmAiState, aiConfig });
        },

        setIsStoryStarted: (isStoryStarted) => set({ isStoryStarted }),

        setAiConfig: (aiConfig) => set({ aiConfig }),

        addPlayersDiceRoll: (playersDiceRoll) =>
          set((state) => ({ playersDiceRolls: [...state.playersDiceRolls, playersDiceRoll] })),

        improveDescription: async (characterName, description, descriptionType) => {
          set({ isLoadingContent: true });
          const { aiConfig } = get();

          const prompt = `Crea una descripción de "${descriptionType}" para un personaje de ficción llamado ${characterName}. La descripción debe basarse en la siguiente información "${description}" y debe considerar las siguientes preguntas "${descriptionIdeas[
            descriptionType
          ].join(', ')}".`;

          try {
            const aiRes = await runAIChat(prompt, undefined, generateAiConfig(10, aiConfig));
            set({ isLoadingContent: false });

            if (!aiRes) return description;
            return aiRes;
          } catch (error) {
            console.error('Error: improveDescription => ', error);
            set({ isLoadingContent: false });
            return description;
          }
        },
      }),
      { name: 'gm-ai' }
    )
  )
);
