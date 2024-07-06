'use client';

import CardCharacter from 'components/card-character';
import { useCharacterStore } from 'hooks/use-character-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { isCharacterHaveTheSameInfo } from 'utils/is-characters-info-changed';

export default function Home() {
  const router = useRouter();

  const { allCharacters, inGameCharacters, setStep } = useCharacterStore();
  const { clearAllCharacterInfo } = useCreateNewCharacterStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { content, addContent, resetChat } = useGmAiStore();

  const isStoryStarted = useMemo(() => content.length > 3, [content]);

  function onCreateNewCharacterClick() {
    clearAllCharacterInfo();
    setStep(0);
    router.push('/new-character');
  }

  function playStory() {
    if (!inGameCharacters.length) {
      setModalContent(ModalNoCharactersToPlay);
      return setModalIsOpen(true);
    }

    if (content.length < 2) {
      addContent({
        role: 'user',
        parts: [
          {
            text: `**Player Characters** \n\n ${JSON.stringify(inGameCharacters)}`,
          },
        ],
      });
    }

    if (content.length > 3) {
      let charactersChanged = false;
      inGameCharacters.forEach((character) => {
        if (!isCharacterHaveTheSameInfo(inGameCharacters, character)) charactersChanged = true;
      });

      if (charactersChanged)
        addContent({
          role: 'user',
          parts: [
            {
              text: `**Player Characters** \n Update the list of characters information as follows. \n\n ${JSON.stringify(
                inGameCharacters
              )}`,
            },
          ],
        });
    }

    router.push('/story');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Main Page</h1>

      <section className="flex flex-wrap justify-around items-center gap-4 border-2 p-4 rounded-md shadow-lg bg-primary-content">
        <button className="btn btn-lg" onClick={playStory}>
          ▶️ {isStoryStarted ? 'CONTINUAR HISTORIA' : 'JUGAR UNA HISTORIA'}
        </button>
        <div>
          <h2 className="text-center font-bold text-2xl my-2">Personajes Reclutados</h2>
          <p className="text-center">
            {inGameCharacters.length
              ? `${inGameCharacters.map((character) => character.name).join(', ')}.`
              : 'No hay personajes reclutados.'}
          </p>
        </div>
      </section>

      <section className="my-4">
        <h2 className="text-center font-bold text-2xl my-2">Mis Personajes</h2>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="card w-80 h-60 border border-primary-content rounded-lg shadow-md">
            <button
              className="flex flex-col justify-center items-center mt-[15%]"
              onClick={onCreateNewCharacterClick}
            >
              <div>
                <h2 className="card-title">¡Crear un personaje Nuevo!</h2>
              </div>
              <div className="text-9xl text-success">+</div>
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

const ModalNoCharactersToPlay = (
  <div>
    <h3 className="font-bold text-lg">No tienes personajes reclutados</h3>
    <p className="py-4">Recluta al menos un personaje.</p>
  </div>
);
