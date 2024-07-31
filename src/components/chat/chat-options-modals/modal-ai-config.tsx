'use client';

import { Icon } from 'components/icons';
import { ModalContentContainer } from 'components/modal';
import TTSConfig from 'components/tts/tts-config';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTranslations } from 'next-intl';
import { AiModels } from 'utils/generate-ai-config';

export const aiIconStyle = {
  Strict_AI: 'w-8 h-8 fill-success',
  Virtuous_AI: 'w-8 h-8 fill-warning',
  Creative_AI: 'w-8 h-8 fill-error',
  Progresive_AI: 'w-8 h-8 fill-primary',
  Random_AI: 'w-8 h-8 fill-secondary',
} as { [key in AiModels]: string };

export default function ModalConfigAI() {
  const t = useTranslations('ModalConfigAI');

  const aiModels: { name: AiModels; title: string; desc: string; clsRadio: string }[] = [
    {
      name: 'Strict_AI',
      title: t('Strict_AI_title'),
      desc: t('Strict_AI_desc'),
      clsRadio: 'radio checked:bg-success',
    },
    {
      name: 'Virtuous_AI',
      title: t('Virtuous_AI_title'),
      desc: t('Virtuous_AI_desc'),
      clsRadio: 'radio checked:bg-warning',
    },
    {
      name: 'Creative_AI',
      title: t('Creative_AI_title'),
      desc: t('Creative_AI_desc'),
      clsRadio: 'radio checked:bg-error',
    },
    {
      name: 'Progresive_AI',
      title: t('Progresive_AI_title'),
      desc: t('Progresive_AI_desc'),
      clsRadio: 'radio checked:bg-primary',
    },
    {
      name: 'Random_AI',
      title: t('Random_AI_title'),
      desc: t('Random_AI_desc'),
      clsRadio: 'radio checked:bg-secondary',
    },
  ];

  const { aiConfig, setAiConfig } = useGmAiStore();
  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="py-4">{t('p_Config')}</p>

        <h4 className="text-center my-4">
          <span>
            <Icon.AiBrain className={`${aiIconStyle[aiConfig]} w-4 h-4 inline`} />
          </span>
          <strong> {t('p_strong_Style')}</strong>
        </h4>

        {aiModels.map((model) => (
          <div className="form-control border-2 rounded-lg my-1 p-1" key={model.name}>
            <label className="label cursor-pointer">
              <span className="label-text font-bold">{model.title}</span>
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
      </>
    </ModalContentContainer>
  );
}
