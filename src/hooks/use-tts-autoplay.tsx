'use client';

import { Content } from '@google/generative-ai';
import { useEffect } from 'react';
import { AI_ROLE } from 'src/config/constants';
import { ChatMessage } from 'src/types/multiplayer';
import { useTTSStore } from './use-tts-store';

/**
 * @param content
 * @param aiNegativeIndex - A negative number for AiMsg position (-1 or -2 for example).
 */
export default function useAutoplayAiTTS(
  content: Content[] | ChatMessage[] | undefined,
  aiNegativeIndex: number
): void {
  const { isTTSEnabled, handlePlay, setTTS, handleStop } = useTTSStore();
  useEffect(() => {
    if (isTTSEnabled && content && content.length > 0) {
      const lastContent = content[content.length + aiNegativeIndex];
      const isLastContentIsAI = lastContent.role === AI_ROLE.MODEL;
      if (isLastContentIsAI) {
        const tts = lastContent.parts[0].text || '';
        setTTS(tts);
        handlePlay();
      }
    }

    return () => {
      handleStop();
      setTTS('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);
}
