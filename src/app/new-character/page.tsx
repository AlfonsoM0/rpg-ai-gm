import FormCharacterDescription from 'components/form-character-description';
import Main from 'components/Main';

export default function Page() {
  return (
    <Main>
      <h1 className="text-3xl font-bold mb-4">Creación de Personaje</h1>

      <FormCharacterDescription />

      <div></div>
    </Main>
  );
}
