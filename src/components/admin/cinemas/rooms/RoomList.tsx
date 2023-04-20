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

import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onGetRooms } from '@redux/actions/rooms.action';
import { CreateRoomModal } from './CreateRoomModal';
import { DeleteRoomModal } from './DeleteRoomModal';

const RoomList = () => {
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState<boolean>(false);
  const [isOpenUpdateRoom, setIsOpenUpdateRoom] = useState<boolean>(false);
  const [isOpenDeleteRoom, setIsOpenDeleteRoom] = useState<boolean>(false);
  const [isRoomId, setRoomId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    dispatch(onGetRooms({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);

  const { rooms, roomsPagination } = useAppSelector(state => state.rooms);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteRoom(true);
    setRoomId(id);
  };

  const handleChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box className="pt-4 pb-6 flex justify-end">
        <Button onClick={() => setIsOpenCreateRoom(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Tên phòng</TableCell>
              <TableCell align="left">TênRạp</TableCell>
              <TableCell align="left">Số hàng</TableCell>
              <TableCell align="left">Số cột</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms?.map((room, index) => (
              <TableRow key={room.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{room.name}</TableCell>
                <TableCell align="left">{room.cinema.name}</TableCell>
                <TableCell align="left">{room.rowNumber}</TableCell>
                <TableCell align="left">{room.columnNumber}</TableCell>
                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    {/* <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(room.id)}
                      className="!text-lg hover:text-primary"
                    /> */}
                    <DeleteOutline
                      onClick={() => handleShowDeleteModal(room.id)}
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
        <Pagination count={roomsPagination.totalPages} page={currentPage} onChange={handleChange} />
      </Box>
      <CreateRoomModal open={isOpenCreateRoom} onClose={setIsOpenCreateRoom} />
      <DeleteRoomModal id={isRoomId} open={isOpenDeleteRoom} onClose={setIsOpenDeleteRoom} />
    </>
  );
};

export default RoomList;
