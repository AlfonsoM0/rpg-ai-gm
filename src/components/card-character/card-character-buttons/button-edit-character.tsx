'use client';

import { useCreateNewCharacterStore } from 'hooks/use-create-new-character-state';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { Character } from 'types/character';
import { APP_URL } from 'src/config/constants';

interface EditCharacterProps {
  character: Character;
}

export default function ButtonEditCharacter({ character }: EditCharacterProps) {
  const t = useTranslations('CardCharacter.btn');

  const router = useRouter();
  const { setAllCharacterInfo, setStep, setIsEdit, setPreviousCharacteristics } =
    useCreateNewCharacterStore();

  function editCharacter() {
    setAllCharacterInfo(character);
    setPreviousCharacteristics(character.characteristics);
    setIsEdit(true);
    setStep(7);
    router.push(APP_URL.NEW_CHARACTER);
  }

  return (
    <button className="btn btn-sm btn-info" onClick={editCharacter} aria-label={t('edit')}>
      {t('edit')}
    </button>
  );
}
