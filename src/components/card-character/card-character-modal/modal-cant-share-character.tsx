import { ModalContentContainer } from 'components/modal';

export default function ModalCantShareCharacter() {
  return (
    <ModalContentContainer title="Compartir Personaje" titleColor="error">
      <>
        <p>Para compartir un personaje debes iniciar sesión.</p>
      </>
    </ModalContentContainer>
  );
}
