import { AI_NAME_TO_SHOW } from 'config/constants';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { CollectionName, CollectionType } from 'types/firebase-db';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const fireApp = initializeApp(firebaseConfig, AI_NAME_TO_SHOW);

const fireDB = getFirestore(fireApp);

/**
 *
 * @param collectionName
 * @param uid
 * @returns Promise<CollectionType<T> | undefined | false>
 */
export async function getFireDocSSR<T extends CollectionName>(
  collectionName: T,
  uid: string
): Promise<CollectionType<T> | undefined | false> {
  try {
    const documentSnapshot = await getDoc(doc(fireDB, collectionName, uid));
    const data = documentSnapshot.data();

    return data as CollectionType<typeof collectionName> | undefined;
  } catch (error) {
    console.error(`getFireDoc/ ${collectionName} =>`, error);
    return false;
  }
}
