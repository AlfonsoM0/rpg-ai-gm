'use client';

import { useCharacterStore } from 'src/hooks/use-character-store';
import Main from '../Main';
import H1 from '../h1';
import { useTranslations } from 'next-intl';
import CardCreateNewCharacter from '../card-create-new-character';

export default function IsCharacterRedyForPlay({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Page_Multiplayer');

  const { charactersCollection } = useCharacterStore();

  if (!charactersCollection.length)
    return (
      <Main>
        <div className="flex flex-col items-center gap-8">
          <H1>{t('h1_Character_for_play')}</H1>

          <CardCreateNewCharacter />
        </div>
      </Main>
    );

  return children;
}
