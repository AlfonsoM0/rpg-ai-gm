'use client';

import { useModalState } from 'hooks/use-modal-state';
import ModalUserEditProfile from '../user-modal/user-modal-edit';
import { useTranslations } from 'next-intl';

export default function UserButtonEditProfile() {
  const t = useTranslations('User.btn');

  const { setModalContent, setModalIsOpen } = useModalState();

  function handleEditProfile() {
    setModalContent(<ModalUserEditProfile />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-primary w-full" onClick={handleEditProfile}>
      {t('UserButtonEditProfile')}
    </button>
  );
}
