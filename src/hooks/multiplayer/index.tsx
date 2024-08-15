import useCreateMultiplayer from './use-create-multiplayer';
import useSetMultiplayerObserver from './use-set-multiplayer-observer';
import usePlayerAcctions from './use-player-acctions';
import { MultiplayerStory } from 'src/types/multiplayer';
import { UserAccount } from 'src/types/firebase-db';
import { create } from 'zustand';

interface MultiplayerState {
  userCurrentMpGame?: UserAccount['currentMultiplayerGame'];
  multiplayerStory?: MultiplayerStory;
  isMultiplayerLoading: boolean;
}

interface MultiplayerActions {
  setUserCurrentMpGame: (userCurrentMpGame?: UserAccount['currentMultiplayerGame']) => void;
  setMultiplayerStory: (multiplayerStory?: MultiplayerStory) => void;
  setIsMultiplayerLoading: (isMultiplayerLoading: boolean) => void;
}

const useMultiplayer = create<MultiplayerState & MultiplayerActions>((set, get) => ({
  userCurrentMpGame: undefined,
  multiplayerStory: undefined,
  isMultiplayerLoading: false,

  setMultiplayerStory: (multiplayerStory) => set({ multiplayerStory }),

  setUserCurrentMpGame: (userCurrentMpGame) => set({ userCurrentMpGame }),

  setIsMultiplayerLoading: (isMultiplayerLoading) => set({ isMultiplayerLoading }),
}));

export default useMultiplayer;

export { useCreateMultiplayer, useSetMultiplayerObserver, usePlayerAcctions };
