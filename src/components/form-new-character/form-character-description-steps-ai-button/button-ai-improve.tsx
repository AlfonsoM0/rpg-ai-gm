'use client';

import { useTranslations } from 'next-intl';
import Loading from 'src/components/loading';

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

  return (
    <div className={btnStyle}>
      <Loading.IconStars className={iconStyle} isLoading={isLoadingContent} />
      <p className={txtStyle}>{t('ButtonAiImprove')}</p>
    </div>
  );
}
