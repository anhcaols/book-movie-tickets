import { NextPageWithLayout } from './_app';
import MainLayout from '@layouts/MainLayout';

const HomePage: NextPageWithLayout = () => {
  return <>Home Page</>;
};

HomePage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default HomePage;
