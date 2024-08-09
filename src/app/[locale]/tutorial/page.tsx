'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';

const DynamicReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Page() {
  const locale = useTranslations()('[locale]');
  const t = useTranslations('Page_Tutorial');

  return (
    <Main>
      <H1>{t('h1_Tutorial')}</H1>

      <DynamicReactPlayer
        className="rounded-xl"
        url={'/video/tutorial/gmai-tutorial.mp4'}
        width={'100%'}
        height={'100%'}
        // playing
        light={Thumbnail}
        controls
        wrapper={VideoContainer}
        config={{
          file: {
            forceVideo: true,
            tracks: [
              {
                kind: 'subtitles',
                src: '/video/tutorial/gmai-tutorial-en.vtt',
                srcLang: 'en',
                label: 'English',
                default: locale === 'en' ? true : false,
              },
              {
                kind: 'subtitles',
                src: '/video/tutorial/gmai-tutorial-es.vtt',
                srcLang: 'es',
                label: 'Español',
                default: locale === 'es' ? true : false,
              },
            ],
          },
        }}
        style={{ border: '5px solid red' }}
      />

      <div></div>
    </Main>
  );
}

function VideoContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[80vw] min-h-[40vw] border-2 border-info rounded-xl p-2 flex justify-center items-center">
      {children}
    </div>
  );
}

// eslint-disable-next-line @next/next/no-img-element
const Thumbnail = <img src="/video/tutorial/thumbnail.png" alt="Thumbnail" />;
