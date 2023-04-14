import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { Add, BorderColorOutlined, DeleteOutline } from '@mui/icons-material';
import SearchInput from '@components/shared/search-input';
import { UpdateUserModal } from './UpdateUserModal';
import { CreateUserModal } from './CreateUserModal';
import { DeleteUserModal } from './DeleteUserModal';

function createData(name: any, calories: any, fat: any, carbs: any, protein: any) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const UserList = () => {
  const [value, setValue] = useState('');
  const [isOpenCreateUser, setIsOpenCreateUser] = useState<boolean>(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState<boolean>(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState<boolean>(false);
  const [isIdUser, setIsIdUser] = useState<number>(0);

  const handleShowUpdateModal = (id: number) => {
    setIsOpenUpdateUser(true);
    setIsIdUser(id);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteUser(true);
    setIsIdUser(id);
  };
  return (
    <>
      <Box className="py-6 flex justify-between flex-wrap gap-4">
        <SearchInput width={220} value={value} onChange={(e: any) => setValue(e.target.value)} />
        <Button onClick={() => setIsOpenCreateUser(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Họ tên</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Ngày sinh</TableCell>
              <TableCell align="left">Giới tính</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
                <TableCell align="left">{row.carbs}</TableCell>
                <TableCell align="left">{row.protein}</TableCell>
                <TableCell align="left">{row.protein}</TableCell>
                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(index)}
                      className="!text-lg hover:text-primary"
                    />
                    <DeleteOutline
                      onClick={() => handleShowDeleteModal(index)}
                      className="!text-xl hover:text-primary"
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateUserModal open={isOpenCreateUser} onClose={setIsOpenCreateUser} />
      <UpdateUserModal id={isIdUser} open={isOpenUpdateUser} onClose={setIsOpenUpdateUser} />
      <DeleteUserModal id={isIdUser} open={isOpenDeleteUser} onClose={setIsOpenDeleteUser} />
    </>
  );
};

export default UserList;
