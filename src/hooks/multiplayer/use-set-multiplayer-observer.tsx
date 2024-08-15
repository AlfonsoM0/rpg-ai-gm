'use client';

import { useEffect } from 'react';
import { MultiplayerStory } from 'src/types/multiplayer';
import useFirebase from '../firebase';
import useMultiplayer from '.';
import { UserAccount } from 'src/types/firebase-db';

export default function useSetMultiplayerOberver() {
  const { observeFireDoc } = useFirebase();

  const { setMultiplayerStory, setUserCurrentMpGame, multiplayerStory } = useMultiplayer();

  // observe changes on game
  useEffect(() => {
    const unsuscribe1 = observeFireDoc(
      'MULTIPLAYER_STORY',
      (doc) => {
        const data = doc.data() as MultiplayerStory | undefined;
        setMultiplayerStory(data);
      },
      multiplayerStory?.storyId || 'no id'
    );

    const unsuscribe2 = observeFireDoc('USER_ACCOUNT', (doc) => {
      const data = doc.data() as UserAccount | undefined;
      if (data) {
        setUserCurrentMpGame(data.currentMultiplayerGame);
      }
    });

    return () => {
      unsuscribe1 && unsuscribe1();
      unsuscribe2 && unsuscribe2();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
