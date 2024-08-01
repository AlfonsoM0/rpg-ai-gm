'use client';

import useFirebase from 'hooks/firebase';
import { useModalState } from 'hooks/use-modal-state';
import { Character } from 'types/character';
import ModalShareCharacter from '../card-character-modal/modal-share-character';
import ModalCantShareCharacter from '../card-character-modal/modal-cant-share-character';
import { useTranslations } from 'next-intl';

interface ShareCharacterProps {
  character: Character;
}

export default function ButtonShareCharacter({ character }: ShareCharacterProps) {
  const t = useTranslations('CardCharacter.btn');
  const locale = useTranslations()('[locale]');

  const { userAccount } = useFirebase();
  const { setModalContent, setModalIsOpen } = useModalState();

  function shareCharacter() {
    if (!userAccount) {
      setModalContent(<ModalCantShareCharacter />);
      setModalIsOpen(true);
      return;
    }

    const domain = window.location.origin;
    const urlToShare = `${domain}/${locale}/character/${userAccount.id}_${character.id}`;

    setModalContent(<ModalShareCharacter urlToShare={urlToShare} />);
    setModalIsOpen(true);

    // copy character link to clipboard
    navigator.clipboard.writeText(urlToShare);
  }

  return (
    <button className="btn btn-sm btn-primary" onClick={shareCharacter}>
      {t('share')}
    </button>
  );
}
