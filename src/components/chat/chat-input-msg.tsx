'use client';

import { Button } from 'components/button';
import { Icon } from 'components/icons';
import { AI_ROLE } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import TextareaAutosize from 'react-textarea-autosize';

export default function ChatInputMsg() {
  const { addContent, isLoadingContent } = useGmAiStore();
  const { handleStop } = useTTSStore();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const [chatMsg, setChatMsg] = useState('');

  function submitChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStop();
    addContent({
      role: AI_ROLE.USER,
      parts: [{ text: chatMsg }],
    });
    setChatMsg('');
  }

  function inWriteTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    resetTranscript();
    setChatMsg(e.target.value);
  }

  return (
    <form className="flex gap-2 p-2" onSubmit={submitChat}>
      <TextareaAutosize
        autoFocus // text area should automatically get focus when the page loads
        className="textarea textarea-bordered w-full min-h-20"
        placeholder="..."
        value={chatMsg + transcript}
        onChange={inWriteTextArea}
        disabled={isLoadingContent || listening}
      />

      <div className="flex flex-col gap-2">
        <button className="btn btn-sm h-12" type="submit" disabled={isLoadingContent}>
          {isLoadingContent ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Icon.Stars className="w-6 h-6 fill-info" />
          )}
        </button>

        <Button.STT />
      </div>
    </form>
  );
}
//min-h-28 sm:min-h-24 md:min-h-20 lg:min-h-16 xl:min-h-12
