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
  styled,
  Autocomplete,
  TextField,
} from '@mui/material';
import { Add, BorderColorOutlined, DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { animateScroll as scroll } from 'react-scroll';
import { onGetSeatTypes } from '@redux/actions/seatTypes.action';
import { onGetSchedules } from '@redux/actions/schedules.action';
import moment from 'moment';
import { onGetStatusSeats } from '@redux/actions/statusSeats.action';

const StyledAutocomplete = styled(Autocomplete)({
  '&  .MuiOutlinedInput-root': { fontSize: 14 },
  '& .MuiAutocomplete-listbox .MuiAutocomplete-option': {
    fontSize: 13,
  },
});

const StatusSeatList = () => {
  const [isOpenCreateSeatType, setIsOpenCreateSeatType] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenUpdateSeatType, setIsOpenUpdateSeatType] = useState<boolean>(false);
  const [isOpenDeleteSeatType, setIsOpenDeleteSeatType] = useState<boolean>(false);
  const [isSeatTypeId, setSeatTypeId] = useState<number>(0);

  const pageSize = 10;

  useEffect(() => {
    dispatch(onGetSchedules({ query: { page: 1, limit: Infinity } }));
  }, []);

  useEffect(() => {
    dispatch(onGetSeatTypes({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);

  const { seatTypes, paginationOptions } = useAppSelector(state => state.seatTypes);
  const { schedules } = useAppSelector(state => state.schedules);

  const newSchedules = schedules?.map(schedule => {
    return {
      label: `${schedule.movie.name}, ${schedule.room.roomName}, ${moment(schedule.startTime).format('HH:mm')}`,
      id: schedule.id,
    };
  });

  const [schedule, setSchedule] = React.useState<any>(newSchedules[0]);
  const [inputValue, setInputValue] = React.useState<string>('');

  useEffect(() => {
    dispatch(onGetStatusSeats({ query: { page: 1, limit: 200 }, payload: { schedule_id: schedule?.id } }));
  }, [schedule]);

  const { statusSeats } = useAppSelector(state => state.statusSeats);

  // handle events
  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleChange = (event: any, value: number) => {
    scroll.scrollToTop({ duration: 500, delay: 10 });
    setCurrentPage(value);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteSeatType(true);
    setSeatTypeId(id);
  };

  const handleShowUpdateModal = (id: number) => {
    setIsOpenUpdateSeatType(true);
    setSeatTypeId(id);
  };

  return (
    <>
      <Box className="py-6 flex items-center justify-between">
        <StyledAutocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          value={schedule}
          defaultValue={schedule}
          onChange={(event: any, newValue: any) => {
            setSchedule(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          // defaultValue={newSchedules[0]}
          options={newSchedules}
          sx={{ width: 250 }}
          renderInput={params => <TextField {...params} label="Lịch trình" />}
        />
        <Button onClick={() => setIsOpenCreateSeatType(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Mã ghế</TableCell>
              <TableCell align="left">Lịch trình</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusSeats?.map((statusSeat, index) => (
              <TableRow key={statusSeat.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{statusSeat.seatId}</TableCell>
                <TableCell align="left">
                  {statusSeat.schedule.movie.name}
                  {','} {statusSeat.room.name}
                  {','} {moment(statusSeat.schedule.showTime).format('HH:mm')}
                </TableCell>
                <TableCell align="left">{statusSeat.status}</TableCell>
                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(statusSeat.id)}
                      className="!text-lg hover:text-primary"
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
      {/* <CreateSeatTypeModal open={isOpenCreateSeatType} onClose={setIsOpenCreateSeatType} />
      <UpdateSeatTypeModal id={isSeatTypeId} open={isOpenUpdateSeatType} onClose={setIsOpenUpdateSeatType} />
      <DeleteSeatTypeModal id={isSeatTypeId} open={isOpenDeleteSeatType} onClose={setIsOpenDeleteSeatType} /> */}
    </>
  );
};

export default StatusSeatList;
