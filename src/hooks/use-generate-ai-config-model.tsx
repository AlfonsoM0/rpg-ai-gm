'use client';

import { useTranslations } from 'next-intl';
import { AiModels } from 'src/utils/generate-ai-config';

export default function useGenerateAiConfigObj() {
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

  return aiModels;
}
