'use client';

import { characteristicsXpValue } from 'utils/characteristics-xp-value';
import { Character, Characteristic } from 'types/character';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { esMsgRoll2d6 } from 'utils/roll-2d6';
import { useTTSStore } from 'hooks/use-tts-store';
import { AI_ROLE } from 'config/constants';

interface CardPlayCharacterProps {
  character: Character;
}

export default function CardPlayCharacter({ character }: CardPlayCharacterProps) {
  const { id, xp, name, characteristics } = character;
  const { strength, dexterity, constitution, intelligence, wisdom, charisma } = characteristics;
  const CharsXP = characteristicsXpValue(characteristics);
  const { handleStop } = useTTSStore();

  const { addContent, isLoadingContent, addPlayersDiceRoll } = useGmAiStore();
  function rollCharacteristic(characteristic: Characteristic, value: number): void {
    const rolResult = esMsgRoll2d6(name, characteristic, value, addPlayersDiceRoll);
    handleStop();
    addContent({
      role: AI_ROLE.USER,
      parts: [{ text: rolResult }],
    });
  }

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

        <h3 className="text-center">Pruebas de Característica</h3>
        <p className="text-xs text-center text-info mt-[-0.5rem]">* Elige una opción</p>

        <div className="flex justify-around items-center mt-2 font-bold">
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('strength', strength)}
              disabled={isLoadingContent}
            >
              <div>
                <h4>FUE</h4>
                <p className="text-xs">2d6+{strength}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('dexterity', dexterity)}
              disabled={isLoadingContent}
            >
              <div>
                <h4>DES</h4>
                <p className="text-xs">2d6+{dexterity}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('constitution', constitution)}
              disabled={isLoadingContent}
            >
              <div>
                <h4>CON</h4>
                <p className="text-xs">2d6+{constitution}</p>
              </div>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('intelligence', intelligence)}
              disabled={isLoadingContent}
            >
              <div>
                <h4>INT</h4>
                <p className="text-xs">2d6+{intelligence}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('wisdom', wisdom)}
              disabled={isLoadingContent}
            >
              <div>
                <h4>SAB</h4>
                <p className="text-xs">2d6+{wisdom}</p>
              </div>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('charisma', charisma)}
              disabled={isLoadingContent}
            >
              <div>
                <h4>CAR</h4>
                <p className="text-xs">2d6+{charisma}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
