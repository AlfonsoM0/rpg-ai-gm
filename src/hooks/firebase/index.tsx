import { create } from 'zustand';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  Unsubscribe,
  updateProfile,
  // signInWithRedirect,
  // getRedirectResult,
  // browserPopupRedirectResolver,
} from 'firebase/auth';
import getFirebaseConfig from 'server/get-firebase-config';
import { AI_NAME_TO_SHOW } from 'config/constants';
import {
  setDoc,
  Firestore,
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
  // collection,
  // initializeFirestore,
  // persistentLocalCache,
  // DocumentData,
} from 'firebase/firestore';
import { CollectionType, CollectionName } from 'types/firebase-db';

interface FirebaseStore {
  fireApp: FirebaseApp | null;
  fireAuth: Auth | null;
  fireDB: Firestore | null;
  providerGoogle: GoogleAuthProvider | null;
  user: User | null;

  isFireLoading: boolean;
  fireErrorMsg: string;
}

interface FirebaseActions {
  initializeFirebaseApp: () => Promise<void>;

  // Auth
  handleSignInWithGooglePopup: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  setObserverUser: () => Unsubscribe | undefined;
  updateUserProfile: ({
    displayName,
    photoURL,
  }: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;

  // Database
  setFireDoc: <T extends CollectionName>(
    collectionName: T,
    data: CollectionType<T>
  ) => Promise<void>;
  getFireDoc: <T extends CollectionName>(
    collectionName: T
  ) => Promise<CollectionType<T> | undefined>;
  observeFireDoc: (
    collectionName: CollectionName,
    cb: (doc: DocumentSnapshot<DocumentData, DocumentData>) => void
  ) => Unsubscribe | undefined;
}

const initialFirebaseState: FirebaseStore = {
  fireApp: null,
  fireAuth: null,
  fireDB: null,
  providerGoogle: null,
  user: null,

  isFireLoading: false,
  fireErrorMsg: '',
};

const useFirebase = create<FirebaseStore & FirebaseActions>()((set, get) => ({
  ...initialFirebaseState,

  // Acctions
  initializeFirebaseApp: async () => {
    set({ isFireLoading: true, fireErrorMsg: '' });
    const { fireApp, fireAuth, providerGoogle, fireDB } = get();
    const isFirebaseInitialized = !!(fireApp && fireAuth && providerGoogle && fireDB);

    try {
      const firebaseConfig = await getFirebaseConfig();

      if (!isFirebaseInitialized && firebaseConfig) {
        const fireApp = initializeApp(firebaseConfig, AI_NAME_TO_SHOW);
        const fireAuth = getAuth(fireApp);
        const fireDB = getFirestore(fireApp);
        const providerGoogle = new GoogleAuthProvider();

        set({ fireApp, fireAuth, fireDB, providerGoogle });
      }

      set({ isFireLoading: false });
    } catch (error) {
      console.error('initializeFirebaseApp => ', error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al conectar con la base de datos.' });
    }
  },

  /**
   *
   * AUTHENTICATION
   *
   */

  handleSignInWithGooglePopup: async () => {
    set({ isFireLoading: true, fireErrorMsg: '' });
    const { fireAuth, providerGoogle } = get();

    try {
      if (fireAuth && providerGoogle) await signInWithPopup(fireAuth, providerGoogle);
      else set({ fireErrorMsg: 'Error al conectar con la base de datos.' });

      set({ isFireLoading: false });
    } catch (error) {
      console.error('handleSignInWithGoogle => ', error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al autenticar con Google.' });
    }
  },

  handleSignOut: async () => {
    set({ isFireLoading: true, fireErrorMsg: '' });
    const { fireAuth } = get();

    try {
      if (fireAuth) {
        await signOut(fireAuth);

        set({ user: null });
      } else set({ fireErrorMsg: 'Error al conectar con la base de datos.' });

      set({ isFireLoading: false });
    } catch (error) {
      console.error('handleSignOut => ', error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al cerrar sesión.' });
    }
  },

  setObserverUser: () => {
    const { fireAuth } = get();
    if (fireAuth) {
      const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
        if (user) {
          set({ user });
          // Additional actions here, such as fetching user data from Firestore?
        } else {
          set({ user: null });
        }
      });

      return unsubscribe;
    }
  },

  updateUserProfile: async ({ displayName, photoURL }) => {
    const { fireAuth, user } = get();
    set({ isFireLoading: true, fireErrorMsg: '' });

    try {
      if (fireAuth && user)
        await updateProfile(user, {
          displayName: displayName || user.displayName,
          photoURL: photoURL || user.photoURL,
        });

      set({ isFireLoading: false });
    } catch (error) {
      console.error(`updateUserProfile/ User => `, error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al conectar con la base de datos.' });
    }
  },

  /**
   *
   * FIREBASE DATABASE
   *
   */

  setFireDoc: async (collectionName, data) => {
    const { fireDB, user } = get();
    set({ isFireLoading: true, fireErrorMsg: '' });

    try {
      if (fireDB && user?.uid) await setDoc(doc(fireDB, collectionName, user.uid), data);
      set({ isFireLoading: false });
    } catch (error) {
      console.error(`setFireDoc/ ${collectionName} => `, error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al guardar en la base de datos.' });
    }
  },

  getFireDoc: async (collectionName) => {
    const { fireDB, user } = get();
    set({ isFireLoading: true, fireErrorMsg: '' });

    try {
      if (fireDB && user?.uid) {
        const documentSnapshot = await getDoc(doc(fireDB, collectionName, user.uid));
        const data = documentSnapshot.data();

        set({ isFireLoading: false });
        return data as CollectionType<typeof collectionName> | undefined;
      }
    } catch (error) {
      console.error(`getFireDoc/ ${collectionName} =>`, error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al obtener de la base de datos.' });
    }
  },

  observeFireDoc: (collectionName, cb) => {
    const { fireDB, user } = get();

    try {
      if (fireDB && user?.uid) {
        const unsub = onSnapshot(doc(fireDB, collectionName, user.uid), cb);
        return () => unsub();
      }
    } catch (error) {
      console.error(`observeFireDoc/ ${collectionName} => `, error);
    }
  },
}));

export default useFirebase;
