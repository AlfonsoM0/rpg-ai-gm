'use client';

import { ModalContentContainer } from 'src/components/modal';
import { useTranslations } from 'next-intl';

export default function ModalContinueMpError({ isFail }: { isFail?: boolean }) {
  const t = useTranslations('Card_Book.modal.ModalContinueMpError');

  const title = isFail ? t('title_fail') : t('p_error');
  const description = isFail ? t('p_fail') : t('p_error');
  const color = isFail ? 'warning' : 'error';

  return (
    <ModalContentContainer title={title} titleColor={color}>
      <p className="mt-4">{description}</p>
    </ModalContentContainer>
  );
}
