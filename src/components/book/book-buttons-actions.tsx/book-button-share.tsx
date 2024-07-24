'use client';

import { ModalContentContainer } from 'components/modal';
import useFirebase from 'hooks/firebase';
import { useModalState } from 'hooks/use-modal-state';
import { Book } from 'types/library';

export default function BookButtonShare({ book }: { book: Book }) {
  const { setModalContent, setModalIsOpen } = useModalState();
  const { userAccount } = useFirebase();

  function hadleShareBook() {
    const domain = window.location.origin;
    const urlToShare = `${domain}/library/book/${userAccount?.id}_${book.id}`;

    setModalContent(<ModalShareBook urlToShare={urlToShare} />);
    setModalIsOpen(true);

    // copy book link to clipboard
    navigator.clipboard.writeText(urlToShare);
  }

  return (
    <button className="btn btn-sm btn-primary" onClick={hadleShareBook}>
      Compartir
    </button>
  );
}

function ModalShareBook({ urlToShare }: { urlToShare: string }) {
  return (
    <ModalContentContainer title="Compartir Libro" titleColor="primary">
      <>
        <p className="my-4">Se copiado la URL del libro al portapapeles.</p>
        <a className="link text-primary" href={urlToShare} target="_blank" rel="noreferrer">
          Ver libro en el navegador
        </a>
      </>
    </ModalContentContainer>
  );
}