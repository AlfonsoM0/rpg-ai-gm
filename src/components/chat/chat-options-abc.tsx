'use client';

import { Icon } from 'components/icons';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import ModalEndHistory from './chat-options-modals/modal-end-story';
import ModalConfigAI, { aiIconStyle } from './chat-options-modals/modal-ai-config';
import ModaIdeasForAI from './chat-options-modals/modal-ai-ideas';
import { useTTSStore } from 'hooks/use-tts-store';
import { AI_ROLE } from 'config/constants';

export default function ChatOptionsABC() {
  const { addContent, isLoadingContent, content } = useGmAiStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { aiConfig } = useGmAiStore();
  const { handleStop, handlePause } = useTTSStore();

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    handleStop();
    addContent({
      role: AI_ROLE.USER,
      parts: [{ text: `Elijo la opción **"${option}"**.` }], //\n\n ¿Qué prueba debo realizar?
    });
  }

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

  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <h3 className="font-bold">Opciones: </h3>

      <div className={content.length > 2 ? 'flex gap-2' : 'hidden'}>
        <button
          className="btn btn-circle"
          onClick={() => onHistoryOptionClick('A')}
          disabled={isLoadingContent}
        >
          A
        </button>
        <button
          className="btn btn-circle"
          onClick={() => onHistoryOptionClick('B')}
          disabled={isLoadingContent}
        >
          B
        </button>
        <button
          className="btn btn-circle"
          onClick={() => onHistoryOptionClick('C')}
          disabled={isLoadingContent}
        >
          C
        </button>
      </div>

      <div className="flex gap-2">
        <button className="btn" onClick={onConfigAiClick} disabled={isLoadingContent}>
          <Icon.AiBrain className={aiIconStyle[aiConfig]} />
        </button>

        <button className="btn" onClick={onIdeasClick} disabled={isLoadingContent}>
          <Icon.Idea className="w-8 h-8 stroke-info" />
        </button>

        <button className="btn btn-error" onClick={onEndHistoryClick} disabled={isLoadingContent}>
          Fin.
        </button>
      </div>
    </div>
  );
}
