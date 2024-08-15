import { Content } from '@google/generative-ai';
import { Locale } from 'src/i18n-config';
import { AiModels } from 'utils/generate-ai-config';
import { Character } from './character';

export type ChatMessage = Content & {
  isInGameMsg: boolean;

  userName: string;
  userAvatarSrc?: string;
  userAvatarAlt?: string;

  charName: string;
  charAvatarSrc?: string;
  charAvatarAlt?: string;
};

export type Player = {
  userId: string;
  userName: string;
  avatarSrc?: string;
  avatarAlt?: string;
  character: Character;
  isRedyForAiResponse: boolean;
};

export type MultiplayerStory = {
  // Configs
  storyId: string;
  storyName: string;
  storyDescription: string;
  locale: Locale;
  aiConfig: AiModels;
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
