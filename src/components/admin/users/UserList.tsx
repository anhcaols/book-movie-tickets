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

const UserList = () => {
  const [isOpenCreateUser, setIsOpenCreateUser] = useState<boolean>(false);
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState<boolean>(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState<boolean>(false);
  const [isUserId, setUserId] = useState<string | number>(0);
  const dispatch = useAppDispatch();
  const [currentPage, setPage] = useState(1);

  const pageSize = 10;
  useEffect(() => {
    dispatch(onGetUsers({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);
  const { accounts, paginationOptions } = useAppSelector(state => state.accounts);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleShowUpdateModal = (id: number | string) => {
    setIsOpenUpdateUser(true);
    setUserId(id);
  };

  const handleShowDeleteModal = (id: number | string) => {
    setIsOpenDeleteUser(true);
    setUserId(id);
  };

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
                <TableCell align="left">{moment(account.dateOfBirth).format('DD/MM/YYYY')} </TableCell>
                <TableCell align="left">{account.gender}</TableCell>
                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    {/* <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(account.id)}
                      className="!text-lg hover:text-primary"
                    /> */}
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
      <Box className="flex justify-center mt-6">
        <Pagination count={paginationOptions.totalPages} page={currentPage} onChange={handleChange} />
      </Box>
      <CreateUserModal open={isOpenCreateUser} onClose={setIsOpenCreateUser} />
      <UpdateUserModal id={isUserId} open={isOpenUpdateUser} onClose={setIsOpenUpdateUser} />
      <DeleteUserModal id={isUserId} open={isOpenDeleteUser} onClose={setIsOpenDeleteUser} />
    </>
  );
};

export default UserList;
