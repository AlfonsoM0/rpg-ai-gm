'use client';

import { useLibraryStore } from 'hooks/use-library-store';
import { useRouter } from 'src/navigation';
import { Book } from 'types/library';
import { useTranslations } from 'next-intl';

export default function BookButtonOpen({ book }: { book: Book }) {
  const t = useTranslations('Card_Book.btn');

  const router = useRouter();

  const { setBookSelected, setBookSelectedMp, isSinglePlayer, multiplayerLibrary } =
    useLibraryStore();

  function hadleOpenBook() {
    if (isSinglePlayer) {
      setBookSelected(book);
      router.push('/library/book');
    } else {
      const bookMp = multiplayerLibrary.find((b) => b.storyId === book.id);
      if (bookMp) {
        setBookSelectedMp(bookMp);
        router.push('/library/book-mp');
      }
    }
  }

  return (
    <button
      className="btn btn-sm btn-success"
      onClick={hadleOpenBook}
      aria-label={t('BookButtonOpen')}
    >
      {t('BookButtonOpen')}
    </button>
  );
}
