import { Character } from './character';
import { Book } from './library';

type UserBasicInfo = {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;

  createdAt: number;
  updatedAt: number;
};

type UserAdditionalInfo = {
  age: number;
  gender: string;
  location: string;
  isSubscribed: boolean;
  suscriptionBeginsAt: number; // for premium users only
  suscriptionExpiresAt: number; // For premium users only
};

export type UserAccount = UserBasicInfo & UserAdditionalInfo;
export type UserAccuntPartial = Partial<Omit<UserAccount, 'id' | 'createdAt'>>;

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

export type CollectionName =
  | 'USER_ACCOUNT'
  | 'USER_PREFERENCES'
  | 'USER_CHARACTERS'
  | 'USER_LIBRARY';

export type CollectionType<T> = T extends 'USER_ACCOUNT'
  ? UserAccount
  : T extends 'USER_PREFERENCES'
  ? UserPreferences
  : T extends 'USER_CHARACTERS'
  ? UserCharacters
  : UserLibrary;

export type Collections = UserAccount | UserPreferences | UserCharacters | UserLibrary;