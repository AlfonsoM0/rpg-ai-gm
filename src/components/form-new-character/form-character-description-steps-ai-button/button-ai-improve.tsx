'use client';

import { Icon } from 'components/icons';
import { useTranslations } from 'next-intl';

export const mintxtDescription = 100;

export default function ButtonAiImprove({
  isLoadingContent,
  contentLength,
  isHorizontalConfig,
}: {
  isLoadingContent: boolean;
  contentLength: number;
  isHorizontalConfig?: boolean;
}) {
  const t = useTranslations('Page_New_Character');

  let iconStyle = !contentLength ? 'w-4 h-4 fill-info' : 'w-4 h-4 fill-error';
  if (contentLength > mintxtDescription) iconStyle = 'w-4 h-4 fill-success';

  let txtStyle = !contentLength ? 'text-info' : 'text-error';
  if (contentLength > mintxtDescription) txtStyle = 'text-success';

  const btnStyle = isHorizontalConfig
    ? 'flex gap-1 items-center'
    : 'flex flex-col gap-1 items-center';

  if (isLoadingContent)
    return (
      <div className={btnStyle}>
        <span className="loading loading-spinner loading-xs"></span>
        <p className={txtStyle}>{t('ButtonAiImprove')}</p>
      </div>
    );
  return (
    <div className={btnStyle}>
      <Icon.Stars className={iconStyle} />
      <p className={txtStyle}>{t('ButtonAiImprove')}</p>
    </div>
  );
}
