import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import ComingSoon from '@components/movies/ComingSoon';

const ComingSoonPage: NextPageWithLayout = () => {
  return <ComingSoon />;
};

ComingSoonPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default ComingSoonPage;
