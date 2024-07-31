'use client';

import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';

export default function ModalLowContentAlert() {
  const t = useTranslations('Page_New_Character.ModalLowContentAlert');

  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <p>{t('p')}</p>
    </ModalContentContainer>
  );
}
