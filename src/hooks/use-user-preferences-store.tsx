import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserPreferencesStore {
  theme: string;
}

interface UserPreferencesActions {
  setTheme: (theme: string) => void;
}

export const useUserPreferencesStore = create<UserPreferencesStore & UserPreferencesActions>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'light',

        // Actions
        setTheme: (theme: string) => set({ theme }),
      }),
      { name: 'user-preferences' }
    )
  )
);
