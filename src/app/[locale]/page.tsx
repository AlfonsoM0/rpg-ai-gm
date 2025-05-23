'use client';

import { Skeleton_CardCharacter } from 'components/card-character';
import H1 from 'components/h1';
import H2 from 'components/h2';
import { Icon } from 'components/icons';
import { Input } from 'components/input';
import Main from 'components/Main';
import { ModalContentContainer } from 'components/modal';
import {
  AI_NAME_TO_SHOW,
  AI_ROLE,
  APP_URL,
  CODE_CHARACTERS_CHANGE,
  CODE_DONT_SHOW_IN_CHAT,
} from 'config/constants';
import { useCharacterStore } from 'hooks/use-character-store';
import { useGmAiStore } from 'hooks/use-gm-ai-chat-store';
import { useModalState } from 'hooks/use-modal-state';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter, Link } from '@/navigation';
import { useState } from 'react';
import { Character } from 'types/character';
import { areTheSameInGameCharacters } from 'utils/are-the-same-in-game-characters';
import ChatOptionsConfig from 'components/chat/chat-options-config';
import CardCreateNewCharacter from 'src/components/card-create-new-character';
import TryMultiplayerLink from 'src/components/multiplayer/try-multiplayer-link';
import GmAiImag from 'src/components/gmai-img';
import { useUserPreferencesStore } from 'src/hooks/use-user-preferences-store';

const DynamicCardCharacter = dynamic(() => import('components/card-character'), {
  ssr: false,
  loading: Skeleton_CardCharacter,
});

export default function Home() {
  const t = useTranslations('Page_Home');
  const router = useRouter();

  const {
    charactersCollection,
    inGameCharacters,
    removeACharacterFromInGame,
    addACharacterToInGame,
  } = useCharacterStore();
  const { setModalContent, setModalIsOpen } = useModalState();
  const { content, addContent, isStoryStarted, setIsStoryStarted } = useGmAiStore();

  const [search, setSearch] = useState('');

  const { aiModels } = useUserPreferencesStore();
  function playStory() {
    if (!inGameCharacters.length) {
      setModalContent(<ModalNoCharactersToPlay />);
      return setModalIsOpen(true);
    }

    if (!content.length) {
      addContent(
        {
          role: AI_ROLE.USER,
          parts: [
            {
              text: `(((Información de mis personajes: ${JSON.stringify(inGameCharacters)}
            ${CODE_DONT_SHOW_IN_CHAT})))`,
            },
          ],
        },
        aiModels
      );
    }

    const areTheSameChars = areTheSameInGameCharacters(charactersCollection, inGameCharacters);
    if (isStoryStarted && !areTheSameChars) {
      const newCharactersInGame = inGameCharacters.map((char) => {
        const findUpdatedChar = charactersCollection.find((c) => c.id === char.id) || char;
        removeACharacterFromInGame(char.id);
        addACharacterToInGame(findUpdatedChar);
        return findUpdatedChar;
      });
      addContent(
        {
          role: AI_ROLE.USER,
          parts: [
            {
              text: `(((Actualiza mis personajes con la siguiente información: ${JSON.stringify(
                newCharactersInGame
              )}.
            Muéstrame los cambios en fromato de tabla comparativa para asegurarme de que todo está bien.
            ${CODE_CHARACTERS_CHANGE})))`,
            },
          ],
        },
        aiModels
      );
    } else setIsStoryStarted(true);

    router.push(APP_URL.STORY);
  }

  function searchCharacter(charactersCollection: Character[]): Character[] {
    return charactersCollection.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <Main>
      <GmAiImag width={320} height={320} priority />

      <H1 className="mt-[-2rem]">{t('h1_Welcome')}</H1>

      {/* 
        PLAY GAME
      */}
      <section className="mx-4 flex flex-col items-center gap-8">
        {/*
          Singleplayer Button
        */}
        <div className="flex flex-wrap justify-around items-center gap-4 border-2 p-4 rounded-md shadow-lg bg-primary-content">
          <button
            className="btn btn-lg"
            onClick={playStory}
            aria-label={isStoryStarted ? t('btn_Continue_Game') : t('btn_Play_Game')}
          >
            ▶️ {isStoryStarted ? t('btn_Continue_Game') : t('btn_Play_Game')}
          </button>
          <div>
            <h2 className="text-center text-primary font-bold text-2xl my-2">
              {t('h2_Recruited_Characters')}
            </h2>
            <p className="text-center text-primary">
              {inGameCharacters.length
                ? `${inGameCharacters.map((character) => character.name).join(', ')}.`
                : t('p_No_recruited_characters')}
            </p>
          </div>
        </div>

        {/* Multiplayer */}
        <TryMultiplayerLink />

        <ChatOptionsConfig />
      </section>

      {/*
        CHARACTERS COLLECTION
      */}
      <section className="my-4">
        <H2>{t('h2_My_Characters')}</H2>

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
          <CardCreateNewCharacter />

          {searchCharacter(charactersCollection).map((character) => (
            <DynamicCardCharacter key={character.id} character={character} />
          ))}
        </div>
      </section>
    </Main>
  );
}

function ModalNoCharactersToPlay() {
  const t = useTranslations('ModalNoCharactersToPlay');
  const router = useRouter();
  const { setModalIsOpen } = useModalState();

  function onWatchTutorialClick() {
    setModalIsOpen(false);
    router.push(APP_URL.HOME_TUTORIAL);
  }

  return (
    <ModalContentContainer title={t('title')} titleColor="error">
      <div>
        <p className="mt-4 text-center">{t('p_Recruit_a_character')}</p>

        <p className="font-bold text-lg mt-4 mb-2 text-center text-info">
          {t('p_First_time_you_play')}
        </p>
        <ol className="max-w-80 m-auto ml-[10%]">
          <li className="list-decimal">{t('ol_li_1')}</li>
          <li className="list-decimal">{t('ol_li_2')}</li>
          <li className="list-decimal">{t('ol_li_3')}</li>
          <li className="list-decimal">{t('ol_li_4')}</li>
          <li className="list-decimal">
            {t('ol_li_5')}
            <Icon.AiBrain className="w-4 h-4 fill-primary inline"></Icon.AiBrain>.
          </li>
          <li className="list-decimal">
            {t('ol_li_6')}
            <Icon.Art className="w-4 h-4 fill-primary inline"></Icon.Art>.
          </li>
          <li className="list-decimal">{t('ol_li_7')}</li>
        </ol>

        <button
          className="btn btn-info w-full mt-4"
          onClick={onWatchTutorialClick}
          aria-label={t('btn_Tutorial')}
        >
          {t('btn_Tutorial')}
        </button>
      </div>
    </ModalContentContainer>
  );
}
