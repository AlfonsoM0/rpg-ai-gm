'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTranslations } from 'next-intl';
import useMultiplayer from 'src/hooks/multiplayer';
import { calculateStoryXpMp } from 'src/utils/gmai-utils-mp';
import { calculateStoryXp } from 'utils/calculate-story-xp';

export default function MsgStoryEnd({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('MsgStoryEnd');

  const { playersDiceRolls } = useGmAiStore();
  const { totalFailures, totalSuccesses, storyXp } = calculateStoryXp(playersDiceRolls);

  /**
   * Multiplayer
   */
  const { multiplayerStory } = useMultiplayer();
  const multiplayerXP = calculateStoryXpMp({
    totalDiceRolls: multiplayerStory?.totalDiceRolls || 0,
    totalSuccesses: multiplayerStory?.totalSuccesses || 0,
    totalFailures: multiplayerStory?.totalFailures || 0,
  });

  /**
   * Remder
   */
  const values = {
    s: isMultiplayer ? multiplayerStory?.totalSuccesses || 0 : totalSuccesses,
    f: isMultiplayer ? multiplayerStory?.totalFailures || 0 : totalFailures,
    xp: isMultiplayer ? multiplayerXP : storyXp,
  };

  return (
    <div className="card bg-secondary-content w-80 shadow-xl m-auto my-4">
      <div className="card-body">
        <h2 className="card-title text-info">{t('h2_Story_End')}</h2>
        <p className="text-center text-primary">
          <strong>{t('Total_Successes')}</strong> {values.s}. <br />
          <strong>{t('Total_Failures')}</strong> {values.f}. <br />
          <strong>{t('Story_XP')}</strong> {values.xp}XP. <br />
        </p>
      </div>
    </div>
  );
}
