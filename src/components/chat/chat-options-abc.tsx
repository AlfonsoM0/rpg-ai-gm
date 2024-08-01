'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { AI_ROLE } from 'config/constants';
import { useTranslations } from 'next-intl';

export default function ChatOptionsABC() {
  const t = useTranslations('ChatOptionsABC');

  const { addContent, isLoadingContent, content } = useGmAiStore();
  const { handleStop } = useTTSStore();

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    handleStop();
    addContent({
      role: AI_ROLE.USER,
      parts: [{ text: `Elijo la opción **"${option}"**.` }], //\n\n ¿Qué prueba debo realizar?
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
        >
          A
        </button>
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('B')}
          disabled={isLoadingContent}
        >
          B
        </button>
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('C')}
          disabled={isLoadingContent}
        >
          C
        </button>
      </div>
    </div>
  );
}
