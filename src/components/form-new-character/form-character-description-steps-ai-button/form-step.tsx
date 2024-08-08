'use client';

import { CharacterCreationDescription } from 'types/character';
import ButtonAiImprove, { mintxtDescription } from './button-ai-improve';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useModalState } from 'hooks/use-modal-state';
import ModalLowContentAlert from './modal-low-content-alert';
import { useTranslations } from 'next-intl';

export default function FormStep({
  descriptionType,
}: {
  descriptionType: CharacterCreationDescription;
}) {
  const t = useTranslations('buttons');

  const { improveDescription, isLoadingContent } = useGmAiStore();
  const charState = useCreateNewCharacterStore();
  const { setDescription } = charState;

  const { setModalContent, setModalIsOpen } = useModalState();

  async function onAiDescriptionClick() {
    if (charState[descriptionType].length < mintxtDescription) {
      setModalContent(<ModalLowContentAlert />);
      setModalIsOpen(true);
      return;
    }

    const newDescription = await improveDescription(
      charState.name,
      charState[descriptionType],
      descriptionType
    );
    setDescription({ key: descriptionType, value: newDescription });
  }

  return (
    <button
      type="button"
      className="btn"
      onClick={onAiDescriptionClick}
      disabled={isLoadingContent}
      aria-label={t('Improve_text')}
    >
      <ButtonAiImprove
        isLoadingContent={isLoadingContent}
        contentLength={charState[descriptionType].length}
      />
    </button>
  );
}
