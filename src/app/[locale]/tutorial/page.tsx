'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import H1 from 'src/components/h1';
import Main from 'src/components/Main';

const DynamicReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <VideoContainer>
      <span className="loading loading-spinner loading-lg"></span>
    </VideoContainer>
  ),
});

export default function Page() {
  const locale = useTranslations()('[locale]');
  const t = useTranslations('Page_Tutorial');

  return (
    <Main>
      <H1>{t('h1_Tutorial')}</H1>

      <DynamicReactPlayer
        url={'/video/tutorial/gmai-tutorial.mp4'}
        width={'100%'}
        height={'100%'}
        wrapper={VideoContainer}
        light={Thumbnail}
        playing
        controls
        config={{
          file: {
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
      />

      <div></div>
    </Main>
  );
}

function VideoContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-[90vw] h-[calc(90vw*0.5625+0.5rem)] 
      md:w-[80vw] md:h-[calc(80vw*0.5625+0.5rem)] 
      lg:max-w-[50rem] lg:max-h-[calc(50rem*0.5625+0.5rem)]
      border-2 border-info rounded-xl p-2
      flex justify-center items-center"
    >
      {children}
    </div>
  );
}

const Thumbnail = (
  // eslint-disable-next-line @next/next/no-img-element
  <img className="rounded-xl" src="/video/tutorial/thumbnail.png" alt="Thumbnail" />
);
