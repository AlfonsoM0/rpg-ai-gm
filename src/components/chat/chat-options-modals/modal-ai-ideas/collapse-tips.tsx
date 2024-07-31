'use client';

import { useTranslations } from 'next-intl';

export default function CollapseTips() {
  const t = useTranslations('ModaIdeasForAI.tips');

  return (
    <div className="collapse collapse-plus">
      <input type="radio" name="tips-y-atajos" />

      <div className="collapse-title text-xl font-medium">{t('title')}</div>

      <div className="collapse-content">
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
      </div>
    </div>
  );
}
