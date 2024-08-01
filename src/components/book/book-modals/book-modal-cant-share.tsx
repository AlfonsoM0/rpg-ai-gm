'use client';

import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';

export default function ModalCantShareBook() {
  const t = useTranslations('Card_Book.modal.ModalCantShareBook');

  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <>
        <p>{t('p')}</p>
      </>
    </ModalContentContainer>
  );
}
