'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useState } from 'react';

export default function ChatInputMsg() {
  const { addContent, isLoadingContent, resetChat } = useGmAiStore();

  const [chatMsg, setChatMsg] = useState('');

  function submitChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addContent({
      role: 'user',
      parts: [{ text: chatMsg }],
    });
    setChatMsg('');
  }

  return (
    <form className="flex gap-2 p-2" onSubmit={submitChat}>
      <textarea
        className="textarea textarea-bordered h-10 w-full"
        placeholder="..."
        value={chatMsg}
        onChange={(e) => setChatMsg(e.target.value)}
        disabled={isLoadingContent}
      />

      <button className="btn" type="submit" disabled={isLoadingContent}>
        {isLoadingContent ? <span className="loading loading-spinner loading-xs"></span> : '✍️'}
      </button>
    </form>
  );
}
