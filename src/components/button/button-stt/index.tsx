'use client';

import { Icon } from 'components/icons';
import { ComponentProps, useEffect, useState } from 'react';
import SR, { useSpeechRecognition } from 'react-speech-recognition';

// We use 'regenerator-runtime' module for Button.STT compoment works correctly Client Side.

interface TTSProps extends Omit<ComponentProps<'button'>, 'onClick' | 'type' | 'children'> {
  text: string;
  setText: (text: string) => void;
  setIsListening: (listening: boolean) => void;
  iconOn?: JSX.Element;
  iconOff?: JSX.Element;
}

/**
 * Use with
  ```
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState(');
  ...
  <Button.STT text={text} setText={setText} setIsListening={setIsListening} />
  ```
  * Default class
  ```
  className="btn btn-sm p-0"
  ```
  * Icons
  ```
  iconOn = <Icon.MicrophoneOn className="w-4 h-4 stroke-success" />,
  iconOff = <Icon.MicrophoneOff className="w-4 h-4 stroke-error" />,
  ```
 */
export default function STT({
  text = '',
  setText,
  setIsListening,
  iconOn = <Icon.MicrophoneOn className="w-4 h-4 stroke-success" />,
  iconOff = <Icon.MicrophoneOff className="w-4 h-4 stroke-error" />,
  ...props
}: TTSProps) {
  const { listening, resetTranscript, transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  function startOrEndSpeechRecognition() {
    // i18n support is not yet implemented.
    if (!listening) SR.startListening({ continuous: true, language: undefined });
    else SR.stopListening();
  }

  // Save text when microphone is on.
  const [initialText, setInitialText] = useState(text);

  // Write over the initial text.
  useEffect(() => {
    if (listening) setText(initialText + transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  // SetInitialText when microphone is off and resetTranscript.
  useEffect(() => {
    if (!listening) {
      setInitialText(text);
      resetTranscript();
    }

    // For external "listening" useState.
    setIsListening(listening);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, text]);

  if (!browserSupportsSpeechRecognition) return <></>;
  return (
    <button
      className="btn btn-sm p-0"
      {...props}
      type="button"
      onClick={startOrEndSpeechRecognition}
    >
      {listening ? iconOn : iconOff}
    </button>
  );
}
