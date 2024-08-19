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
import ModalEndMultiplayer from './chat-options-modals/modal-end-multiplayer';

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
    setModalContent(<ModalConfigAI isMultiplayer={isMultiplayer} />);
    setModalIsOpen(true);
  }

  function onIdeasClick() {
    handlePause();
    setModalContent(<ModaIdeasForAI isMultiplayer={isMultiplayer} />);
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
  const { multiplayerStory, userCurrentMpGame, isMultiplayerLoading } = useMultiplayer();

  function onEndMultiplayerClick() {
    handlePause();
    setModalContent(<ModalEndMultiplayer />);
    setModalIsOpen(true);
  }

  const isHost = multiplayerStory?.players[0].userId === userCurrentMpGame?.player.userId;

  const isCanRenderAiConfig = (isMultiplayer && isHost) || !isMultiplayer;
  const isCanRenderMpEnd = isMultiplayer && isHost;

  const isLoading = isLoadingContent || isMultiplayerLoading;

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
          disabled={isLoading}
          aria-label={t('Option.Tips_and_Shortcuts')}
        >
          <Icon.Idea className="w-8 h-8 stroke-info" />
        </button>

        <button
          className="btn hover:border-info"
          onClick={onArtClick}
          disabled={isLoading}
          aria-label={t('Option.Story_Theme_Color')}
        >
          <Icon.Art className="w-8 h-8 fill-info" />
        </button>

        {isStoryStarted ? (
          <button
            className="btn btn-error hover:border-base-content"
            onClick={onEndHistoryClick}
            disabled={isLoading}
            aria-label={t('Option.End_Story')}
          >
            {isMultiplayer ? t('Exit') : t('End')}
          </button>
        ) : null}

        {isCanRenderMpEnd ? (
          <button
            className="btn btn-error hover:border-base-content"
            onClick={onEndMultiplayerClick}
            disabled={isLoading || multiplayerStory?.isStoryEnded}
            aria-label={t('Option.End_Story')}
          >
            {t('End')}
          </button>
        ) : null}
      </div>
    </div>
  );
}
