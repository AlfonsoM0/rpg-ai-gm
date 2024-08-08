'use client';

import { useEffect } from 'react';
import H2 from 'src/components/h2';
import Main from 'src/components/Main';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Main>
      <H2>Something went wrong!</H2>

      <p>
        <strong>ERROR: </strong>
        <br />
        <br />
        {error.name}: {error.message}
      </p>

      <button
        className="btn"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        aria-label="Try again"
      >
        Try again
      </button>
    </Main>
  );
}
