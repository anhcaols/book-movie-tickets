import { NextPageWithLayout } from './_app';
import MainLayout from '@layouts/MainLayout';
import Home from '@components/home';

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default HomePage;
