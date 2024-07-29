'use client';

import { ModalContentContainer } from 'components/modal';
import { useCharacterStore } from 'hooks/use-character-store';
import { useModalState } from 'hooks/use-modal-state';

export default function ModalDeleteCharacter({ id }: { id: string }) {
  const { setModalIsOpen } = useModalState();
  const { removeACharacterFromCollection, removeACharacterFromInGame } = useCharacterStore();

  return (
    <ModalContentContainer title="¿Estás seguro de borrar este personaje?" titleColor="error">
      <>
        <p className="py-4">Esta acción no se puede deshacer.</p>

        <div className="modal-action justify-between">
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
