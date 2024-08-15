'use client';

import { Character } from 'src/types/character';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { ChatMessage, Player } from 'src/types/multiplayer';
import { AI_ROLE } from 'src/config/constants';

export default function usePlayerAcctions() {
  const { userCurrentMpGame, multiplayerStory, setMultiplayerStory, setUserCurrentMpGame } =
    useMultiplayer();
  const { user, getFireDoc, setFireDoc } = useFirebase();

  return {
    joinGame: async (storyId: string, character: Character) => {
      const player = {
        userId: user?.uid || '',
        userName: user?.displayName || '',
        avatarSrc: user?.photoURL || undefined,
        avatarAlt: user?.displayName ? `${user.displayName} avatar` : 'Player avatar',
        character,
        isRedyForAiResponse: false,
      };

      /**
       * Set New Multiplayer Game in Firebase and State
       */
      const multiplayerGame = await getFireDoc('MULTIPLAYER_STORY', storyId);

      if (multiplayerGame) {
        setFireDoc(
          'MULTIPLAYER_STORY',
          {
            ...multiplayerGame,
            players: [...multiplayerGame.players, player],
          },
          storyId
        );

        setMultiplayerStory(multiplayerGame);

        /**
         * Set User Current Game Info in Firebase and State
         */
        const account = await getFireDoc('USER_ACCOUNT');

        const currentMultiplayerGame = {
          storyId,
          storyName: multiplayerGame.storyName,
          player,
        };

        if (account) {
          await setFireDoc('USER_ACCOUNT', {
            ...account,
            currentMultiplayerGame,
          });

          setUserCurrentMpGame(currentMultiplayerGame);
        }
      }
    },

    sendMessage: async (msg: string, isInGameMsg: boolean) => {
      if (!multiplayerStory || !userCurrentMpGame) return;

      const { player, storyId } = userCurrentMpGame;

      const newContent: ChatMessage = {
        role: AI_ROLE.USER,
        parts: [{ text: msg }],
        userName: player.userName,
        charName: player.character.name,

        userAvatarSrc: player.avatarSrc,
        userAvatarAlt: player.avatarAlt,
        charAvatarSrc: undefined,
        charAvatarAlt: undefined,

        isInGameMsg,
      };

      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          content: [...multiplayerStory.content, newContent],
        },
        storyId
      );
    },

    setIsReadyForAiResponse: (isRedyForAiResponse: boolean) => {
      if (!multiplayerStory || !userCurrentMpGame) return;

      const {
        player: { userId },
      } = userCurrentMpGame;
      const { players, storyId } = multiplayerStory;

      const newPlayersConfig: Player[] = players.map((player) => {
        if (player.userId === userId) {
          return {
            ...player,
            isRedyForAiResponse,
          };
        }

        return player;
      });

      setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          players: newPlayersConfig,
        },
        storyId
      );
    },

    startGame: () => {
      if (!multiplayerStory || !userCurrentMpGame) return;

      setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          isStoryStarted: true,
        },
        multiplayerStory.storyId
      );
    },
  };
}
