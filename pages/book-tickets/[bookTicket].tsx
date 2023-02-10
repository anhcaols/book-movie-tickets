import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout';

const BookTicketPage: NextPageWithLayout = () => {
  return <>Book tickets</>;
};

BookTicketPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default BookTicketPage;
