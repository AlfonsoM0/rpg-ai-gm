'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useRouter } from 'next/navigation';
import { Character } from 'types/character';

interface EditCharacterProps {
  character: Character;
}

export default function ButtonEditCharacter({ character }: EditCharacterProps) {
  const router = useRouter();
  const { setAllCharacterInfo, setStep, setIsEdit, setPreviousCharacteristics } =
    useCreateNewCharacterStore();

  function editCharacter() {
    setAllCharacterInfo(character);
    setPreviousCharacteristics(character.characteristics);
    setIsEdit(true);
    setStep(7);
    router.push('/new-character');
  }

  return (
    <button className="btn btn-sm btn-info" onClick={editCharacter}>
      Editar
    </button>
  );
}
