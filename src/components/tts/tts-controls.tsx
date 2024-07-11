'use client';

import { useTTSStore } from 'hooks/use-tts-store';

interface TTSControlsProps {
  customTTS?: string;
}

export default function TTSControls({ customTTS }: TTSControlsProps) {
  const { handlePlay, handlePause, handleStop, isPlaying, isPaused, isStopped } = useTTSStore();

  const stylePlaying = isPlaying ? 'btn btn-sm text-success' : 'btn btn-sm';
  const stylePaused = isPaused ? 'btn btn-sm text-warning' : 'btn btn-sm';
  const styleStopped = isStopped ? 'btn btn-sm text-error' : 'btn btn-sm';

  return (
    <div className="flex justify-center items-center gap-6 p-2">
      <button className={stylePlaying} onClick={() => handlePlay(customTTS)}>
        ▶
      </button>
      <button className={stylePaused} onClick={handlePause}>
        ❚❚
      </button>
      <button className={styleStopped} onClick={handleStop}>
        ◼
      </button>
    </div>
  );
}
