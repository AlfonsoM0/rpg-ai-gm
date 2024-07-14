'use client';

import { useEffect } from 'react';
import { useTTSStore } from 'hooks/use-tts-store';

export default function TTSLoader() {
  const { setVoices, voiceIndex, setVoiceIndex } = useTTSStore();

  useEffect(() => {
    const voices = speechSynthesis.getVoices().filter((v) => v.localService);
    setVoices(voices);
    if (voices.length < 0 || voiceIndex > voices.length - 1) setVoiceIndex(0);

    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    speechSynthesis.addEventListener('voiceschanged', () => {
      // Get the list of available voices and set the voice state variable accordingly
      // Filter only local voices, because have unlimited usage.
      const voices = speechSynthesis.getVoices().filter((v) => v.localService);
      setVoices(voices);
      if (voices.length < 0 || voiceIndex > voices.length - 1) setVoiceIndex(0);
    });

    // TODO: delete alert
    alert(
      '¡Advertencia! \n\n Este juego no está completo y puedes perder información en alguna actualización. \n\n Tu configuración, personajes y partidas solo se guardan en tu navegador. \n\n Para notificar un error o dar una sugerencia puedes escribirme en alfonso.ar/contact (haciendo click en el pie de página). \n\n Muchas gracias y... ¡Que te diviertas con GmAi! 😁'
    );

    // Clean up the event listener when the component unmounts to prevent memory leaks
    return () => {
      speechSynthesis.cancel();
      speechSynthesis.removeEventListener('voiceschanged', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
