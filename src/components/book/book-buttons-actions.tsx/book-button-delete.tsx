'use client';

import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { Book } from 'types/library';

export default function BookButtonDelete({ book }: { book: Book }) {
  const { setModalContent, setModalIsOpen } = useModalState();

  function handleDeleteBook() {
    setModalContent(<ModalDeleteBook id={book.id} />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-sm btn-error" onClick={handleDeleteBook}>
      Eliminar
    </button>
  );
}

function ModalDeleteBook({ id }: { id: string }) {
  const { setModalIsOpen } = useModalState();
  const { removeBook } = useLibraryStore();

  return (
    <div>
      <h3 className="font-bold text-lg">¿Estás seguro de borrar este libro?</h3>
      <p className="py-4">Esta acción no se puede deshacer.</p>

      <div className="modal-action">
        <button
          className="btn btn-error"
          onClick={() => {
            removeBook(id);
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
