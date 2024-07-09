import FormCharacterDescription from 'components/form-character-description';
import H1 from 'components/h1';
import Main from 'components/Main';

export default function Page() {
  return (
    <Main>
      <H1>Creación de Personaje</H1>

      <FormCharacterDescription />

      <div></div>
    </Main>
  );
}
