import useCreateMultiplayer from './use-create-multiplayer';
import useSetMultiplayerObserver from './use-set-multiplayer-observer';
import usePlayerAcctions from './use-player-acctions';
import { MultiplayerStory } from 'src/types/multiplayer';
import { UserGame } from 'src/types/firebase-db';
import { create } from 'zustand';
import { Character } from 'src/types/character';

interface MultiplayerState {
  characterSelected?: Character;
  userCurrentMpGame?: UserGame['currentMultiplayerGame'];
  multiplayerStory?: MultiplayerStory;
  isMultiplayerLoading: boolean;
}

interface MultiplayerActions {
  setCharacterSelected: (character?: Character) => void;
  setUserCurrentMpGame: (userCurrentMpGame?: UserGame['currentMultiplayerGame']) => void;
  setMultiplayerStory: (multiplayerStory?: MultiplayerStory) => void;
  setIsMultiplayerLoading: (isMultiplayerLoading: boolean) => void;
  clearMultiplayerState: () => void;
}

const initialMultiplayerState: MultiplayerState = {
  characterSelected: undefined,
  userCurrentMpGame: undefined,
  multiplayerStory: undefined,
  isMultiplayerLoading: false,
};

const useMultiplayer = create<MultiplayerState & MultiplayerActions>((set, get) => ({
  ...initialMultiplayerState,

  // Actions
  setCharacterSelected: (characterSelected) => set({ characterSelected }),

  setMultiplayerStory: (multiplayerStory) => set({ multiplayerStory }),

  setUserCurrentMpGame: (userCurrentMpGame) => set({ userCurrentMpGame }),

  setIsMultiplayerLoading: (isMultiplayerLoading) => set({ isMultiplayerLoading }),

  clearMultiplayerState: () => set(initialMultiplayerState),
}));

export default useMultiplayer;

export { useCreateMultiplayer, useSetMultiplayerObserver, usePlayerAcctions };
