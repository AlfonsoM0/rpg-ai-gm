import { Content } from '@google/generative-ai';
import { AI_NAME_TO_SHOW, AI_ROLE } from 'src/config/constants';
import { UserGame } from 'src/types/firebase-db';
import { AiRole, ChatMessage, MultiplayerStory, Player } from 'src/types/multiplayer';

export function generateDefultAiChatMessageInfo(
  userGM?: UserGame['currentMultiplayerGame'],
  isInGameMsg?: boolean
): Omit<ChatMessage, 'parts'> {
  const charName = userGM ? `Game Master ${userGM.player.userName}` : AI_NAME_TO_SHOW;
  const userName = userGM ? userGM.player.userName : AI_NAME_TO_SHOW;
  const id = userGM ? userGM.player.userId : AI_NAME_TO_SHOW;
  const avatarSrc = userGM ? userGM.player.avatarSrc : '/android-chrome-512x512.png';

  const isInGame = userGM ? Boolean(isInGameMsg) : true;

  return {
    id: crypto.randomUUID(),
    role: AI_ROLE.MODEL,
    isInGameMsg: isInGame,
    charId: id,
    userId: id,
    charName,
    userName,
    userAvatarSrc: avatarSrc,
    userAvatarAlt: `${userName} avatar`,
    charAvatarSrc: avatarSrc,
    charAvatarAlt: `${charName} avatar`,
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
  totalDiceRolls,
  totalSuccesses,
  totalFailures,
}: {
  totalDiceRolls: number;
  totalSuccesses: number;
  totalFailures: number;
}): number {
  const minR = Math.max(1, totalDiceRolls);
  const minS = Math.max(1, totalSuccesses);
  const minF = Math.max(1, totalFailures);
  const baseXP = Math.floor(minR / 10);
  const multp = Math.min(2, Math.max(1, minS / minF));

  return Math.round(baseXP * multp);
}

export function areAllPlayersReadyForAiResponse(multiplayerStory?: MultiplayerStory): boolean {
  if (!multiplayerStory) return false;
  const { players } = multiplayerStory;

  for (let i = 0; i < players.length; i++) {
    if (!players[i].isRedyForAiResponse) return false;
  }

  return true;
}

export function isGmAiAutomaticResponse(multiplayerStory?: MultiplayerStory): boolean {
  if (!multiplayerStory) return false;
  const { aiRole } = multiplayerStory;

  if (aiRole !== 'Game Master') return false;

  return areAllPlayersReadyForAiResponse(multiplayerStory);
}
