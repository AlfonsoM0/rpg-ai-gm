import { CODE_CHARACTERS_CHANGE, CODE_DONT_SHOW_IN_CHAT, CODE_STORY_END } from 'config/constants';

export function deleteTextFromText(originalText: string, infoToSustract: string[]): string {
  let newText = originalText;

  const regex = /\(\(\(([\s\S]*?)\)\)\)/g;
  newText = newText.replace(regex, '');

  const regex2 = /\(🆔:(.*?)\)/g;
  newText = newText.replace(regex2, '');

  console.log(originalText.includes('(🆔:'));
  console.log(newText);
  return newText.trim();
}

export function deleteCodesFromText(originalText: string): string {
  const codes = [CODE_DONT_SHOW_IN_CHAT, CODE_CHARACTERS_CHANGE, CODE_STORY_END];

  return deleteTextFromText(originalText, codes);
}
