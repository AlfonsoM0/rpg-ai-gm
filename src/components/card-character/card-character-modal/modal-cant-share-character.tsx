'use client';

import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';

export default function ModalCantShareCharacter() {
  const t = useTranslations('CardCharacter.modal.cant_share');
  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <>
        <p>{t('p')}</p>
      </>
    </ModalContentContainer>
  );
}
