'use client';

import CardPlayCharacter from 'components/card-play-character';
import { useCharacterStore } from 'hooks/use-character-store';
import { Character, Characteristic } from 'types/character';
import { esMsgRoll2d6 } from 'utils/roll-2d6';

export default function Page() {
  const { inGameCharacters } = useCharacterStore();

  function rollCharacteristic(name: string, characteristic: Characteristic, value: number): void {
    const rolResult = esMsgRoll2d6(name, characteristic, value);
    console.log(rolResult);
  }

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    console.log('Option => ', `Elijo la opción "${option}".`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Historia</h1>

      <section className="my-4">
        <h2 className="text-center text-2xl font-bold mb-4">Personajes Jugadores</h2>

        <div className="flex justify-center items-center gap-4">
          <h3 className="font-bold">Opciones de historia: </h3>
          <button className="btn btn-circle" onClick={() => onHistoryOptionClick('A')}>
            A
          </button>
          <button className="btn btn-circle" onClick={() => onHistoryOptionClick('B')}>
            B
          </button>
          <button className="btn btn-circle" onClick={() => onHistoryOptionClick('C')}>
            C
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {inGameCharacters.map((character) => (
            <CardPlayCharacter
              key={character.id}
              character={character}
              rollCharacteristic={rollCharacteristic}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
