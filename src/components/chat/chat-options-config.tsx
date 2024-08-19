'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTTSStore } from 'hooks/use-tts-store';
import ModalEndHistory from './chat-options-modals/modal-end-story';
import ModalConfigAI, { aiIconStyle } from './chat-options-modals/modal-ai-config';
import ModaIdeasForAI from './chat-options-modals/modal-ai-ideas';
import { Icon } from 'components/icons';
import ModalArtThemeConfig from './chat-options-modals/modal-art-theme-config';
import { useTranslations } from 'next-intl';
import useMultiplayer from 'src/hooks/multiplayer';

export default function ChatOptionsConfig({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('ChatOptionsConfig');

  const { isLoadingContent } = useGmAiStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { aiConfig, isStoryStarted } = useGmAiStore();
  const { handlePause } = useTTSStore();

  function onEndHistoryClick(): void {
    handlePause();
    setModalContent(<ModalEndHistory isMultiplayer={isMultiplayer} />);
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

  /**
   * Muiltiplaer config
   */
  const { multiplayerStory, userCurrentMpGame } = useMultiplayer();
  const hostId = multiplayerStory?.userHostId || 'hostId';
  const userId = userCurrentMpGame?.player.userId || 'userId';
  const isHost = hostId === userId;

  const isCanRenderAiConfig = (isMultiplayer && isHost) || !isMultiplayer;

  return (
    <div>
      <p className="text-center text-sm mb-1 font-bold">{t('Other_Options')}</p>

      <div className="flex gap-2">
        {isCanRenderAiConfig ? (
          <button
            className="btn hover:border-base-content"
            onClick={onConfigAiClick}
            aria-label={t('Option.GmAi_Config')}
          >
            <Icon.AiBrain className={aiIconStyle[aiConfig]} />
          </button>
        ) : null}

        <button
          className="btn hover:border-info"
          onClick={onIdeasClick}
          disabled={isLoadingContent}
          aria-label={t('Option.Tips_and_Shortcuts')}
        >
          <Icon.Idea className="w-8 h-8 stroke-info" />
        </button>

        <button
          className="btn hover:border-info"
          onClick={onArtClick}
          disabled={isLoadingContent}
          aria-label={t('Option.Story_Theme_Color')}
        >
          <Icon.Art className="w-8 h-8 fill-info" />
        </button>

        {isStoryStarted ? (
          <button
            className="btn btn-error hover:border-base-content"
            onClick={onEndHistoryClick}
            disabled={isLoadingContent}
            aria-label={t('Option.End_Story')}
          >
            {isMultiplayer ? t('Exit') : t('End')}
          </button>
        ) : null}
      </div>
    </div>
  );
}
