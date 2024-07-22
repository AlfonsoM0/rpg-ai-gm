import { Character } from './character';
import { Book } from './library';

export type UserAccount = {
  // Basic user information from the Firebase Authentication system.
  id: string;
  name: string;
  email: string;
  photoURL: string;

  // Additional user data
  age?: number;
  gender?: string;
  location?: string;
  isSubscribed?: boolean;
  suscriptionBeginsAt?: number; // for premium users only
  suscriptionExpiresAt?: number; // For premium users only

  // Timestamps for tracking account activity
  createdAt: number;
  updatedAt: number;
};

export type UserPreferences = {
  theme: string;
  chatShortcuts: string[];
  // language?: string;
  updatedAt: number;
};

export type UserCharacters = {
  charactersCollection: Character[];
  updatedAt: number;
};

export type UserLibrary = {
  library: Book[];
  updatedAt: number;
};

export enum CollectionName {
  USER_ACCOUNT = 'USER_ACCOUNT',
  USER_PREFERENCES = 'USER_PREFERENCES',
  USER_CHARACTERS = 'USER_CHARACTERS',
  USER_LIBRARY = 'USER_LIBRARY',
}

export type CollectionType<T> = T extends CollectionName.USER_ACCOUNT
  ? UserAccount
  : T extends CollectionName.USER_PREFERENCES
  ? UserPreferences
  : T extends CollectionName.USER_CHARACTERS
  ? UserCharacters
  : UserLibrary;

export type Collections = UserAccount | UserPreferences | UserCharacters | UserLibrary;
