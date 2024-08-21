import { Metadata } from 'next/types';
import H1 from 'src/components/h1';
import H2 from 'src/components/h2';
import { getFireDocSSR } from 'src/server/firebase-ssr';
import Main from 'src/components/Main';
import { getContent, Locale } from 'content/get-content';
import MultiplayerChatWindow from 'src/components/multiplayer/multiplayer-chat-window';
import CardCharacterContainer from 'src/components/card-character/card-character-container';
import CardCharacterBody from 'src/components/card-character/card-character-body';
import TTSControls from 'src/components/tts/tts-controls';

export async function generateMetadata({
  params: { uid_bid, locale },
}: {
  params: { uid_bid: string; locale: Locale };
}): Promise<Metadata> {
  const ttsTip = (await getContent(locale)).Page_Book.play_audio_tip;

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
  const ttsTip = (await getContent(locale)).Page_Book.play_audio_tip;
  const [uid, bid] = uid_bid.split('_');

  const library = await getFireDocSSR('USER_LIBRARY', uid);
  const book = library
    ? library.multiplayerLibrary.find((book) => book.storyId === bid)
    : undefined;

  const players = book?.players.map((p) => p.userName).join(', ') || '';
  const characters = book?.players.map((p) => p.character) || [];

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
      <H1>
        {t.h1_Story_from}: <br />
        {players}.
      </H1>
      <H2>{book.storyName}</H2>

      <TTSControls customTTS={ttsTip} />

      <section>
        <MultiplayerChatWindow multiplayerStory={book} />
      </section>

      <section className="mb-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {characters.map((character) => (
            <CardCharacterContainer key={character.id} isSelected={false}>
              <CardCharacterBody character={character}>
                <></>
              </CardCharacterBody>
            </CardCharacterContainer>
          ))}
        </div>
      </section>
    </Main>
  );
}
