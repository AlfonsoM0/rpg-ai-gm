/**
 * Calculate Story XP based on dice rolls.
 * @param diceRolls Array of 2d6 +CharacteristicModifier
 * @returns = { totalSuccesses, totalFailures, isStoryOver,storyXp,}
 */
export function calculateStoryXp(diceRolls: number[]) {
  let roll6orLess = [];
  let roll7orMore = [];
  let roll10orMore = [];
  let roll14orMore = [];

  let totalSuccesses = 0;
  let totalFailures = 0;

  for (let i = 0; i <= diceRolls.length; i++) {
    totalFailures = roll7orMore.length + roll6orLess.length * 2;
    totalSuccesses = roll10orMore.length + roll14orMore.length * 2;

    if (totalFailures < 3 || totalSuccesses < 5) {
      const roll = diceRolls[i];
      if (roll <= 6) roll6orLess.push(roll);
      if (roll >= 7 && roll < 10) roll7orMore.push(roll);
      if (roll >= 10 && roll < 14) roll10orMore.push(roll);
      if (roll >= 14) roll14orMore.push(roll);
    } else {
      let storyXp = 2;
      if (totalSuccesses >= 4) storyXp += 2;

      return {
        totalSuccesses,
        totalFailures,
        isStoryOver: true,
        storyXp,
      };
    }
  }

  return {
    totalSuccesses,
    totalFailures,
    isStoryOver: false,
    storyXp: 0,
  };
}
