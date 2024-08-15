'use client';

import runAIChat from 'src/server/gm-ai';
import useMultiplayer from '.';
import useFirebase from '../firebase';
import { generateAiConfig } from 'src/utils/generate-ai-config';
import { useTranslations } from 'next-intl';
import { Locale } from 'src/i18n-config';
import { generateGmAiPromptArray } from 'src/config/gm-ai-promp';
import { ChatMessage } from 'src/types/multiplayer';
import { AI_MODEL, AI_NAME_TO_SHOW, AI_ROLE } from 'src/config/constants';
import { deleteCodesFromText } from 'src/utils/delete-text-from-text';
import { clearGameSystemMsg, clearGmAiErrorsMsg } from 'src/utils/gmai-utils';

const basicGmAiChatFormat: Omit<ChatMessage, 'parts'> = {
  role: AI_ROLE.MODEL,
  isInGameMsg: true,
  charName: AI_NAME_TO_SHOW,
  userName: AI_NAME_TO_SHOW,
  userAvatarSrc: '/android-chrome-512x512.png',
  userAvatarAlt: `${AI_NAME_TO_SHOW} avatar`,
  charAvatarSrc: '/android-chrome-512x512.png',
  charAvatarAlt: `${AI_NAME_TO_SHOW} avatar`,
};

export default function useGmAiAcctions() {
  const { multiplayerStory } = useMultiplayer();
  const { getFireDoc, setFireDoc } = useFirebase();
  const locale = useTranslations()('[locale]') as Locale;
  const t = useTranslations('GmAi.Response');

  return {
    gmAiGenerateMsg: async () => {
      if (!multiplayerStory) return;
      const { players, content, aiConfig, storyId } = multiplayerStory;

      for (let i = 0; i < players.length; i++) {
        if (!players[i].isRedyForAiResponse) return;
      }

      const inGameContent = content.filter((c) => c.isInGameMsg === true);

      const aiConfigObj = generateAiConfig(inGameContent.length, aiConfig);

      let contentToSet: ChatMessage[] = [];

      try {
        const gmAiResponse = await runAIChat(
          '',
          [...generateGmAiPromptArray(locale), ...inGameContent],
          aiConfigObj
        );

        if (!gmAiResponse) console.warn('⚠️ GmAi Empty Response => ', gmAiResponse);

        const contentFromAi: ChatMessage = gmAiResponse
          ? {
              ...basicGmAiChatFormat,
              parts: [{ text: deleteCodesFromText(gmAiResponse) }],
            }
          : {
              ...basicGmAiChatFormat,
              parts: [{ text: t('Empty') }],
            };

        contentToSet = [...content, contentFromAi];
      } catch (error) {
        console.error('❌ GmAi error', error);

        contentToSet = [
          ...content,
          {
            ...basicGmAiChatFormat,
            parts: [{ text: t('Error') }],
          },
        ];
      }

      // const clearContent = clearGmAiErrorsMsg(
      //   clearGameSystemMsg(contentToSet)
      // );

      setFireDoc(
        'MULTIPLAYER_STORY',
        {
          ...multiplayerStory,
          content: contentToSet,
        },
        storyId
      );
    },
  };
}
