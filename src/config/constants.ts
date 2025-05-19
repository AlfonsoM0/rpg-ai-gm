import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

export const AI_NAME_TO_SHOW = 'Game Master AI';

export enum AI_ROLE {
  // ["user","model","function","system"]
  USER = 'user',
  MODEL = 'model',
  // FUNCTION = 'function',
  // SYSTEM = 'system',
}

export enum AI_MODEL {
  GEMINI_PRO = 'gemini-2.5-flash-preview-04-17',
  OPENAI_GPT = 'gpt-3.5-turbo-0125',
}

export type AI_MODEL_TYPE = {
  MODEL: string;
  API_KEY: string;
};

export const AI_MODELS: AI_MODEL_TYPE[] = [
  {
    MODEL: AI_MODEL.GEMINI_PRO,
    API_KEY: process.env.AI_GEMINI_API_KEY || '',
  },
  {
    MODEL: AI_MODEL.OPENAI_GPT,
    API_KEY: process.env.AI_OPENAI_API_KEY || '',
  },
];

export enum APP_URL {
  // "HOME_..." are show in navbar
  HOME = '/',
  HOME_TUTORIAL = '/tutorial',

  HOME_LIBRARY = '/library',
  LIBRARY_BOOK = '/library/book',
  LIBRARY_BOOKMP = '/library/book-mp',

  HOME_MULTIPLAYER = '/multiplayer',
  MULTIPLAYER_CREATE = '/multiplayer/create',
  MULTIPLAYER_GAME = '/multiplayer/game',
  MULTIPLAYER_JOIN = '/multiplayer/join',
  MULTIPLAYER_LOBBY = '/multiplayer/lobby',

  CHARACTER = '/character',
  NEW_CHARACTER = '/new-character',
  STORY = '/story',
  USER = '/user',
}

export const CODE_DONT_SHOW_IN_CHAT = '(🆔:❌❌❌)';
export const CODE_CHARACTERS_CHANGE = '(🆔:⚔️⚔️⚔️)';
export const CODE_STORY_END = '(🆔:⭐⭐⭐)';

export const MarkdownOptions: MarkdownToJSX.Options = {
  overrides: {
    strong: {
      props: { className: 'text-info text-md' },
    },
    li: {
      props: { className: 'list-disc ml-5' },
    },
    p: {
      props: { className: 'my-2' },
    },
    a: {
      props: { className: 'text-info' },
    },
    pre: {
      component: 'div',
    },
    code: {
      component: Markdown,
    },
  },
};

export const minTxtDescription = 100;
