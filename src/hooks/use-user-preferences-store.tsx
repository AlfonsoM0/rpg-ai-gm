import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserPreferencesStore {
  theme: string;

  chatShortcuts: string[];
}

interface UserPreferencesActions {
  setTheme: (theme: string) => void;

  addChatShortcut: (shortcut: string) => void;
  removeChatShortcut: (shortcut: string) => void;
  moveChatShortcut: (shortcut: string, newIndex: number) => void;
}

const initialUserPreferencesState: UserPreferencesStore = {
  theme: 'light',

  chatShortcuts: [],
};

export const useUserPreferencesStore = create<UserPreferencesStore & UserPreferencesActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialUserPreferencesState,

        // Actions
        setTheme: (theme: string) => set({ theme }),

        addChatShortcut: (shortcut: string) => {
          const isShortcutExist = get().chatShortcuts.includes(shortcut);
          if (isShortcutExist) return;

          set((state) => ({ chatShortcuts: [...state.chatShortcuts, shortcut] }));
        },

        removeChatShortcut: (shortcut: string) =>
          set((state) => ({ chatShortcuts: state.chatShortcuts.filter((s) => s !== shortcut) })),

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
            };
          }),
      }),
      { name: 'user-preferences' }
    )
  )
);
