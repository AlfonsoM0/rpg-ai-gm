'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { Character } from 'types/character';

interface CopyCharacterProps {
  character: Character;
}

export default function ButtonCopyCharacter({ character }: CopyCharacterProps) {
  const t = useTranslations('CardCharacter.btn');

  const router = useRouter();
  const { setAllCharacterInfo, setStep } = useCreateNewCharacterStore();

  function copyCharacter() {
    setStep(0);
    setAllCharacterInfo({
      ...character,
      id: crypto.randomUUID(),
      xp: 250,
    });

    router.push('/new-character');
  }

  return (
    <button className="btn btn-sm btn-info" onClick={copyCharacter}>
      {t('copy')}
    </button>
  );
}
