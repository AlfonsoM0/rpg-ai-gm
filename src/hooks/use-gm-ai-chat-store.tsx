import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Content } from '@google/generative-ai';
import runAIChat from 'server/gm-ai';

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

          // 1. User: Characters, 2. Model: Story?, 3. User: response.
          if (content.length > 3) set(() => ({ isStoryStarted: true }));
          else set(() => ({ isStoryStarted: false }));

          try {
            const gMAiResponse = await runAIChat(newContentText, content);

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
            set((state) => ({
              content: [
                ...state.content,
                newContent,
                {
                  role: 'model',
                  parts: [{ text: 'Lo lamento, ocurrió un error y no puedo responderte' }],
                },
              ],
              isLoadingContent: false,
            }));
          }
        },

        resetChat: () => set(() => initialGmAiState),
      }),
      { name: 'gm-ai' }
    )
  )
);
