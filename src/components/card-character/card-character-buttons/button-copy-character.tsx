'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useRouter } from 'next/navigation';
import { Character } from 'types/character';

interface CopyCharacterProps {
  character: Character;
}

export default function ButtonCopyCharacter({ character }: CopyCharacterProps) {
  const router = useRouter();
  const { setAllCharacterInfo } = useCreateNewCharacterStore();

  function copyCharacter() {
    setAllCharacterInfo({
      ...character,
      id: crypto.randomUUID(),
      xp: 250,
    });

    router.push('/new-character');
  }

  return (
    <button className="btn btn-sm btn-info" onClick={copyCharacter}>
      Copiar personaje
    </button>
  );
}
