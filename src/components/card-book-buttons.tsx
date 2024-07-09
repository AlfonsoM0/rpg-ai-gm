'use client';

import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Book } from 'types/library';

export default function CardBookButtonsActions({ book }: { book: Book }) {
  const router = useRouter();

  const { setModalContent, setModalIsOpen } = useModalState();
  const { setBookSelected } = useLibraryStore();

  function handleRemoveBook() {
    setModalContent(<ModalDeleteBook id={book.id} />);
    setModalIsOpen(true);
  }

  function handleEditBook() {
    setModalContent(<ModalEditBook book={book} />);
    setModalIsOpen(true);
  }

  function hadleOpenBook() {
    setBookSelected(book);
    router.push('/library/book');
  }
  return (
    <>
      <button className="btn btn-sm btn-error" onClick={handleRemoveBook}>
        Eliminar
      </button>
      <button className="btn btn-sm btn-success" onClick={handleEditBook}>
        Editar
      </button>
      <button className="btn btn-sm btn-primary" onClick={hadleOpenBook}>
        Abrir
      </button>
    </>
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

function ModalEditBook({ book }: { book: Book }) {
  const { setModalIsOpen } = useModalState();
  const { changeBookName } = useLibraryStore();

  const [newTitle, setNewTitle] = useState(book.title);

  return (
    <div>
      <h3 className="font-bold text-lg">Nombre del Libro</h3>
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
    </div>
  );
}
