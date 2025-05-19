'use client';

import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTTSStore } from 'hooks/use-tts-store';
import { AI_ROLE } from 'config/constants';
import { useTranslations } from 'next-intl';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import { useUserPreferencesStore } from 'src/hooks/use-user-preferences-store';

export default function ChatOptionsABC({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('ChatOptionsABC');

  /**
   * Single Player
   */
  const { addContent, isLoadingContent, content } = useGmAiStore();
  const { aiModels } = useUserPreferencesStore();
  const { handleStop } = useTTSStore();

  /**
   * Multiplayer
   */
  const { multiplayerStory, isMultiplayerLoading } = useMultiplayer();
  const { sendMessage } = usePlayerAcctions();

  function onHistoryOptionClick(option: 'A' | 'B' | 'C'): void {
    handleStop();
    const msg = `${t('btn_ABC')} **"${option}"**.`;

    if (isMultiplayer) sendMessage(msg, true);
    else
      addContent(
        {
          role: AI_ROLE.USER,
          parts: [{ text: msg }],
        },
        aiModels
      );
  }

  /**
   * Render
   */
  const isBtnDisable = isMultiplayerLoading || isLoadingContent || multiplayerStory?.isStoryEnded;

  return (
    <div>
      <p className="text-center text-sm mb-1 font-bold">{t('Story_Options')}</p>
      <div className="flex gap-2">
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('A')}
          disabled={isBtnDisable}
          aria-label={t('Option.Option_A')}
        >
          A
        </button>
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('B')}
          disabled={isBtnDisable}
          aria-label={t('Option.Option_B')}
        >
          B
        </button>
        <button
          className="btn btn-circle hover:border-info"
          onClick={() => onHistoryOptionClick('C')}
          disabled={isBtnDisable}
          aria-label={t('Option.Option_C')}
        >
          C
        </button>
      </div>
    </div>
  );
}
