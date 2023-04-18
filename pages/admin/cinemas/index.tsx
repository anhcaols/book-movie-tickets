import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { Box, Typography } from '@mui/material';
import CinemaList from '@components/admin/cinemas/CinemaList';

const AdminCinemas: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Tất cả rạp</Typography>
      <CinemaList />
    </Box>
  );
};

AdminCinemas.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminCinemas;
