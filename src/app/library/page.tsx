'use client';

import { useLibraryStore } from 'hooks/use-library-store';

export default function Page() {
  const { library } = useLibraryStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4">
      <h1>Mi Biblioteca</h1>
    </main>
  );
}
