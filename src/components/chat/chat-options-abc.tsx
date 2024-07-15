'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { AI_ROLE } from 'config/constants';

export default function ChatOptionsABC() {
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
      <p className="text-center text-sm mb-1 font-bold">Opciones de historia</p>
      <div className={content.length > 2 ? 'flex gap-2' : 'hidden'}>
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
