import { ModalContentContainer } from 'components/modal';

export default function ModalMaximumCharacters() {
  return (
    <ModalContentContainer title="Tienes demasiados personajes en juego" titleColor="error">
      <p className="py-4">
        Solo puedes tener 2 personajes en juego a la vez. Elimina alguno para poder reclutar otro.
      </p>
    </ModalContentContainer>
  );
}
