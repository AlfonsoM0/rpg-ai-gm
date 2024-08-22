'use client';

import CollapseTips from './collapse-tips';
import CollapseMyShortcuts from './collapse-my-shortcuts';
import CollapseShortcuts from './collapse-shortcuts';
import { ModalContentContainer } from 'components/modal';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';
import { APP_URL } from 'src/config/constants';
import useMultiplayer from 'src/hooks/multiplayer';

export default function ModaIdeasForAI({ isMultiplayer }: { isMultiplayer?: boolean }) {
  const t = useTranslations('ModaIdeasForAI');

  const pathname = usePathname();
  const isOutOfStory = !(
    pathname === (APP_URL.STORY as string) || pathname === (APP_URL.MULTIPLAYER_GAME as string)
  );

  const { multiplayerStory, userCurrentMpGame } = useMultiplayer();

  const isCurrentUserGm =
    multiplayerStory?.aiRole === 'Game Assistant' &&
    multiplayerStory.players[0].userId === userCurrentMpGame?.player.userId;
  const isRenderShortcuts = isMultiplayer ? !isCurrentUserGm : true;

  return (
    <ModalContentContainer title={t('title')} titleColor="info">
      <>
        <p className="my-4 text-sm">{t('p1')}</p>
        {isOutOfStory ? <p className="mb-4 text-sm text-error">{t('p2')}</p> : null}

        <CollapseTips isMultiplayer={isMultiplayer} />

        {isRenderShortcuts ? (
          <>
            <CollapseMyShortcuts isMultiplayer={isMultiplayer} />
            <CollapseShortcuts isMultiplayer={isMultiplayer} />
          </>
        ) : null}
      </>
    </ModalContentContainer>
  );
}
