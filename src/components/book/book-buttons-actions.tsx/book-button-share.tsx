'use client';

import { ModalContentContainer } from 'components/modal';
import useFirebase from 'hooks/firebase';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';
import { Book } from 'types/library';
import ModalShareBook from '../book-modals/book-modal-share';
import ModalCantShareBook from '../book-modals/book-modal-cant-share';

export default function BookButtonShare({ book }: { book: Book }) {
  const t = useTranslations('Card_Book.btn');
  const locale = useTranslations()('[locale]');

  const { setModalContent, setModalIsOpen } = useModalState();
  const { userAccount } = useFirebase();

  function hadleShareBook() {
    if (!userAccount) {
      setModalContent(<ModalCantShareBook />);
      setModalIsOpen(true);
      return;
    }

    const domain = window.location.origin;
    const urlToShare = `${domain}/${locale}/library/book/${userAccount.id}_${book.id}`;

    setModalContent(<ModalShareBook urlToShare={urlToShare} />);
    setModalIsOpen(true);

    // copy book link to clipboard
    navigator.clipboard.writeText(urlToShare);
  }

  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={hadleShareBook}
      aria-label={t('BookButtonShare')}
    >
      {t('BookButtonShare')}
    </button>
  );
}
