'use client';

import { useTTSStore } from 'hooks/use-tts-store';
import TTSControls from './tts-controls';

export default function TTSConfig() {
  const {
    isTTSEnabled,
    setIsTTSEnabled,
    voiceIndex,
    pitch,
    rate,
    volume,
    handleChangeVoice,
    handleChangePitch,
    handleChangeRate,
    handleChangeVolume,
    setTTS,
  } = useTTSStore();

  if (!speechSynthesis)
    return (
      <>
        <h4 className="text-center my-4 font-bold">Voz</h4>
        <p>No disponible en tu navegador.</p>
      </>
    );

  const voices = speechSynthesis.getVoices();

  return (
    <>
      <div className="form-control w-24 m-auto mt-8">
        <label className="label cursor-pointer">
          <span className="label-text font-bold text-lg">Voz</span>
          <input
            type="checkbox"
            className="toggle"
            checked={isTTSEnabled}
            onChange={() => setIsTTSEnabled(!isTTSEnabled)}
          />
        </label>
      </div>

      {isTTSEnabled ? (
        <div className="flex flex-col gap-5 mb-4">
          <TTSControls customTTS="¡Hola! soy Game Master AI. ¡A jugar!" />

          <div className="flex items-center gap-2">
            <div className="w-24">
              <p>Locutor: </p>
            </div>
            <select
              className="select select-bordered w-full"
              value={voices[voiceIndex].name}
              onChange={handleChangeVoice}
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center gap-2">
            <div className="w-24">
              <p>Tono: </p>
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
              <p>Velocidad: </p>
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
              <p>Volumen: </p>
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
    </>
  );
}
