import { Content } from '@google/generative-ai';
import { calculateStoryXp } from './calculate-story-xp';
import {
  AI_ROLE,
  CODE_DONT_SHOW_IN_CHAT,
  CODE_STORY_END,
  CODE_CHARACTERS_CHANGE,
  AI_MODEL_TYPE,
} from 'config/constants';
import { deleteCodesFromText } from './delete-codes-from-text';
import { AiModels, generateAiConfig } from './generate-ai-config';
import runAIChat from 'server/gm-ai';
import { generateGmAiPromptArray } from 'config/gm-ai-promp';

// i18n
import { Locale } from 'src/i18n-config';
import es from '../../content/es.json';
import en from '../../content/en.json';
import { ChatMessage } from 'src/types/multiplayer';

function createStoryContentControl(stateContent: Content[], playersDiceRolls: number[]): Content {
  const gameInfo = calculateStoryXp(playersDiceRolls);
  const gameInfoJson = JSON.stringify(gameInfo);

  const isStoryEndedBefore = JSON.stringify(stateContent).includes(CODE_STORY_END);

  const contentStoryEnded: Content = {
    role: AI_ROLE.USER,
    parts: [
      {
        text: `(((${CODE_STORY_END}
              ## Información del sistema de juego (no mostrar en chat):
              ${gameInfoJson}}
              Crea el final de la historia.
              )))`,
      },
    ],
  };

  const contentStoryProgress: Content = {
    role: AI_ROLE.USER,
    parts: [
      {
        text: `(((${CODE_DONT_SHOW_IN_CHAT}
              ## Información del sistema de juego (no mostrar en chat):
              ${gameInfoJson}}
              La historia no ha finalizado, continua con el juego.
              )))`,
      },
    ],
  };

  const infoStoryControl: Content =
    gameInfo.isStoryOver && !isStoryEndedBefore ? contentStoryEnded : contentStoryProgress;

  return infoStoryControl;
}

/**
 *
 * @param aiConfig AiModels = "Strict_AI" | "Virtuous_AI" | "Creative_AI" | "Progresive_AI" | "Random_AI"
 * @param stateContent Content[] = All the chat messages of the game.
 * @param newContent Content = The new message that the player has sent.
 * @param playersDiceRolls number[] = Array with the dice rolls of story.
 * @returns contentToSet Content[] = Array with the response from AI, to set in State/Chat.
 */
export async function createGmAiResponseContent(
  aiConfig: AiModels,
  stateContent: Content[],
  newContent: Content,
  playersDiceRolls: number[],
  locale: Locale,
  userAiModels: AI_MODEL_TYPE[] | undefined
): Promise<Content[]> {
  const lang = locale === 'en' ? en : es;
  const t = lang.GmAi.Response;

  let contentToSet: Content[] = [];

  const newContentText = newContent.parts.map((part) => part.text).join('');

  const infoStoryControl: Content = createStoryContentControl(stateContent, playersDiceRolls);

  try {
    const gmAiResponse = await runAIChat(
      newContentText,
      [...generateGmAiPromptArray(locale), ...stateContent, infoStoryControl],
      generateAiConfig(stateContent.length, aiConfig),
      userAiModels
    );

    if (!gmAiResponse) console.warn('⚠️ GmAi Empty Response => ', gmAiResponse);

    const contentForAI: Content = gmAiResponse
      ? {
          role: AI_ROLE.MODEL,
          parts: [{ text: deleteCodesFromText(gmAiResponse) }],
        }
      : {
          role: AI_ROLE.MODEL,
          parts: [{ text: t.Empty }],
        };

    const clearStateContent = clearGmAiErrorsMsg(stateContent);

    contentToSet = [...clearStateContent, newContent, contentForAI, infoStoryControl];

    return contentToSet;
  } catch (error) {
    console.error('❌ GmAi error', error);
    contentToSet = [
      ...stateContent,
      newContent,
      {
        role: AI_ROLE.MODEL,
        parts: [{ text: t.Error }],
      },
      infoStoryControl,
    ];
    return contentToSet;
  }
}

export function clearGmAiErrorsMsg<T extends Content[] | ChatMessage[]>(content: T): T {
  const newContent = content.filter((c) => {
    const isAiModel = c.role === AI_ROLE.MODEL;
    const msg = c.parts[0].text;

    if (
      isAiModel &&
      (msg === en.GmAi.Response.Empty ||
        msg === es.GmAi.Response.Empty ||
        msg === en.GmAi.Response.Error ||
        msg === es.GmAi.Response.Error)
    )
      return false;

    return true;
  });

  return newContent as T;
}

export function clearGameSystemMsg<T extends Content[] | ChatMessage[]>(content: T): T {
  const newContent = content.filter((c) => {
    const isUser = c.role === AI_ROLE.USER;
    const msg = c.parts[0].text;

    if (
      isUser &&
      (msg?.includes(CODE_DONT_SHOW_IN_CHAT) ||
        msg?.includes(CODE_STORY_END) ||
        msg?.includes(CODE_CHARACTERS_CHANGE))
    )
      return false;

    return true;
  });

  return newContent as T;
}
