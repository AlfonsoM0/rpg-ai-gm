'use client';

import BookCard from 'components/card-book';
import H1 from 'components/h1';
import Main from 'components/Main';
import { useLibraryStore } from 'hooks/use-library-store';

export default function Page() {
  const { library } = useLibraryStore();

  return (
    <Main>
      <H1>Biblioteca</H1>

      <section className="my-4">
        <div className="flex flex-wrap justify-center gap-4">
          {library.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      </section>
    </Main>
  );
}
