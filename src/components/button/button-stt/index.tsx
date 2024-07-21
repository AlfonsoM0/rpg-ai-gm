'use client';

import { Icon } from 'components/icons';
import { useState } from 'react';

interface ButtonSttProps {
  text: string;
  setText: (text: string) => void;
}

export default function Stt({ text, setText }: ButtonSttProps) {
  const [isSttON, setIsSttON] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-xs p-0"
      onClick={() => {
        setIsSttON(!isSttON); // Toggle the state of STT
      }}
    >
      {isSttON ? (
        <Icon.MicrophoneOn className="w-4 h-4 stroke-success" />
      ) : (
        <Icon.MicrophoneOff className="w-4 h-4 stroke-error" />
      )}
    </button>
  );
}
