import { ModalContentContainer } from 'components/modal';

export default function ModalCantShareCharacter() {
  return (
    <ModalContentContainer title="Compartir Libro" titleColor="error">
      <>
        <p>Para compartir un libro debes iniciar sesión.</p>
      </>
    </ModalContentContainer>
  );
}
