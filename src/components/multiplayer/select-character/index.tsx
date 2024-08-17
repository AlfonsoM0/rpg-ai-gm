'use client';

import { Skeleton_CardCharacter } from 'components/card-character';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Input } from 'src/components/input';
import { useCharacterStore } from 'src/hooks/use-character-store';
import { Character } from 'src/types/character';

const DynamicCardCharacter = dynamic(
  () => import('components/multiplayer/select-character/card-character-multiplayer'),
  {
    ssr: false,
    loading: Skeleton_CardCharacter,
  }
);

export default function SelectCharacter() {
  /**
   * Character Search
   */
  const t = useTranslations('Page_Home');
  const { charactersCollection } = useCharacterStore();
  const [search, setSearch] = useState('');
  function searchCharacter(charactersCollection: Character[]): Character[] {
    return charactersCollection.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }
  return (
    <div>
      {charactersCollection.length > 3 ? (
        <Input.Search
          labelclassname="m-auto mb-5"
          className="text-center"
          placeholder={t('input_Search_By_Name')}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      ) : null}

      <div className="flex flex-wrap justify-center gap-4">
        {searchCharacter(charactersCollection).map((character) => (
          <DynamicCardCharacter key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
