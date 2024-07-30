import FormNewCharacter from 'components/form-new-character';
import H1 from 'components/h1';
import Main from 'components/Main';

export default function Page() {
  return (
    <Main>
      <H1>Creación de Personaje</H1>

      <FormNewCharacter />

      <div></div>
    </Main>
  );
}
