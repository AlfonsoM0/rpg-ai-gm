import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  Unsubscribe,
  browserPopupRedirectResolver,
} from 'firebase/auth';
import getFirebaseConfig from 'server/get-firebase-config';
import { AI_NAME_TO_SHOW } from 'config/constants';

interface FirebaseStore {
  fireApp: FirebaseApp | null;
  fireAuth: Auth | null;
  providerGoogle: GoogleAuthProvider | null;
  user: User | null;

  isFireLoading: boolean;
  fireErrorMsg: string;
}

interface FirebaseActions {
  initializeFirebaseApp: () => Promise<void>;
  handleSignInWithGooglePopup: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  setObserverUser: () => Unsubscribe | undefined;
  setUser: (user: User | null) => void;
  clearFirebaseStore: () => void;

  consoleLogAllState: () => void;
}

const initialFirebaseState: FirebaseStore = {
  fireApp: null,
  fireAuth: null,
  providerGoogle: null,
  user: null,

  isFireLoading: false,
  fireErrorMsg: '',
};

const useFirebase = create<FirebaseStore & FirebaseActions>()(
  // devtools(
  //   persist(

  (set, get) => ({
    ...initialFirebaseState,

    // Acctions
    initializeFirebaseApp: async () => {
      set({ isFireLoading: true, fireErrorMsg: '' });
      const { fireApp, fireAuth, providerGoogle } = get();
      const isFirebaseInitialized = !!(fireApp && fireAuth && providerGoogle);

      try {
        if (!isFirebaseInitialized) {
          const firebaseConfig = await getFirebaseConfig();

          if (firebaseConfig) {
            const fireApp = initializeApp(firebaseConfig, AI_NAME_TO_SHOW);
            const fireAuth = getAuth(fireApp);
            const providerGoogle = new GoogleAuthProvider();
            set({ fireApp, fireAuth, providerGoogle, isFireLoading: false });
          }
        }
      } catch (error) {
        console.error('initializeFirebaseApp => ', error);
        set({ isFireLoading: false, fireErrorMsg: 'Error al conectar con la base de datos.' });
      }
    },

    handleSignInWithGooglePopup: async () => {
      set({ isFireLoading: true, fireErrorMsg: '' });
      const { fireAuth, providerGoogle } = get();

      try {
        if (fireAuth && providerGoogle) {
          await signInWithPopup(fireAuth, providerGoogle);

          set({ isFireLoading: false });
        }
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

          get().setUser(null); // Clear the user state after signing out.
        }
        set({ isFireLoading: false });
      } catch (error) {
        console.error('handleSignOut => ', error);
        set({ isFireLoading: false, fireErrorMsg: 'Error al cerrar sesión.' });
      }
    },

    setObserverUser: () => {
      const { fireAuth, setUser } = get();
      if (fireAuth) {
        const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
          if (user) {
            setUser(user);
            console.info(user);
            // Additional actions here, such as fetching user data from Firestore?
          } else {
            setUser(null);
          }
        });

        return unsubscribe;
      }
    },

    setUser: (user) => set({ user }),

    clearFirebaseStore: () => set(initialFirebaseState),

    consoleLogAllState: () => {
      const { fireAuth, providerGoogle, isFireLoading, user, fireErrorMsg } = get();
      console.log('consoleLogAllState => ');
      console.log({ fireAuth, providerGoogle, isFireLoading, user, fireErrorMsg });
    },
  })

  //     { name: 'firebase-store' }
  //   )
  // )
);

export default useFirebase;
