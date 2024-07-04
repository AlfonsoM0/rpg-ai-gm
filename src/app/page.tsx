'use client';

import CardCharacter from 'components/card-character';
import { useCharacterStore } from 'hooks/use-character-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const { allCharacters } = useCharacterStore();
  const { clearAllCharacterInfo } = useCreateNewCharacterStore();

  function onCreateNewCharacterClick() {
    clearAllCharacterInfo();
    router.push('/new-character');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Main Page</h1>

      <section>
        <h2 className="text-center font-bold text-2xl my-2">Mis Personajes</h2>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="card w-80 h-60 border border-primary-content rounded-lg shadow-md">
            <button
              className="flex flex-col justify-center items-center gap-4 mt-[15%]"
              onClick={onCreateNewCharacterClick}
            >
              <div>
                <h2 className="card-title">¡Crear un personaje Nuevo!</h2>
              </div>
              <div className="text-7xl">➕</div>
            </button>
          </div>

          {allCharacters.map((character) => (
            <CardCharacter key={character.id} character={character} />
          ))}
        </div>
      </section>
    </main>
  );
}
