'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useUserPreferencesStore } from 'hooks/use-user-preferences-store';

const ideas = [
  '¿Qué es un juego de rol de mesa?',
  'Explícame las reglas de juego.',
  '¿Cuál es tu trabajo como Game Master AI?',
  'Sugiere distintas opciones de historias y enumérarlas para elegir una.',
  'Quiero usar este juego para practicar un idioma.',
  'Quiero realizar yo todas las prubas de características de mis personajes.',
  'Pideme realizar pruebas de características para todas mis decisiones.',
  'Haz un resumen de mis personajes.',
  'Haz un resumen de las características de mis personajes.',
  'Haz un resumen de mis tiradas y el total de éxitos y fallos.',
  'Haz un resumen de la historia.',
  'Quiero continuar con esta historia.',
  'Quiero jugar una nueva historia.',
  'Finaliza la historia.',
];

export default function CollapseShortcuts() {
  const { addContent } = useGmAiStore();
  const { setModalIsOpen } = useModalState();
  const { addChatShortcut } = useUserPreferencesStore();

  function handleClick(idea: string) {
    addContent({
      role: 'user',
      parts: [{ text: idea }],
    });
    setModalIsOpen(false);
  }

  return (
    <div className="collapse collapse-plus">
      <input type="radio" name="tips-y-atajos" />
      <div className="collapse-title text-xl font-medium">Atajos recomendados</div>
      <div className="collapse-content">
        {ideas.map((idea, index) => (
          <div key={index} className="flex gap-2 justify-between">
            <button
              onClick={() => handleClick(idea)}
              className="btn w-[calc(100%-2rem)] mb-2 hover:font-bold"
            >
              {idea}
            </button>
            <button className="btn p-1" onClick={() => addChatShortcut(idea)}>
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
