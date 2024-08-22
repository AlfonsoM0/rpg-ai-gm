'use client';

import { useTranslations } from 'next-intl';
import { APP_URL } from 'src/config/constants';
import { useCreateNewCharacterStore } from 'src/hooks/use-create-new-character-state';
import { useRouter } from 'src/navigation';

export default function CardCreateNewCharacter() {
  const t = useTranslations('Page_Home');
  const router = useRouter();

  const { clearAllCharacterInfo, setStep } = useCreateNewCharacterStore();

  function onCreateNewCharacterClick() {
    clearAllCharacterInfo();
    setStep(0);
    router.push(APP_URL.NEW_CHARACTER);
  }

  return (
    <div className="card w-80 h-[19rem] border border-primary-content rounded-lg shadow-md">
      <button
        className="flex flex-col justify-center items-center mt-[25%]"
        onClick={onCreateNewCharacterClick}
        aria-label={t('h2_Create_New_Character')}
      >
        <div>
          <h2 className="card-title">{t('h2_Create_New_Character')}</h2>
        </div>
        <div className="text-9xl text-success">+</div>
      </button>
    </div>
  );
}
