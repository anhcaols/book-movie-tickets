import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../_app';
import Dashboard from '@components/admin/dashboard';

const AdminPage: NextPageWithLayout = () => {
  return <Dashboard />;
};

AdminPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminPage;
