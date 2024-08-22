'use client';

import { useTranslations } from 'next-intl';
import { APP_URL } from 'src/config/constants';
import useFirebase from 'src/hooks/firebase';
import { useCharacterStore } from 'src/hooks/use-character-store';
import { Link } from 'src/navigation';

export default function TryMultiplayerLink() {
  const t = useTranslations('Page_Home');

  const { user } = useFirebase();
  const { charactersCollection } = useCharacterStore();

  if (!user || !charactersCollection.length) return null;
  return (
    <div className="mt-[-1rem]">
      <Link className="text-info" href={APP_URL.HOME_MULTIPLAYER}>
        {t('linl_Try_Multiplayer')}
      </Link>
    </div>
  );
}
