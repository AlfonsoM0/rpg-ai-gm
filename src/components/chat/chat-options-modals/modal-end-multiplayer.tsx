'use client';

import { useTranslations } from 'next-intl';
import { ModalContentContainer } from 'src/components/modal';
import { usePlayerAcctions } from 'src/hooks/multiplayer';
import { useModalState } from 'src/hooks/use-modal-state';

export default function ModalEndMultiplayer() {
  const t = useTranslations('ModalEndHistory_Multiplayer');

  const { setModalIsOpen } = useModalState();

  const { endGame } = usePlayerAcctions();

  function onEndGameClick() {
    endGame();
    setModalIsOpen(false);
  }

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <p className="py-4">{t('p1')}</p>
      <p className="pb-4">{t('p2')}</p>
      <p className="pb-4">{t('p3')}</p>

      <div className="modal-action justify-around">
        <button className="btn btn-error" onClick={onEndGameClick} aria-label={t('btn_End_Game')}>
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
