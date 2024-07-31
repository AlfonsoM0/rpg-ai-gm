'use client';

import CollapseTips from './collapse-tips';
import CollapseMyShortcuts from './collapse-my-shortcuts';
import CollapseShortcuts from './collapse-shortcuts';
import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';

export default function ModaIdeasForAI() {
  const t = useTranslations('ModaIdeasForAI');

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="py-4 text-sm">
          {t('p1')} <br />
        </p>

        <CollapseTips />

        <CollapseMyShortcuts />

        <CollapseShortcuts />
      </>
    </ModalContentContainer>
  );
}
