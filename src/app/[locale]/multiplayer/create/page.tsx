import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';
import FormCreateNewMultiplayerGame from 'src/components/multiplayer/form-create';
import SelectCharacter from 'src/components/multiplayer/select-character';

import es from 'content/es.json';
import en from 'content/en.json';
import { Locale } from 'src/i18n-config';

export default function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const lang = locale === 'en' ? en : es;
  const t = lang.Page_Multiplayer_Create;

  return (
    <Main>
      <H1>{t.h1_Multiplayer}</H1>

      <section>
        <H2>{t.h2_Complete_Info}</H2>

        <FormCreateNewMultiplayerGame />
      </section>

      <section>
        <H2>{t.h2_Select_Character}</H2>

        <SelectCharacter />
      </section>
    </Main>
  );
}
