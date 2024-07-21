'use client';

import { Icon } from 'components/icons';
import { AI_ROLE } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function ChatInputMsg() {
  const { addContent, isLoadingContent } = useGmAiStore();
  const { handleStop } = useTTSStore();

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

  return (
    <form className="flex gap-2 p-2" onSubmit={submitChat}>
      <TextareaAutosize
        autoFocus // text area should automatically get focus when the page loads
        className="textarea textarea-bordered w-full"
        placeholder="..."
        value={chatMsg}
        onChange={(e) => setChatMsg(e.target.value)}
        disabled={isLoadingContent}
      />

      <button className="btn" type="submit" disabled={isLoadingContent}>
        {isLoadingContent ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <Icon.Stars className="w-8 h-8 fill-info" />
        )}
      </button>
    </form>
  );
}
//min-h-28 sm:min-h-24 md:min-h-20 lg:min-h-16 xl:min-h-12
