'use client';

import { AI_MODEL_TYPE } from 'src/config/constants';
import { useUserPreferencesStore } from 'src/hooks/use-user-preferences-store';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function UserAiModels() {
  const t = useTranslations('ModalUserAiModels');
  const { aiModels, addAIModel, removeAIModel, moveAIModel } = useUserPreferencesStore();
  const [newModel, setNewModel] = useState('');
  const [newApiKey, setNewApiKey] = useState('');
  const [error, setError] = useState('');

  const modelsConfigTips = (
    <div className="m-2">
      <ul className="list-disc text-info">
        <li>{t('tip1')}</li>
        <li>{t('tip2')}</li>
        <li>{t('tip3')}</li>
        <li>{t('tip4')}</li>
      </ul>
    </div>
  );

  function handleAddModel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const modelName = newModel.trim();
    const apiKey = newApiKey.trim();
    if (!modelName || !apiKey) {
      setError(t('error_required'));
      return;
    }
    if (!/gemini|gpt/i.test(modelName)) {
      setError(t('error_invalid'));
      return;
    }
    addAIModel({ MODEL: modelName, API_KEY: apiKey });
    setNewModel('');
    setNewApiKey('');
  }

  function onModelUp(model: AI_MODEL_TYPE) {
    const idx = aiModels.findIndex((m) => m.MODEL === model.MODEL);
    if (idx > 0) moveAIModel(model, idx - 1);
  }
  function onModelDown(model: AI_MODEL_TYPE) {
    const idx = aiModels.findIndex((m) => m.MODEL === model.MODEL);
    if (idx < aiModels.length - 1) moveAIModel(model, idx + 1);
  }

  return (
    <>
      <div className="collapse-title text-xl font-medium text-center">{t('title')}</div>
      <div>
        {modelsConfigTips}
        <form className="form-control gap-2 mt-4" onSubmit={handleAddModel}>
          <input
            className="input input-bordered text-center"
            placeholder={t('input_model_placeholder')}
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            required
          />
          <input
            className="input input-bordered text-center"
            placeholder={t('input_apikey_placeholder')}
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
            required
          />
          {error && <div className="text-error text-sm text-center">{error}</div>}
          <input className="btn btn-sm w-full" type="submit" value={t('btn_add')} />
        </form>
        <div className="mt-4">
          {aiModels.length === 0 && (
            <div className="text-center text-info">{t('no_models')}</div>
          )}
          {aiModels.map((model, idx) => (
            <div key={model.MODEL} className="flex gap-2 items-center mb-2 justify-center">
              <button
                className="btn btn-error p-1"
                onClick={() => removeAIModel(model)}
                aria-label={t('remove')}
              >
                X
              </button>
              <div className="flex-1 truncate text-center">
                <span className="font-bold">{model.MODEL}</span>
                <span className="ml-2 text-xs text-gray-400">{model.API_KEY ? '🔑' : ''}</span>
              </div>
              <div className="flex flex-col">
                <button
                  className="btn btn-xs p-1 w-10"
                  onClick={() => onModelUp(model)}
                  aria-label={t('move_up')}
                  disabled={idx === 0}
                >
                  ↑
                </button>
                <button
                  className="btn btn-xs p-1 w-10"
                  onClick={() => onModelDown(model)}
                  aria-label={t('move_down')}
                  disabled={idx === aiModels.length - 1}
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
