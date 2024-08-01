'use client';

import { ModalContentContainer } from 'components/modal';
import { useModalState } from 'hooks/use-modal-state';

export default function ModalNews() {
  const { setModalIsOpen } = useModalState();

  return (
    <ModalContentContainer title={'¡Advertencia!'} titleColor="warning">
      <p className="my-4">
        Este juego no está completo y puedes perder información en alguna actualización. <br />
        <br />
        ¡Ya puedes gardar tus datos iniciando sessión con una <strong>
          cuenta de Google
        </strong>! <br />
        <br />
        Para notificar un error o dar una sugerencia puedes escribirme en{' '}
        <a
          className="link link-info"
          href="https://alfonso.ar/contact"
          rel="noopener noreferrer"
          target="_blank"
        >
          alfonso.ar/contact
        </a>{' '}
        (o haciendo click en el pie de página).
      </p>

      <button
        onClick={() => setModalIsOpen(false)}
        className="btn btn-primary mt-4 w-full text-xl font-bold"
      >
        ¡Entendido!
      </button>
    </ModalContentContainer>
  );
}
