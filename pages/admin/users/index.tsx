import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { Box, Typography } from '@mui/material';
import UserList from '@components/admin/users/UserList';

const AdminUsers: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Khách hàng</Typography>
      <UserList />
    </Box>
  );
};

AdminUsers.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminUsers;
