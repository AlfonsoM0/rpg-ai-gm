import H1 from 'components/h1';
import Main from 'components/Main';
// eslint-disable-next-line no-restricted-imports -- Out of i18n scope
import Link from 'next/link';

export default async function Custom404() {
  return (
    <Main>
      <H1>404 | Not Found</H1>

      <Link className="btn btn-info" href={'/'}>
        Back to Homepage
      </Link>

      <div></div>
    </Main>
  );
}
