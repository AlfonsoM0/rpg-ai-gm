'use client';

import { Character } from 'src/types/character';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { ChatMessage, MultiplayerStory, Player } from 'src/types/multiplayer';
import {
  CODE_CHARACTERS_CHANGE,
  CODE_DONT_SHOW_IN_CHAT,
  CODE_STORY_END,
} from 'src/config/constants';
import {
  calcFailure,
  calcSuccess,
  calculateStoryXpMp,
  generateDefultAiChatMessageInfo,
  generateDefultUserChatMessageInfo,
} from 'src/utils/gmai-utils-mp';
import { AiModels } from 'src/utils/generate-ai-config';

export default function usePlayerAcctions() {
  const {
    userCurrentMpGame,
    multiplayerStory,
    setMultiplayerStory,
    setUserCurrentMpGame,
    setIsMultiplayerLoading,
    clearMultiplayerState,
  } = useMultiplayer();
  const { user, getFireDoc, setFireDoc, deleteFireDoc } = useFirebase();

  return {
    joinGame: async (multiplayerStory: MultiplayerStory, character: Character) => {
      setIsMultiplayerLoading(true);

      const { storyId, storyName } = multiplayerStory;

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
      if (multiplayerStory) {
        const newMultiplayerInfo = {
          ...multiplayerStory,
          players: [...multiplayerStory.players, player],
        };
        setFireDoc('MULTIPLAYER_STORY', newMultiplayerInfo, storyId);
        setMultiplayerStory(newMultiplayerInfo);

        /**
         * Set User Current Game Info in Firebase and State
         */
        const userGame = await getFireDoc('USER_GAME');

        const currentMultiplayerGame = {
          storyId,
          storyName,
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

    sendMessage: async (msg: string, isInGameMsg: boolean, roll2d6Result?: number) => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      setIsMultiplayerLoading(true);

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

    setIsReadyForAiResponse: async (isRedyForAiResponse: boolean) => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      setIsMultiplayerLoading(true);

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
      if (!multiplayerStory || !userCurrentMpGame) return;
      setIsMultiplayerLoading(true);

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

    endGame: async () => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      setIsMultiplayerLoading(true);

      const { totalFailures, totalSuccesses, content, players } = multiplayerStory;
      const totalXp = calculateStoryXpMp(multiplayerStory);
      const gameInfoJson = JSON.stringify({ totalSuccesses, totalFailures, totalXp });

      // create End Story Prompt
      const storyEndPrompt = `(((${CODE_STORY_END}
        ## Información del sistema de juego (no mostrar en chat):
        ${gameInfoJson}}
        Crea el final de la historia.
        )))`;

      const newMessage: ChatMessage = {
        ...generateDefultUserChatMessageInfo(userCurrentMpGame),
        isInGameMsg: true,
        parts: [{ text: storyEndPrompt }],
      };

      // Reset all player state to Redy for AI Response, so GM can describe the end.
      const newPlayersConfig: Player[] = players.map((player) => ({
        ...player,
        isRedyForAiResponse: true,
      }));

      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          players: newPlayersConfig,
          playersForBook: newPlayersConfig,
          isStoryEnded: true,
          content: [...content, newMessage],
        },
        multiplayerStory.storyId
      );

      setIsMultiplayerLoading(false);
    },

    leaveGame: async () => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      setIsMultiplayerLoading(true);

      const { players, content } = multiplayerStory;
      const { player } = userCurrentMpGame;

      const newPlayers = players.filter((p) => p.userId !== player.userId);

      if (newPlayers.length === 0) {
        // delete multiplayer game if no players
        await deleteFireDoc('MULTIPLAYER_STORY', multiplayerStory.storyId);
      } else {
        // Edit game players and set newContent Prompt
        const newCharacters = newPlayers.map((p) => p.character);
        const newContent: ChatMessage = {
          ...generateDefultUserChatMessageInfo(userCurrentMpGame),
          isInGameMsg: true,
          parts: [
            {
              text: `(((Un jugador ha abandonado el juego. El personaje "${
                player.character.name
              }" ahora es un Personaje No Jugador. Los Personajes Jugadores que siguen en juego son : ${JSON.stringify(
                newCharacters
              )}. ${CODE_CHARACTERS_CHANGE})))`,
            },
          ],
        };

        await setFireDoc(
          'MULTIPLAYER_STORY',
          {
            ...multiplayerStory,
            players: newPlayers,
            content: [...content, newContent],
          },
          multiplayerStory.storyId
        );
      }

      await deleteFireDoc('USER_GAME');

      clearMultiplayerState();

      setIsMultiplayerLoading(false);
    },

    setAiConfigMp: async (aiConfig: AiModels) => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      setIsMultiplayerLoading(true);

      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          aiConfig,
        },
        multiplayerStory.storyId
      );

      setIsMultiplayerLoading(false);
    },
  };
}
