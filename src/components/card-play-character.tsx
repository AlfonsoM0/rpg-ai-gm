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

        <div className="flex justify-around items-center mt-2 font-bold">
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('strength', strength)}
              disabled={isLoadingContent}
            >
              <h3>FUE +{strength}</h3>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('dexterity', dexterity)}
              disabled={isLoadingContent}
            >
              <h3>DES +{dexterity}</h3>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('constitution', constitution)}
              disabled={isLoadingContent}
            >
              <h3>CON +{constitution}</h3>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('intelligence', intelligence)}
              disabled={isLoadingContent}
            >
              <h3>INT +{intelligence}</h3>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('wisdom', wisdom)}
              disabled={isLoadingContent}
            >
              <h3>SAB +{wisdom}</h3>
            </button>
            <button
              className="btn hover:border-info"
              onClick={() => rollCharacteristic('charisma', charisma)}
              disabled={isLoadingContent}
            >
              <h3>CAR +{charisma}</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
