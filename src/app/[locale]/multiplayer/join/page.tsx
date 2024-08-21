'use client';

import { useTranslations } from 'next-intl';
import { use, useEffect, useState } from 'react';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import MultiplayerJoinCollapse from 'src/components/multiplayer/multiplayer-join-collapse';
import SelectCharacter from 'src/components/multiplayer/select-character';
import useFirebase from 'src/hooks/firebase';
import { MultiplayerStory } from 'src/types/multiplayer';

export default function Page() {
  const t = useTranslations('Page_Multiplayer_Join');

  const { getAllFireDocs, isFireLoading } = useFirebase();

  const [games, setGames] = useState<MultiplayerStory[] | undefined>(undefined);

  function onSearchGames() {
    getAllFireDocs('MULTIPLAYER_STORY').then((docs) => {
      if (docs) {
        const notStartedGames = docs.filter((d) => !d.isStoryStarted);
        setGames(notStartedGames);
      }
    });
  }

  useEffect(() => {
    onSearchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      <H1>{t('h1_Multiplayer_Games')}</H1>

      <section className="mx-2 flex flex-col items-center gap-4">
        <button className="btn" onClick={onSearchGames} disabled={isFireLoading}>
          {t('btn_Find_Games')}
        </button>

        {games?.length ? (
          <div>
            {games.map((game) => (
              <MultiplayerJoinCollapse key={game.storyId} game={game} />
            ))}
          </div>
        ) : (
          <small className="text-error">{t('small_No_games_found')}</small>
        )}
      </section>

      <hr />

      <section>
        <H2>{t('h2_Select_Character')}</H2>

        <SelectCharacter />
      </section>
    </Main>
  );
}
