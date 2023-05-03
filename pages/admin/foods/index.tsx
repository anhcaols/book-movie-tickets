import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { Box, Typography } from '@mui/material';
import FoodList from '@components/admin/foods/FoodList';

const AdminFoods: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Tất cả đồ ăn</Typography>
      <FoodList />
    </Box>
  );
};

AdminFoods.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminFoods;
