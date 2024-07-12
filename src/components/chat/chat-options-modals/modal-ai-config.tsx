'use client';

import { Icon } from 'components/icons';
import TTSConfig from 'components/tts/tts-config';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { AiModels } from 'utils/generate-ai-config';

export const aiIconStyle = {
  Strict_AI: 'w-8 h-8 fill-success',
  Virtuous_AI: 'w-8 h-8 fill-warning',
  Creative_AI: 'w-8 h-8 fill-error',
  Progresive_AI: 'w-8 h-8 fill-primary',
  Random_AI: 'w-8 h-8 fill-secondary',
} as { [key in AiModels]: string };

export const aiConfigNamesES = {
  Strict_AI: 'Estricto',
  Virtuous_AI: 'Virtuoso',
  Creative_AI: 'Creativo',
  Progresive_AI: 'Progresivo',
  Random_AI: 'Aleatorio',
} as { [key in AiModels]: string };

export const aiModels: { name: AiModels; nameEs: string; desc: string; clsRadio: string }[] = [
  {
    name: 'Strict_AI',
    nameEs: 'Estricto - jugador estratega.',
    desc: 'Respeta las reglas, pero necesita de tu creatividad. Debes proponer más ideas para la historia.',
    clsRadio: 'radio checked:bg-success',
  },
  {
    name: 'Virtuous_AI',
    nameEs: 'Virtuoso - un poquito de todo.',
    desc: 'Respeta un poco las reglas y es algo creativo.',
    clsRadio: 'radio checked:bg-warning',
  },
  {
    name: 'Creative_AI',
    nameEs: 'Creativo - narrador charlatán.',
    desc: 'Es creativo, pero no respeta las reglas. Debes pedirle hacer tiradas o que se tranquilice y termine la historia de una vez.',
    clsRadio: 'radio checked:bg-error',
  },
  {
    name: 'Progresive_AI',
    nameEs: 'Progresivo - empieza estricto y termina loco.',
    desc: 'Comienza siendo estricto y termina siendo muy creativo.',
    clsRadio: 'radio checked:bg-primary',
  },
  {
    name: 'Random_AI',
    nameEs: 'Aleatorio - depende de su humor.',
    desc: 'Estricto, creativo o virtuoso, nunca se sabe, va cambiando en cada respuesta.',
    clsRadio: 'radio checked:bg-secondary',
  },
];

export default function ModalConfigAI() {
  const { aiConfig, setAiConfig } = useGmAiStore();
  return (
    <div>
      <h3 className="font-bold text-lg text-info">Game Master AI</h3>
      <p className="py-4">Configura la personalidad de tu Game Master AI.</p>

      <h4 className="text-center my-4">
        <span>
          <Icon.AiBrain className={`${aiIconStyle[aiConfig]} w-4 h-4 inline`} />
        </span>
        <strong> Estilo</strong>
      </h4>

      {aiModels.map((model) => (
        <div className="form-control border-2 rounded-lg my-1 p-1" key={model.name}>
          <label className="label cursor-pointer">
            <span className="label-text font-bold">{model.nameEs}</span>
            <input
              type="radio"
              name="radio-10"
              className={model.clsRadio}
              checked={aiConfig === model.name}
              onChange={() => setAiConfig(model.name)}
            />
          </label>
          <small className="ml-3">{model.desc}</small>
        </div>
      ))}

      <TTSConfig />
    </div>
  );
}
