import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { Box, Typography } from '@mui/material';
import OrdersList from '@components/admin/orders/OrdersList';

const AdminInvoices: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Tất cả hóa đơn</Typography>
      <OrdersList />
    </Box>
  );
};

AdminInvoices.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminInvoices;
