import { Metadata } from 'next';
import IsSignInForPlay from 'src/components/auth/is-signin-for-play';
import { app_metadata } from 'src/config/app-metadata';
import { AI_NAME_TO_SHOW } from 'src/config/constants';
import { Locale } from 'content/get-content';
import MultiplayerLoader from 'src/components/multiplayer/multiplayer-loader';
import IsCharacterRedyForPlay from 'src/components/multiplayer/is-character-redy-for-play';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    ...app_metadata,
    title: `${AI_NAME_TO_SHOW} | ${locale === 'en' ? 'Multiplayer' : 'Multijugador'}`,
    description:
      locale === 'en'
        ? `Play your story with ${AI_NAME_TO_SHOW}`
        : `Juega tu historia con ${AI_NAME_TO_SHOW}`,

    manifest: locale === 'en' ? '/manifest_en.json' : '/manifest_es.json',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <IsSignInForPlay>
      <IsCharacterRedyForPlay>
        <MultiplayerLoader />
        {children}
      </IsCharacterRedyForPlay>
    </IsSignInForPlay>
  );
}
