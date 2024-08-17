'use client';

import { useState } from 'react';
import { Locale } from 'src/i18n-config';
import { AiModels } from 'src/utils/generate-ai-config';
import useFirebase from '../firebase';
import { AiRole, MultiplayerStory } from 'src/types/multiplayer';
import { Character } from 'src/types/character';
import useMultiplayer from '.';
import { useGmAiStore } from '../use-gm-ai-chat-store';

export default function useCreateMultiplayer() {
  const { setFireDoc, user, getFireDoc } = useFirebase();
  const { setMultiplayerStory, setUserCurrentMpGame, setIsMultiplayerLoading } = useMultiplayer();
  const { aiConfig: spAiCOnfig, locale: L } = useGmAiStore();

  const [storyId] = useState(crypto.randomUUID());
  const [storyName, setStoryName] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [locale, setLocale] = useState<Locale>(L);
  const [aiConfig, setAiConfig] = useState<AiModels>(spAiCOnfig);
  const [aiRole, setAiRole] = useState<AiRole>('Game Master');

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
    aiRole,
    setAiRole,

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

      const newMultiplayerGame: MultiplayerStory = {
        // Configs
        userHostId: user.uid,
        userHostName: user.displayName || 'Player 1',
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

      const userGame = await getFireDoc('USER_GAME');
      await setFireDoc('USER_GAME', {
        ...userGame,
        currentMultiplayerGame,
      });
      setUserCurrentMpGame(currentMultiplayerGame);

      setIsMultiplayerLoading(false);
    },
  };
}
