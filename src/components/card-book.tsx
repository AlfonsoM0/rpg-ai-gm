'use client';

import { Book } from 'types/library';
import CardBookButtonsActions from './card-book-buttons';

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="card bg-primary-content w-80 shadow-xl">
      <div className="card-body justify-between">
        <h2 className="card-title font-bold">{book.title}</h2>
        <div className="my-2">
          <p>
            <strong>Personajes</strong>
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
          <CardBookButtonsActions book={book} />
        </div>
      </div>
    </article>
  );
}
