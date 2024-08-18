'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { AI_ROLE } from 'config/constants';
import { useTranslations } from 'next-intl';
import { usePlayerAcctions } from 'src/hooks/multiplayer';
export default function ChatOptionsABC({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('ChatOptionsABC');

  /**
   * Single Player
   */
  const { addContent, isLoadingContent, content } = useGmAiStore();
  const { handleStop } = useTTSStore();

  /**
   * Multiplayer
   */
  const { sendMessage } = usePlayerAcctions();

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    handleStop();
    const msg = `${t('btn_ABC')} **"${option}"**.`;

    if (isMultiplayer) sendMessage(msg, true);
    else
      addContent({
        role: AI_ROLE.USER,
        parts: [{ text: msg }],
      });
  }

  return (
    <div>
      <p className="text-center text-sm mb-1 font-bold">{t('Story_Options')}</p>
      <div className="flex gap-2">
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('A')}
          disabled={isLoadingContent}
          aria-label={t('Option.Option_A')}
        >
          A
        </button>
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('B')}
          disabled={isLoadingContent}
          aria-label={t('Option.Option_B')}
        >
          B
        </button>
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('C')}
          disabled={isLoadingContent}
          aria-label={t('Option.Option_C')}
        >
          C
        </button>
      </div>
    </div>
  );
}
