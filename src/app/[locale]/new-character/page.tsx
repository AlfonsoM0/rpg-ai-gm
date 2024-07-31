import FormNewCharacter from 'components/form-new-character';
import H1 from 'components/h1';
import Main from 'components/Main';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Page_New_Character');

  return (
    <Main>
      <H1>{t('h1')}</H1>

      <FormNewCharacter />

      <div></div>
    </Main>
  );
}
