import { ModalContentContainer } from 'components/modal';

export default function ModalShareCharacter({ urlToShare }: { urlToShare: string }) {
  return (
    <ModalContentContainer title="Compartir Personaje" titleColor="primary">
      <>
        <p className="my-4">Se copió la URL del personaje al portapapeles.</p>
        <a className="link text-primary" href={urlToShare} target="_blank" rel="noreferrer">
          Clic aquí para ver el personaje compartido.
        </a>
      </>
    </ModalContentContainer>
  );
}
