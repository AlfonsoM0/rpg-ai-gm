'use client';

import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import useMultiplayer from 'src/hooks/multiplayer';

export default function Page() {
  const { multiplayerStory } = useMultiplayer();

  if (!multiplayerStory) return NoGameLoad;

  const { storyName } = multiplayerStory;
  return (
    <Main>
      <H1>{storyName}</H1>
    </Main>
  );
}

const NoGameLoad = (
  <Main>
    <H1>Juego no disponible</H1>
  </Main>
);
