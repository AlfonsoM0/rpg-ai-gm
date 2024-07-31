'use client';

import { ModalContentContainer } from 'components/modal';
import { useCharacterStore } from 'hooks/use-character-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';

export default function ModalDeleteCharacter({ id }: { id: string }) {
  const t = useTranslations('CardCharacter.modal.delete_character');

  const { setModalIsOpen } = useModalState();
  const { removeACharacterFromCollection, removeACharacterFromInGame } = useCharacterStore();

  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <>
        <p className="py-4">{t('p')}</p>

        <div className="modal-action justify-between">
          <button
            className="btn btn-error"
            onClick={() => {
              removeACharacterFromCollection(id);
              removeACharacterFromInGame(id);
              setModalIsOpen(false);
            }}
          >
            {t('btn.accept')}
          </button>
          <button className="btn btn-success" onClick={() => setModalIsOpen(false)}>
            {t('btn.cancel')}
          </button>
        </div>
      </>
    </ModalContentContainer>
  );
}
