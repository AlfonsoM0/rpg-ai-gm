import { create } from 'zustand';
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
  updateProfile,
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
  consoleLogAllState: () => void;

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

    consoleLogAllState: () => {
      const { fireAuth, providerGoogle, isFireLoading, user, fireErrorMsg } = get();
      console.log('consoleLogAllState => ');
      console.log({ fireAuth, providerGoogle, isFireLoading, user, fireErrorMsg });
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

          set({ user: null });
        }
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
            console.info(user);
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

      if (fireAuth && user) {
        set({ isFireLoading: true, fireErrorMsg: '' });

        await updateProfile(user, {
          displayName: displayName || user.displayName,
          photoURL: photoURL || user.photoURL,
        });
        set({ isFireLoading: false });
      }
    },
  })

  /**
   *
   *
   *
   */
);

export default useFirebase;
