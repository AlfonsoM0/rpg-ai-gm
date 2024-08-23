/**
 * @param text - text to calculate
 * @param base - text.length required
 * @returns - Percentage of text.lenth / base
 */
export default function calculeteTextPercentage(text: string, base: number): number {
  return Math.floor(Math.min((text.trim().length / base) * 100, 100));
}
