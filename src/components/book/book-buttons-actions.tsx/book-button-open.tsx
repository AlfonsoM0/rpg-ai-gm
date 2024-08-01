'use client';

import { useLibraryStore } from 'hooks/use-library-store';
import { useRouter } from '@/navigation';
import { Book } from 'types/library';
import { useTranslations } from 'next-intl';

export default function BookButtonOpen({ book }: { book: Book }) {
  const t = useTranslations('Card_Book.btn');

  const router = useRouter();

  const { setBookSelected } = useLibraryStore();

  function hadleOpenBook() {
    setBookSelected(book);
    router.push('/library/book');
  }

  return (
    <button className="btn btn-sm btn-success" onClick={hadleOpenBook}>
      {t('BookButtonOpen')}
    </button>
  );
}
