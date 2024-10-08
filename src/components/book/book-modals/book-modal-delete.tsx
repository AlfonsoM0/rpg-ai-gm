'use client';

import { ModalContentContainer } from 'components/modal';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';

export default function ModalDeleteBook({ id }: { id: string }) {
  const t = useTranslations('Card_Book.modal.ModalDeleteBook');

  const { setModalIsOpen } = useModalState();
  const { removeBook, removeBookMp, isSinglePlayer } = useLibraryStore();

  function onRemoveClick() {
    if (isSinglePlayer) removeBook(id);
    else removeBookMp(id);
    setModalIsOpen(false);
  }

  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <>
        <p className="py-4">{t('p')}</p>

        <div className="modal-action justify-around">
          <button className="btn btn-error" onClick={onRemoveClick} aria-label={t('btn.accept')}>
            {t('btn.accept')}
          </button>
          <button
            className="btn btn-success"
            onClick={() => setModalIsOpen(false)}
            aria-label={t('btn.cancel')}
          >
            {t('btn.cancel')}
          </button>
        </div>
      </>
    </ModalContentContainer>
  );
}
