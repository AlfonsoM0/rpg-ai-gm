'use client';

import runAIChat from 'src/server/gm-ai';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { generateAiConfig } from 'src/utils/generate-ai-config';
import { useTranslations } from 'next-intl';
import { Locale } from 'src/i18n-config';
import { generateGmAiPromptArray } from 'src/config/gm-ai-promp';
import { ChatMessage, Player } from 'src/types/multiplayer';
import { AI_NAME_TO_SHOW, AI_ROLE } from 'src/config/constants';
import { deleteCodesFromText } from 'src/utils/delete-text-from-text';

const basicGmAiChatFormat: Omit<ChatMessage, 'parts'> = {
  id: crypto.randomUUID(),
  role: AI_ROLE.MODEL,
  isInGameMsg: true,
  charId: AI_NAME_TO_SHOW,
  userId: AI_NAME_TO_SHOW,
  charName: AI_NAME_TO_SHOW,
  userName: AI_NAME_TO_SHOW,
  userAvatarSrc: '/android-chrome-512x512.png',
  userAvatarAlt: `${AI_NAME_TO_SHOW} avatar`,
  charAvatarSrc: '/android-chrome-512x512.png',
  charAvatarAlt: `${AI_NAME_TO_SHOW} avatar`,
};

export default function useGmAiAcctions() {
  const { multiplayerStory, userCurrentMpGame } = useMultiplayer();
  const { setFireDoc } = useFirebase();
  const locale = useTranslations()('[locale]') as Locale;
  const t = useTranslations('GmAi.Response');

  return {
    gmAiGenerateMsg: async (promptMsg: string = '') => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      const { players, content, aiConfig, storyId } = multiplayerStory;

      // Clean content for "Empty" and "Error" responses.
      function clearGmAiErrorsMsg(content: ChatMessage[]): ChatMessage[] {
        return content.filter((c) => {
          const isAiModel = c.role === AI_ROLE.MODEL;
          const msg = c.parts[0].text;

          if (isAiModel && (msg === t('Empty') || msg === t('Error'))) return false;

          return true;
        });
      }
      const cleanContent = clearGmAiErrorsMsg(content);

      // Only Player1 can execute this acction.
      if (userCurrentMpGame.player.userId !== players[0].userId) return;

      // All player must be redy for the response.
      for (let i = 0; i < players.length; i++) {
        if (!players[i].isRedyForAiResponse) return;
      }

      // use only inGame content to generate AI response. But Not for contentToSet.
      const inGameContent = cleanContent.filter((c) => c.isInGameMsg === true);

      const aiConfigObj = generateAiConfig(inGameContent.length, aiConfig);

      let contentToSet: ChatMessage[] = [];

      try {
        const gmAiResponse = await runAIChat(
          promptMsg,
          [...generateGmAiPromptArray(locale), ...inGameContent], // TODO: reemplace for Multiplayer Prompt
          aiConfigObj
        );

        if (!gmAiResponse) console.warn('⚠️ GmAi Empty Response => ', gmAiResponse);

        const contentFromAi: ChatMessage = gmAiResponse
          ? {
              // Normal response
              ...basicGmAiChatFormat,
              parts: [{ text: deleteCodesFromText(gmAiResponse) }],
            }
          : {
              // Empty response
              ...basicGmAiChatFormat,
              parts: [{ text: t('Empty') }],
            };

        contentToSet = [...cleanContent, contentFromAi];
      } catch (error) {
        console.error('❌ GmAi error', error);

        contentToSet = [
          ...cleanContent,
          {
            // Error response
            ...basicGmAiChatFormat,
            parts: [{ text: t('Error') }],
          },
        ];
      }

      // Reset all player state to Not Redy for AI Response.
      const newPlayersConfig: Player[] = players.map((player) => ({
        ...player,
        isRedyForAiResponse: false,
      }));

      // Update Multiplayer Game in Firebase.
      setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          players: newPlayersConfig,
          content: contentToSet,
        },
        storyId
      );
    },

    sendAiMsg: async (msg: string) => {
      if (!multiplayerStory || !userCurrentMpGame) return;

      const newContent: ChatMessage = {
        ...basicGmAiChatFormat,
        parts: [{ text: msg }],
      };

      const { content, storyId } = multiplayerStory;
      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          content: [...content, newContent],
        },
        storyId
      );
    },
  };
}
