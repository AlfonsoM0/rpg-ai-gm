import FormCharacterDescription from 'components/form-character-description';

export default function Page() {
  return (
    <main className="container flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Creación de Personaje</h1>

      <FormCharacterDescription />
    </main>
  );
}
