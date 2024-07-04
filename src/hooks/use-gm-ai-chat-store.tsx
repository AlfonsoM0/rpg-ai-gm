import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Content } from '@google/generative-ai';
import { gmAiPrompt } from 'config/gm-ai-promp';

interface GmAiStore {
  storyId: string;
  storyName: string;
  content: Content[];
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
  content: [
    {
      role: 'user',
      parts: [
        {
          text: gmAiPrompt,
        },
      ],
    },
  ],
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

        addContent: (newContent) => set((state) => ({ content: [...state.content, newContent] })),

        resetChat: () => set(() => initialGmAiState),
      }),
      { name: 'gm-ai' }
    )
  )
);
