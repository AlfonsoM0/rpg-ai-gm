import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Content } from '@google/generative-ai';
import runAIChat from 'server/gm-ai';
import { AiModels, generateAiConfig } from 'utils/generate-ai-config';
import { calculateStoryXp } from 'utils/calculate-story-xp';
import { CODE_DONT_SHOW_IN_CHAT, CODE_STORY_END } from 'config/constants';
import { deleteCodesFromText } from 'utils/delete-text-from-text';

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

          const newContentText = newContent.parts.map((part) => part.text).join('');
          const { content, aiConfig, playersDiceRolls } = get();

          //#region Story Progression Control
          const { isStoryOver, totalFailures, totalSuccesses, storyXp } =
            calculateStoryXp(playersDiceRolls);
          const isStoryEndedBefore = JSON.stringify(content).includes(CODE_STORY_END);
          const contentStoryEnded: Content = {
            role: 'user',
            parts: [
              {
                text: `(((
              Crea el final de la historia considerando lo siguiente:
              Total de fallos ${totalFailures},
              Total de éxito ${totalSuccesses},
              XP de la historia ${storyXp}.
              ${CODE_STORY_END}
              )))`,
              },
            ],
          };
          const contentStoryProgress: Content = {
            role: 'user',
            parts: [
              {
                text: `(((
              Información sobre el progreso de la historia:
              Total de fallos ${totalFailures},
              Total de éxito ${totalSuccesses},
              XP de la historia ${storyXp}.
              ${CODE_DONT_SHOW_IN_CHAT}
              )))`,
              },
            ],
          };
          const infoStoryControl: Content =
            isStoryOver && !isStoryEndedBefore ? contentStoryEnded : contentStoryProgress;
          // console.info('isStoryOver && !isStoryEndedBefore => ', isStoryOver, !isStoryEndedBefore);
          // console.info('newContent (text) => ', newContentText);
          // console.info('infoStoryControl (text) => ', infoStoryControl[0].parts[0].text);
          //#endregion

          try {
            const gMAiResponse = await runAIChat(
              newContentText,
              [...content, infoStoryControl],
              generateAiConfig(content.length, aiConfig)
            );

            if (!gMAiResponse) {
              console.warn('Empty response => ', gMAiResponse);
              // Avoid empty response.
              set((state) => ({
                content: [
                  ...state.content,
                  newContent,
                  infoStoryControl,
                  {
                    role: 'model',
                    parts: [{ text: '🤔... ' }],
                  },
                ],
                isLoadingContent: false,
              }));
            } else
              set((state) => ({
                content: [
                  ...state.content,
                  newContent,
                  infoStoryControl,
                  {
                    role: 'model',
                    parts: [{ text: deleteCodesFromText(gMAiResponse) }],
                  },
                ],
                isLoadingContent: false,
              }));
          } catch (error) {
            console.error(error);
            set((state) => ({
              content: [
                ...state.content,
                newContent,
                infoStoryControl,
                {
                  role: 'model',
                  parts: [
                    {
                      text: 'Lo lamento, ocurrió un error y no puedo responderte. \n\n Intenta nuevamente. 👍',
                    },
                  ],
                },
              ],
              isLoadingContent: false,
            }));
          }
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
