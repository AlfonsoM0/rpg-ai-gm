'use client';

import CollapseTips from './collapse-tips';
import CollapseMyShortcuts from './collapse-my-shortcuts';
import CollapseShortcuts from './collapse-shortcuts';
import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';

export default function ModaIdeasForAI() {
  const t = useTranslations('ModaIdeasForAI');

  const pathname = usePathname();
  const isOutOfStory = pathname !== '/story';

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="my-4 text-sm">{t('p1')}</p>
        {isOutOfStory ? <p className="pb-4 text-sm text-error">{t('p2')}</p> : null}

        <CollapseTips />

        <CollapseMyShortcuts />

        <CollapseShortcuts />
      </>
    </ModalContentContainer>
  );
}
