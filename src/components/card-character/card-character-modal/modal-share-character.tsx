import { ModalContentContainer } from 'components/modal';

export default function ModalShareCharacter({ urlToShare }: { urlToShare: string }) {
  return (
    <ModalContentContainer title="Compartir Libro" titleColor="primary">
      <>
        <p className="my-4">Se copiado la URL del libro al portapapeles.</p>
        <a className="link text-primary" href={urlToShare} target="_blank" rel="noreferrer">
          Ver libro en el navegador
        </a>
      </>
    </ModalContentContainer>
  );
}
