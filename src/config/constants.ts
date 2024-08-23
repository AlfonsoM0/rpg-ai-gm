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
  GEMINI_PRO = 'gemini-1.5-pro', // best option for GmAi
  GEMINI_FLASH = 'gemini-1.5-flash',
}

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
