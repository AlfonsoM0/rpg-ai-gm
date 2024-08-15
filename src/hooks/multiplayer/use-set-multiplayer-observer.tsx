'use client';

import { useEffect } from 'react';
import { MultiplayerStory } from 'src/types/multiplayer';
import useFirebase from '../firebase';
import useMultiplayer from '.';
import { UserAccount } from 'src/types/firebase-db';

export default function useSetMultiplayerOberver() {
  const { observeFireDoc } = useFirebase();

  const { setMultiplayerStory, setUserCurrentMpGame, multiplayerStory, setIsMultiplayerLoading } =
    useMultiplayer();

  // observe changes on game
  useEffect(() => {
    const unsuscribe1 =
      multiplayerStory &&
      observeFireDoc(
        'MULTIPLAYER_STORY',
        (doc) => {
          setIsMultiplayerLoading(true);
          const data = doc.data() as MultiplayerStory | undefined;
          setMultiplayerStory(data);
          setIsMultiplayerLoading(false);
        },
        multiplayerStory.storyId
      );

    const unsuscribe2 = observeFireDoc('USER_ACCOUNT', (doc) => {
      setIsMultiplayerLoading(true);
      const data = doc.data() as UserAccount | undefined;
      if (data) {
        setUserCurrentMpGame(data.currentMultiplayerGame);
      }
      setIsMultiplayerLoading(false);
    });

    return () => {
      unsuscribe1 && unsuscribe1();
      unsuscribe2 && unsuscribe2();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
