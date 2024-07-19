/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import useSyncStorageAndFirebase from './use-sync-storage-firebase';
import { useCharacterStore } from 'hooks/use-character-store';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { Unsubscribe } from 'firebase/firestore';
import useFirebase from '.';

export default function useFirebaseAutoSync() {
  const sync = useSyncStorageAndFirebase();

  const { user } = useFirebase();
  const { charactersCollection } = useCharacterStore();
  const { chatShortcuts, theme } = useUserPreferencesStore();
  const { library } = useLibraryStore();

  // 1. From Firebase to Storage. User Login activate sync.
  // See "user-button-connect.tsx"

  // 2. From Storage to Firebase: On Changes, sync.
  useEffect(() => {
    if (sync) {
      sync.uploadFireDB.userAccount();
    }
  }, [user]);

  useEffect(() => {
    if (sync) {
      sync.uploadFireDB.userCharacters();
    }
  }, [charactersCollection]);

  useEffect(() => {
    if (sync) {
      sync.uploadFireDB.userPreferences();
    }
  }, [chatShortcuts, theme]);

  useEffect(() => {
    if (sync) {
      sync.uploadFireDB.userLibrary();
    }
  }, [library]);

  // 3. OBSERVERS: Listen to changes in Firebase and update local storage.
  useEffect(() => {
    let unsusbscribe_userCharacters: Unsubscribe | undefined;
    let unsusbscribe_userPreferences: Unsubscribe | undefined;
    let unsusbscribe_userLibrary: Unsubscribe | undefined;

    if (sync) {
      unsusbscribe_userCharacters = sync.observeFireDB.userCharacters();
      unsusbscribe_userPreferences = sync.observeFireDB.userPreferences();
      unsusbscribe_userLibrary = sync.observeFireDB.userLibrary();
    }

    return () => {
      if (unsusbscribe_userCharacters) unsusbscribe_userCharacters();
      if (unsusbscribe_userPreferences) unsusbscribe_userPreferences();
      if (unsusbscribe_userLibrary) unsusbscribe_userLibrary();
    };
  }, []);
}
