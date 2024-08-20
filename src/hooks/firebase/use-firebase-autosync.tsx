/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import useSyncStorageAndFirebase from './use-sync-storage-firebase';
import { useCharacterStore } from 'hooks/use-character-store';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { Unsubscribe } from 'firebase/firestore';
import useFirebase from '.';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Syncs the data between Firebase and local storage using a debounced callback.
 */
export default function useFirebaseAutoSync() {
  const sync = useSyncStorageAndFirebase();

  const { user } = useFirebase();
  const { charactersCollection } = useCharacterStore();
  const { chatShortcuts, theme } = useUserPreferencesStore();
  const { library, multiplayerLibrary } = useLibraryStore();

  // 1. From Firebase to Storage. User Login activate sync.
  useEffect(() => {
    if (sync) {
      sync.downloadFireDB.userCharacters();
      sync.downloadFireDB.userPreferences();
      sync.downloadFireDB.userLibrary();
    }
  }, [user]);

  // 2. From Storage to Firebase: On Changes, sync.
  // Debounce to prevent multiple uploads in a short time frame.
  const dT = 10000; // 10 seconds of debounce time.

  // userAccount: made by updateUserProfile

  const debounceCharacters = useDebouncedCallback(() => {
    if (sync) sync.uploadFireDB.userCharacters();
  }, dT);
  useEffect(() => {
    debounceCharacters();
  }, [charactersCollection]);

  const debouncePreferences = useDebouncedCallback(() => {
    if (sync) sync.uploadFireDB.userPreferences();
  }, dT);
  useEffect(() => {
    debouncePreferences();
  }, [chatShortcuts, theme]);

  const debounceLibrary = useDebouncedCallback(() => {
    if (sync) sync.uploadFireDB.userLibrary();
  }, dT);
  useEffect(() => {
    debounceLibrary();
  }, [library, multiplayerLibrary]);

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
  }, [user]);
}
