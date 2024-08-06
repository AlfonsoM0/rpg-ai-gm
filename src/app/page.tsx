import H1 from 'src/components/h1';
import Main from 'src/components/Main';
import { AI_NAME_TO_SHOW } from 'src/config/constants';
import iconGmAi from 'public/android-chrome-512x512.png';

export default function Page() {
  return (
    <Main>
      <H1>{AI_NAME_TO_SHOW}</H1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iconGmAi.src} alt={AI_NAME_TO_SHOW} />

      <div></div>
    </Main>
  );
}
