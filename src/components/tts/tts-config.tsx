'use client';

import { useTTSStore } from 'hooks/use-tts-store';
import TTSControls from './tts-controls';

export default function TTSConfig() {
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

  if (!speechSynthesis || !voices.length)
    return (
      <>
        <h4 className="text-center my-4 font-bold">Voz</h4>
        <p className="text-center">No disponible en tu navegador.</p>
        {voiceConfigTips}
      </>
    );

  return (
    <>
      <div className="form-control w-24 m-auto mt-8">
        <label className="label cursor-pointer">
          <span className="label-text font-bold text-lg text-info">Voz</span>
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

      {voiceConfigTips}
    </>
  );
}

const voiceConfigTips = (
  <div className="m-2">
    <ul className="list-disc text-info">
      <li>Haz clic en los avatares del chat para reproducir el texto.</li>
      <li>
        Es posible que tengas que configurar tu dispositivo y descargar paquetes de voz para
        escuchar el texto. Busca &quot;salida de texto a voz&quot; (TTS) en la configuración de
        idioma.
      </li>
    </ul>
  </div>
);
