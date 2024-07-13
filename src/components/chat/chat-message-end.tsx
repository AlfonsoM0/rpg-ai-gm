'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { calculateStoryXp } from 'utils/calculate-story-xp';

export default function MsgStoryEnd() {
  const { playersDiceRolls } = useGmAiStore();
  const { totalFailures, totalSuccesses, storyXp } = calculateStoryXp(playersDiceRolls);

  return (
    <div className="card bg-secondary-content w-80 shadow-xl m-auto my-4">
      <div className="card-body">
        <h2 className="card-title text-info">Fin de la historia</h2>
        <p className="text-center text-primary">
          <strong>Total de fallos:</strong> {totalFailures}. <br />
          <strong>Total de éxito:</strong> {totalSuccesses}. <br />
          <strong>Experiencia de la historia:</strong> {storyXp}XP. <br />
        </p>
      </div>
    </div>
  );
}
