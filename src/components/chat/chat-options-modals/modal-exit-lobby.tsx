'use client';

import { useTranslations } from 'next-intl';
import { ModalContentContainer } from 'src/components/modal';
import { usePlayerAcctions } from 'src/hooks/multiplayer';
import { useModalState } from 'src/hooks/use-modal-state';
import { useRouter } from 'src/navigation';

export default function ModalExitLobby() {
  const t = useTranslations('Modal_Exit_lobby');

  const router = useRouter();

  const { setModalIsOpen } = useModalState();

  const { leaveGame } = usePlayerAcctions();

  function onExitLobby() {
    leaveGame();
    setModalIsOpen(false);
    router.push('/multiplayer');
  }

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <p className="py-4">{t('p1')}</p>

      <div className="modal-action justify-around">
        <button className="btn btn-error" onClick={onExitLobby} aria-label={t('btn_End_Game')}>
          {t('btn_End_Game')}
        </button>
        <button
          className="btn btn-success"
          onClick={() => setModalIsOpen(false)}
          aria-label={t('btn_Continue_Game')}
        >
          {t('btn_Continue_Game')}
        </button>
      </div>
    </ModalContentContainer>
  );
}
