'use client';

import CardCharacter from 'components/card-character';
import H1 from 'components/h1';
import H2 from 'components/h2';
import Main from 'components/Main';
import { CODE_CHARACTERS_CHANGE, CODE_DONT_SHOW_IN_CHAT } from 'config/constants';
import { useCharacterStore } from 'hooks/use-character-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useRouter } from 'next/navigation';
import { areTheSameInGameCharacters } from 'utils/are-the-same-in-game-characters';

export default function Home() {
  const router = useRouter();

  const { allCharacters, inGameCharacters, removeInGameCharacter, addInGameCharacter } =
    useCharacterStore();
  const { clearAllCharacterInfo, setStep } = useCreateNewCharacterStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { content, addContent, isStoryStarted, setIsStoryStarted } = useGmAiStore();

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

    if (!content.length) {
      addContent({
        role: 'user',
        parts: [
          {
            text: `Información de mis personajes: ${JSON.stringify(inGameCharacters)}
            ${CODE_DONT_SHOW_IN_CHAT}`,
          },
        ],
      });
    }

    const areTheSameChars = areTheSameInGameCharacters(allCharacters, inGameCharacters);
    if (isStoryStarted && !areTheSameChars) {
      const newCharactersInGame = inGameCharacters.map((char) => {
        const findUpdatedChar = allCharacters.find((c) => c.id === char.id) || char;
        removeInGameCharacter(char.id);
        addInGameCharacter(findUpdatedChar);
        return findUpdatedChar;
      });
      addContent({
        role: 'user',
        parts: [
          {
            text: `Actualiza mis personajes con la siguiente información: ${JSON.stringify(
              newCharactersInGame
            )}.
            Muéstrame los cambios para asegurarme de que todo está bien.
            ${CODE_CHARACTERS_CHANGE}`,
          },
        ],
      });
    } else setIsStoryStarted(true);

    router.push('/story');
  }

  return (
    <Main>
      <H1>¡Bienvenido!</H1>

      <section className="flex flex-wrap justify-around items-center gap-4 border-2 p-4 rounded-md shadow-lg bg-primary-content">
        <button className="btn btn-lg" onClick={playStory}>
          ▶️ {isStoryStarted ? 'CONTINUAR HISTORIA' : 'JUGAR UNA HISTORIA'}
        </button>
        <div>
          <h2 className="text-center text-primary font-bold text-2xl my-2">
            Personajes Reclutados
          </h2>
          <p className="text-center text-primary">
            {inGameCharacters.length
              ? `${inGameCharacters.map((character) => character.name).join(', ')}.`
              : 'No hay personajes reclutados.'}
          </p>
        </div>
      </section>

      <section className="my-4">
        <H2>Mis Personajes</H2>

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
    </Main>
  );
}

const ModalNoCharactersToPlay = (
  <div>
    <h3 className="font-bold text-lg">No tienes personajes reclutados</h3>
    <p className="py-4">Recluta al menos un personaje.</p>
  </div>
);
