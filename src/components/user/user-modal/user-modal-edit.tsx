'use client';

import { ModalContentContainer } from 'components/modal';
import UserFormInfo from '../form/user-form-info';
import { useTranslations } from 'next-intl';

export default function ModalUserEditProfile() {
  const t = useTranslations('User.modal.ModalUserEditProfile');
  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <UserFormInfo />
    </ModalContentContainer>
  );
}
