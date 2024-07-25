'use client';

import { Skeleton_CardBook } from 'components/book/card-book';
import H1 from 'components/h1';
import { Input } from 'components/input';
import Main from 'components/Main';
import { useLibraryStore } from 'hooks/use-library-store';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Book } from 'types/library';

const DynamicBookCard = dynamic(() => import('components/book/card-book'), {
  ssr: false,
  loading: Skeleton_CardBook,
});

export default function Page() {
  const { library } = useLibraryStore();

  const [search, setSearch] = useState('');

  function searchBook(libraru: Book[]): Book[] {
    return libraru.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <Main>
      <div>
        <H1>Biblioteca</H1>

        {library.length > 3 ? (
          <Input.Search
            labelclassname="m-auto mb-5"
            className="text-center"
            placeholder="Buscar por Nombre"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        ) : null}
      </div>

      <section className="my-4">
        <div className="flex flex-wrap justify-center gap-4">
          {searchBook(library).map((book) => (
            <DynamicBookCard book={book} key={book.id} />
          ))}
        </div>
      </section>

      <div></div>
    </Main>
  );
}
