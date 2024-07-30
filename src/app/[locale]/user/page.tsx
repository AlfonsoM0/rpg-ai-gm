import H1 from 'components/h1';
import H2 from 'components/h2';
import Main from 'components/Main';
import UserFormInfo from 'components/user/form/user-form-info';

export default function Page() {
  return (
    <Main>
      <H1>Mi Perfil</H1>

      <section>
        <H2>Información Personal</H2>

        <UserFormInfo />
      </section>

      <section></section>
    </Main>
  );
}
