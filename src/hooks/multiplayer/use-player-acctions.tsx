'use client';

import { Character } from 'src/types/character';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { ChatMessage, Player } from 'src/types/multiplayer';
import { CODE_DONT_SHOW_IN_CHAT } from 'src/config/constants';
import {
  calcFailure,
  calcSuccess,
  generateDefultUserChatMessageInfo,
} from 'src/utils/gmai-utils-mp';

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
    joinGame: async function (storyId: string, character: Character) {
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
        const newMultiplayerInfo = {
          ...multiplayerGame,
          players: [...multiplayerGame.players, player],
        };
        setFireDoc('MULTIPLAYER_STORY', newMultiplayerInfo, storyId);
        setMultiplayerStory(newMultiplayerInfo);

        /**
         * Set User Current Game Info in Firebase and State
         */
        const userGame = await getFireDoc('USER_GAME');

        const currentMultiplayerGame = {
          storyId,
          storyName: multiplayerGame.storyName,
          player,
        };

        await setFireDoc('USER_GAME', {
          ...userGame,
          currentMultiplayerGame,
        });

        setUserCurrentMpGame(currentMultiplayerGame);
      }

      setIsMultiplayerLoading(false);
    },

    sendMessage: async function (msg: string, isInGameMsg: boolean, roll2d6Result?: number) {
      setIsMultiplayerLoading(true);

      if (!multiplayerStory || !userCurrentMpGame) return;

      const { player, storyId } = userCurrentMpGame;

      const msgAndData = isInGameMsg
        ? `(((Personaje ${player.character.name} dice:)))\n\n${msg}`
        : `(((Jugador ${player.userName} dice:)))\n\n${msg}`;

      const newContent: ChatMessage = {
        ...generateDefultUserChatMessageInfo(userCurrentMpGame),
        parts: [{ text: msgAndData }],
        isInGameMsg,
      };

      const { content, totalDiceRolls, totalSuccesses, totalFailures } = multiplayerStory;
      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          content: [...content, newContent],
          totalDiceRolls: roll2d6Result ? totalDiceRolls + 1 : totalDiceRolls,
          totalSuccesses: calcSuccess(totalSuccesses, roll2d6Result),
          totalFailures: calcFailure(totalFailures, roll2d6Result),
        },
        storyId
      );

      setIsMultiplayerLoading(false);
    },

    setIsReadyForAiResponse: async function (isRedyForAiResponse: boolean) {
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

    startGame: async function () {
      setIsMultiplayerLoading(true);

      if (!multiplayerStory || !userCurrentMpGame) return;
      const { aiRole, players, storyDescription } = multiplayerStory;

      const allPlayersAreRedy = multiplayerStory.players.map((p) => ({
        ...p,
        isRedyForAiResponse: true,
      }));

      const characters = multiplayerStory.players.map((p) => p.character);
      const charactersInfo = `(((Información de los personajes: ${JSON.stringify(characters)}
            ${CODE_DONT_SHOW_IN_CHAT})))`;
      const storyInfo = `(((Crea la introducción a esta historia (Paso 4): ${storyDescription}. Y crea una situación y opciones (Paso 5). ${CODE_DONT_SHOW_IN_CHAT})))`;

      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          players: aiRole === 'Game Master' ? allPlayersAreRedy : players,
          content: [
            {
              ...generateDefultUserChatMessageInfo(userCurrentMpGame),
              parts: [{ text: charactersInfo }, { text: storyInfo }],
              isInGameMsg: true,
            },
          ],
          isStoryStarted: true,
        },
        multiplayerStory.storyId
      );

      setIsMultiplayerLoading(false);
    },
  };
}
