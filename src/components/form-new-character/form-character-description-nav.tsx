'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';

export default function NewCharacterNav() {
  const { step, setStep } = useCreateNewCharacterStore();

  function onLiClick(step: number) {
    setStep(step);
  }

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
          >
            8
          </button>
        </li>
      </ul>
    </div>
  );
}
