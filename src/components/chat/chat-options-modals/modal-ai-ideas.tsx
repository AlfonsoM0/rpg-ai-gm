'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';

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
      <h3 className="font-bold text-lg">Tips y Atajos</h3>
      <p className="py-4 text-sm">
        Estos son tips y atajos para ayudarte a mejorar tu experiencia con Game Master AI. <br />
      </p>

      <div className="collapse collapse-plus">
        <input type="radio" name="tips-y-atajos" />
        <div className="collapse-title text-xl font-medium">Tips</div>
        <div className="collapse-content">
          <ul>
            <li className="list-disc ml-2 text-sm my-1">
              <strong>La historia termina a los 3 fallos o 5 éxitos</strong> <br /> Si no quieres
              que termine rápido, puedes escribir tus resultados de pruebas o pedirle a GmAi que las
              haga por ti. Así no se guardarán en el sistema y evitarás que se active el final.
              Aunque GmAi puede concluir por su cuenta, puedes pedirle que continúe hasta donde
              quieras.
            </li>
            <li className="list-disc ml-2 text-sm my-1">
              <strong>La XP ganada al final de la historia</strong> <br /> Se calcula en base al
              resultado de tus pruebas de característica. Solo las pruebas lanzadas desde las fichas
              de tus personajes cuentan, ya que se registran en el sistema. GmAI lleva su propio
              registro, pero no es muy confiable.
            </li>
            <li className="list-disc ml-2 text-sm my-1">
              <strong>Conseguir una mejor historia</strong> <br /> Es fácil, aporta ideas a la trama
              de manera creativa y no solo eligiendo las opciones que te da GmAi.
            </li>
            <li className="list-disc ml-2 text-sm my-1">
              <strong>Jugar una historia más rápida</strong> <br />
              Es posible, pide a tu GmAi &quot;realizar pruebas de características&quot;, eso lo
              motivará a darte más pruebas y detalles para avanzar más rápido en la historia. Si
              GmAi realiza tiradas por tí, puedes decirle que tú quieres realziar todas las tiradas.
            </li>
            <li className="list-disc ml-2 text-sm my-1">
              <strong>¿Quiers jugar una campaña de varias historias?</strong> <br /> Pide a GmAi un
              resumen de la historia y copia su mensaje. En tu próxima partida puedes decirle
              &quot;Quiero continuar con esta historia: [pega el resumen de la historia aquí]&quot;.
            </li>
          </ul>
        </div>
      </div>

      <div className="collapse collapse-plus">
        <input type="radio" name="tips-y-atajos" defaultChecked />
        <div className="collapse-title text-xl font-medium">Atajos</div>
        <div className="collapse-content">
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
      </div>
    </div>
  );
}
