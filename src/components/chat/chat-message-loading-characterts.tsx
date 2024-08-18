'use client';

import { useTranslations } from 'next-intl';

export default function MsgLoadingCharacters() {
  const t = useTranslations('MsgLoadingCharacters');
  return (
    <div>
      <p className="text-center">{t('Loading_characters')}</p>
    </div>
  );
}
