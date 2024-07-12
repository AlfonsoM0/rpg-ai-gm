export function deleteCodesFromText(originalText: string): string {
  let newText = originalText;

  // Delete codes between "((("" and "")))""
  const regex = /\(\(\(([\s\S]*?)\)\)\)/g;
  newText = newText.replace(regex, '');

  // Delete codes between "(🆔:" And ")"
  const regex2 = /\(🆔:(.*?)\)/g;
  newText = newText.replace(regex2, '');

  console.log(originalText.includes('(🆔:'));
  console.log(originalText);
  console.log(newText);
  return newText.trim();
}
