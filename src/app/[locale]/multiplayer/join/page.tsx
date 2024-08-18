'use client';

import { useEffect, useState } from 'react';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import MultiplayerJoinCollapse from 'src/components/multiplayer/multiplayer-join-collapse';
import SelectCharacter from 'src/components/multiplayer/select-character';
import useFirebase from 'src/hooks/firebase';
import { MultiplayerStory } from 'src/types/multiplayer';

export default function Page() {
  const { getAllFireDocs, isFireLoading } = useFirebase();

  const [games, setGames] = useState<MultiplayerStory[] | undefined>(undefined);

  function onSearchGames() {
    getAllFireDocs('MULTIPLAYER_STORY').then((docs) => {
      if (docs) setGames(docs);
    });
  }

  return (
    <Main>
      <H1>Partidas Multijugador</H1>

      <section>
        <H2>Elige tu personaje</H2>

        <SelectCharacter />
      </section>

      <hr />

      <section className="mx-2 flex flex-col items-center gap-4">
        <button className="btn" onClick={onSearchGames} disabled={isFireLoading}>
          Buscar partidas
        </button>

        {games?.length ? (
          <div>
            {games.map((game) => (
              <MultiplayerJoinCollapse key={game.storyId} game={game} />
            ))}
          </div>
        ) : null}
      </section>
    </Main>
  );
}
