'use client';

import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';
import { Book } from 'types/library';
import ModalDeleteBook from '../book-modals/book-modal-delete';

export default function BookButtonDelete({ book }: { book: Book }) {
  const t = useTranslations('Card_Book.btn');

  const { setModalContent, setModalIsOpen } = useModalState();

  function handleDeleteBook() {
    setModalContent(<ModalDeleteBook id={book.id} />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-sm btn-error" onClick={handleDeleteBook}>
      {t('BookButtonDelete')}
    </button>
  );
}
