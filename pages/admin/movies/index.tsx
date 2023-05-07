import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { Box, Typography } from '@mui/material';
import MovieList from '@components/admin/movies/MovieList';

const AdminMovies: NextPageWithLayout = () => {
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Tất cả phim</Typography>
      <MovieList />
    </Box>
  );
};

AdminMovies.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminMovies;
