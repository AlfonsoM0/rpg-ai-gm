'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLibraryStore } from 'src/hooks/use-library-store';
import { Book } from 'src/types/library';
import { Input } from '../input';
import { Skeleton_CardBook } from 'components/book/card-book';
import dynamic from 'next/dynamic';
import H2 from '../h2';

const DynamicBookCard = dynamic(() => import('components/book/card-book'), {
  ssr: false,
  loading: Skeleton_CardBook,
});

export default function LibrarySinglePlayer() {
  const t = useTranslations('Page_Library');

  const { library } = useLibraryStore();

  const [search, setSearch] = useState('');

  function searchBook(libraru: Book[]): Book[] {
    return libraru.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <section className="my-4">
      {library.length === 0 ? <H2>{t('No_books_available')}</H2> : null}

      {library.length > 3 ? (
        <Input.Search
          labelclassname="m-auto mb-5"
          className="text-center"
          placeholder={t('input_placeholder_search')}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      ) : null}

      <div className="flex flex-wrap justify-center gap-4">
        {searchBook(library).map((book) => (
          <DynamicBookCard book={book} key={book.id} />
        ))}
      </div>
    </section>
  );
}
