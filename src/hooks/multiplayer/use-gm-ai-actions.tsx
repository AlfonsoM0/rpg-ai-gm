'use client';

import runAIChat from 'src/server/gm-ai';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { generateAiConfig } from 'src/utils/generate-ai-config';
import { useTranslations } from 'next-intl';
import { Locale } from 'src/i18n-config';
import { generateGmAiPromptArray } from 'src/config/gm-ai-promp';
import { ChatMessage, Player } from 'src/types/multiplayer';
import { AI_ROLE } from 'src/config/constants';
import { deleteCodesFromText } from 'src/utils/delete-text-from-text';
import { generateDefultAiChatMessageInfo, getInGameContent } from 'src/utils/gmai-utils-mp';

export default function useGmAiAcctions() {
  const { multiplayerStory, userCurrentMpGame } = useMultiplayer();
  const { setFireDoc } = useFirebase();
  const locale = useTranslations()('[locale]') as Locale;
  const t = useTranslations('GmAi.Response');

  return {
    gmAiGenerateMsg: async (promptMsg: string = '', isGenerateOnlyTxt?: boolean) => {
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
      const inGameContent = getInGameContent(cleanContent);

      const aiConfigObj = generateAiConfig(inGameContent.length, aiConfig);

      let contentToSet: ChatMessage[] = [];

      try {
        const gmAiResponse = await runAIChat(
          promptMsg,
          [...generateGmAiPromptArray(locale), ...inGameContent], // TODO: reemplace for Multiplayer Prompt
          aiConfigObj
        );

        if (!gmAiResponse) console.warn('⚠️ GmAi Empty Response => ', gmAiResponse);
        // return only txt and no generate ChatMessage
        if (isGenerateOnlyTxt) return deleteCodesFromText(gmAiResponse);

        const contentFromAi: ChatMessage = gmAiResponse
          ? {
              // Normal response
              ...generateDefultAiChatMessageInfo(),
              parts: [{ text: deleteCodesFromText(gmAiResponse) }],
            }
          : {
              // Empty response
              ...generateDefultAiChatMessageInfo(),
              parts: [{ text: t('Empty') }],
            };

        contentToSet = [...cleanContent, contentFromAi];
      } catch (error) {
        console.error('❌ GmAi error', error);
        // return only txt and no generate ChatMessage
        if (isGenerateOnlyTxt) return '';

        contentToSet = [
          ...cleanContent,
          {
            // Error response
            ...generateDefultAiChatMessageInfo(),
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
        ...generateDefultAiChatMessageInfo(),
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
