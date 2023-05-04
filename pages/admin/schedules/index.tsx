import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { Box, Typography } from '@mui/material';
import ScheduleList from '@components/admin/schedules/ScheduleList';

const AdminFoods: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Tất cả lịch trình</Typography>
      <ScheduleList />
    </Box>
  );
};

AdminFoods.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminFoods;
