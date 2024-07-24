'use client';

import { Icon } from 'components/icons';
import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// We use 'regenerator-runtime' module for Button.STT compoment works correctly Client Side.
export default function STT() {
  const { listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  function startOrEndSpeechRecognition() {
    if (!listening) {
      // i18n support is not yet implemented.
      SpeechRecognition.startListening({ continuous: true, language: undefined });
    } else {
      SpeechRecognition.stopListening();
    }
  }

  useEffect(() => {
    if (!listening) {
      resetTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  if (!browserSupportsSpeechRecognition) return <></>;
  return (
    <button type="button" className="btn btn-sm p-0" onClick={startOrEndSpeechRecognition}>
      {listening ? (
        <Icon.MicrophoneOn className="w-4 h-4 stroke-success" />
      ) : (
        <Icon.MicrophoneOff className="w-4 h-4 stroke-error" />
      )}
    </button>
  );
}
