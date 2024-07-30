import H1 from 'components/h1';
import Main from 'components/Main';
import { useTranslations } from 'next-intl';

export default function Custom404({ params }: { params: { p404: string } }) {
  const t = useTranslations('Page_404');

  return (
    <Main>
      <div>
        <H1>{t('Not_found')}</H1>

        <p className="text-center">.../{params.p404}</p>
      </div>
    </Main>
  );
}
