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
  getDocs,
  collection,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
  // collection,
  // initializeFirestore,
  // persistentLocalCache,
  // DocumentData,
} from 'firebase/firestore';
import { CollectionType, CollectionName, UserAccount, UserAccuntPartial } from 'types/firebase-db';

interface FirebaseStore {
  fireApp: FirebaseApp | null;
  fireAuth: Auth | null;
  fireDB: Firestore | null;
  providerGoogle: GoogleAuthProvider | null;
  user: User | null;
  userAccount: UserAccount | null;

  isFireLoading: boolean;
  fireErrorMsg: string;
}

interface FirebaseActions {
  initializeFirebaseApp: () => Promise<void>;

  // Auth
  handleSignInWithGooglePopup: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  setObserverUser: () => Unsubscribe | undefined;
  updateUserProfile: (userAccount: UserAccuntPartial) => Promise<void>;

  // Database
  setFireDoc: <T extends CollectionName>(
    collectionName: T,
    data: CollectionType<T>,
    docId?: string
  ) => Promise<void>;

  getFireDoc: <T extends CollectionName>(
    collectionName: T,
    docId?: string
  ) => Promise<CollectionType<T> | undefined | false>;

  getAllFireDocs: <T extends CollectionName>(
    collectionName: T
  ) => Promise<CollectionType<T>[] | undefined | false>;

  observeFireDoc: (
    collectionName: CollectionName,
    cb: (doc: DocumentSnapshot<DocumentData, DocumentData>) => void,
    docId?: string
  ) => Unsubscribe | undefined;
}

const initialFirebaseState: FirebaseStore = {
  fireApp: null,
  fireAuth: null,
  fireDB: null,
  providerGoogle: null,
  user: null,
  userAccount: null,

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
      if (fireAuth) await signOut(fireAuth);
      set({ user: null, isFireLoading: false });
    } catch (error) {
      console.error('handleSignOut => ', error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al cerrar sesión.' });
    }
  },

  setObserverUser: () => {
    const { fireAuth, getFireDoc, setFireDoc } = get();

    if (fireAuth) {
      const unsubscribe = onAuthStateChanged(fireAuth, async (user) => {
        if (user) {
          set({ user });

          const userAccount = await getFireDoc('USER_ACCOUNT');

          if (userAccount) set({ userAccount });
          else if (typeof userAccount === 'undefined') {
            const time = new Date().getTime();
            const newUserAccount: UserAccount = {
              id: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              createdAt: time,
              updatedAt: time,

              age: 0,
              gender: '',
              location: '',
              isSubscribed: false,
              suscriptionBeginsAt: 0,
              suscriptionExpiresAt: 0,
            };
            await setFireDoc('USER_ACCOUNT', newUserAccount);
            set({ userAccount: newUserAccount });
          } else
            set({
              user: null,
              userAccount: null,
              fireErrorMsg: 'Error al obtener la cuenta de usuario.',
            });
        } else {
          set({ user: null, userAccount: null });
        }
      });

      return unsubscribe;
    }
  },

  updateUserProfile: async (newUserInfo) => {
    const { user, userAccount, setFireDoc } = get();
    set({ isFireLoading: true, fireErrorMsg: '' });

    try {
      if (user && (newUserInfo.displayName || newUserInfo.photoURL))
        await updateProfile(user, {
          displayName: newUserInfo.displayName || user.displayName,
          photoURL: newUserInfo.photoURL || user.photoURL,
        });

      if (userAccount) {
        const newUserAcc = { ...userAccount, ...newUserInfo };
        await setFireDoc('USER_ACCOUNT', newUserAcc);
        set({ userAccount: newUserAcc });
      }

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

  setFireDoc: async (collectionName, data, docId) => {
    const { fireDB, user } = get();
    const id = docId || user?.uid;
    set({ isFireLoading: true, fireErrorMsg: '' });

    try {
      if (fireDB && id) await setDoc(doc(fireDB, collectionName, id), data);
      set({ isFireLoading: false });
    } catch (error) {
      console.error(`setFireDoc/ ${collectionName} => `, error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al guardar en la base de datos.' });
    }
  },

  // @returns Collection from Firebase, undefined if no data, false if error.
  getFireDoc: async (collectionName, docId) => {
    const { fireDB, user } = get();
    const id = docId || user?.uid;
    set({ isFireLoading: true, fireErrorMsg: '' });

    try {
      if (fireDB && id) {
        const documentSnapshot = await getDoc(doc(fireDB, collectionName, id));
        const data = documentSnapshot.data();

        set({ isFireLoading: false });
        return data as CollectionType<typeof collectionName> | undefined;
      }
    } catch (error) {
      console.error(`getFireDoc/ ${collectionName} =>`, error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al obtener de la base de datos.' });
      return false;
    }
  },

  getAllFireDocs: async (collectionName) => {
    const { fireDB } = get();
    set({ isFireLoading: true, fireErrorMsg: '' });

    try {
      if (fireDB) {
        const res = await getDocs(collection(fireDB, collectionName));
        const data = res.docs.map((doc) => doc.data());

        set({ isFireLoading: false });
        return data as CollectionType<typeof collectionName>[] | undefined;
      }
    } catch (error) {
      console.error(`getAllFireDocs/ ${collectionName} =>`, error);
      set({ isFireLoading: false, fireErrorMsg: 'Error al obtener de la base de datos.' });
      return false;
    }
  },

  observeFireDoc: (collectionName, cb, docId) => {
    const { fireDB, user } = get();
    const id = docId || user?.uid;

    try {
      if (fireDB && id) {
        const unsub = onSnapshot(doc(fireDB, collectionName, id), cb);
        return () => unsub();
      }
    } catch (error) {
      console.error(`observeFireDoc/ ${collectionName} => `, error);
    }
  },
}));

export default useFirebase;
