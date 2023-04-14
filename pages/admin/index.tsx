import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../_app';

const AdminPage: NextPageWithLayout = () => {
  return <div>movie</div>;
};

AdminPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminPage;
