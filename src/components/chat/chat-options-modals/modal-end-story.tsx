'use client';

import { ModalContentContainer } from 'components/modal';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { useEffect } from 'react';
import { calculateStoryXp } from 'utils/calculate-story-xp';
import { clearGameSystemMsg } from 'src/utils/gmai-utils';

export default function ModalEndHistory() {
  const t = useTranslations('ModalEndHistory');

  const router = useRouter();
  const { setModalContent, setModalIsOpen } = useModalState();
  const {
    storyName,
    storyId,
    setStoryName,
    setHistoryId,
    content,
    resetChat,
    setIsStoryStarted,
    playersDiceRolls,
  } = useGmAiStore();
  const { inGameCharacters, findCharacterByIdAndIcrementXp, removeAllInGameCharacters } =
    useCharacterStore();

  const { addBook } = useLibraryStore();

  useEffect(() => {
    setHistoryId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSaveBookClick() {
    const { isStoryOver, storyXp } = calculateStoryXp(playersDiceRolls);

    // save book to library
    if (storyName)
      addBook({
        id: storyId,
        title: storyName,
        characters: inGameCharacters,
        content: isStoryOver ? clearGameSystemMsg(content) : content,
        playersDiceRolls,
      });

    // update xp for all characters
    if (isStoryOver) {
      const xp = Math.ceil(storyXp / inGameCharacters.length);
      inGameCharacters.forEach((character) => {
        findCharacterByIdAndIcrementXp(character.id, xp);
      });

      setModalContent(<ModalWinXp xp={xp} PC={inGameCharacters.map((c) => c.name)} />);
    } else setModalIsOpen(false);

    // reset all states to initial state
    resetChat();
    setIsStoryStarted(false);
    removeAllInGameCharacters();

    router.push('/');
  }

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="py-4">
          {t('p1')} <br />
          <br />
          {t('p2')}
          <br />
          <br />
          <strong>{t('p3_strong')}</strong> <br />
        </p>

        <input
          className="input input-bordered w-full text-center"
          type="text"
          placeholder={t('input_placeholder')}
          value={storyName}
          onChange={(e) => setStoryName(e.target.value)}
        />

        <div className="modal-action justify-around">
          <button
            className="btn btn-error"
            onClick={onSaveBookClick}
            aria-label={t('btn_End_Game')}
          >
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
      </>
    </ModalContentContainer>
  );
}

const ModalWinXp = ({ xp, PC }: { xp: number; PC: string[] }) => {
  const t = useTranslations('ModalWinXp');

  return (
    <ModalContentContainer title={t('title')} titleColor="success">
      <>
        <p className="font-bold text-lg">
          {t('You_have_earned_XP')}
          {xp}
          {t('for')}
          {PC.join(' y ')}.
        </p>
        <p className="py-4">{t('Edit_your_character')}</p>
      </>
    </ModalContentContainer>
  );
};
