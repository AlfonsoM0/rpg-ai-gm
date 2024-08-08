'use client';

import { ModalContentContainer } from 'components/modal';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Book } from 'types/library';

export default function ModalEditBook({ book }: { book: Book }) {
  const t = useTranslations('Card_Book.modal.ModalEditBook');

  const { setModalIsOpen } = useModalState();
  const { changeBookName } = useLibraryStore();

  const [newTitle, setNewTitle] = useState(book.title);

  return (
    <ModalContentContainer title={t('title')} titleColor="warning">
      <>
        <p className="py-4">{t('p')}</p>

        <input
          className="input input-bordered w-full text-center"
          type="text"
          placeholder={t('input_placeholder')}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <div className="modal-action justify-around">
          <button
            className="btn btn-error"
            onClick={() => setModalIsOpen(false)}
            aria-label={t('btn.cancel')}
          >
            {t('btn.cancel')}
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              changeBookName(book.id, newTitle);
              setModalIsOpen(false);
            }}
            aria-label={t('btn.Save')}
          >
            {t('btn.Save')}
          </button>
        </div>
      </>
    </ModalContentContainer>
  );
}
