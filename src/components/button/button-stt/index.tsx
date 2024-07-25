'use client';

import { Icon } from 'components/icons';
import { ComponentProps, useEffect } from 'react';
import SR, { useSpeechRecognition } from 'react-speech-recognition';

// We use 'regenerator-runtime' module for Button.STT compoment works correctly Client Side.

interface TTSProps extends Omit<ComponentProps<'button'>, 'onClick' | 'type' | 'children'> {
  iconOn?: JSX.Element;
  iconOff?: JSX.Element;
}

/**
 * Use with
  ```
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  function inWriteTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    resetTranscript();
    setChatMsg(e.target.value);
  }
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
  iconOn = <Icon.MicrophoneOn className="w-4 h-4 stroke-success" />,
  iconOff = <Icon.MicrophoneOff className="w-4 h-4 stroke-error" />,
  ...props
}: TTSProps) {
  const { listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  function startOrEndSpeechRecognition() {
    if (!listening)
      // i18n support is not yet implemented.
      SR.startListening({ continuous: true, language: undefined });
    else SR.stopListening();
  }

  useEffect(() => {
    if (!listening) resetTranscript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

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
