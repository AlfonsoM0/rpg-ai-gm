'use client';

import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';

export default function ModalMaximumCharacters() {
  const t = useTranslations('CardCharacter.modal.maximum_characters');
  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <p className="py-4">{t('p')}</p>
    </ModalContentContainer>
  );
}
