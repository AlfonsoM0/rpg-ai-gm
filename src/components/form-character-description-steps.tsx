'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import FormCharacterCharacteristics from './form-character-characteristics';

export default function FormCharacterSteps() {
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
        disabled={isEdit}
      />

      <br />
      <small className="text-info">
        {isEdit
          ? '* No puedes modificar el nombre de un personaje creado.'
          : '* El nombre de tu personaje no se podrá modificar después.'}{' '}
        <br />* Todos los campos marcados con asterísco son requeridos para crear una historia
        maravillosa.
      </small>
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-1'}>
      <div className="label">
        <span className="label-text">Apariencia *</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="Describe su forma de vestir, sus accesorios y cualquier otro detalle distintivo. ¿Es humano? ¿Cuál es su aspecto más llamativo?"
        value={appearance}
        onChange={(e) => setDescription({ key: 'appearance', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs" key={'step-2'}>
      <div className="label">
        <span className="label-text">Trasfondo *</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-60"
        placeholder="Cuenta una breve historia sobre su pasado, sus origenes y como se relaciona con el mundo."
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
        placeholder="¿Cuál es el origen de sus poderes? ¿Qué poderes tiene y qué hacen? ¿Cómo utiliza esos poderes? ¿Cuáles son sus fortalezas y debilidades?"
        value={powers}
        onChange={(e) => setDescription({ key: 'powers', value: e.target.value })}
      />
    </label>,

    <FormCharacterCharacteristics key={'step-7'} />,
  ];

  return steps[step];
}
