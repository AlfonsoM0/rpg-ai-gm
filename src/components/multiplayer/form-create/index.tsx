'use client';

import { useMemo } from 'react';
import useMultiplayer, { useCreateMultiplayer } from 'src/hooks/multiplayer';
import TextareaAutosize from 'react-textarea-autosize';
import { Locale } from 'src/i18n-config';
import useGenerateAiConfigObj from 'src/hooks/use-generate-ai-config-model';
import { AiModels } from 'src/utils/generate-ai-config';
import { AiRole } from 'src/types/multiplayer';
import { useRouter } from 'src/navigation';
import { APP_URL, minTxtDescription } from 'src/config/constants';
import { useTranslations } from 'next-intl';
import calculeteTextPercentage from 'src/utils/calculate-text-percentage';

export default function FormCreateNewMultiplayerGame() {
  const t = useTranslations('Page_Multiplayer_Create.form_Create');

  const router = useRouter();
  const {
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

    createMultiplayerGame(characterSelected).then(() => router.push(APP_URL.MULTIPLAYER_LOBBY));
  }

  const btnSubmitStyle = isFormRedyForSubmit ? 'btn w-full btn-success' : 'btn w-full';

  return (
    <form className="flex flex-wrap justify-center gap-4 p-8" onSubmit={onSubmit}>
      <div>
        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">{t('Story_Name')}</span>
            <span className="opacity-50 label-text-alt">
              {calculeteTextPercentage(storyName, 10)} %
            </span>
          </div>
          <input
            className="input input-bordered"
            type="text"
            value={storyName}
            onChange={(e) => setStoryName(e.target.value)}
            placeholder={t('Story_Name')}
          />
        </label>

        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">{t('GmAi_Role')}</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setAiRole(e.target.value as AiRole)}
          >
            <option selected={aiRole === 'Game Master'} value="Game Master">
              {t('Role_Game_Master')}
            </option>
            <option selected={aiRole === 'Game Assistant'} value="Game Assistant">
              {t('Role_Game_Assistant')}
            </option>
          </select>
        </label>

        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">{t('GmAi_Style')}</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setAiConfig(e.target.value as AiModels)}
          >
            {aiConfigObj.map((aiModel) => (
              <option key={aiModel.name} selected={aiModel.name === aiConfig} value={aiModel.name}>
                {aiModel.title}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-[20rem]">
          <div className="label">
            <span className="label-text font-bold">{t('Lenguage_Game')}</span>
          </div>
          <select
            className="select select-bordered"
            onChange={(e) => setLocale(e.target.value as Locale)}
          >
            <option selected={locale === 'en'} value="en">
              English
            </option>
            <option selected={locale === 'es'} value="es">
              Español
            </option>
          </select>
        </label>
      </div>

      <label className="form-control w-[20rem]">
        <div className="label">
          <span className="label-text font-bold">{t('Story_Description')}</span>
          <span className="opacity-50 label-text-alt">
            {calculeteTextPercentage(storyDescription, minTxtDescription)} %
          </span>
        </div>
        <TextareaAutosize
          className="textarea textarea-bordered min-h-[18rem]"
          value={storyDescription}
          onChange={(e) => setStoryDescription(e.target.value)}
          placeholder={t('Story_Description_placeholder')}
        />
      </label>

      <button
        className={btnSubmitStyle}
        type="submit"
        disabled={!isFormRedyForSubmit || isMultiplayerLoading}
      >
        {isMultiplayerLoading ? t('btn.Creating_Game') : t('btn.Create_Game')}
      </button>
    </form>
  );
}
