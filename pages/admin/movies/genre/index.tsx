import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../../_app';

const AdminMovieGenre: NextPageWithLayout = () => {
  return <div>AdminMovieGenre</div>;
};

AdminMovieGenre.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminMovieGenre;
