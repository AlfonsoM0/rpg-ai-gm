'use client';

import { Icon } from 'components/icons';
import { ModalContentContainer } from 'components/modal';
import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';

const mintxtDescription = 100;

export default function AiButtonImproveCaracterDescription({ step }: { step: number }) {
  const { improveDescription, isLoadingContent } = useGmAiStore();
  const charState = useCreateNewCharacterStore();
  const { setDescription } = charState;

  const { setModalContent, setModalIsOpen } = useModalState();

  async function onAiDescriptionClick() {
    switch (step) {
      case 1:
        if (charState.appearance.length < mintxtDescription) {
          setModalContent(ModalLowContentAlert);
          setModalIsOpen(true);
          return;
        }

        const newDescription1 = await improveDescription(
          charState.name,
          charState.appearance,
          'appearance'
        );
        setDescription({ key: 'appearance', value: newDescription1 });
        break;

      case 2:
        if (charState.background.length < mintxtDescription) {
          setModalContent(ModalLowContentAlert);
          setModalIsOpen(true);
          return;
        }

        const newDescription2 = await improveDescription(
          charState.name,
          charState.background,
          'background'
        );
        setDescription({ key: 'background', value: newDescription2 });
        break;

      case 3:
        if (charState.profession.length < mintxtDescription) {
          setModalContent(ModalLowContentAlert);
          setModalIsOpen(true);
          return;
        }

        const newDescription3 = await improveDescription(
          charState.name,
          charState.profession,
          'profession'
        );
        setDescription({ key: 'profession', value: newDescription3 });
        break;

      case 4:
        if (charState.personality.length < mintxtDescription) {
          setModalContent(ModalLowContentAlert);
          setModalIsOpen(true);
          return;
        }

        const newDescription4 = await improveDescription(
          charState.name,
          charState.personality,
          'personality'
        );
        setDescription({ key: 'personality', value: newDescription4 });
        break;

      case 5:
        if (charState.equipment.length < mintxtDescription) {
          setModalContent(ModalLowContentAlert);
          setModalIsOpen(true);
          return;
        }

        const newDescription5 = await improveDescription(
          charState.name,
          charState.equipment,
          'equipment'
        );
        setDescription({ key: 'equipment', value: newDescription5 });
        break;

      case 6:
        if (charState.powers.length < mintxtDescription) {
          setModalContent(ModalLowContentAlert);
          setModalIsOpen(true);
          return;
        }

        const newDescription6 = await improveDescription(
          charState.name,
          charState.powers,
          'powers'
        );
        setDescription({ key: 'powers', value: newDescription6 });
        break;

      default:
        break;
    }
  }

  const mintxtDescription = 20;

  /*
    0) name
    1) appearance
    2) background
    3) profession
    4) personality
    5) equipment
    6) powers
    7) characteristics
   */
  const steps = [
    <div key={'step-0-name'}></div>,

    <button
      type="button"
      key={'step-1-appearance'}
      className="btn"
      onClick={onAiDescriptionClick}
      disabled={isLoadingContent}
    >
      <ButtonAiImprove
        isLoadingContent={isLoadingContent}
        contentLength={charState.appearance.length}
      />
    </button>,

    <button
      type="button"
      key={'step-2-background'}
      className="btn"
      onClick={onAiDescriptionClick}
      disabled={isLoadingContent}
    >
      <ButtonAiImprove
        isLoadingContent={isLoadingContent}
        contentLength={charState.background.length}
      />
    </button>,

    <button
      type="button"
      key={'step-3-profession'}
      className="btn"
      onClick={onAiDescriptionClick}
      disabled={isLoadingContent}
    >
      <ButtonAiImprove
        isLoadingContent={isLoadingContent}
        contentLength={charState.profession.length}
      />
    </button>,

    <button
      type="button"
      key={'step-4-personality'}
      className="btn"
      onClick={onAiDescriptionClick}
      disabled={isLoadingContent}
    >
      <ButtonAiImprove
        isLoadingContent={isLoadingContent}
        contentLength={charState.personality.length}
      />
    </button>,

    <button
      type="button"
      key={'step-5-equipment'}
      className="btn"
      onClick={onAiDescriptionClick}
      disabled={isLoadingContent}
    >
      <ButtonAiImprove
        isLoadingContent={isLoadingContent}
        contentLength={charState.equipment.length}
      />
    </button>,

    <button
      type="button"
      key={'step-6-powers'}
      className="btn"
      onClick={onAiDescriptionClick}
      disabled={isLoadingContent}
    >
      <ButtonAiImprove
        isLoadingContent={isLoadingContent}
        contentLength={charState.powers.length}
      />
    </button>,

    <div key={'step-7-characteristics'}></div>,
  ];

  return steps[step];
}

function ButtonAiImprove({
  isLoadingContent,
  contentLength,
}: {
  isLoadingContent: boolean;
  contentLength: number;
}) {
  let iconStyle = !contentLength ? 'w-4 h-4 fill-info' : 'w-4 h-4 fill-error';
  if (contentLength > mintxtDescription) iconStyle = 'w-4 h-4 fill-success';

  let txtStyle = !contentLength ? 'text-info' : 'text-error';
  if (contentLength > mintxtDescription) txtStyle = 'text-success';

  if (isLoadingContent) return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <div className="flex flex-col gap-1 items-center">
      <Icon.Stars className={iconStyle} />
      <p className={txtStyle}>Mejorar</p>
    </div>
  );
}

const ModalLowContentAlert = (
  <ModalContentContainer title="Poco contenido" titleColor="error">
    <p>¡Haz un esfuerzo! Escribe una descripción más larga para que pueda ayudarte. 😁</p>
  </ModalContentContainer>
);
