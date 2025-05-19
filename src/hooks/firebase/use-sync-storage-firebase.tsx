/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import useFirebase from '.';
import { useCharacterStore } from 'hooks/use-character-store';
import { useLibraryStore } from 'hooks/use-library-store';
import {
  CollectionName as CN,
  UserAccount,
  UserCharacters,
  UserLibrary,
  UserPreferences,
} from 'types/firebase-db';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

/**
 * Syncs user preferences, library and characters with Firebase.
 * @returns Functions to sync user preferences, library and characters with Firebase.
 */
export default function useSyncStorageAndFirebase() {
  const { user, setFireDoc, getFireDoc, observeFireDoc } = useFirebase();

  const {
    theme,
    chatShortcuts,
    aiModels,
    clearOrSetUserPreferences,
    updatedAt: uAtUserPref,
  } = useUserPreferencesStore();

  const { charactersCollection, setCharactersCollection, updatedAt: uAtChar } = useCharacterStore();

  const { library, multiplayerLibrary, setLibrary, updatedAt: uAtLib } = useLibraryStore();

  if (user)
    return {
      downloadFireDB: {
        /*
          Downloads the user's data from Firebase and updates the local storage.
          If the data is not found, update Firebase with the local storage data.
          Firebase "updatedAt" should be greater than the local storage "updatedAt".
         */

        // userAccount: made by useFirebase()/ Auth observer

        // Firebase to Storage
        userPreferences: async () => {
          const currentFireDoc = await getFireDoc('USER_PREFERENCES');

          if (currentFireDoc && currentFireDoc.updatedAt > uAtUserPref)
            clearOrSetUserPreferences(currentFireDoc);
          else if (!currentFireDoc)
            setFireDoc('USER_PREFERENCES', {
              theme,
              chatShortcuts,
              aiModels,
              updatedAt: uAtUserPref,
            });
        },

        userCharacters: async () => {
          const currentFireDoc = await getFireDoc('USER_CHARACTERS');

          if (currentFireDoc && currentFireDoc.updatedAt > uAtChar)
            setCharactersCollection(currentFireDoc);
          else if (!currentFireDoc)
            setFireDoc('USER_CHARACTERS', { charactersCollection, updatedAt: uAtChar });
        },

        userLibrary: async () => {
          const currentFireDoc = await getFireDoc('USER_LIBRARY');

          if (currentFireDoc && currentFireDoc.updatedAt > uAtLib) setLibrary(currentFireDoc);
          else if (!currentFireDoc)
            setFireDoc('USER_LIBRARY', { library, multiplayerLibrary, updatedAt: uAtLib });
        },
      },

      uploadFireDB: {
        /*
          Uploads the local storage data to Firebase.
          If the data is not found in Firebase, upload it.
          Local storage "updatedAt" should be greater than the Firebase "updatedAt".
        */

        // userAccount: made by useFirebase()/ updateUserProfile

        userPreferences: async () => {
          const currentFireDoc = await getFireDoc('USER_PREFERENCES');

          if ((currentFireDoc && currentFireDoc.updatedAt < uAtUserPref) || !currentFireDoc)
            setFireDoc('USER_PREFERENCES', {
              theme,
              chatShortcuts,
              aiModels,
              updatedAt: uAtUserPref,
            });
        },

        userCharacters: async () => {
          const currentFireDoc = await getFireDoc('USER_CHARACTERS');

          if ((currentFireDoc && currentFireDoc.updatedAt < uAtChar) || !currentFireDoc)
            setFireDoc('USER_CHARACTERS', { charactersCollection, updatedAt: uAtChar });
        },

        userLibrary: async () => {
          const currentFireDoc = await getFireDoc('USER_LIBRARY');

          if ((currentFireDoc && currentFireDoc.updatedAt < uAtLib) || !currentFireDoc)
            setFireDoc('USER_LIBRARY', { library, multiplayerLibrary, updatedAt: uAtLib });
        },
      },

      observeFireDB: {
        /*
          Observe Firebase data and update local storage accordingly.
        */

        // userAccount: made by useFirebase()/ Auth observer

        userPreferences: () => {
          function cb(doc: DocumentSnapshot<DocumentData, DocumentData>) {
            const res = doc.data() as UserPreferences | undefined;
            if (res && res.updatedAt > uAtUserPref) clearOrSetUserPreferences(res);
          }

          return observeFireDoc('USER_PREFERENCES', cb);
        },

        userCharacters: () => {
          function cb(doc: DocumentSnapshot<DocumentData, DocumentData>) {
            const res = doc.data() as UserCharacters | undefined;
            if (res && res.updatedAt > uAtChar) setCharactersCollection(res);
          }

          return observeFireDoc('USER_CHARACTERS', cb);
        },

        userLibrary: () => {
          function cb(doc: DocumentSnapshot<DocumentData, DocumentData>) {
            const res = doc.data() as UserLibrary | undefined;
            if (res && res.updatedAt > uAtLib) setLibrary(res);
          }

          return observeFireDoc('USER_LIBRARY', cb);
        },
      },
    };

  return null;
}
