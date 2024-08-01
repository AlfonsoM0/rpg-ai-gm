'use client';

import { Book } from 'types/library';
import BookButtons from './book-buttons-actions.tsx';
import { useTranslations } from 'next-intl';

export default function BookCard({ book }: { book: Book }) {
  const t = useTranslations('Card_Book');

  return (
    <article className="card bg-secondary-content text-primary w-80 shadow-xl">
      <div className="card-body justify-between">
        <h2 className="card-title font-bold">{book.title}</h2>
        <div className="my-2">
          <p>
            <strong>{t('Characters')}</strong>
          </p>
          <ul className="ml-2">
            {book.characters.map((character) => (
              <li className="list-disc ml-4" key={character.id}>
                {character.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-actions justify-around">
          <BookButtons book={book} />
        </div>
      </div>
    </article>
  );
}

export const Skeleton_CardBook = () => (
  <div className="flex w-80 flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
);
