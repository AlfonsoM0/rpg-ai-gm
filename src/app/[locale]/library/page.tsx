'use client';

import { Skeleton_CardBook } from 'components/book/card-book';
import H1 from 'components/h1';
import Main from 'components/Main';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Library from 'src/components/library';
import { useLibraryStore } from 'src/hooks/use-library-store';

const DynamicBookCard = dynamic(() => import('components/book/card-book'), {
  ssr: false,
  loading: Skeleton_CardBook,
});

export default function Page() {
  const t = useTranslations('Page_Library');

  const { isSinglePlayer, setIsSinglePlayer } = useLibraryStore();

  /**
   * Render
   */
  const btnStyleSelected = 'btn btn-primary rounded-box';
  const btnStyleNotSelected = 'btn btn-ghost rounded-box';

  return (
    <Main>
      <div>
        <H1>{t('h1_My_Library')}</H1>

        <ul className="flex justify-center gap-4 mb-4">
          <li
            className={isSinglePlayer ? btnStyleSelected : btnStyleNotSelected}
            onClick={() => setIsSinglePlayer(true)}
          >
            <a>Un Jugador</a>
          </li>
          <li
            className={!isSinglePlayer ? btnStyleSelected : btnStyleNotSelected}
            onClick={() => setIsSinglePlayer(false)}
          >
            <a>Multijugador</a>
          </li>
        </ul>
      </div>

      <Library />

      <div></div>
    </Main>
  );
}
