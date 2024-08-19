'use client';

import { useTranslations } from 'next-intl';
import { ModalContentContainer } from 'src/components/modal';
import { usePlayerAcctions } from 'src/hooks/multiplayer';
import { useModalState } from 'src/hooks/use-modal-state';

export default function ModalEndMultiplayer() {
  const t = useTranslations('ModalEndHistory_Multiplayer');

  const { setModalIsOpen } = useModalState();

  const { endGame } = usePlayerAcctions();

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <p className="py-4">{t('p1')}</p>

      <div className="modal-action justify-around">
        <button className="btn btn-error" onClick={endGame} aria-label={t('btn_End_Game')}>
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
