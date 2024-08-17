'use client';

import { Icon } from 'components/icons';
import { ModalContentContainer } from 'components/modal';
import TTSConfig from 'components/tts/tts-config';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTranslations } from 'next-intl';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
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

  const aiModels = useGenerateAiConfigObj();

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
