'use client';

import { Skeleton_CardCharacter } from 'components/card-character';
import H1 from 'components/h1';
import H2 from 'components/h2';
import { Icon } from 'components/icons';
import { Input } from 'components/input';
import Main from 'components/Main';
import { ModalContentContainer } from 'components/modal';
import { AI_ROLE, CODE_CHARACTERS_CHANGE, CODE_DONT_SHOW_IN_CHAT } from 'config/constants';
import { useCharacterStore } from 'hooks/use-character-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Character } from 'types/character';
import { areTheSameInGameCharacters } from 'utils/are-the-same-in-game-characters';

const DynamicCardCharacter = dynamic(() => import('components/card-character'), {
  ssr: false,
  loading: Skeleton_CardCharacter,
});

export default function Home() {
  const router = useRouter();

  const {
    charactersCollection,
    inGameCharacters,
    removeACharacterFromInGame,
    addACharacterToInGame,
  } = useCharacterStore();
  const { clearAllCharacterInfo, setStep } = useCreateNewCharacterStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { content, addContent, isStoryStarted, setIsStoryStarted } = useGmAiStore();

  const [search, setSearch] = useState('');

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
        role: AI_ROLE.USER,
        parts: [
          {
            text: `(((Información de mis personajes: ${JSON.stringify(inGameCharacters)}
            ${CODE_DONT_SHOW_IN_CHAT})))`,
          },
        ],
      });
    }

    const areTheSameChars = areTheSameInGameCharacters(charactersCollection, inGameCharacters);
    if (isStoryStarted && !areTheSameChars) {
      const newCharactersInGame = inGameCharacters.map((char) => {
        const findUpdatedChar = charactersCollection.find((c) => c.id === char.id) || char;
        removeACharacterFromInGame(char.id);
        addACharacterToInGame(findUpdatedChar);
        return findUpdatedChar;
      });
      addContent({
        role: AI_ROLE.USER,
        parts: [
          {
            text: `(((Actualiza mis personajes con la siguiente información: ${JSON.stringify(
              newCharactersInGame
            )}.
            Muéstrame los cambios en fromato de tabla comparativa para asegurarme de que todo está bien.
            ${CODE_CHARACTERS_CHANGE})))`,
          },
        ],
      });
    } else setIsStoryStarted(true);

    router.push('/story');
  }

  function searchCharacter(charactersCollection: Character[]): Character[] {
    return charactersCollection.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <Main>
      <H1>¡Bienvenido!</H1>

      <section className="flex flex-wrap justify-around items-center gap-4 border-2 p-4 mx-4 rounded-md shadow-lg bg-primary-content">
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

        {charactersCollection.length > 3 ? (
          <Input.Search
            labelclassname="m-auto mb-5"
            className="text-center"
            placeholder="Buscar por Nombre"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        ) : null}

        <div className="flex flex-wrap justify-center gap-4">
          <div className="card w-80 h-[19rem] border border-primary-content rounded-lg shadow-md">
            <button
              className="flex flex-col justify-center items-center mt-[25%]"
              onClick={onCreateNewCharacterClick}
            >
              <div>
                <h2 className="card-title">¡Crear un personaje Nuevo!</h2>
              </div>
              <div className="text-9xl text-success">+</div>
            </button>
          </div>

          {searchCharacter(charactersCollection).map((character) => (
            <DynamicCardCharacter key={character.id} character={character} />
          ))}
        </div>
      </section>
    </Main>
  );
}

const ModalNoCharactersToPlay = (
  <ModalContentContainer title="No tienes personajes reclutados" titleColor="error">
    <div>
      <p className="mt-4 text-center">¡Recluta a un personaje!</p>

      <p className="font-bold text-lg mt-4 mb-2 text-center text-info">
        ¿Es la primera vez que juegas?
      </p>
      <ol className="max-w-80 m-auto ml-4">
        <li className="list-decimal">Crea un nuevo personaje... o dos...</li>
        <li className="list-decimal">Recluta tus personajes para la historia.</li>
        <li className="list-decimal">Haz click en &quot;Jugar una Historia&quot; para comenzar.</li>
        <li className="list-decimal">
          Pregunta a tu Game Master AI si necesitas ayuda para entender las reglas o qué es un juego
          de rol de mesa.
        </li>
        <li className="list-decimal">
          En tu perfil, puedes activar y configurar la voz de tu GmAi con la opción &nbsp;
          <Icon.AiBrain className="w-4 h-4 fill-primary inline"></Icon.AiBrain>.
        </li>
        <li className="list-decimal">
          En tu perfil, puedes cambiar los colores de la app con la opción &nbsp;
          <Icon.Art className="w-4 h-4 fill-primary inline"></Icon.Art>.
        </li>
        <li className="list-decimal">¡Disfruta de la aventura!</li>
      </ol>
    </div>
  </ModalContentContainer>
);
