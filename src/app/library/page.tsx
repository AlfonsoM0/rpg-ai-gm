'use client';

import BookCard from 'components/card-book';
import { useLibraryStore } from 'hooks/use-library-store';

export default function Page() {
  const { library } = useLibraryStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4">
      <h1>Mi Biblioteca</h1>

      <section className="my-4">
        <div className="flex flex-wrap justify-center gap-4">
          {library.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
