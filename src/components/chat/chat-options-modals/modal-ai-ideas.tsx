'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';

const ideas = [
  '¿Qué es un juego de rol de mesa?',
  'Explícame las reglas de juego.',
  '¿Cuál es tu trabajo como Game Master AI?',
  'Sugiere distintas opciones de historias y enumérarlas para elegir una.',
  'Haz un resumen de mis personajes.',
  'Haz un resumen de las características de mis personajes.',
  'Haz un resumen de mis tiradas y el total de éxitos y fallos.',
  'Haz un resumen de la historia.',
  'Finaliza la historia.',
];

export default function ModaIdeasForAI() {
  const { addContent } = useGmAiStore();
  const { setModalIsOpen } = useModalState();

  function handleClick(idea: string) {
    addContent({
      role: 'user',
      parts: [{ text: idea }],
    });
    setModalIsOpen(false);
  }

  return (
    <div>
      <h3 className="font-bold text-lg">Ideas y Atajos</h3>
      <p className="py-4">
        Estas son ideas y atajos para ayudarte a mejorar tu experiencia con Game Master AI. <br />
        Haz click en alguna de las ideas para enviarla al chat:
      </p>

      {ideas.map((idea, index) => (
        <button
          key={index}
          onClick={() => handleClick(idea)}
          className="btn w-full mb-2 hover:font-bold"
        >
          {idea}
        </button>
      ))}
    </div>
  );
}
