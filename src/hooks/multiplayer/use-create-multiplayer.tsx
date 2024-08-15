'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Locale } from 'src/i18n-config';
import { AiModels } from 'src/utils/generate-ai-config';
import useFirebase from '../firebase';
import { MultiplayerStory } from 'src/types/multiplayer';
import { Character } from 'src/types/character';
import useMultiplayer from '.';

export default function useCreateMultiplayer() {
  const { setFireDoc, user, getFireDoc } = useFirebase();
  const { setMultiplayerStory, setUserCurrentMpGame } = useMultiplayer();
  const L = useTranslations()('[locale]') as Locale;

  const [storyId] = useState(crypto.randomUUID());
  const [storyName, setStoryName] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [locale, setLocale] = useState<Locale>(L);
  const [aiConfig, setAiConfig] = useState<AiModels>('Progresive_AI');

  return {
    storyId,
    storyName,
    setStoryName,
    storyDescription,
    setStoryDescription,
    locale,
    setLocale,
    aiConfig,
    setAiConfig,

    createMultiplayerGame: async (character: Character) => {
      /**
       * Set New Multiplayer Game in Firebase and State
       */
      const player = {
        userId: user?.uid || '',
        userName: user?.displayName || '',
        avatarSrc: user?.photoURL || undefined,
        avatarAlt: user?.displayName ? `${user.displayName} avatar` : 'Player avatar',
        character,
        isRedyForAiResponse: false,
      };

      const newMultiplayerGame: MultiplayerStory = {
        // Configs
        storyId,
        storyName,
        storyDescription,
        locale,
        aiConfig,
        isStoryStarted: false,
        isStoryEnded: false,

        // Players
        players: [player],

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
      const account = await getFireDoc('USER_ACCOUNT');

      const currentMultiplayerGame = {
        storyId,
        storyName,
        player,
      };

      if (account) {
        await setFireDoc('USER_ACCOUNT', {
          ...account,
          currentMultiplayerGame,
        });

        setUserCurrentMpGame(currentMultiplayerGame);
      }
    },
  };
}
