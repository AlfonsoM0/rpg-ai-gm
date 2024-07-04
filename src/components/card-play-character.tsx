'use client';

import { characteristicsXpValue } from 'utils/characteristics-xp-value';
import { Character } from 'types/character';

type characteristic = keyof Character['characteristics'];

interface CardPlayCharacterProps {
  character: Character;
  rollCharacteristic: (name: string, characteristic: characteristic, value: number) => void;
}

export default function CardPlayCharacter({
  character,
  rollCharacteristic,
}: CardPlayCharacterProps) {
  const { id, xp, name, characteristics } = character;
  const { strength, dexterity, constitution, intelligence, wisdom, charisma } = characteristics;
  const CharsXP = characteristicsXpValue(characteristics);

  return (
    <div className="card max-w-sm shadow-xl">
      <div className="card-body p2">
        <div className="flex justify-between items-center gap-4">
          <div>
            <h2 className="card-title">{name}</h2>
          </div>
          <div>
            <p className="text-sm text-info">
              <strong>XP: </strong> {CharsXP}/{xp}
            </p>
          </div>
        </div>

        <h3 className="text-center font-bold">Pruebas de Caracteristicas</h3>
        <p className="text-xs">Selecciona característica para lanzar los dados.</p>
        <div className="flex justify-around items-center mt-2 font-bold">
          <div className="flex flex-col justify-center items-center gap-2">
            <button className="btn" onClick={() => rollCharacteristic(name, 'strength', strength)}>
              <h3>FUE +{strength}</h3>
            </button>
            <button
              className="btn"
              onClick={() => rollCharacteristic(name, 'dexterity', dexterity)}
            >
              <h3>DES +{dexterity}</h3>
            </button>
            <button
              className="btn"
              onClick={() => rollCharacteristic(name, 'constitution', constitution)}
            >
              <h3>CON +{constitution}</h3>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="btn"
              onClick={() => rollCharacteristic(name, 'intelligence', intelligence)}
            >
              <h3>INT +{intelligence}</h3>
            </button>
            <button className="btn" onClick={() => rollCharacteristic(name, 'wisdom', wisdom)}>
              <h3>SAB +{wisdom}</h3>
            </button>
            <button className="btn" onClick={() => rollCharacteristic(name, 'charisma', charisma)}>
              <h3>CAR +{charisma}</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
