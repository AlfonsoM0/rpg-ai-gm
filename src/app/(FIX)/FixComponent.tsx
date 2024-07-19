'use client';

import { useEffect } from 'react';
import useFIX_MoveCharactersToNewState from './useFIX_MoveCharactersToNewState';

export default function FixComponent() {
  useFIX_MoveCharactersToNewState();

  // TODO: delete alert
  // useEffect(() => {
  //   alert(
  //     '¡Advertencia! \n\n Este juego no está completo y puedes perder información en alguna actualización. \n\n Tu configuración, personajes y partidas solo se guardan en tu navegador. \n\n Para notificar un error o dar una sugerencia puedes escribirme en alfonso.ar/contact (haciendo click en el pie de página). \n\n Muchas gracias y... ¡Que te diviertas con GmAi! 😁'
  //   );
  // }, []);

  return <></>;
}
