'use client';

import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';
import { Book } from 'types/library';
import ModalEditBook from '../book-modals/book-modal-edit';

export default function BookButtonEdit({ book }: { book: Book }) {
  const t = useTranslations('Card_Book.btn');

  const { setModalContent, setModalIsOpen } = useModalState();

  function handleEditBook() {
    setModalContent(<ModalEditBook book={book} />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-sm btn-warning" onClick={handleEditBook}>
      {t('BookButtonEdit')}
    </button>
  );
}
