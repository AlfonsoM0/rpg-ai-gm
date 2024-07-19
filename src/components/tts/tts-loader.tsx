'use client';

import { useEffect } from 'react';
import { useTTSStore } from 'hooks/use-tts-store';

export default function TTSLoader() {
  const { setVoices } = useTTSStore();

  useEffect(() => {
    const voices = speechSynthesis.getVoices().filter((v) => v.localService);
    setVoices(voices);

    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    speechSynthesis.addEventListener('voiceschanged', () => {
      // Get the list of available voices and set the voice state variable accordingly
      // Filter only local voices, because have unlimited usage.
      const voices = speechSynthesis.getVoices().filter((v) => v.localService);
      setVoices(voices);
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
