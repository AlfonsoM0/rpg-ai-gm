import { Content } from '@google/generative-ai';
import { Locale } from 'src/i18n-config';
import { AiModels } from 'utils/generate-ai-config';
import { Character } from './character';

export type ContentExtraInfo = {
  id: string;
  isInGameMsg: boolean;

  userName: string;
  userId: string;
  userAvatarSrc?: string;
  userAvatarAlt?: string;

  charName: string;
  charId: string;
  charAvatarSrc?: string;
  charAvatarAlt?: string;
};

export type ChatMessage = Content & ContentExtraInfo;

export type Player = {
  userId: string;
  userName: string;
  avatarSrc?: string;
  avatarAlt?: string;
  character: Character;
  isRedyForAiResponse: boolean;
};

export type AiRole = 'Game Master' | 'Game Assistant';

export type MultiplayerStory = {
  // Configs
  userHostId: string;
  userHostName: string;
  storyId: string;
  storyName: string;
  storyDescription: string;
  locale: Locale;
  aiConfig: AiModels;
  aiRole: AiRole;
  isStoryStarted: boolean;
  isStoryEnded: boolean;

  // Players
  players: Player[];

  // Chat history
  content: ChatMessage[];

  // Story stats
  totalSuccesses: number;
  totalFailures: number;
  totalDiceRolls: number;
};
