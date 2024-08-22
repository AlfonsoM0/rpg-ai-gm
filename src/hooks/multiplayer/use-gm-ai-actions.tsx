'use client';

import runAIChat from 'src/server/gm-ai';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { generateAiConfig } from 'src/utils/generate-ai-config';
import { useTranslations } from 'next-intl';
import { Locale } from 'src/i18n-config';
import { generateGmAiMpPromptArray } from 'src/config/gm-ai-promp-mp';
import { ChatMessage, Player } from 'src/types/multiplayer';
import { deleteCodesFromText } from 'src/utils/delete-text-from-text';
import { generateDefultAiChatMessageInfo, getInGameContent } from 'src/utils/gmai-utils-mp';
import { clearGmAiErrorsMsg } from 'src/utils/gmai-utils';

export default function useGmAiAcctions() {
  const { multiplayerStory, userCurrentMpGame } = useMultiplayer();
  const { setFireDoc } = useFirebase();
  const locale = useTranslations()('[locale]') as Locale;
  const t = useTranslations('GmAi.Response');

  return {
    gmAiGenerateMsg: async (promptMsg: string = '', isGenerateOnlyTxt?: boolean) => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      const { players, content, aiConfig, storyId } = multiplayerStory;

      // Only Host (players[0]) can execute this acction.
      if (userCurrentMpGame.player.userId !== players[0].userId) return;

      // Clean content for "Empty" and "Error" responses.
      const cleanContent = clearGmAiErrorsMsg(content);

      // use only inGame content to generate AI response. But Not for contentToSet.
      const inGameContent = getInGameContent(cleanContent);

      const aiConfigObj = generateAiConfig(inGameContent.length, aiConfig);

      let contentToSet: ChatMessage[] = [];

      try {
        const gmAiResponse = await runAIChat(
          promptMsg,
          [...generateGmAiMpPromptArray(locale), ...inGameContent],
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

    sendAiMsg: async (msg: string, isInGameMsg?: boolean) => {
      if (!multiplayerStory || !userCurrentMpGame) return;
      const { aiRole, players } = multiplayerStory;
      const { player } = userCurrentMpGame;

      const userInfo = aiRole === 'Game Master' ? undefined : userCurrentMpGame;

      const newPlayers = players.map((p) => {
        const isCurrentPlayerAndIsGM = p.userId === player.userId && aiRole === 'Game Assistant';
        if (isCurrentPlayerAndIsGM) return p;
        else
          return {
            ...p,
            isRedyForAiResponse: false,
          };
      });

      const newContent: ChatMessage = {
        ...generateDefultAiChatMessageInfo(userInfo, isInGameMsg),
        parts: [{ text: msg }],
      };

      const { content, storyId } = multiplayerStory;
      await setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          content: [...content, newContent],
          players: newPlayers,
        },
        storyId
      );
    },
  };
}
