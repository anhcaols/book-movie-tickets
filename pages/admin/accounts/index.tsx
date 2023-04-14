import DashboardLayout from '@layouts/DashboardLayout/DashboardLayout';
import React, { useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import SearchInput from '@components/shared/search-input';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const AdminAccount: NextPageWithLayout = () => {
  const [value, setValue] = useState('');
  return (
    <Box className="bg-[#222b36] p-6 rounded-lg">
      <Typography className="!text-xl !font-medium ">Tài khoản</Typography>
      <Box className="py-6 flex justify-between">
        <SearchInput value={value} onChange={(e: any) => setValue(e.target.value)} />
        <Button startIcon={<Add />} size="small" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="right">Họ tên</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Số điện thoại</TableCell>
              <TableCell align="right">Ngày sinh</TableCell>
              <TableCell align="right">Giới tính</TableCell>
              <TableCell align="right">Quyền</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

AdminAccount.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AdminAccount;
