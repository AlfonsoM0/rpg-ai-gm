import H1 from 'components/h1';
import H2 from 'components/h2';
import Main from 'components/Main';
import UserFormInfo from 'components/user/form/user-form-info';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Page_User');

  return (
    <Main>
      <H1>{t('h1')}</H1>

      <section>
        <H2>{t('h2')}</H2>

        <UserFormInfo />
      </section>

      <section></section>
    </Main>
  );
}
