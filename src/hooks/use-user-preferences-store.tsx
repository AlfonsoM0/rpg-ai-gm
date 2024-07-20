import { UserPreferences } from 'types/firebase-db';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserPreferencesActions {
  setTheme: (theme: string) => void;

  addChatShortcut: (shortcut: string) => void;
  removeChatShortcut: (shortcut: string) => void;
  moveChatShortcut: (shortcut: string, newIndex: number) => void;

  clearOrSetUserPreferences: (initialState?: UserPreferences) => void;
  setUpdatedAtTo0: () => void;
}

const initialUserPreferencesState: UserPreferences = {
  theme: 'light',

  chatShortcuts: [],

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

        clearOrSetUserPreferences: (initialState) =>
          set(initialState || initialUserPreferencesState),

        setUpdatedAtTo0: () => set({ updatedAt: 0 }),
      }),
      { name: 'user-preferences' }
    )
  )
);
