import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Content } from '@google/generative-ai';
import runAIChat from 'server/gm-ai';
import { generateAiConfig } from 'utils/generate-ai-config';

interface GmAiStore {
  storyId: string;
  storyName: string;
  content: Content[];
  isLoadingContent: boolean;
  isStoryStarted: boolean;
}

interface GmAiActions {
  setHistoryId: () => void;
  setStoryName: (storyName: string) => void;
  addContent: (newContent: Content) => void;
  resetChat: () => void;
  setIsStoryStarted: (isStoryStarted: boolean) => void;
}

const initialGmAiState: GmAiStore = {
  storyId: '',
  storyName: '',
  content: [],
  isLoadingContent: false,
  isStoryStarted: false,
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
          const { content } = get();

          try {
            const gMAiResponse = await runAIChat(
              newContentText,
              content,
              generateAiConfig(content.length)
            );

            if (!gMAiResponse) {
              console.warn('Empty response => ', gMAiResponse);
              // Avoid empty response.
              set((state) => ({
                content: [
                  ...state.content,
                  newContent,
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
                  {
                    role: 'model',
                    parts: [{ text: gMAiResponse }],
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
      }),
      { name: 'gm-ai' }
    )
  )
);
