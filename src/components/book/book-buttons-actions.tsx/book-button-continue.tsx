'use client';

import ModalEndHistory from 'components/chat/chat-options-modals/modal-end-story';
import { Icon } from 'components/icons';
import { AI_ROLE, CODE_CHARACTERS_CHANGE, CODE_STORY_END } from 'config/constants';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useRouter } from 'next/navigation';
import { Book } from 'types/library';
import { calculateStoryXp } from 'utils/calculate-story-xp';

export default function BookButtonContinue({ book }: { book: Book }) {
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

    router.push('/story');
  }

  return (
    <button className="btn btn-sm btn-info" onClick={handleContinueStory}>
      Continuar <Icon.Stars className="w-4 h-4" />
    </button>
  );
}

function ModalIsAStoryInProgress() {
  const router = useRouter();
  const { setModalIsOpen, setModalContent } = useModalState();

  return (
    <div>
      <h3 className="font-bold text-lg">Hay una historia en progreso</h3>
      <p className="py-4">Finaliza tu historia para poder empezar otra.</p>

      <div className="modal-action justify-around">
        <button
          className="btn btn-sm btn-error"
          onClick={() => setModalContent(<ModalEndHistory />)}
        >
          Finalizar historia
        </button>
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            router.push('/story');
            setModalIsOpen(false);
          }}
        >
          Continuar historia
        </button>
      </div>
    </div>
  );
}
