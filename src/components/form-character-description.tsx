'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useState } from 'react';
import FormCharacterCharacteristics from './form-character-characteristics';
import { useCharacterStore } from 'hooks/use-character-store';
import { useRouter } from 'next/navigation';
import NewCharacterNav from './form-character-description-nav';

export default function FormCharacterDescription() {
  const router = useRouter();

  const {
    id,
    xp,
    name,
    appareance,
    background,
    profession,
    personality,
    equipment,
    powers,
    characteristics,

    setDescription,
    step,
    setStep,
  } = useCreateNewCharacterStore();

  const { removeAllCharacter, addAllCharacter } = useCharacterStore();

  const steps = [
    <label className="form-control w-full max-w-xs h-60" key={'step-0'}>
      <div className="label">
        <span className="label-text">Nombre de tu personaje *</span>
      </div>
      <input
        type="text"
        placeholder="Ej: Invictus Lumashay"
        className="input input-bordered w-full max-w-xs"
        value={name}
        onChange={(e) => setDescription({ key: 'name', value: e.target.value })}
        required
      />

      <br />
      <small className="text-info">
        * Todos los campos marcados con asterísco son requeridos para crear una historia
        maravillosa.
      </small>
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-1'}>
      <div className="label">
        <span className="label-text">Apariencia *</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="Describe su forma de vestir, sus accesorios y cualquier otro detalle distintivo."
        value={appareance}
        onChange={(e) => setDescription({ key: 'appareance', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-2'}>
      <div className="label">
        <span className="label-text">Trasfondo *</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="Cuenta una brebe historia sobre su pasado, sus origenes y como se relaciona con el mundo."
        value={background}
        onChange={(e) => setDescription({ key: 'background', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-3'}>
      <div className="label">
        <span className="label-text">Profesión *</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="Describe su profesión, sus habilidades y qué hace para ganarse la vida."
        value={profession}
        onChange={(e) => setDescription({ key: 'profession', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-4'}>
      <div className="label">
        <span className="label-text">Personalidad *</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="Describe su personalidad, sus valores y cómo interactua con las personas."
        value={personality}
        onChange={(e) => setDescription({ key: 'personality', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-5'}>
      <div className="label">
        <span className="label-text">Equipamiento *</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="Describe su equipamiento caracteristico, sus armas y accesorios que le permiten ser un experto en su campo."
        value={equipment}
        onChange={(e) => setDescription({ key: 'equipment', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-6'}>
      <div className="label">
        <span className="label-text">Poderes (opcional)</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="¿Tiene poderes o habilidades especiales? Descríbelos aquí. ¿Cuáles son sus fortalezas y debilidades? ¿Cómo utilizan esos poderes?"
        value={powers}
        onChange={(e) => setDescription({ key: 'powers', value: e.target.value })}
      />
    </label>,

    <FormCharacterCharacteristics key={'step-7'} />,
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return setStep(0);
    if (!appareance) return setStep(1);
    if (!background) return setStep(2);
    if (!profession) return setStep(3);
    if (!personality) return setStep(4);
    if (!equipment) return setStep(5);

    removeAllCharacter(id);
    addAllCharacter({
      id,
      xp,
      name,
      appareance,
      background,
      profession,
      personality,
      equipment,
      powers,
      characteristics,
    });

    router.push('/');
  }

  return (
    <div className="min-h-96 flex flex-col justify-between">
      <div>
        <NewCharacterNav />
        <progress
          className="progress progress-primary w-full"
          value={step}
          max={steps.length - 1}
        ></progress>
      </div>

      <form onSubmit={handleSubmit} className="min-w-80 flex flex-col gap-2">
        {steps[step]}

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
            disabled={step === steps.length - 1}
            type="button"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}
