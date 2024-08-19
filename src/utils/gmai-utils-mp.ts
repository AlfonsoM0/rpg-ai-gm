import { Content } from '@google/generative-ai';
import { AI_NAME_TO_SHOW, AI_ROLE } from 'src/config/constants';
import { ChatMessage, Player } from 'src/types/multiplayer';

export function generateDefultAiChatMessageInfo(): Omit<ChatMessage, 'parts'> {
  return {
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
}

export function generateDefultUserChatMessageInfo(userCurrentMpGame: {
  storyId: string;
  storyName: string;
  player: Player;
}): Omit<ChatMessage, 'parts' | 'isInGameMsg'> {
  const { player } = userCurrentMpGame;
  return {
    id: crypto.randomUUID(),
    role: AI_ROLE.USER,
    userName: player.userName,
    userId: player.userId,
    charName: player.character.name,
    charId: player.character.id,

    userAvatarSrc: player.avatarSrc,
    userAvatarAlt: player.avatarAlt,
    charAvatarSrc: player.avatarSrc, //TODO: change
    charAvatarAlt: `${player.character.name} Avatar`, //TODO: change
  };
}

export function getInGameContent(chatMsg: ChatMessage[]): Content[] {
  const inGameContent = chatMsg.filter((c) => c.isInGameMsg === true);
  return inGameContent.map((c) => ({
    role: c.role,
    parts: c.parts,
  }));
}

export function calcSuccess(currentValue: number, roll?: number) {
  if (!roll) return currentValue;
  if (roll >= 14) return currentValue + 2;
  if (roll >= 10) return currentValue + 1;
  return currentValue;
}

export function calcFailure(currentValue: number, roll?: number) {
  if (!roll) return currentValue;
  if (roll <= 6) return currentValue + 2;
  if (roll <= 9) return currentValue + 1;
  return currentValue;
}

export function calculateStoryXpMp({
  totalRolls,
  totalSuccesses,
  totalFailures,
}: {
  totalRolls: number;
  totalSuccesses: number;
  totalFailures: number;
}): number {
  const minR = Math.max(1, totalRolls);
  const minS = Math.max(1, totalSuccesses);
  const minF = Math.max(1, totalFailures);
  const baseXP = Math.floor(minR / 10);
  const multp = Math.min(2, Math.max(1, minS / minF));

  return Math.round(baseXP * multp);
}
