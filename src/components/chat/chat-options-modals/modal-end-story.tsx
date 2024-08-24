'use client';

import { ModalContentContainer } from 'components/modal';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useLibraryStore } from 'hooks/use-library-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { useEffect, useState } from 'react';
import { calculateStoryXp } from 'utils/calculate-story-xp';
import { clearGameSystemMsg } from 'src/utils/gmai-utils';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import { calculateStoryXpMp } from 'src/utils/gmai-utils-mp';
import { APP_URL } from 'src/config/constants';

export default function ModalEndHistory({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('ModalEndHistory');
  const router = useRouter();

  const { addBook, addBookMp } = useLibraryStore();
  const { setModalContent, setModalIsOpen } = useModalState();

  /**
   * Single Player
   */
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

  useEffect(() => {
    !isMultiplayer && setHistoryId();
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

    router.push(APP_URL.HOME);
  }

  /**
   * Multiplayer
   */
  const { multiplayerStory, userCurrentMpGame, setIsMultiplayerLoading } = useMultiplayer();
  const [storyNameMp, setStoryNameMp] = useState(multiplayerStory?.storyName || '');
  const { leaveGame } = usePlayerAcctions();
  async function onSaveBookClickMp() {
    if (!multiplayerStory || !userCurrentMpGame) return;
    setIsMultiplayerLoading(true);

    // save book to library
    if (storyNameMp)
      addBookMp({
        ...multiplayerStory,
        content: clearGameSystemMsg(multiplayerStory.content),
      });

    // update Characters XP if story ended
    const xp = calculateStoryXpMp({
      totalDiceRolls: multiplayerStory.totalDiceRolls,
      totalSuccesses: multiplayerStory.totalSuccesses,
      totalFailures: multiplayerStory.totalFailures,
    });
    if (multiplayerStory.isStoryEnded && xp) {
      findCharacterByIdAndIcrementXp(userCurrentMpGame.player.character.id, xp);
      setModalContent(<ModalWinXp xp={xp} PC={[userCurrentMpGame.player.character.name]} />);
    } else setModalIsOpen(false);

    // Leave Game
    await leaveGame();
    router.push(APP_URL.HOME);

    setIsMultiplayerLoading(false);
  }

  /**
   * Render
   */
  const inputValue = isMultiplayer ? storyNameMp : storyName;
  const inputOnChange = isMultiplayer ? setStoryNameMp : setStoryName;
  const btnOnSaveBookClick = isMultiplayer ? onSaveBookClickMp : onSaveBookClick;

  const p2 = isMultiplayer ? t('p2_multiplayer') : t('p2');
  const inputPlaceholder = isMultiplayer
    ? multiplayerStory?.storyName || t('input_placeholder')
    : t('input_placeholder');

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="py-4">
          {t('p1')} <br />
          <br />
          {p2}
          <br />
          <br />
          <strong>{t('p3_strong')}</strong> <br />
        </p>

        <input
          className="input input-bordered w-full text-center"
          type="text"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(e) => inputOnChange(e.target.value)}
        />

        <div className="modal-action justify-around">
          <button
            className="btn btn-error"
            onClick={btnOnSaveBookClick}
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
