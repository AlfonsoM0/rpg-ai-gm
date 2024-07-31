'use client';

import { useLibraryStore } from 'hooks/use-library-store';
import { useRouter } from '@/navigation';
import { Book } from 'types/library';

export default function BookButtonOpen({ book }: { book: Book }) {
  const router = useRouter();

  const { setBookSelected } = useLibraryStore();

  function hadleOpenBook() {
    setBookSelected(book);
    router.push('/library/book');
  }

  return (
    <button className="btn btn-sm btn-success" onClick={hadleOpenBook}>
      Abrir
    </button>
  );
}
