'use client';

import { useTTSStore } from 'hooks/use-tts-store';
import { useEffect } from 'react';

export default function TTSLoader() {
  const { setVoiceIndex } = useTTSStore();

  useEffect(() => {
    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    speechSynthesis.addEventListener('voiceschanged', () => {
      // Get the list of available voices and set the voice state variable accordingly
      setVoiceIndex(0);
    });

    // Clean up the event listener when the component unmounts to prevent memory leaks
    return () => {
      speechSynthesis.cancel();
      speechSynthesis.removeEventListener('voiceschanged', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
