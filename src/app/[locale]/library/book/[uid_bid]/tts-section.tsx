'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import TTSControls from 'src/components/tts/tts-controls';
import { useTTSStore } from 'src/hooks/use-tts-store';

export default function TTSControlsSection() {
  const t = useTranslations('Page_Book');

  const { isTTSEnabled, setTTS, handlePlay, handleStop } = useTTSStore();

  useEffect(() => {
    if (isTTSEnabled) {
      setTTS(t('play_audio_tip'));
      handlePlay();
    }

    return () => {
      handleStop();
      setTTS('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isTTSEnabled) return <></>;

  return (
    <section className="my-[-1rem]">
      <TTSControls />
    </section>
  );
}
