'use client';

import { useTranslations } from 'next-intl';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import { APP_URL } from 'src/config/constants';
import useFirebase from 'src/hooks/firebase';
import useMultiplayer, { useCreateMultiplayer } from 'src/hooks/multiplayer';
import { useGmAiStore } from 'src/hooks/use-gm-ai-chat-store';
import { useRouter } from 'src/navigation';
import imgCreateGame from 'public/img/create-game.jpeg';
import imgJoinGame from 'public/img/join-game.jpeg';
import ImgMaskAndButton from 'src/components/image-mask-and-button';
import LoadingAllPage from 'src/components/loading-all-page';

export default function Page() {
  const t = useTranslations('Page_Multiplayer');

  const router = useRouter();

  const { multiplayerStory } = useMultiplayer();
  const { isFireLoading } = useFirebase();
  const { setCreateMultiplayerState } = useCreateMultiplayer();
  const { aiConfig, locale } = useGmAiStore();

  function onCreateGameClick() {
    setCreateMultiplayerState({ aiConfig, locale });
    router.push(APP_URL.MULTIPLAYER_CREATE);
  }

  // Page Loadimg
  if (isFireLoading) return <LoadingAllPage />;

  // No Game
  if (!multiplayerStory)
    return (
      <Main>
        <H1>{t('h1_Multiplayer')}</H1>

        <section className="flex flex-wrap justify-center gap-10">
          <ImgMaskAndButton
            src={imgCreateGame.src}
            alt={t('link_Create_Game')}
            onClickBtn={onCreateGameClick}
          />
          <ImgMaskAndButton
            src={imgJoinGame.src}
            alt={t('link_Join_Game')}
            linkUrl={APP_URL.MULTIPLAYER_JOIN}
          />
        </section>

        <div></div>
        <div></div>
      </Main>
    );

  // Current Game
  const isInLobby = !multiplayerStory.isStoryStarted;
  return (
    <Main>
      <H1>{t('h1_Multiplayer')}</H1>

      <section className="flex flex-wrap justify-center gap-10">
        {isInLobby ? (
          <ImgMaskAndButton
            src={imgJoinGame.src}
            alt={t('link_Return_Lobby')}
            linkUrl={APP_URL.MULTIPLAYER_LOBBY}
          />
        ) : (
          <ImgMaskAndButton
            src={imgJoinGame.src}
            alt={t('link_Return_Game')}
            linkUrl={APP_URL.MULTIPLAYER_GAME}
          />
        )}
      </section>

      <div></div>
      <div></div>
    </Main>
  );
}
