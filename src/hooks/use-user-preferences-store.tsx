import { AI_MODEL_TYPE } from 'src/config/constants';
import { UserPreferences } from 'types/firebase-db';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserPreferencesActions {
  setTheme: (theme: string) => void;

  addChatShortcut: (shortcut: string) => void;
  removeChatShortcut: (shortcut: string) => void;
  moveChatShortcut: (shortcut: string, newIndex: number) => void;

  addAIModel: (model: AI_MODEL_TYPE) => void;
  removeAIModel: (model: AI_MODEL_TYPE) => void;
  moveAIModel: (model: AI_MODEL_TYPE, newIndex: number) => void;

  clearOrSetUserPreferences: (initialState?: UserPreferences) => void;
  setUpdatedAtTo0: () => void;
}

const initialUserPreferencesState: UserPreferences = {
  theme: 'light',

  chatShortcuts: [],

  aiModels: [],

  updatedAt: 0,
};

export const useUserPreferencesStore = create<UserPreferences & UserPreferencesActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialUserPreferencesState,

        // Actions
        setTheme: (theme: string) => set({ theme, updatedAt: new Date().getTime() }),

        addChatShortcut: (shortcut: string) => {
          const isShortcutExist = get().chatShortcuts.includes(shortcut);
          if (isShortcutExist) return;

          set((state) => ({
            chatShortcuts: [...state.chatShortcuts, shortcut],
            updatedAt: new Date().getTime(),
          }));
        },

        removeChatShortcut: (shortcut: string) =>
          set((state) => ({
            chatShortcuts: state.chatShortcuts.filter((s) => s !== shortcut),
            updatedAt: new Date().getTime(),
          })),

        moveChatShortcut: (shortcut: string, newIndex: number) =>
          set((state) => {
            const index = state.chatShortcuts.indexOf(shortcut);
            if (index === -1) return state;

            // Remove the shortcut from its current position
            const newChatShortcuts = [...state.chatShortcuts];
            newChatShortcuts.splice(index, 1);

            // Insert the shortcut at its new position
            return {
              chatShortcuts: [
                ...newChatShortcuts.slice(0, newIndex),
                shortcut,
                ...newChatShortcuts.slice(newIndex),
              ],
              updatedAt: new Date().getTime(),
            };
          }),

        addAIModel: (model: AI_MODEL_TYPE) => {
          const isModelExist = get().aiModels.some((m) => m.MODEL === model.MODEL);
          if (isModelExist) return;
          set((state) => ({
            aiModels: [...state.aiModels, model],
            updatedAt: new Date().getTime(),
          }));
        },

        removeAIModel: (model: AI_MODEL_TYPE) => {
          set((state) => ({
            aiModels: state.aiModels.filter((m) => m.MODEL !== model.MODEL),
            updatedAt: new Date().getTime(),
          }));
        },

        moveAIModel: (model: AI_MODEL_TYPE, newIndex: number) => {
          set((state) => {
            const index = state.aiModels.findIndex((m) => m.MODEL === model.MODEL);
            if (index === -1) return state;
            const newAiModels = [...state.aiModels];
            newAiModels.splice(index, 1);
            newAiModels.splice(newIndex, 0, model);
            return {
              aiModels: newAiModels,
              updatedAt: new Date().getTime(),
            };
          });
        },

        clearOrSetUserPreferences: (initialState) =>
          set(initialState || initialUserPreferencesState),

        setUpdatedAtTo0: () => set({ updatedAt: 0 }),
      }),
      { name: 'user-preferences' }
    )
  )
);
