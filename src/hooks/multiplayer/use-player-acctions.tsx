'use client';

import { Character } from 'src/types/character';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { ChatMessage, Player } from 'src/types/multiplayer';
import { AI_ROLE } from 'src/config/constants';

export default function usePlayerAcctions() {
  const {
    userCurrentMpGame,
    multiplayerStory,
    setMultiplayerStory,
    setUserCurrentMpGame,
    setIsMultiplayerLoading,
  } = useMultiplayer();
  const { user, getFireDoc, setFireDoc } = useFirebase();

  return {
    joinGame: async (storyId: string, character: Character) => {
      setIsMultiplayerLoading(true);

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
        const userGame = await getFireDoc('USER_GAME');

        const currentMultiplayerGame = {
          storyId,
          storyName: multiplayerGame.storyName,
          player,
        };

        if (userGame) {
          await setFireDoc('USER_GAME', {
            ...userGame,
            currentMultiplayerGame,
          });

          setUserCurrentMpGame(currentMultiplayerGame);
        }
      }

      setIsMultiplayerLoading(false);
    },

    sendMessage: async (msg: string, isInGameMsg: boolean) => {
      setIsMultiplayerLoading(true);

      if (!multiplayerStory || !userCurrentMpGame) return;

      const { player, storyId } = userCurrentMpGame;

      const msgAndData = isInGameMsg
        ? `(((Personaje ${player.character.name} dice:)))\n\n${msg}`
        : `(((Jugador ${player.userName} dice:)))\n\n${msg}`;

      const newContent: ChatMessage = {
        id: crypto.randomUUID(),
        role: AI_ROLE.USER,
        parts: [{ text: msgAndData }],
        userName: player.userName,
        userId: player.userId,
        charName: player.character.name,
        charId: player.character.id,

        userAvatarSrc: player.avatarSrc,
        userAvatarAlt: player.avatarAlt,
        charAvatarSrc: player.avatarSrc, //TODO: change
        charAvatarAlt: `${player.character.name} Avatar`, //TODO: change

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

      setIsMultiplayerLoading(false);
    },

    setIsReadyForAiResponse: async (isRedyForAiResponse: boolean) => {
      setIsMultiplayerLoading(true);

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

      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          players: newPlayersConfig,
        },
        storyId
      );

      setIsMultiplayerLoading(false);
    },

    startGame: async () => {
      setIsMultiplayerLoading(true);

      if (!multiplayerStory || !userCurrentMpGame) return;

      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          isStoryStarted: true,
        },
        multiplayerStory.storyId
      );

      setIsMultiplayerLoading(false);
    },
  };
}
