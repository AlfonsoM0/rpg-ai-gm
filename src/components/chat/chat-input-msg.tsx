'use client';

import { Button } from 'components/button';
import { Icon } from 'components/icons';
import { AI_ROLE } from 'config/constants';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import SR from 'react-speech-recognition';
import { useTranslations } from 'next-intl';

export default function ChatInputMsg() {
  const t = useTranslations('buttons');

  const { addContent, isLoadingContent } = useGmAiStore();
  const { handleStop } = useTTSStore();

  const [chatMsg, setChatMsg] = useState('');
  const [isListening, setIsListening] = useState(false);

  function submitChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleStop();
    SR.stopListening();
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
        className="textarea textarea-bordered w-full min-h-20"
        placeholder="..."
        value={chatMsg}
        onChange={(e) => setChatMsg(e.target.value)}
        disabled={isLoadingContent || isListening}
      />

      <div className="flex flex-col gap-2">
        <button
          className="btn btn-sm h-12"
          type="submit"
          disabled={isLoadingContent}
          aria-label={t('Send_message')}
        >
          {isLoadingContent ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Icon.Stars className="w-6 h-6 fill-info" />
          )}
        </button>

        <Button.STT text={chatMsg} setText={setChatMsg} setIsListening={setIsListening} />
      </div>
    </form>
  );
}
//min-h-28 sm:min-h-24 md:min-h-20 lg:min-h-16 xl:min-h-12
