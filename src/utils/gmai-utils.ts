import { Content } from '@google/generative-ai';
import { calculateStoryXp } from './calculate-story-xp';
import { AI_ROLE, CODE_DONT_SHOW_IN_CHAT, CODE_STORY_END } from 'config/constants';
import { deleteCodesFromText } from './delete-text-from-text';
import { AiModels, generateAiConfig } from './generate-ai-config';
import runAIChat from 'server/gm-ai';

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
  playersDiceRolls: number[]
): Promise<Content[]> {
  let contentToSet: Content[] = [];

  const newContentText = newContent.parts.map((part) => part.text).join('');

  const infoStoryControl: Content = createStoryContentControl(stateContent, playersDiceRolls);

  try {
    const gmAiResponse = await runAIChat(
      newContentText,
      [...stateContent, infoStoryControl],
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
          parts: [
            {
              text: '🤔... No se me ocurre una respuesta... \n\n Dame más información e intenta nuevamente. ✨',
            },
          ],
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
        parts: [
          {
            text: '⚠️ Lo lamento, no puedo responderte. \n\n Esto puede suceder cando hay un error en el juego o cuando nuestra conversación se vuelve muy... inapropiada. \n\n Dame más información e intenta nuevamente. ✨',
          },
        ],
      },
      infoStoryControl,
    ];
    return contentToSet;
  }
}
