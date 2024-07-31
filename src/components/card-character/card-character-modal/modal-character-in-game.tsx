'use client';

import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';

export default function ModalCharacterInGame() {
  const t = useTranslations('CardCharacter.modal.character_in_game');
  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <p className="py-4">{t('p')}</p>
    </ModalContentContainer>
  );
}
