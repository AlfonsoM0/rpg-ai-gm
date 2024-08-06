import { Content } from '@google/generative-ai';
import { calculateStoryXp } from './calculate-story-xp';
import { AI_ROLE, CODE_DONT_SHOW_IN_CHAT, CODE_STORY_END } from 'config/constants';
import { deleteCodesFromText } from './delete-text-from-text';
import { AiModels, generateAiConfig } from './generate-ai-config';
import runAIChat from 'server/gm-ai';
import { generateGmAiPromptArray } from 'config/gm-ai-promp';

// i18n
import { Locale } from 'src/i18n-config';
import es from '../../content/es.json';
import en from '../../content/en.json';

function createStoryContentControl(stateContent: Content[], playersDiceRolls: number[]): Content {
  const { isStoryOver, totalFailures, totalSuccesses, storyXp } =
    calculateStoryXp(playersDiceRolls);

  const isStoryEndedBefore = JSON.stringify(stateContent).includes(CODE_STORY_END);

  const contentStoryEnded: Content = {
    role: AI_ROLE.USER,
    parts: [
      {
        text: `(((
              Crea el final de la historia considerando lo siguiente:
              Total de fallos ${totalFailures},
              Total de éxito ${totalSuccesses},
              XP de la historia ${storyXp}.
              ${CODE_STORY_END}
              )))`,
      },
    ],
  };

  const contentStoryProgress: Content = {
    role: AI_ROLE.USER,
    parts: [
      {
        text: `(((
              Información sobre el progreso de la historia:
              Total de fallos ${totalFailures},
              Total de éxito ${totalSuccesses},
              XP de la historia ${storyXp}.
              ${CODE_DONT_SHOW_IN_CHAT}
              )))`,
      },
    ],
  };

  const infoStoryControl: Content =
    isStoryOver && !isStoryEndedBefore ? contentStoryEnded : contentStoryProgress;

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
  locale: Locale
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
      generateAiConfig(stateContent.length, aiConfig)
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

    contentToSet = [...stateContent, newContent, contentForAI, infoStoryControl];

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
