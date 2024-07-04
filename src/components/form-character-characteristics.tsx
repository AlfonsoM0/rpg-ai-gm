'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useMemo } from 'react';
import { characteristicsXpValue } from 'utils/characteristics-xp-value';

export default function FormCharacterCharacteristics() {
  const { xp, characteristics, setCharacteristic } = useCreateNewCharacterStore();

  const CharsXP = useMemo(() => characteristicsXpValue(characteristics), [characteristics]);

  type Caracteristic = keyof typeof characteristics;

  function onCharacteristicChange(
    e: React.ChangeEvent<HTMLInputElement>,
    characteristic: Caracteristic
  ) {
    const value = Number(e.target.value);

    const characteristicsUpdatedValues = { ...characteristics, [characteristic]: value };
    const characteristicsUpdatedXpValue = characteristicsXpValue(characteristicsUpdatedValues);

    if (characteristicsUpdatedXpValue > xp) return;

    setCharacteristic({ key: characteristic, value });
  }

  return (
    <div className="">
      <div className="flex justify-between mb-2s">
        <h2 className="text-lg font-bold">Características</h2>
        <p>
          <strong>XP: </strong> {CharsXP}/{xp}
        </p>
      </div>

      <small>* Mueve los deslizadores para ajustar las características.</small>
      <br />
      <small>* Usa tus Puntos de Experiencia (XP) para distribuirlos.</small>

      <div className="flex flex-wrap justify-between gap-4 my-4">
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Fuerza (FUE) +{characteristics.strength}</span>
            </div>
            <input
              type="range"
              min={1}
              max="5"
              value={characteristics.strength}
              onChange={(e) => onCharacteristicChange(e, 'strength')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Destreza (DES) +{characteristics.dexterity}</span>
            </div>
            <input
              type="range"
              min={1}
              max="5"
              value={characteristics.dexterity}
              onChange={(e) => onCharacteristicChange(e, 'dexterity')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Constitución (CON) +{characteristics.constitution}</span>
            </div>
            <input
              type="range"
              min={1}
              max="5"
              value={characteristics.constitution}
              onChange={(e) => onCharacteristicChange(e, 'constitution')}
              className="range"
              step="1"
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Inteligencia (INT) +{characteristics.intelligence}</span>
            </div>
            <input
              type="range"
              min={1}
              max="5"
              value={characteristics.intelligence}
              onChange={(e) => onCharacteristicChange(e, 'intelligence')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Sabiduría (SAB) +{characteristics.wisdom}</span>
            </div>
            <input
              type="range"
              min={1}
              max="5"
              value={characteristics.wisdom}
              onChange={(e) => onCharacteristicChange(e, 'wisdom')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Carisma (CAR) +{characteristics.charisma}</span>
            </div>
            <input
              type="range"
              min={1}
              max="5"
              value={characteristics.charisma}
              onChange={(e) => onCharacteristicChange(e, 'charisma')}
              className="range"
              step="1"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
