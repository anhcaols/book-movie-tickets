/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Pagination,
} from '@mui/material';
import { Add, BorderColorOutlined, DeleteOutline } from '@mui/icons-material';
import { UpdateUserModal } from './UpdateUserModal';
import { CreateUserModal } from './CreateUserModal';
import { DeleteUserModal } from './DeleteUserModal';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onGetUsers } from '@redux/actions/accounts.action';
import moment from 'moment';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetUsers({ query: { page: 1, limit: 200 } }));
  }, []);

  const { accounts, accountsPagination } = useAppSelector(state => state.accounts);

  const handleShowUpdateModal = (id: number) => {
    setIsOpenUpdateUser(true);
    setIsIdUser(id);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteUser(true);
    setIsIdUser(id);
  };

  const [page, setPage] = React.useState(1);
  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Box className="pt-4 pb-6 flex justify-end">
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
            {accounts?.map((account, index) => (
              <TableRow key={account.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{account.fullName}</TableCell>
                <TableCell align="left">{account.email}</TableCell>
                <TableCell align="left">{account.phoneNumber}</TableCell>
                <TableCell align="left">{moment(account.dateOfBirth).format('L')} </TableCell>
                <TableCell align="left">{account.gender}</TableCell>
                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(account.id)}
                      className="!text-lg hover:text-primary"
                    />
                    <DeleteOutline
                      onClick={() => handleShowDeleteModal(account.id)}
                      className="!text-xl hover:text-primary"
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="flex justify-end mt-6">
        <Pagination count={10} page={page} onChange={handleChange} />
      </Box>
      <CreateUserModal open={isOpenCreateUser} onClose={setIsOpenCreateUser} />
      <UpdateUserModal id={isIdUser} open={isOpenUpdateUser} onClose={setIsOpenUpdateUser} />
      <DeleteUserModal id={isIdUser} open={isOpenDeleteUser} onClose={setIsOpenDeleteUser} />
    </>
  );
};

export default UserList;
