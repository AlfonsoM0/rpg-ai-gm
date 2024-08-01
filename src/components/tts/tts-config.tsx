'use client';

import { useTTSStore } from 'hooks/use-tts-store';
import TTSControls from './tts-controls';
import { useTranslations } from 'next-intl';

export default function TTSConfig() {
  const t = useTranslations('TTS.TTSConfig');

  const {
    isTTSEnabled,
    voices,
    setIsTTSEnabled,
    voiceIndex,
    pitch,
    rate,
    volume,
    handleChangeVoice,
    handleChangePitch,
    handleChangeRate,
    handleChangeVolume,
    handleStop,
  } = useTTSStore();

  const voiceConfigTips = (
    <div className="m-2">
      <ul className="list-disc text-info">
        <li>{t('tips.1')}</li>
        <li>{t('tips.2')}</li>
      </ul>
    </div>
  );

  if (!speechSynthesis || !voices.length)
    return (
      <>
        <h4 className="text-center my-4 font-bold">{t('Voice')}</h4>
        <p className="text-center">{t('Voice_not_available')}</p>
        {voiceConfigTips}
      </>
    );

  return (
    <>
      <div className="form-control w-24 m-auto mt-8">
        <label className="label cursor-pointer">
          <span className="label-text font-bold text-lg text-info">{t('Voice')}</span>
          <input
            type="checkbox"
            className="toggle toggle-info"
            checked={isTTSEnabled}
            onChange={() => {
              handleStop();
              setIsTTSEnabled(!isTTSEnabled);
            }}
          />
        </label>
      </div>

      {isTTSEnabled ? (
        <div className="flex flex-col gap-5 mb-4">
          <TTSControls customTTS={t('customTTS')} />

          <div className="flex items-center gap-2">
            <div className="w-24">
              <p>{t('Broadcaster')}: </p>
            </div>
            <select
              className="select select-bordered w-full"
              value={voices[voiceIndex].name}
              onChange={handleChangeVoice}
            >
              {voices.map((v) => {
                return (
                  <option key={v.name} value={v.name} defaultValue={voices[voiceIndex].name}>
                    {v.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-24">
              <p>{t('Pitch')}: </p>
            </div>
            <input
              className="range"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={handleChangePitch}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-24">
              <p>{t('Rate')}: </p>
            </div>
            <input
              className="range"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={handleChangeRate}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-24">
              <p>{t('Volume')}: </p>
            </div>
            <input
              className="range"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleChangeVolume}
            />
          </div>
        </div>
      ) : null}

      {voiceConfigTips}
    </>
  );
}
