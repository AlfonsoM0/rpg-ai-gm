'use client';

import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';

export default function ModalShareCharacter({ urlToShare }: { urlToShare: string }) {
  const t = useTranslations('CardCharacter.modal.share');

  return (
    <ModalContentContainer title={t('title')} titleColor="primary">
      <>
        <p className="my-4">{t('p')}</p>
        <a className="link text-primary" href={urlToShare} target="_blank" rel="noreferrer">
          {t('a')}
        </a>
      </>
    </ModalContentContainer>
  );
}
