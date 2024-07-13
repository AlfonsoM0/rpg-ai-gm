const patronMarkdown = /(\*{1,2}[^*]+\*{1,2})|(_{1,2}[^_]+_{1,2})|(`{1,2}[^`]+`{1,2})/g;

/**
 * @param markdown - The markdown to be converted into text.
 * @returns The text from the markdown.
 */
export function convertMarkdownToText(markdown: string): string {
  // Remove Markdown syntax using regular expressions
  const plainText = markdown
    // Remove inline code blocks
    .replace(/`(.|\n)*?`/g, '')
    // Remove code fences
    .replace(/<pre>[\s\S]*?<\/pre>/g, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Replace bold text
    .replace(/\*\*|\b__\b/g, '') // Replace double asterisks and underscores with empty string
    // Replace line breaks with spaces
    .replace(/(\r?\n|\r)/g, ' ')
    // Remove extra spaces
    .replace(/\s+/g, ' ');

  return plainText;
}
