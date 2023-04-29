import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../../_app';
import { Box, Typography } from '@mui/material';
import SeatList from '@components/admin/seats/SeatsList';

const AdminSeats: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Trạng thái ghế</Typography>
      <SeatList />
    </Box>
  );
};

AdminSeats.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminSeats;
