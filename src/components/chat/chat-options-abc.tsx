'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';

export default function ChatOptionsABC() {
  const { addContent } = useGmAiStore();

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    addContent({
      role: 'user',
      parts: [{ text: `Elijo la opción **"${option}"**.` }],
    });
  }

  return (
    <section className="flex justify-center items-center gap-4">
      <h3 className="font-bold">Opciones: </h3>
      <button className="btn btn-circle" onClick={() => onHistoryOptionClick('A')}>
        A
      </button>
      <button className="btn btn-circle" onClick={() => onHistoryOptionClick('B')}>
        B
      </button>
      <button className="btn btn-circle" onClick={() => onHistoryOptionClick('C')}>
        C
      </button>
    </section>
  );
}
