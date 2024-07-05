'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';

export default function ChatOptionsABC() {
  const { addContent, isLoadingContent } = useGmAiStore();

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    addContent({
      role: 'user',
      parts: [{ text: `Elijo la opción **"${option}"**.` }],
    });
  }

  return (
    <section className="flex justify-center items-center gap-4">
      <h3 className="font-bold">Opciones: </h3>
      <button
        className="btn btn-circle"
        onClick={() => onHistoryOptionClick('A')}
        disabled={isLoadingContent}
      >
        A
      </button>
      <button
        className="btn btn-circle"
        onClick={() => onHistoryOptionClick('B')}
        disabled={isLoadingContent}
      >
        B
      </button>
      <button
        className="btn btn-circle"
        onClick={() => onHistoryOptionClick('C')}
        disabled={isLoadingContent}
      >
        C
      </button>
    </section>
  );
}
