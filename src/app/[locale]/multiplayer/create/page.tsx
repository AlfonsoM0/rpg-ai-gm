'use client';

import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import FormCreateNewMultiplayerGame from 'src/components/multiplayer/form-create';
import SelectCharacter from 'src/components/multiplayer/select-character';

export default function Page() {
  return (
    <Main>
      <H1>GmAi Multijugador</H1>

      <section>
        <H2>Completa la siguiente información</H2>

        <FormCreateNewMultiplayerGame />
      </section>

      <section>
        <H2>Elige tu personaje</H2>

        <SelectCharacter />
      </section>
    </Main>
  );
}
