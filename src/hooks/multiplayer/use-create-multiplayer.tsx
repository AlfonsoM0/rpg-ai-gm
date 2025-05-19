'use client';

import useFirebase from '../firebase';
import { MultiplayerStory } from 'src/types/multiplayer';
import { Character } from 'src/types/character';
import useMultiplayer from '.';
import { useModalState } from '../use-modal-state';
import ModalIsAStoryInProgress from 'src/components/book/book-modals/book-modal-is-story-in-progress';
import { clearGmAiErrorsMsg } from 'src/utils/gmai-utils';
import { getInGameContent } from 'src/utils/gmai-utils-mp';
import { generateGmAiMpPromptArray } from 'src/config/gm-ai-promp-mp';
import runAIChat from 'src/server/gm-ai';
import ModalContinueMpError from './modal-continue-mp-game-error';
import { useCreateMultiplayerState } from './use-create-multiplayer-state';
import { generateAiConfig } from 'src/utils/generate-ai-config';
import en from 'content/en.json';
import es from 'content/es.json';
import { useUserPreferencesStore } from '../use-user-preferences-store';

export default function useCreateMultiplayer() {
  const { aiModels } = useUserPreferencesStore();
  const { setFireDoc, user } = useFirebase();
  const { setMultiplayerStory, setUserCurrentMpGame, setIsMultiplayerLoading, multiplayerStory } =
    useMultiplayer();
  const { setModalIsOpen, setModalContent } = useModalState();

  const {
    storyName,
    setStoryName,
    storyDescription,
    setStoryDescription,
    locale,
    setLocale,
    aiConfig,
    setAiConfig,
    aiRole,
    setAiRole,
    setCreateMultiplayerState,
  } = useCreateMultiplayerState();

  const t = locale === 'en' ? en : es;

  return {
    storyName,
    setStoryName,
    storyDescription,
    setStoryDescription,
    locale,
    setLocale,
    aiConfig,
    setAiConfig,
    aiRole,
    setAiRole,
    setCreateMultiplayerState,

    createMultiplayerGame: async (character: Character) => {
      if (!user) return;

      setIsMultiplayerLoading(true);
      /**
       * Set New Multiplayer Game in Firebase and State
       */
      const player = {
        userId: user.uid,
        userName: user.displayName || 'Player 1',
        avatarSrc: user.photoURL || undefined,
        avatarAlt: `${user.displayName || 'Player 1'} avatar`,
        character,
        isRedyForAiResponse: false,
      };

      const storyId = crypto.randomUUID();

      const newMultiplayerGame: MultiplayerStory = {
        // Configs
        userCratorId: user.uid,
        userCratorName: user.displayName || 'Player 1',
        storyId,
        storyName,
        storyDescription,
        locale,
        aiConfig,
        aiRole,
        isStoryStarted: false,
        isStoryEnded: false,

        // Players
        players: [player],
        playersForBook: [],

        // Chat history
        content: [],

        // Story stats
        totalSuccesses: 0,
        totalFailures: 0,
        totalDiceRolls: 0,
      };

      await setFireDoc('MULTIPLAYER_STORY', newMultiplayerGame, storyId);
      setMultiplayerStory(newMultiplayerGame);

      /**
       * Set User Current Game Info in Firebase and State
       */
      const currentMultiplayerGame = {
        storyId,
        storyName,
        player,
      };

      await setFireDoc('USER_GAME', { currentMultiplayerGame });
      setUserCurrentMpGame(currentMultiplayerGame);

      setIsMultiplayerLoading(false);
    },

    continueMultiplayerGame: async (lastGame: MultiplayerStory) => {
      // if the story has started, alert the user that they cannot continue a story because it is another story in progress.
      if (multiplayerStory) {
        setModalContent(<ModalIsAStoryInProgress isMultiplayer />);
        setModalIsOpen(true);
        return;
      }

      // Generate AI resume
      const { storyName, locale, aiConfig, content, aiRole } = lastGame;
      const cleanContent = clearGmAiErrorsMsg(content);
      const inGameContent = getInGameContent(cleanContent);
      const aiConfigObj = generateAiConfig(inGameContent.length, 'Creative_AI');

      const { Msg_Start, Msg_end } = t.GmAi.continueMultiplayerGame_prompt;
      const promptMsg = `Haz un resumen de la historia. Comienza diciendo "${Msg_Start}". Termina diciendo "${Msg_end}". Toda la respuesta debe estar en idioma ${locale}" (ISO 639-1).`;

      // set game state
      function setGameState(aiResume: string) {
        setStoryName(storyName + ': [...]');
        setStoryDescription(aiResume);
        setLocale(locale);
        setAiConfig(aiConfig);
        setAiRole(aiRole);
      }

      try {
        const gmAiResponse = await runAIChat(
          promptMsg,
          [...generateGmAiMpPromptArray(locale), ...inGameContent],
          aiConfigObj,
          aiModels
        );

        if (gmAiResponse) setGameState(gmAiResponse);
        else {
          setModalContent(<ModalContinueMpError isFail />);
          setModalIsOpen(true);
        }
      } catch (error) {
        console.error('continueMultiplayerGame Error => ', error);
        setModalContent(<ModalContinueMpError />);
        setModalIsOpen(true);
      }
    },
  };
}
