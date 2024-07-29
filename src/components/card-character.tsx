'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Character } from 'types/character';
import { characteristicsXpValue } from 'utils/characteristics-xp-value';
import { ModalContentContainer } from './modal';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

interface CardCharacterProps {
  character: Character;
  isViewOnly?: boolean;
  isFromAnotherUser?: boolean;
}

export default function CardCharacter({
  character,
  isViewOnly,
  isFromAnotherUser,
}: CardCharacterProps) {
  const router = useRouter();
  const { setAllCharacterInfo, setStep, setIsEdit, setPreviousCharacteristics } =
    useCreateNewCharacterStore();
  const { removeACharacterFromInGame, inGameCharacters, addACharacterToInGame } =
    useCharacterStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { isStoryStarted } = useGmAiStore();

  const {
    id,
    xp,
    name,
    appearance,
    background,
    profession,
    personality,
    equipment,
    powers,
    characteristics,
  } = character;
  const { strength, dexterity, constitution, intelligence, wisdom, charisma } = characteristics;

  const CharsXP = useMemo(() => characteristicsXpValue(characteristics), [characteristics]);
  const [check, setCheck] = useState(false);

  function deleteCharacter() {
    if (isStoryStarted) {
      setModalContent(ModalCharacterInPlay);
      setModalIsOpen(true);
      return;
    }
    setModalContent(<ModalDeleteCharacter id={id} />);
    setModalIsOpen(true);
  }

  function editCharacter() {
    setAllCharacterInfo(character);
    setPreviousCharacteristics(character.characteristics);
    setIsEdit(true);
    setStep(7);
    router.push('/new-character');
  }

  function copyCharacter() {
    setAllCharacterInfo({
      ...character,
      id: crypto.randomUUID(),
      xp: 250,
    });

    router.push('/new-character');
  }

  const isInGame = useMemo(
    () => Boolean(inGameCharacters.find((c) => c.id === id)),
    [inGameCharacters, id]
  );
  function selectCharacter() {
    if (isStoryStarted) {
      setModalContent(ModalCharacterInPlay);
      setModalIsOpen(true);
      return;
    }

    if (isInGame) {
      removeACharacterFromInGame(id);
    } else {
      if (inGameCharacters.length >= 2) {
        setModalContent(ModalMaximumCharacters);
        setModalIsOpen(true);
        return;
      }
      addACharacterToInGame(character);
    }
  }

  const borderStyle = isInGame
    ? 'card w-80 border-2 border-success rounded-lg shadow-xl'
    : 'card w-80 border border-primary-content rounded-lg shadow-xl';

  return (
    <div className={borderStyle}>
      <div className="card-body p-2">
        <div className="flex justify-between items-center h-14 gap-4">
          <div>
            <h2 className="card-title">{name}</h2>
          </div>
          <div>
            <p className="text-xs text-info">
              <strong>XP: </strong> {CharsXP}/{xp}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center font-bold gap-10">
          <div>
            <h3>FUE +{strength}</h3>
            <h3>DES +{dexterity}</h3>
            <h3>CON +{constitution}</h3>
          </div>
          <div>
            <h3>INT +{intelligence}</h3>
            <h3>SAB +{wisdom}</h3>
            <h3>CAR +{charisma}</h3>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200" onClick={() => setCheck(!check)}>
          <input type="radio" name={id} checked={check} readOnly />
          <div className="collapse-title font-medium">Descripción</div>
          <div className="collapse-content">
            <h3>
              <strong>Apariencia: </strong>
            </h3>
            <Markdown options={mdOpt}>{appearance}</Markdown>
            <br />

            <h3>
              <strong>Trasfondo: </strong>
            </h3>
            <Markdown options={mdOpt}>{background}</Markdown>
            <br />

            <h3>
              <strong>Profesión: </strong>
            </h3>
            <Markdown options={mdOpt}>{profession}</Markdown>
            <br />

            <h3>
              <strong>Personalidad: </strong>
            </h3>
            <Markdown options={mdOpt}>{personality}</Markdown>
            <br />

            <h3>
              <strong>Equipamiento: </strong>
            </h3>
            <Markdown options={mdOpt}>{equipment}</Markdown>
            <br />

            <h3>
              <strong>Poderes: </strong>
            </h3>
            <Markdown options={mdOpt}>{powers ? powers : 'No posee poderes.'}</Markdown>
            <br />
          </div>
        </div>

        {isViewOnly ? null : (
          <div className="card-actions justify-between">
            <button className="btn btn-sm btn-error" onClick={deleteCharacter}>
              Borrar
            </button>
            <button className="btn btn-sm btn-info" onClick={editCharacter}>
              Editar
            </button>
            <button className="btn btn-sm btn-success" onClick={selectCharacter}>
              {isInGame ? 'Despedir' : 'Reclutar'}
            </button>
          </div>
        )}

        {isFromAnotherUser ? (
          <div className="card-actions justify-center">
            <button className="btn btn-sm btn-info" onClick={copyCharacter}>
              Copiar personaje
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const mdOpt: MarkdownToJSX.Options = {
  overrides: {
    strong: {
      props: { className: 'text-info text-md' },
    },
    li: {
      props: { className: 'list-disc ml-5' },
    },
    p: {
      props: { className: 'my-2' },
    },
    a: {
      props: { className: 'text-info' },
    },
    pre: {
      component: 'div',
    },
    code: {
      component: Markdown,
    },
  },
};

function ModalDeleteCharacter({ id }: { id: string }) {
  const { setModalIsOpen } = useModalState();
  const { removeACharacterFromCollection, removeACharacterFromInGame } = useCharacterStore();

  return (
    <ModalContentContainer title="¿Estás seguro de borrar este personaje?" titleColor="error">
      <>
        <p className="py-4">Esta acción no se puede deshacer.</p>

        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={() => {
              removeACharacterFromCollection(id);
              removeACharacterFromInGame(id);
              setModalIsOpen(false);
            }}
          >
            Si, borrar
          </button>
          <button className="btn btn-success" onClick={() => setModalIsOpen(false)}>
            No, cancelar
          </button>
        </div>
      </>
    </ModalContentContainer>
  );
}

const ModalCharacterInPlay = (
  <div>
    <h3 className="font-bold text-lg">Personaje en Juego</h3>
    <p className="py-4">
      No puedes reclutar, despedir o borrar personajes si tu historia actual no ha terminado.
    </p>
  </div>
);

const ModalMaximumCharacters = (
  <div>
    <h3 className="font-bold text-lg">Tienes demasiados personajes en juego</h3>
    <p className="py-4">
      Solo puedes tener 2 personajes en juego a la vez. Elimina alguno para poder reclutar otro.
    </p>
  </div>
);

export const Skeleton_CardCharacter = () => (
  <div className="flex w-80 flex-col gap-4">
    <div className="flex items-center gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
    <div className="skeleton h-44 w-full"></div>
  </div>
);
