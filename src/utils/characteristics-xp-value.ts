import type { Character } from 'types/character';

/**
 * Calculate the total character xp value, based on charactaristics values.
 *
 * There are 6 characteristic values: strength, dexterity, constitution, intelligence, wisdom and charisma.
 *
 * Each characteristic has a base value of 1, and can be increased to a maximum of 5.
 *
 * The total character xp value is calculated as follows:
 * - Sumatory of all the characteristics xp values.
 * Characteristic value 1 = 0 xp.
 * Characteristic value 2 = 20 xp.
 * Characteristic value 3 = 50 xp.
 * Characteristic value 4 = 90 xp.
 * Characteristic value 5 = 140 xp.
 *
 */
export function characteristicsXpValue(characteristics: Character['characteristics']): number {
  let totalXP = 0;
  const keys = Object.keys(characteristics) as Array<keyof typeof characteristics>;

  keys.forEach((key) => {
    const value = characteristics[key];
    switch (value) {
      case 1:
        totalXP += 0;
        break;
      case 2:
        totalXP += 20;
        break;
      case 3:
        totalXP += 50;
        break;
      case 4:
        totalXP += 90;
        break;
      case 5:
        totalXP += 140;
        break;
      default:
        throw new Error('Invalid characteristic value');
    }
  });

  return totalXP;
}
