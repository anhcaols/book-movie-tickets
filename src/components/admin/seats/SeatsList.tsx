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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  styled,
} from '@mui/material';
import { Add, BorderColorOutlined, DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onGetSeats } from '@redux/actions/seats.action';
import { onGetRooms } from '@redux/actions/rooms.action';
// import { CreateSeatModal } from './CreateSeatModal';

const StyledSelect = styled(Select)({
  '& .css-wgexrc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    fontSize: 13,
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: 13,
});

const SeatList = () => {
  const [isOpenCreateSeat, setIsOpenCreateSeat] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<number>(0);

  const pageSize = 10;
  useEffect(() => {
    dispatch(onGetRooms({ query: { page: currentPage, limit: Infinity } })).then((res: any) => {
      const firstRoom = res.payload.rooms[0];
      setSelectedRoom(firstRoom.id);
    });
  }, []);

  useEffect(() => {
    dispatch(onGetSeats({ roomId: selectedRoom, query: { page: currentPage, limit: pageSize } }));
  }, [currentPage, selectedRoom]);

  const { seats, paginationOptions } = useAppSelector(state => state.seats);
  const { rooms } = useAppSelector(state => state.rooms);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  const handleChangeRoom = (event: any) => {
    setSelectedRoom(event.target.value);
  };

  return (
    <>
      <Box className="py-6 flex items-start justify-between">
        <FormControl size="small" style={{ width: 250 }}>
          <InputLabel id="select-room">Chọn phòng</InputLabel>
          <StyledSelect
            onChange={handleChangeRoom}
            size="small"
            labelId="select-room"
            value={selectedRoom}
            input={<OutlinedInput label="Chọn phòng" />}
          >
            {rooms.map((room, index) => (
              <StyledMenuItem key={index} value={room.id}>
                {room.name}, {room.cinema.name}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <Button onClick={() => setIsOpenCreateSeat(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Loại ghế</TableCell>
              <TableCell align="left">Phòng</TableCell>
              <TableCell align="left">Vị trí hàng</TableCell>
              <TableCell align="left">Vị trí cột</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seats?.map((seat, index) => (
              <TableRow key={seat.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{seat.seatType.type}</TableCell>
                <TableCell align="left">
                  {seat.room.name}, {seat.room.cinema.name}
                </TableCell>
                <TableCell align="left">{seat.rowPosition}</TableCell>
                <TableCell align="left">{seat.columnPosition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="flex justify-center mt-6">
        <Pagination count={paginationOptions.totalPages} page={currentPage} onChange={handleChange} />
      </Box>
      {/* <CreateSeatModal open={isOpenCreateSeat} onClose={setIsOpenCreateSeat} /> */}
    </>
  );
};

export default SeatList;
