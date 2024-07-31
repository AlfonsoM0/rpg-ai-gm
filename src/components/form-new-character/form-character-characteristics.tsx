'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { characteristicsXpValue } from 'utils/characteristics-xp-value';

export default function FormCharacterCharacteristics() {
  const C = useTranslations('Character.char');
  const t = useTranslations('New_Character.FormCharacterCharacteristics');

  const { xp, characteristics, setCharacteristic, isEdit, previousCharacteristics } =
    useCreateNewCharacterStore();

  const CharsXP = useMemo(() => characteristicsXpValue(characteristics), [characteristics]);
  const isCharXpOk = useMemo(() => CharsXP > 200 && CharsXP <= xp, [xp, CharsXP]);

  type Caracteristic = keyof typeof characteristics;

  function onCharacteristicChange(
    e: React.ChangeEvent<HTMLInputElement>,
    characteristic: Caracteristic
  ) {
    const value = Number(e.target.value);

    const characteristicsUpdatedValues = { ...characteristics, [characteristic]: value };
    const characteristicsUpdatedXpValue = characteristicsXpValue(characteristicsUpdatedValues);

    if (characteristicsUpdatedXpValue > xp) return;

    if (isEdit && value < previousCharacteristics[characteristic]) return;

    setCharacteristic({ key: characteristic, value });
  }

  const xpStyle = isCharXpOk ? '' : 'text-error';
  return (
    <div className="w-full max-w-xs h-96">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">{t('Characteristics')}</h2>
        <p className={xpStyle}>
          <strong>XP: </strong> {CharsXP}/{xp}
        </p>
      </div>

      <small>{t('tip1')}</small>
      <br />
      <small>{t('tip2')}</small>

      <div className="flex flex-wrap justify-between gap-4 my-4">
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                {C('Strength')} ({C('STR')}) +{characteristics.strength}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={characteristics.strength}
              onChange={(e) => onCharacteristicChange(e, 'strength')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                {C('Dexterity')} ({C('DEX')}) +{characteristics.dexterity}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={characteristics.dexterity}
              onChange={(e) => onCharacteristicChange(e, 'dexterity')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                {C('Constitution')} ({C('CON')}) +{characteristics.constitution}
              </span>
            </div>
            <input
              type="range"
              min="1"
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
              <span className="label-text">
                {C('Intelligence')} ({C('INT')}) +{characteristics.intelligence}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={characteristics.intelligence}
              onChange={(e) => onCharacteristicChange(e, 'intelligence')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                {C('Wisdom')} ({C('WIS')}) +{characteristics.wisdom}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={characteristics.wisdom}
              onChange={(e) => onCharacteristicChange(e, 'wisdom')}
              className="range"
              step="1"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                {C('Charisma')} ({C('CHA')}) +{characteristics.charisma}
              </span>
            </div>
            <input
              type="range"
              min="1"
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
