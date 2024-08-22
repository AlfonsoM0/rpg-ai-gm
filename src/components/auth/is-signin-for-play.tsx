'use client';

import useFirebase from 'hooks/firebase';
import Main from '../Main';
import H1 from '../h1';
import UserButtonConnect from '../user/user-button/user-button-connect';
import { useTranslations } from 'next-intl';

export default function IsSignInForPlay({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Page_Multiplayer');

  const { user } = useFirebase();

  if (!user)
    return (
      <Main>
        <div>
          <H1>{t('h1_LogIn_for_play')}</H1>

          <UserButtonConnect />
        </div>
      </Main>
    );

  return children;
}
