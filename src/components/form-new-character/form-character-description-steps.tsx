'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import FormCharacterCharacteristics from './form-character-characteristics';
import TextareaAutosize from 'react-textarea-autosize';
import DescriptionIdeas, {
  appearanceIdeas,
  backgroundIdeas,
  equipmentIdeas,
  personalityIdeas,
  powersIdeas,
  professionIdeas,
} from './form-description-ideas';

/**
 * Steps 0 to 7 = Length 8
 * @returns JSX Elements for each step of the form
 */
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
    <label className="form-control w-full max-w-xs h-96" key={'step-0'}>
      <div className="label">
        <span className="label-text">Nombre de tu personaje *</span>
        <DescriptionIdeas ideas={['Inventa un nombre original.']} />
      </div>
      <input
        type="text"
        placeholder="Inventa un nombre original."
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

    <label className="form-control w-full max-w-xs h-96" key={'step-1'}>
      <div className="label">
        <span className="label-text">Apariencia *</span>
        <DescriptionIdeas ideas={appearanceIdeas} />
      </div>
      <TextareaAutosize
        className="textarea textarea-bordered min-h-72"
        placeholder={appearanceIdeas.join('\n')}
        value={appearance}
        onChange={(e) => setDescription({ key: 'appearance', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs h-96" key={'step-2'}>
      <div className="label">
        <span className="label-text">Trasfondo *</span>
        <DescriptionIdeas ideas={backgroundIdeas} />
      </div>
      <TextareaAutosize
        className="textarea textarea-bordered min-h-72"
        placeholder={backgroundIdeas.join('\n')}
        value={background}
        onChange={(e) => setDescription({ key: 'background', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs h-96" key={'step-3'}>
      <div className="label">
        <span className="label-text">Profesión *</span>
        <DescriptionIdeas ideas={professionIdeas} />
      </div>
      <TextareaAutosize
        className="textarea textarea-bordered min-h-72"
        placeholder={professionIdeas.join('\n')}
        value={profession}
        onChange={(e) => setDescription({ key: 'profession', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs h-96" key={'step-4'}>
      <div className="label">
        <span className="label-text">Personalidad *</span>
        <DescriptionIdeas ideas={personalityIdeas} />
      </div>
      <TextareaAutosize
        className="textarea textarea-bordered min-h-72"
        placeholder={personalityIdeas.join('\n')}
        value={personality}
        onChange={(e) => setDescription({ key: 'personality', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs h-96" key={'step-5'}>
      <div className="label">
        <span className="label-text">Equipamiento *</span>
        <DescriptionIdeas ideas={equipmentIdeas} />
      </div>
      <TextareaAutosize
        className="textarea textarea-bordered min-h-72"
        placeholder={equipmentIdeas.join('\n')}
        value={equipment}
        onChange={(e) => setDescription({ key: 'equipment', value: e.target.value })}
        required
      />
    </label>,

    <label className="form-control w-full max-w-xs h-96" key={'step-6'}>
      <div className="label">
        <span className="label-text">Poderes (opcional)</span>
        <DescriptionIdeas ideas={powersIdeas} />
      </div>
      <TextareaAutosize
        className="textarea textarea-bordered min-h-72"
        placeholder={powersIdeas.join('\n')}
        value={powers}
        onChange={(e) => setDescription({ key: 'powers', value: e.target.value })}
      />
    </label>,

    <FormCharacterCharacteristics key={'step-7'} />,
  ];

  return steps[step];
}
