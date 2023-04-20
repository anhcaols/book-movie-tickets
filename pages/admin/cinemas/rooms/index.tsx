import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { Box, Typography } from '@mui/material';
import RoomList from '@components/admin/cinemas/rooms/RoomList';
import { NextPageWithLayout } from '../../../_app';

const AdminRooms: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Tất cả phòng chiếu</Typography>
      <RoomList />
    </Box>
  );
};

AdminRooms.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminRooms;
