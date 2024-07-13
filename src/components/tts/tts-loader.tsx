'use client';

import { useEffect } from 'react';
// import { useTTSStore } from 'hooks/use-tts-store';

export default function TTSLoader() {
  // const { setVoiceIndex } = useTTSStore();

  useEffect(() => {
    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    // speechSynthesis.addEventListener('voiceschanged', () => {
    //   // Get the list of available voices and set the voice state variable accordingly
    //   // setVoiceIndex(0); // In future, set the voice index to the first available voice if platform changes
    // });

    // TODO: delete alert
    alert(
      '¡Advertencia! \n\n Este juego no está completo. \n\n Tu configuración, personajes y partidas solo se guardan en tu navegador. \n\n Para notificar un error o dar una sugerencia puedes escribirme en alfonso.ar/contact \n\n Muchas gracias y... ¡Que te diviertas con GmAi! 😁'
    );

    // Clean up the event listener when the component unmounts to prevent memory leaks
    return () => {
      speechSynthesis.cancel();
      // speechSynthesis.removeEventListener('voiceschanged', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
