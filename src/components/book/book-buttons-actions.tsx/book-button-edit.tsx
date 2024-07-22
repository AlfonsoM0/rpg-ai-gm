'use client';

import { ModalContentContainer } from 'components/modal';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useState } from 'react';
import { Book } from 'types/library';

export default function BookButtonEdit({ book }: { book: Book }) {
  const { setModalContent, setModalIsOpen } = useModalState();

  function handleEditBook() {
    setModalContent(<ModalEditBook book={book} />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-sm btn-warning" onClick={handleEditBook}>
      Editar
    </button>
  );
}

function ModalEditBook({ book }: { book: Book }) {
  const { setModalIsOpen } = useModalState();
  const { changeBookName } = useLibraryStore();

  const [newTitle, setNewTitle] = useState(book.title);

  return (
    <ModalContentContainer title="Editar Libro" titleColor="warning">
      <>
        <p className="py-4">Edita el nombre del libro.</p>

        <input
          className="input input-bordered w-full text-center"
          type="text"
          placeholder="Nombre de la Historia"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <div className="modal-action justify-around">
          <button className="btn btn-error" onClick={() => setModalIsOpen(false)}>
            Cancelar
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              changeBookName(book.id, newTitle);
              setModalIsOpen(false);
            }}
          >
            Guardar
          </button>
        </div>
      </>
    </ModalContentContainer>
  );
}
