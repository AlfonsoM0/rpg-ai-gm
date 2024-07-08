'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Character } from 'types/character';
import { characteristicsXpValue } from 'utils/characteristics-xp-value';

interface CardCharacterProps {
  character: Character;
  isViewOnly?: boolean;
}

export default function CardCharacter({ character, isViewOnly }: CardCharacterProps) {
  const router = useRouter();
  const { setAllCharacterInfo, setStep } = useCreateNewCharacterStore();
  const { removeInGameCharacter, inGameCharacters, addInGameCharacter } = useCharacterStore();
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
    setModalContent(<ModalDeleteCharacter id={id} />);
    setModalIsOpen(true);
  }

  function editCharacter() {
    setAllCharacterInfo(character);
    setStep(7);
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
      removeInGameCharacter(id);
    } else {
      if (inGameCharacters.length >= 2) {
        setModalContent(ModalMaximumCharacters);
        setModalIsOpen(true);
        return;
      }
      addInGameCharacter(character);
    }
  }

  const borderStyle = isInGame
    ? 'card w-80 border-2 border-success rounded-lg shadow-md'
    : 'card w-80 border border-primary-content rounded-lg shadow-md';

  return (
    <div className={borderStyle}>
      <div className="card-body p-2">
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
            <p>{appearance}</p>
            <br />

            <h3>
              <strong>Trasfondo: </strong>
            </h3>
            <p>{background}</p>
            <br />

            <h3>
              <strong>Profesión: </strong>
            </h3>
            <p>{profession}</p>
            <br />

            <h3>
              <strong>Personalidad: </strong>
            </h3>
            <p>{personality}</p>
            <br />

            <h3>
              <strong>Equipamiento: </strong>
            </h3>
            <p>{equipment}</p>
            <br />

            <h3>
              <strong>Poderes: </strong>
            </h3>
            <p>{powers ? powers : 'No posee poderes.'}</p>
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
      </div>
    </div>
  );
}

function ModalDeleteCharacter({ id }: { id: string }) {
  const { setModalIsOpen } = useModalState();
  const { removeAllCharacter, removeInGameCharacter } = useCharacterStore();

  return (
    <div>
      <h3 className="font-bold text-lg">¿Estás seguro de borrar este personaje?</h3>
      <p className="py-4">Esta acción no se puede deshacer.</p>

      <div className="modal-action">
        <button
          className="btn btn-error"
          onClick={() => {
            removeAllCharacter(id);
            removeInGameCharacter(id);
            setModalIsOpen(false);
          }}
        >
          Si, borrar
        </button>
        <button className="btn btn-success" onClick={() => setModalIsOpen(false)}>
          No, cancelar
        </button>
      </div>
    </div>
  );
}

const ModalCharacterInPlay = (
  <div>
    <h3 className="font-bold text-lg">Personaje en Juego</h3>
    <p className="py-4">
      No puedes reclutar o despedir personajes si tu historia actual no ha terminado.
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
