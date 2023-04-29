import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../../_app';
import { Box, Typography } from '@mui/material';
import SeatList from '@components/admin/seats/SeatsList';
import SeatTypesList from '@components/admin/seats/seat-types/SeatTypesList';

const AdminSeats: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Loại ghế</Typography>
      <SeatTypesList />
    </Box>
  );
};

AdminSeats.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminSeats;
