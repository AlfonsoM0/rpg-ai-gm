'use client';

import { useTranslations } from 'next-intl';
import { ModalContentContainer } from 'src/components/modal';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import { useModalState } from 'src/hooks/use-modal-state';
import { calculateStoryXpMp } from 'src/utils/gmai-utils-mp';

export default function ModalEndMultiplayer() {
  const t = useTranslations('ModalEndHistory_Multiplayer');

  const { setModalIsOpen } = useModalState();

  const { endGame } = usePlayerAcctions();

  const { multiplayerStory } = useMultiplayer();

  const xp = calculateStoryXpMp({
    totalDiceRolls: multiplayerStory?.totalDiceRolls || 0,
    totalSuccesses: multiplayerStory?.totalSuccesses || 0,
    totalFailures: multiplayerStory?.totalFailures || 0,
  });

  function onEndGameClick() {
    endGame();
    setModalIsOpen(false);
  }

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <p className="py-4 text-error text-center">{t('p1')}</p>
      <p className="pb-4">{t('p2')}</p>
      <p className="pb-4">{t('p3')}</p>

      {xp ? (
        <p className="pb-4 text-center text-success">
          {t('info_xp_msg')} {xp} XP
        </p>
      ) : (
        <p className="pb-4 text-center text-error">{t('no_xp_msg')}</p>
      )}

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
