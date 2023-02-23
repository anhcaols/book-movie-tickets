import { NextPageWithLayout } from '.././_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import NowShowing from '@components/movies/NowShowing';

const NowShowingPage: NextPageWithLayout = () => {
  return <NowShowing />;
};

NowShowingPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default NowShowingPage;
