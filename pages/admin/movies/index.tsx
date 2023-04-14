import React from 'react';
import { NextPageWithLayout } from '../../_app';
import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';

const AdminMovies: NextPageWithLayout = () => {
  return <div>AdminMovies</div>;
};

AdminMovies.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminMovies;
