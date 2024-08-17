import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import { Link } from 'src/navigation';

export default function Page() {
  return (
    <Main>
      <H1>Multijugador</H1>

      <section className="flex flex-col gap-10">
        <Link className="btn" href={'/multiplayer/create'}>
          Crear a una partida
        </Link>

        <Link className="btn" href={'/multiplayer/join'}>
          Unirse a una partida
        </Link>
      </section>

      <div></div>
      <div></div>
    </Main>
  );
}
