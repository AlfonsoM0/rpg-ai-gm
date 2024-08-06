import { AI_NAME_TO_SHOW } from 'config/constants';
import { Metadata } from 'next/types';
import Main from 'components/Main';
import H1 from 'components/h1';
import CardCharacter, { Skeleton_CardCharacter } from 'components/card-character';
import { getFireDocSSR } from 'server/firebase-ssr';
import { Character } from 'types/character';
import { Suspense } from 'react';
import en from 'content/en.json';
import es from 'content/es.json';

export async function generateMetadata({
  params: { uid_cid, locale },
}: {
  params: { uid_cid: string; locale: string };
}): Promise<Metadata> {
  const [uid, cid] = uid_cid.split('_');
  const user = await getFireDocSSR('USER_ACCOUNT', uid);
  const userName = user ? user.displayName : '';

  return {
    description:
      locale === 'en'
        ? `Your friend ${userName} shared a character with you.`
        : `Tu amigo ${userName} compartió un personaje contigo.`,
  };
}

// http://localhost:3000/library/book/nuiZGpNaSmaZLv4fJGvxZS701d23_cf32dc59-367a-4ea7-9cd3-67de33d6f65d
export default async function Page({
  params: { uid_cid, locale },
}: {
  params: { uid_cid: string; locale: string };
}) {
  const translation = locale === 'en' ? en : es;
  const t = translation.Page_Character['[uid_cid]'];
  const [uid, cid] = uid_cid.split('_');

  const user = await getFireDocSSR('USER_ACCOUNT', uid);
  const userName = user ? user.displayName : '';

  const charCollection = await getFireDocSSR('USER_CHARACTERS', uid);
  const character = charCollection
    ? charCollection.charactersCollection.find((char: Character) => char.id === cid)
    : undefined;

  return (
    <Suspense
      fallback={
        <Main>
          <Skeleton_CardCharacter />
        </Main>
      }
    >
      {!character ? (
        <Main>
          <div className="flex flex-col items-center justify-center">
            <H1>{t.no_character_found}</H1>
          </div>
        </Main>
      ) : (
        <Main>
          <H1>{`${t.h1_Character_from} ${userName}`}</H1>

          <section className="mb-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <CardCharacter
                character={character}
                key={character.id}
                isViewOnly
                isFromAnotherUser
              />
            </div>
          </section>

          <div></div>
        </Main>
      )}
    </Suspense>
  );
}
