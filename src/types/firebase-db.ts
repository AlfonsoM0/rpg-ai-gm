import { Character } from './character';
import { Book } from './library';

export type UserAccount = {
  id: string;
  name: string;
  updatedAt: number;
};

export type UserPreferences = {
  theme: string;
  chatShortcuts: string[];
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
