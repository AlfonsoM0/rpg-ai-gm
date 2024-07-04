'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Character } from 'types/character';
import { characteristicsXpValue } from 'utils/characteristics-xp-value';

interface CardCharacterProps {
  character: Character;
}

export default function CardCharacter({ character }: CardCharacterProps) {
  const router = useRouter();
  const { setAllCharacterInfo } = useCreateNewCharacterStore();
  const { removeAllCharacter, removeInGameCharacter, inGameCharacters, addInGameCharacter } =
    useCharacterStore();

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
  } = character;
  const { strength, dexterity, constitution, intelligence, wisdom, charisma } = characteristics;

  const CharsXP = useMemo(() => characteristicsXpValue(characteristics), [characteristics]);
  const [check, setCheck] = useState(false);

  function deleteCharacter() {
    alert('Se removerá el personaje');
    // removeAllCharacter(id);
    // removeInGameCharacter(id);
  }

  function editCharacter() {
    setAllCharacterInfo(character);
    router.push('/new-character');
  }

  const isInGame = useMemo(
    () => Boolean(inGameCharacters.find((c) => c.id === id)),
    [inGameCharacters, id]
  );
  function selectCharacter() {
    if (isInGame) {
      removeInGameCharacter(id);
    } else {
      addInGameCharacter(character);
    }
  }

  const borderStyle = isInGame
    ? 'card w-80 border-2 border-success rounded-lg shadow-md'
    : 'card w-80 border border-primary-content rounded-lg shadow-md';

  return (
    <div className={borderStyle}>
      <div className="card-body p-2">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="card-title">{name}</h2>
          </div>
          <div>
            <p className="text-sm text-info">
              <strong>XP: </strong> {CharsXP}/{xp}
            </p>
          </div>
        </div>

        <div className="flex justify-around items-center mt-2 font-bold">
          <div>
            <h3>FUE +{strength}</h3>
            <h3>DES +{dexterity}</h3>
            <h3>CON +{constitution}</h3>
          </div>
          <div>
            <h3>INT +{intelligence}</h3>
            <h3>SAB +{wisdom}</h3>
            <h3>CAR +{charisma}</h3>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200" onClick={() => setCheck(!check)}>
          <input type="radio" name={id} checked={check} readOnly />
          <div className="collapse-title font-medium">Descripción</div>
          <div className="collapse-content">
            <h3>
              <strong>Apariencia: </strong>
            </h3>
            <p>{appareance}</p>
            <br />

            <h3>
              <strong>Trasfondo: </strong>
            </h3>
            <p>{background}</p>
            <br />

            <h3>
              <strong>Profesión: </strong>
            </h3>
            <p>{profession}</p>
            <br />

            <h3>
              <strong>Personalidad: </strong>
            </h3>
            <p>{personality}</p>
            <br />

            <h3>
              <strong>Equipamiento: </strong>
            </h3>
            <p>{equipment}</p>
            <br />

            <h3>
              <strong>Poderes: </strong>
            </h3>
            <p>{powers ? powers : 'No posee poderes.'}</p>
            <br />
          </div>
        </div>

        <div className="card-actions justify-between">
          <button className="btn btn-sm btn-error" onClick={deleteCharacter}>
            Borrar
          </button>
          <button className="btn btn-sm btn-info" onClick={editCharacter}>
            Editar
          </button>
          <button className="btn btn-sm btn-success" onClick={selectCharacter}>
            {isInGame ? 'Quitar' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
