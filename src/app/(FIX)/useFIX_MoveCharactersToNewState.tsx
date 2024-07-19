'use client';

import { useCharacterStore } from 'hooks/use-character-store';
import { useEffect } from 'react';
import { Character } from 'types/character';

export default function useFIX_MoveCharactersToNewState() {
  const { charactersCollection, setCharactersCollection } = useCharacterStore();

  // Move Characters from old storage to new storage
  useEffect(() => {
    const storedData = localStorage.getItem('character-storage');
    const allCharacters: Character[] = storedData
      ? JSON.parse(storedData)['state']['allCharacters']
      : [];
    const isNewStateEmpty = !charactersCollection.length;
    const isOldStateExist = !!allCharacters.length;

    if (isNewStateEmpty && isOldStateExist)
      setCharactersCollection({
        charactersCollection: allCharacters,
        updatedAt: new Date().getTime(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// TODO: Delete Fix after a while, migrate from localStorage to Firebase.
