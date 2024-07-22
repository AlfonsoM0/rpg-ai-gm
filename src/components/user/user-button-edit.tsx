'use client';

import { useModalState } from 'hooks/use-modal-state';
import UserFormInfo from './form/user-form-info';
import { ModalContentContainer } from 'components/modal';

export default function UserButtonEditProfile() {
  // const router = useRouter();

  const { setModalContent, setModalIsOpen } = useModalState();

  function handleEditProfile() {
    setModalContent(<ModalEditProfile />);
    setModalIsOpen(true);
  }

  return (
    <button className="btn btn-primary w-full" onClick={handleEditProfile}>
      Editar mi Perfil
    </button>
  );
}

function ModalEditProfile() {
  return (
    <ModalContentContainer title="Mi Perfil" titleColor="info">
      <UserFormInfo />
    </ModalContentContainer>
  );
}
