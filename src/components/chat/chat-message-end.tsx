'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTranslations } from 'next-intl';
import { calculateStoryXp } from 'utils/calculate-story-xp';

export default function MsgStoryEnd() {
  const t = useTranslations('MsgStoryEnd');

  const { playersDiceRolls } = useGmAiStore();
  const { totalFailures, totalSuccesses, storyXp } = calculateStoryXp(playersDiceRolls);

  return (
    <div className="card bg-secondary-content w-80 shadow-xl m-auto my-4">
      <div className="card-body">
        <h2 className="card-title text-info">{t('h2_Story_End')}</h2>
        <p className="text-center text-primary">
          <strong>{t('Total_Failures')}</strong> {totalFailures}. <br />
          <strong>{t('Total_Successes')}</strong> {totalSuccesses}. <br />
          <strong>{t('Story_XP')}</strong> {storyXp}XP. <br />
        </p>
      </div>
    </div>
  );
}
