import ChatWindow from 'src/components/chat/chat-window';
import { Metadata } from 'next/types';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import { getFireDocSSR } from 'src/server/firebase-ssr';
import CardCharacter from 'src/components/card-character';
import Main from 'src/components/Main';
import { Book } from 'src/types/library';
import TTSControlsSection from './tts-section';
import { getContent, Locale } from 'content/get-content';

export async function generateMetadata({
  params: { uid_bid, locale },
}: {
  params: { uid_bid: string; locale: string };
}): Promise<Metadata> {
  const [uid, bid] = uid_bid.split('_');
  const user = await getFireDocSSR('USER_ACCOUNT', uid);
  const userName = user ? user.displayName : '';

  return {
    description:
      locale === 'en'
        ? `Your friend ${userName} shared a story with you.`
        : `Tu amigo ${userName} compartió una historia contigo.`,
  };
}

// http://localhost:3000/es/library/book/nuiZGpNaSmaZLv4fJGvxZS701d23_cf32dc59-367a-4ea7-9cd3-67de33d6f65d
export default async function Page({
  params: { uid_bid, locale },
}: {
  params: { uid_bid: string; locale: Locale };
}) {
  const t = (await getContent(locale)).Page_Book['[uid_bid]'];
  const [uid, bid] = uid_bid.split('_');

  const user = await getFireDocSSR('USER_ACCOUNT', uid);
  const userName = user ? user.displayName : '';
  const userURLAvatar = user ? user.photoURL : '';

  const library = await getFireDocSSR('USER_LIBRARY', uid);
  const book = library ? library.library.find((book: Book) => book.id === bid) : undefined;

  if (!book)
    return (
      <Main>
        <div className="flex flex-col items-center justify-center">
          <H1>{t.no_book_found}</H1>
        </div>
      </Main>
    );

  return (
    <Main>
      <H1>{`${t.h1_Story_from} ${userName}`}</H1>
      <H2>{book.title}</H2>

      <TTSControlsSection />

      <section>
        <ChatWindow
          content={book.content.slice(1)}
          isLoadingContent={false}
          userName={userName}
          userURLAvatar={userURLAvatar}
        />
      </section>

      <section className="mb-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {book.characters.map((character) => (
            <CardCharacter character={character} key={character.id} isViewOnly isFromAnotherUser />
          ))}
        </div>
      </section>
    </Main>
  );
}
