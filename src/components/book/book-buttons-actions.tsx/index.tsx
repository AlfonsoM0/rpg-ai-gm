import { Book } from 'types/library';
import BookButtonDelete from './book-button-delete';
import BookButtonEdit from './book-button-edit';
import BookButtonOpen from './book-button-open';
import BookButtonContinue from './book-button-continue';

export default function BookButtons({ book }: { book: Book }) {
  return (
    <>
      <BookButtonDelete book={book} />
      <BookButtonEdit book={book} />
      <BookButtonOpen book={book} />
      <BookButtonContinue book={book} />
    </>
  );
}
