import useCreateMultiplayer from './use-create-multiplayer';
import useSetMultiplayerObserver from './use-set-multiplayer-observer';
import usePlayerAcctions from './use-player-acctions';
import { MultiplayerStory } from 'src/types/multiplayer';
import { UserAccount } from 'src/types/firebase-db';
import { create } from 'zustand';

interface MultiplayerState {
  userCurrentMpGame?: UserAccount['currentMultiplayerGame'];
  multiplayerStory?: MultiplayerStory;
}

interface MultiplayerActions {
  setUserCurrentMpGame: (userCurrentMpGame?: UserAccount['currentMultiplayerGame']) => void;
  setMultiplayerStory: (multiplayerStory?: MultiplayerStory) => void;
}

const useMultiplayer = create<MultiplayerState & MultiplayerActions>((set, get) => ({
  userCurrentMpGame: undefined,
  multiplayerStory: undefined,

  setMultiplayerStory: (multiplayerStory) => set({ multiplayerStory }),

  setUserCurrentMpGame: (userCurrentMpGame) => set({ userCurrentMpGame }),
}));

export default useMultiplayer;

export { useCreateMultiplayer, useSetMultiplayerObserver, usePlayerAcctions };
