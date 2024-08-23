'use client';

import { Icon } from 'components/icons';
import { AI_ROLE, APP_URL, CODE_CHARACTERS_CHANGE, CODE_STORY_END } from 'config/constants';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useRouter } from '@/navigation';
import { Book } from 'types/library';
import { calculateStoryXp } from 'utils/calculate-story-xp';
import ModalIsAStoryInProgress from '../book-modals/book-modal-is-story-in-progress';
import { useTranslations } from 'next-intl';
import { useLibraryStore } from 'src/hooks/use-library-store';
import { useCreateMultiplayer } from 'src/hooks/multiplayer';
import { useState } from 'react';
import Loading from 'src/components/loading';

export default function BookButtonContinue({ book }: { book: Book }) {
  const t = useTranslations('Card_Book.btn');

  const router = useRouter();

  const { setModalContent, setModalIsOpen } = useModalState();
  const { charactersCollection, addACharacterToCollection, addACharacterToInGame } =
    useCharacterStore();
  const { addContent, isStoryStarted, resetChat, aiConfig } = useGmAiStore();

  function handleContinueStory() {
    // if the story has started, alert the user that they cannot continue a story because it is another story in progress.
    if (isStoryStarted) {
      setModalContent(<ModalIsAStoryInProgress />);
      setModalIsOpen(true);
      return;
    }

    // Add all updated Characters to the game. And create a new character if it does not exist.
    const updatedCharacters = book.characters.map((oldCharacter) => {
      const newCharacter = charactersCollection.find((c) => c.id === oldCharacter.id);
      if (newCharacter) {
        addACharacterToInGame(newCharacter);
      } else {
        addACharacterToCollection(oldCharacter);
        addACharacterToInGame(oldCharacter);
      }
      return newCharacter || oldCharacter;
    });

    // Clear Content[]
    const clearContent = book.content.filter((content) => {
      const contentText = content.parts.map((p) => p.text).join(' ');
      return !contentText.includes(CODE_STORY_END);
    });

    // set game state
    const playersDiceRolls = book.playersDiceRolls || []; //Is a fix because can be undefined.
    const isStoryEndedBefore = calculateStoryXp(playersDiceRolls).isStoryOver;
    resetChat({
      storyId: '',
      storyName: `${book.title}: [...]`,
      aiConfig,
      isStoryStarted: true,
      isLoadingContent: false,
      playersDiceRolls: isStoryEndedBefore ? [] : playersDiceRolls,
      content: clearContent,
    });
    addContent({
      role: AI_ROLE.USER,
      parts: [
        {
          text: `(((Actualiza mis personajes con la siguiente información: ${JSON.stringify(
            updatedCharacters
          )}.
            Si hay cambios en la información de personajes, explíca los cambios para asegurarme de que todo está bien. Si no hay cambios en la información de personajes, solo responde "Todo listo... ¡Continuemos con la Historia!".
            ${CODE_CHARACTERS_CHANGE})))`,
        },
        {
          text: `Quiero continuar con esta historia. Establece el total de éxitos en 0. Establece el total de fallos en 0. Comienza una nueva historia a partir de donde terminó la anterior, empieza el juego en el "Paso 4 - Game Master AI crea la introducción a la historia".`,
        },
      ],
    });

    router.push(APP_URL.STORY);
  }

  /**
   * Multiplayer
   */
  const { isSinglePlayer, multiplayerLibrary } = useLibraryStore();
  const { continueMultiplayerGame } = useCreateMultiplayer();
  const [isLoading, setIsLoading] = useState(false);
  async function handleContinueStoryMp() {
    setIsLoading(true);
    const bookMp = multiplayerLibrary.find((b) => b.storyId === book.id);
    if (bookMp) {
      await continueMultiplayerGame(bookMp);
      router.push(APP_URL.MULTIPLAYER_CREATE);
    }
    setIsLoading(false);
  }

  /**
   * Render
   */
  const onContinueStoryClick = isSinglePlayer ? handleContinueStory : handleContinueStoryMp;

  return (
    <button
      className="btn btn-sm btn-info"
      onClick={onContinueStoryClick}
      disabled={isLoading}
      aria-label={t('BookButtonContinue')}
    >
      {t('BookButtonContinue')} <Loading.IconStars className="w-4 h-4" isloading={isLoading} />
    </button>
  );
}
