'use client';

import { characteristicsXpValue } from 'utils/characteristics-xp-value';
import { Character, Characteristic } from 'types/character';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { roll2d6 } from 'utils/roll-2d6';
import { useTTSStore } from 'hooks/use-tts-store';
import { AI_ROLE } from 'config/constants';
import { useTranslations } from 'next-intl';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';

interface CardPlayCharacterProps {
  character: Character;
  isMultiplayer?: boolean;
}

export default function CardPlayCharacter({ character, isMultiplayer }: CardPlayCharacterProps) {
  const t = useTranslations('Character.char');
  const tPC = useTranslations('CardPlayCharacter');

  const { id, xp, name, characteristics } = character;
  const { strength, dexterity, constitution, intelligence, wisdom, charisma } = characteristics;
  const CharsXP = characteristicsXpValue(characteristics);
  const { handleStop } = useTTSStore();

  /**
   * Single Player
   */
  const { addContent, isLoadingContent, addPlayersDiceRoll } = useGmAiStore();
  function rollCharacteristicSp(characteristic: Characteristic, value: number): void {
    handleStop();

    const Char: any = characteristic[0].toUpperCase() + characteristic.slice(1);

    const { total } = roll2d6(value);
    addPlayersDiceRoll(total);

    addContent({
      role: AI_ROLE.USER,
      parts: [
        {
          text: `**${name}** ${tPC('roll2d6.take a test')} ${t(Char)} (2d6+${value})... \n\n ${tPC(
            'roll2d6.and gets a result of'
          )}: **${total}**`,
        },
      ],
    });
  }

  /**
   * Multiplayer
   */
  const { isInGameMsg } = useMultiplayer();
  const { sendMessage } = usePlayerAcctions();
  function rollCharacteristicMp(characteristic: Characteristic, value: number): void {
    handleStop();

    const Char: any = characteristic[0].toUpperCase() + characteristic.slice(1);

    const { total } = roll2d6(value);

    const msg = `**${name}** ${tPC('roll2d6.take a test')} ${t(Char)} (2d6+${value})... \n\n ${tPC(
      'roll2d6.and gets a result of'
    )}: **${total}**`;

    sendMessage(msg, isInGameMsg);
  }

  /**
   * Render
   */
  const rollCharacteristic = isMultiplayer ? rollCharacteristicMp : rollCharacteristicSp;

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

        <h3 className="text-center">{tPC('h3_Characteristics_Rolls')}</h3>
        <p className="text-xs text-center text-info mt-[-0.5rem]">{tPC('p1_select_one_option')}</p>

        <div className="flex justify-around items-center mt-2 font-bold">
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('strength', strength)}
              disabled={isLoadingContent}
              aria-label={`Roll ${t('Strength')}: 2d6+${strength}`}
            >
              <div>
                <h4>{t('STR')}</h4>
                <p className="text-xs">2d6+{strength}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('dexterity', dexterity)}
              disabled={isLoadingContent}
              aria-label={`Roll ${t('Dexterity')}: 2d6+${dexterity}`}
            >
              <div>
                <h4>{t('DEX')}</h4>
                <p className="text-xs">2d6+{dexterity}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('constitution', constitution)}
              disabled={isLoadingContent}
              aria-label={`Roll ${t('Constitution')}: 2d6+${constitution}`}
            >
              <div>
                <h4>{t('CON')}</h4>
                <p className="text-xs">2d6+{constitution}</p>
              </div>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('intelligence', intelligence)}
              disabled={isLoadingContent}
              aria-label={`Roll ${t('Intelligence')}: 2d6+${intelligence}`}
            >
              <div>
                <h4>{t('INT')}</h4>
                <p className="text-xs">2d6+{intelligence}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('wisdom', wisdom)}
              disabled={isLoadingContent}
              aria-label={`Roll ${t('Wisdom')}: 2d6+${wisdom}`}
            >
              <div>
                <h4>{t('WIS')}</h4>
                <p className="text-xs">2d6+{wisdom}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('charisma', charisma)}
              disabled={isLoadingContent}
              aria-label={`Roll ${t('Charisma')}: 2d6+${charisma}`}
            >
              <div>
                <h4>{t('CHA')}</h4>
                <p className="text-xs">2d6+{charisma}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
