'use client';

import { useEffect, useMemo, useState } from 'react';
import useMultiplayer, { useCreateMultiplayer } from 'src/hooks/multiplayer';
import { Character } from 'src/types/character';
import TextareaAutosize from 'react-textarea-autosize';
import { Locale } from 'src/i18n-config';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { AiModels } from 'src/utils/generate-ai-config';
import { AiRole } from 'src/types/multiplayer';

export default function FormCreateNewMultiplayerGame() {
  const {
    storyId,
    storyName,
    setStoryName,
    storyDescription,
    setStoryDescription,
    locale,
    setLocale,
    aiConfig,
    setAiConfig,
    aiRole,
    setAiRole,

    createMultiplayerGame,
  } = useCreateMultiplayer();

  const aiConfigObj = useGenerateAiConfigObj();

  const { characterSelected, isMultiplayerLoading } = useMultiplayer();

  const isFormRedyForSubmit = useMemo(
    () =>
      storyName.trim().length >= 10 &&
      storyDescription.trim().length >= 100 &&
      Boolean(characterSelected),
    [characterSelected, storyDescription, storyName]
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormRedyForSubmit || !characterSelected) return;

    createMultiplayerGame(characterSelected);
  }

  const btnSubmitStyle = isFormRedyForSubmit ? 'btn w-full btn-success' : 'btn w-full';

  return (
    <form className="flex flex-wrap justify-center gap-4 p-8" onSubmit={onSubmit}>
      <div>
        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">Nombre de la historia</span>
          </div>
          <input
            className="input input-bordered"
            type="text"
            value={storyName}
            onChange={(e) => setStoryName(e.target.value)}
            placeholder="Crea un nombre original"
          />
        </label>

        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">GmAi ROL</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setAiRole(e.target.value as AiRole)}
          >
            <option selected={aiRole === 'Game Master'} defaultValue="Game Master">
              Game Master
            </option>
            <option selected={aiRole === 'Game Assistant'} defaultValue="Game Assistant">
              Game Assistant (Tu eres el GM)
            </option>
          </select>
        </label>

        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">Estilo de GmAi</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setAiConfig(e.target.value as AiModels)}
          >
            {aiConfigObj.map((aiModel) => (
              <option
                key={aiModel.name}
                selected={aiModel.name === aiConfig}
                defaultValue={aiModel.name}
              >
                {aiModel.title}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">Idioma</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option selected={locale === 'en'} defaultValue="en">
              English
            </option>
            <option selected={locale === 'es'} defaultValue="es">
              Español
            </option>
          </select>
        </label>
      </div>

      <label className="form-control w-[20rem]">
        <div className="label">
          <span className="label-text font-bold">Descripción de la historia</span>
        </div>
        <TextareaAutosize
          className="textarea textarea-bordered min-h-[18rem]"
          value={storyDescription}
          onChange={(e) => setStoryDescription(e.target.value)}
          placeholder="¿Qué historia te gustaría jugar? GmAi usará esta información para crear la historia."
        />
      </label>

      <button
        className={btnSubmitStyle}
        type="submit"
        disabled={!isFormRedyForSubmit || isMultiplayerLoading}
      >
        {isMultiplayerLoading ? 'CREANDO PARTIDA...' : 'CREAR PATIDA'}
      </button>
    </form>
  );
}
