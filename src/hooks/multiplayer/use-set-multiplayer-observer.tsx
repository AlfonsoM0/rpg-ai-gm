'use client';

import { useEffect, useState } from 'react';
import { MultiplayerStory } from 'src/types/multiplayer';
import useFirebase from '../firebase';
import useMultiplayer from '.';
import { UserGame } from 'src/types/firebase-db';
import { Unsubscribe } from 'firebase/auth';

export default function useSetMultiplayerOberver() {
  const { getFireDoc, observeFireDoc } = useFirebase();

  const { setMultiplayerStory, setUserCurrentMpGame } = useMultiplayer();

  /**
   * Get Story ID and User Current Mp Game
   */
  const [storyId, setStoryId] = useState<string | undefined>(undefined);
  useEffect(() => {
    getFireDoc('USER_GAME').then((doc: false | UserGame | undefined) => {
      if (doc) {
        setStoryId(doc.currentMultiplayerGame?.storyId);
        setUserCurrentMpGame(doc.currentMultiplayerGame);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Set Multiplayer Story
   */
  useEffect(() => {
    if (storyId)
      getFireDoc('MULTIPLAYER_STORY', storyId).then((doc: false | MultiplayerStory | undefined) => {
        if (doc) {
          setMultiplayerStory(doc);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  /**
   * Observe changes on game
   */
  useEffect(() => {
    let unsuscribe1: Unsubscribe | undefined = undefined;
    let unsuscribe2: Unsubscribe | undefined = undefined;

    if (storyId) {
      unsuscribe1 = observeFireDoc(
        'MULTIPLAYER_STORY',
        (doc) => {
          const data = doc.data() as MultiplayerStory | undefined;
          setMultiplayerStory(data);
        },
        storyId
      );

      unsuscribe2 = observeFireDoc('USER_GAME', (doc) => {
        const data = doc.data() as UserGame | undefined;
        if (data) {
          setUserCurrentMpGame(data.currentMultiplayerGame);
        }
      });
    }

    return () => {
      unsuscribe1 && unsuscribe1();
      unsuscribe2 && unsuscribe2();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);
}
