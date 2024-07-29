import { ModalContentContainer } from 'components/modal';

export default function ModalCharacterInPlay() {
  return (
    <ModalContentContainer title="Personaje en Juego" titleColor="error">
      <p className="py-4">
        No puedes reclutar, despedir o borrar personajes si tu historia actual no ha terminado.
      </p>
    </ModalContentContainer>
  );
}
