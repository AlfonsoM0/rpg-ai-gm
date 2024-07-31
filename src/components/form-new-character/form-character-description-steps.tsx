'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import FormCharacterCharacteristics from './form-character-characteristics';
import DescriptionIdeas from './form-description-ideas';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import FromCharacterDescriptionStep from './form-character-description-step';

/**
 * Steps 0 to 7 = Length 8
 * @returns JSX Elements for each step of the form
 */
export default function FormCharacterSteps() {
  const t = useTranslations('New_Character');

  const {
    id,
    xp,
    name,
    appearance,
    background,
    profession,
    personality,
    equipment,
    powers,
    characteristics,

    setDescription,
    step,
    setStep,
    isEdit,
  } = useCreateNewCharacterStore();
  const { isLoadingContent } = useGmAiStore();
  const [isListening, setIsListening] = useState(false);

  const steps = [
    <label className="form-control w-full max-w-xs h-96" key={'step-0'}>
      <div className="label">
        <span className="label-text">{t('Name_of_your_character')}</span>
        <DescriptionIdeas ideas={[t('Create_an_original_name')]} />
      </div>
      <input
        type="text"
        placeholder={t('Create_an_original_name')}
        className="input input-bordered w-full max-w-xs"
        value={name}
        onChange={(e) => setDescription({ key: 'name', value: e.target.value })}
        required
        disabled={isEdit}
      />

      <br />
      <small className="text-info">
        {isEdit ? t('isEdit.true') : t('isEdit.false')} <br /> {t('Form_Tip')}
      </small>
    </label>,

    <FromCharacterDescriptionStep
      key={'step-1'}
      descriptionType="appearance"
      isListening={isListening}
      setIsListening={setIsListening}
    />,

    <FromCharacterDescriptionStep
      key={'step-2'}
      descriptionType="background"
      isListening={isListening}
      setIsListening={setIsListening}
    />,

    <FromCharacterDescriptionStep
      key={'step-3'}
      descriptionType="profession"
      isListening={isListening}
      setIsListening={setIsListening}
    />,

    <FromCharacterDescriptionStep
      key={'step-4'}
      descriptionType="personality"
      isListening={isListening}
      setIsListening={setIsListening}
    />,

    <FromCharacterDescriptionStep
      key={'step-5'}
      descriptionType="equipment"
      isListening={isListening}
      setIsListening={setIsListening}
    />,

    <FromCharacterDescriptionStep
      key={'step-6'}
      descriptionType="powers"
      isListening={isListening}
      setIsListening={setIsListening}
    />,

    <FormCharacterCharacteristics key={'step-7'} />,
  ];

  return steps[step];
}
