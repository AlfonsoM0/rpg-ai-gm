'use client';

import { Skeleton_CardBook } from 'components/book/card-book';
import H1 from 'components/h1';
import Main from 'components/Main';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import LibrarySinglePlayer from 'src/components/library/library-sp';

const DynamicBookCard = dynamic(() => import('components/book/card-book'), {
  ssr: false,
  loading: Skeleton_CardBook,
});

export default function Page() {
  const t = useTranslations('Page_Library');

  const [isSp, setIsSp] = useState(true);

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
            className={isSp ? btnStyleSelected : btnStyleNotSelected}
            onClick={() => setIsSp(true)}
          >
            <a>Un Jugador</a>
          </li>
          <li
            className={!isSp ? btnStyleSelected : btnStyleNotSelected}
            onClick={() => setIsSp(false)}
          >
            <a>Multijugador</a>
          </li>
        </ul>
      </div>

      {isSp ? <LibrarySinglePlayer /> : null}
    </Main>
  );
}
