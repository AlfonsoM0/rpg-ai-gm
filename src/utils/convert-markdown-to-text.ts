/**
 *
 * @param text - The text to check if it is markdown or not.
 * @returns True if the text is markdown, false otherwise.
 */
function isMarkdown(text: string): boolean {
  const regex = /^[\s\S]*([*#]+)(.*)$/;
  return regex.test(text);
}

/**
 * @param markdown - The markdown to be converted into text.
 * @returns The text from the markdown.
 */
export function convertMarkdownToText(markdown: string): string {
  if (!isMarkdown(markdown)) return markdown;
  return markdown.replace(/[*#]/g, '').replace(/\n/g, ' ');
}
