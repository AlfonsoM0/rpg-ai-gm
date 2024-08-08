'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useTranslations } from 'next-intl';

export default function NewCharacterNav() {
  const t = useTranslations('Character');

  const { step, setStep } = useCreateNewCharacterStore();

  function onLiClick(step: number) {
    setStep(step);
  }

  /*
    name,
    appearance,
    background,
    profession,
    personality,
    equipment,
    powers,
    characteristics,
   */
  return (
    <div className="breadcrumbs w-full text-md">
      <ul className="flex justify-between">
        <li>
          <button
            className={
              step === 0
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(0)}
            type="button"
            disabled={step === 0}
            aria-label={t('Name')}
          >
            1
          </button>
        </li>
        <li>
          <button
            className={
              step === 1
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(1)}
            type="button"
            disabled={step === 1}
            aria-label={t('Appearance')}
          >
            2
          </button>
        </li>
        <li>
          <button
            className={
              step === 2
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(2)}
            type="button"
            disabled={step === 2}
            aria-label={t('Background')}
          >
            3
          </button>
        </li>
        <li>
          <button
            className={
              step === 3
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(3)}
            type="button"
            disabled={step === 3}
            aria-label={t('Profession')}
          >
            4
          </button>
        </li>
        <li>
          <button
            className={
              step === 4
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(4)}
            type="button"
            disabled={step === 4}
            aria-label={t('Personality')}
          >
            5
          </button>
        </li>
        <li>
          <button
            className={
              step === 5
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(5)}
            type="button"
            disabled={step === 5}
            aria-label={t('Equipment')}
          >
            6
          </button>
        </li>
        <li>
          <button
            className={
              step === 6
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(6)}
            type="button"
            disabled={step === 6}
            aria-label={t('Powers')}
          >
            7
          </button>
        </li>
        <li>
          <button
            className={
              step === 7
                ? 'px-1 rounded-full bg-primary text-secondary-content'
                : 'hover:cursor-pointer px-1 rounded-full hover:bg-primary-content'
            }
            onClick={() => onLiClick(7)}
            type="button"
            disabled={step === 7}
            aria-label={t('Characteristics')}
          >
            8
          </button>
        </li>
      </ul>
    </div>
  );
}
