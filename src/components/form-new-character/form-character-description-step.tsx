'use client';

import { CharacterCreationDescription } from 'types/character';
import TextareaAutosize from 'react-textarea-autosize';
import DescriptionIdeas from './form-description-ideas';
import { Button } from 'components/button';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useTranslations } from 'next-intl';
import calculeteTextPercentage from 'src/utils/calculate-text-percentage';
import { minTxtDescription } from 'src/config/constants';

export default function FromCharacterDescriptionStep({
  descriptionType,
  isListening,
  setIsListening,
}: {
  descriptionType: CharacterCreationDescription;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}) {
  const { isLoadingContent } = useGmAiStore();

  const Char = useCreateNewCharacterStore();
  const { setDescription } = Char;

  const t = useTranslations('New_Character.Description');

  const ideas = t(`${descriptionType}.ideas`).split(',');
  const title = t(`${descriptionType}.title`).split(',');

  return (
    <label className="form-control w-full max-w-xs h-96" key={'step-1'}>
      <div className="label">
        <span className="label-text">{title}</span>
        <span className="opacity-50 label-text-alt">
          {calculeteTextPercentage(Char[descriptionType], minTxtDescription)} %
        </span>
        <DescriptionIdeas ideas={ideas} />
      </div>

      <TextareaAutosize
        className="textarea textarea-bordered min-h-72 text-xs"
        placeholder={ideas.join('\n')}
        value={Char[descriptionType]}
        onChange={(e) => setDescription({ key: descriptionType, value: e.target.value })}
        required
        disabled={isLoadingContent || isListening}
      />

      <Button.STT
        className="btn btn-xs w-full mt-4"
        text={Char[descriptionType]}
        setText={(text) => setDescription({ key: descriptionType, value: text })}
        setIsListening={setIsListening}
      />
    </label>
  );
}
