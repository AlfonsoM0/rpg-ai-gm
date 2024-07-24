'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTTSStore } from 'hooks/use-tts-store';
import ModalEndHistory from './chat-options-modals/modal-end-story';
import ModalConfigAI, { aiIconStyle } from './chat-options-modals/modal-ai-config';
import ModaIdeasForAI from './chat-options-modals/modal-ai-ideas';
import { Icon } from 'components/icons';
import ModalArtThemeConfig from './chat-options-modals/modal-art-theme-config';

export default function ChatOptionsConfig() {
  const { isLoadingContent } = useGmAiStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { aiConfig } = useGmAiStore();
  const { handlePause } = useTTSStore();

  function onEndHistoryClick(): void {
    handlePause();
    setModalContent(<ModalEndHistory />);
    setModalIsOpen(true);
  }

  function onConfigAiClick() {
    handlePause();
    setModalContent(<ModalConfigAI />);
    setModalIsOpen(true);
  }

  function onIdeasClick() {
    handlePause();
    setModalContent(<ModaIdeasForAI />);
    setModalIsOpen(true);
  }

  function onArtClick() {
    handlePause();
    setModalContent(<ModalArtThemeConfig />);
    setModalIsOpen(true);
  }

  return (
    <div>
      <p className="text-center text-sm mb-1 font-bold">Otras opciones</p>

      <div className="flex gap-2">
        <button className="btn hover:border-base-content" onClick={onConfigAiClick}>
          <Icon.AiBrain className={aiIconStyle[aiConfig]} />
        </button>

        <button
          className="btn hover:border-info"
          onClick={onIdeasClick}
          disabled={isLoadingContent}
        >
          <Icon.Idea className="w-8 h-8 stroke-info" />
        </button>

        <button className="btn hover:border-info" onClick={onArtClick} disabled={isLoadingContent}>
          <Icon.Art className="w-8 h-8 fill-info" />
        </button>

        <button
          className="btn btn-error hover:border-base-content"
          onClick={onEndHistoryClick}
          disabled={isLoadingContent}
        >
          Fin.
        </button>
      </div>
    </div>
  );
}
