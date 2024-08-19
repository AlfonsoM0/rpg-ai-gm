'use client';

import { useTranslations } from 'next-intl';

export default function CollapseTips({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('ModaIdeasForAI.tips');
  const tMp = useTranslations('ModaIdeasForAI.tips_Multiplayer');

  return (
    <div className="collapse collapse-plus">
      <input type="radio" name="tips-y-atajos" />

      <div className="collapse-title text-xl font-medium">{t('title')}</div>

      <div className="collapse-content">
        {isMultiplayer ? (
          <ul>
            <li className="list-disc ml-2 text-sm my-1">
              <strong>{tMp('tip1_p_strong')}</strong> <br />
              {tMp('tip1_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{tMp('tip2_p_strong')}</strong> <br />
              {tMp('tip2_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{tMp('tip3_p_strong')}</strong> <br />
              {tMp('tip3_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{tMp('tip4_p_strong')}</strong> <br />
              {tMp('tip4_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{tMp('tip5_p_strong')}</strong> <br />
              {tMp('tip5_p')}
            </li>
          </ul>
        ) : (
          <ul>
            <li className="list-disc ml-2 text-sm my-1">
              <strong>{t('tip1_p_strong')}</strong> <br />
              {t('tip1_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{t('tip2_p_strong')}</strong> <br />
              {t('tip2_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{t('tip3_p_strong')}</strong> <br />
              {t('tip3_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{t('tip4_p_strong')}</strong> <br />
              {t('tip4_p')}
            </li>

            <li className="list-disc ml-2 text-sm my-1">
              <strong>{t('tip5_p_strong')}</strong> <br />
              {t('tip5_p')}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
