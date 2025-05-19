'use client';

import { Icon } from 'components/icons';
import { ModalContentContainer } from 'components/modal';
import TTSConfig from 'components/tts/tts-config';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useTranslations } from 'next-intl';
import UserAiModels from 'src/components/user-ai-models';
import useFirebase from 'src/hooks/firebase';
import useMultiplayer, { usePlayerAcctions } from 'src/hooks/multiplayer';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { useDebouncedCallback } from 'use-debounce';
import { AiModels } from 'utils/generate-ai-config';

export const aiIconStyle = {
  Strict_AI: 'w-8 h-8 fill-success',
  Virtuous_AI: 'w-8 h-8 fill-warning',
  Creative_AI: 'w-8 h-8 fill-error',
  Progresive_AI: 'w-8 h-8 fill-primary',
  Random_AI: 'w-8 h-8 fill-secondary',
} as { [key in AiModels]: string };

export default function ModalConfigAI({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('ModalConfigAI');

  const aiModels = useGenerateAiConfigObj();

  const { aiConfig, setAiConfig } = useGmAiStore();

  /**
   * Multiplayer
   */
  const { multiplayerStory, isMultiplayerLoading, userCurrentMpGame } = useMultiplayer();
  const { isFireLoading } = useFirebase();
  const { setAiConfigMp } = usePlayerAcctions();
  const dSetAiConfigMp = useDebouncedCallback(setAiConfigMp, 3000);

  /**
   * Render
   */
  const R_AiConfig = isMultiplayer ? multiplayerStory?.aiConfig || 'Progresive_AI' : aiConfig;
  const R_setAiConfig = isMultiplayer ? dSetAiConfigMp : setAiConfig;
  const isLoading = isFireLoading || isMultiplayerLoading;

  const isHost = multiplayerStory?.players[0].userId === userCurrentMpGame?.player.userId;
  const isCanRenderAiConfig = (isMultiplayer && isHost) || !isMultiplayer;

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="py-4">{t('p_Config')}</p>

        {isCanRenderAiConfig ? (
          <div>
            <h4 className="text-center my-4">
              <span>
                <Icon.AiBrain className={`${aiIconStyle[R_AiConfig]} w-4 h-4 inline`} />
              </span>
              <strong> {t('p_strong_Style')}</strong>
            </h4>
            {aiModels.map((model) => (
              <div className="form-control border-2 rounded-lg my-1 p-1" key={model.name}>
                <label className="label cursor-pointer">
                  <span className="label-text font-bold">{model.title}</span>
                  {isLoading ? (
                    <div className={model.clsRadio}>
                      <span className="loading loading-spinner loading-xs"></span>
                    </div>
                  ) : (
                    <input
                      type="radio"
                      name="radio-10"
                      className={model.clsRadio}
                      checked={R_AiConfig === model.name}
                      onChange={() => R_setAiConfig(model.name)}
                      disabled={isLoading}
                    />
                  )}
                </label>
                <small className="ml-3">{model.desc}</small>
              </div>
            ))}
          </div>
        ) : null}

        <TTSConfig />

        <UserAiModels />
      </>
    </ModalContentContainer>
  );
}
