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

  for (let i = 0; i < diceRolls.length; i++) {
    const roll = diceRolls[i];
    const totalSuccesses = roll10orMore.length + roll14orMore.length * 2;
    const totalFailures = roll7orMore.length + roll6orLess.length * 2;

    if (totalFailures >= 3 || totalSuccesses >= 5) {
      // Story is over
      let storyXp = 2;
      if (totalSuccesses >= 4) storyXp += 2;

      return {
        totalSuccesses,
        totalFailures,
        isStoryOver: true,
        storyXp,
      };
    } else {
      // Story is not over yet
      if (roll <= 6) roll6orLess.push(roll);
      if (roll >= 7 && roll < 10) roll7orMore.push(roll);
      if (roll >= 10 && roll < 14) roll10orMore.push(roll);
      if (roll >= 14) roll14orMore.push(roll);
    }
  }

  // If the story is not over, return the current state of the story
  return {
    totalSuccesses: roll10orMore.length + roll14orMore.length * 2,
    totalFailures: roll7orMore.length + roll6orLess.length * 2,
    isStoryOver: false,
    storyXp: 0,
  };
}
