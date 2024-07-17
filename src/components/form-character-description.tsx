'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useState } from 'react';
import FormCharacterCharacteristics from './form-character-characteristics';
import { useCharacterStore } from 'hooks/use-character-store';
import { useRouter } from 'next/navigation';
import NewCharacterNav from './form-character-description-nav';
import { Character } from 'types/character';
import H2 from './h2';
import FormCharacterSteps from './form-character-description-steps';

export default function FormCharacterDescription() {
  const router = useRouter();

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

    step,
    setStep,
  } = useCreateNewCharacterStore();

  const { removeAllCharacter, addAllCharacter } = useCharacterStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return setStep(0);
    if (!appearance) return setStep(1);
    if (!background) return setStep(2);
    if (!profession) return setStep(3);
    if (!personality) return setStep(4);
    if (!equipment) return setStep(5);

    const newCharacter: Character = {
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
    };

    //update character
    removeAllCharacter(id);
    addAllCharacter(newCharacter);

    router.push('/');
  }

  return (
    <div className="min-h-96 flex flex-col justify-between">
      <H2>{name}</H2>

      <div>
        <NewCharacterNav />
        <progress className="progress progress-primary w-full" value={step} max={7}></progress>
      </div>

      <form onSubmit={handleSubmit} className="min-w-80 flex flex-col gap-2">
        <FormCharacterSteps />

        <div className="flex justify-between mt-4">
          <button
            className="btn"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            type="button"
          >
            Anterior
          </button>
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
          <button
            className="btn"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 7}
            type="button"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}
