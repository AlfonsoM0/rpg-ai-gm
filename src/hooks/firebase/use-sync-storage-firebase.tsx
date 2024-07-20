/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';
import useFirebase from '.';
import { useCharacterStore } from 'hooks/use-character-store';
import { useLibraryStore } from 'hooks/use-library-store';
import {
  CollectionName as CN,
  UserCharacters,
  UserLibrary,
  UserPreferences,
} from 'types/firebase-db';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

export default function useSyncStorageAndFirebase() {
  const { user, setFireDoc, getFireDoc, observeFireDoc } = useFirebase();

  const {
    theme,
    chatShortcuts,
    clearOrSetUserPreferences,
    updatedAt: uAtUserPref,
  } = useUserPreferencesStore();

  const { charactersCollection, setCharactersCollection, updatedAt: uAtChar } = useCharacterStore();

  const { library, setLibrary, updatedAt: uAtLib } = useLibraryStore();

  if (user)
    return {
      downloadFireDB: {
        userAccount: async () => {
          const userAccount = await getFireDoc(CN.USER_ACCOUNT);
          return userAccount;
        },

        // Firebase to Storage
        userPreferences: async () => {
          const res = await getFireDoc(CN.USER_PREFERENCES);
          if (res && res.updatedAt > uAtUserPref) clearOrSetUserPreferences(res);
        },

        userCharacters: async () => {
          const res = await getFireDoc(CN.USER_CHARACTERS);
          if (res && res.updatedAt > uAtChar) setCharactersCollection(res);
        },

        userLibrary: async () => {
          const res = await getFireDoc(CN.USER_LIBRARY);
          if (res && res.updatedAt > uAtLib) setLibrary(res);
        },
      },

      uploadFireDB: {
        userAccount: () => {
          setFireDoc(CN.USER_ACCOUNT, {
            id: user.uid,
            name: user.displayName || '',
            updatedAt: new Date().getTime(),
          });
        },

        // Storage to Firebase
        userPreferences: async () => {
          const currentFireDoc = await getFireDoc(CN.USER_PREFERENCES);

          if (currentFireDoc && currentFireDoc.updatedAt < uAtUserPref)
            setFireDoc(CN.USER_PREFERENCES, { theme, chatShortcuts, updatedAt: uAtUserPref });
        },

        userCharacters: async () => {
          const currentFireDoc = await getFireDoc(CN.USER_CHARACTERS);

          if (currentFireDoc && currentFireDoc.updatedAt < uAtChar)
            setFireDoc(CN.USER_CHARACTERS, { charactersCollection, updatedAt: uAtChar });
        },

        userLibrary: async () => {
          const currentFireDoc = await getFireDoc(CN.USER_LIBRARY);

          if (currentFireDoc && currentFireDoc.updatedAt < uAtLib)
            setFireDoc(CN.USER_LIBRARY, { library, updatedAt: uAtLib });
        },
      },

      observeFireDB: {
        userPreferences: () => {
          function cb(doc: DocumentSnapshot<DocumentData, DocumentData>) {
            const res = doc.data() as UserPreferences | undefined;
            if (res && res.updatedAt > uAtUserPref) clearOrSetUserPreferences(res);
          }

          return observeFireDoc(CN.USER_PREFERENCES, cb);
        },

        userCharacters: () => {
          function cb(doc: DocumentSnapshot<DocumentData, DocumentData>) {
            const res = doc.data() as UserCharacters | undefined;
            if (res && res.updatedAt > uAtChar) setCharactersCollection(res);
          }

          return observeFireDoc(CN.USER_CHARACTERS, cb);
        },

        userLibrary: () => {
          function cb(doc: DocumentSnapshot<DocumentData, DocumentData>) {
            const res = doc.data() as UserLibrary | undefined;
            if (res && res.updatedAt > uAtLib) setLibrary(res);
          }

          return observeFireDoc(CN.USER_LIBRARY, cb);
        },
      },
    };

  return null;
}
