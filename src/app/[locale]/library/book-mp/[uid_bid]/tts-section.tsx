'use client';

import 'regenerator-runtime/runtime'; // This is necesary for Build STT.

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import TTSControls from 'src/components/tts/tts-controls';
import { useTTSStore } from 'src/hooks/use-tts-store';

export default function TTSControlsSection() {
  const t = useTranslations('Page_Book');

  const { isTTSEnabled } = useTTSStore();

  if (!isTTSEnabled) return <></>;

  return (
    <section className="my-[-1rem]">
      <TTSControls customTTS={t('play_audio_tip')} />
    </section>
  );
}
