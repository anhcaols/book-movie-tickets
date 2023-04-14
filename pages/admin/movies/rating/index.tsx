import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../../_app';

const AdminMovieRating: NextPageWithLayout = () => {
  return <div>AdminMovieRating</div>;
};

AdminMovieRating.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminMovieRating;
