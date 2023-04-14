import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { Box, Typography } from '@mui/material';
import UserList from '@components/users/UserList';

const AdminUser: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Khách hàng</Typography>
      <UserList />
    </Box>
  );
};

AdminUser.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminUser;
