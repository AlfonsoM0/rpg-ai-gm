import H1 from './h1';
import Main from './Main';

export default function LoadingAllPage() {
  return (
    <Main>
      <H1>
        <span className="loading loading-spinner loading-lg" aria-label="Loading..."></span>
      </H1>
    </Main>
  );
}
