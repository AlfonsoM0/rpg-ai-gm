import { AI_NAME_TO_SHOW } from 'config/constants';
import ClientPage from './(client-page)';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: AI_NAME_TO_SHOW,
  description: 'Your friend shared a character with you.',
};

// http://localhost:3000/library/book/nuiZGpNaSmaZLv4fJGvxZS701d23_cf32dc59-367a-4ea7-9cd3-67de33d6f65d
export default function Page({ params }: { params: { uid_bid: string } }) {
  return <ClientPage params={params} />;
}
