'use client';

import { Icon } from 'components/icons';
import { useTranslations } from 'next-intl';

export const mintxtDescription = 100;

export default function ButtonAiImprove({
  isLoadingContent,
  contentLength,
}: {
  isLoadingContent: boolean;
  contentLength: number;
}) {
  const t = useTranslations('Page_New_Character');

  let iconStyle = !contentLength ? 'w-4 h-4 fill-info' : 'w-4 h-4 fill-error';
  if (contentLength > mintxtDescription) iconStyle = 'w-4 h-4 fill-success';

  let txtStyle = !contentLength ? 'text-info' : 'text-error';
  if (contentLength > mintxtDescription) txtStyle = 'text-success';

  if (isLoadingContent) return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <div className="flex flex-col gap-1 items-center">
      <Icon.Stars className={iconStyle} />
      <p className={txtStyle}>{t('ButtonAiImprove')}</p>
    </div>
  );
}
