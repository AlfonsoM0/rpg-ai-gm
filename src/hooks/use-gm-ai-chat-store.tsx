import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Content } from '@google/generative-ai';
import { AiModels, generateAiConfig } from 'utils/generate-ai-config';
import { createGmAiResponseContent } from 'utils/gmai-utils';
import { CharacterCreationDescription } from 'types/character';
import runAIChat from 'server/gm-ai';

import i18nEs from '../../content/es.json';
import { Locale } from 'src/i18n-config';
import { AI_MODEL_TYPE } from 'src/config/constants';

const ideas = i18nEs.New_Character.Description;

interface GmAiStore {
  locale: Locale;
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
  setLocale: (locale: Locale) => void;
  // Chat history
  setHistoryId: () => void;
  setStoryName: (storyName: string) => void;
  addContent: (newContent: Content, userAiModels: AI_MODEL_TYPE[] | undefined) => void;
  resetChat: (newGmAiState?: Omit<GmAiStore, 'locale'>) => void;
  setIsStoryStarted: (isStoryStarted: boolean) => void;

  // AI config
  setAiConfig: (aiConfig: AiModels) => void;

  // Player stats
  addPlayersDiceRoll: (diceRoll: number) => void;

  // Character Creation
  improveDescription: (
    characterName: string,
    description: string,
    descriptionType: CharacterCreationDescription,
    userAiModels?: AI_MODEL_TYPE[]
  ) => Promise<string>;
}

const initialGmAiState: GmAiStore = {
  locale: 'en',
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
        setLocale: (locale) => set({ locale }),

        setHistoryId: () => {
          const currentId = get().storyId;
          if (!currentId) set({ storyId: crypto.randomUUID() });
        },

        setStoryName: (storyName) => set(() => ({ storyName })),

        addContent: async (newContent, userAiModels) => {
          const { locale } = get();
          set({ isLoadingContent: true });

          const { content, aiConfig, playersDiceRolls } = get();

          const contentToSet = await createGmAiResponseContent(
            aiConfig,
            content,
            newContent,
            playersDiceRolls,
            locale,
            userAiModels
          );

          set(() => ({
            content: contentToSet,
            isLoadingContent: false,
          }));
        },

        resetChat: (newGmAiState) => {
          const { aiConfig, locale } = get();
          set(newGmAiState || { ...initialGmAiState, aiConfig, locale });
        },

        setIsStoryStarted: (isStoryStarted) => set({ isStoryStarted }),

        setAiConfig: (aiConfig) => set({ aiConfig }),

        addPlayersDiceRoll: (playersDiceRoll) =>
          set((state) => ({ playersDiceRolls: [...state.playersDiceRolls, playersDiceRoll] })),

        improveDescription: async (characterName, description, descriptionType, userAiModels) => {
          set({ isLoadingContent: true });
          const { aiConfig } = get();

          const prompt = `Crea una descripción de "${descriptionType}" para un personaje de ficción llamado ${characterName}. La descripción debe basarse en la siguiente información "${description}", debe ser en el mismo idioma que la información y debe considerar las siguientes preguntas "${ideas[descriptionType]}".`;

          try {
            const aiRes = await runAIChat(
              prompt,
              undefined,
              generateAiConfig(10, aiConfig),
              userAiModels
            );
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
