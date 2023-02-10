import { NextPageWithLayout } from '../../_app';
import MainLayout from '@layouts/MainLayout';

const MovieDetailPage: NextPageWithLayout = () => {
  return <>Movie Detail</>;
};

MovieDetailPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default MovieDetailPage;
