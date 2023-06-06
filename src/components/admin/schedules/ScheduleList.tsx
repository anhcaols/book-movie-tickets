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
  Tooltip,
  TextField,
  Autocomplete,
  styled,
} from '@mui/material';
import { Add, BorderColorOutlined, DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import moment from 'moment';
import { onGetSchedules } from '@redux/actions/schedules.action';
import { CreateScheduleModal } from './CreateScheduleModal';
import { UpdateScheduleModal } from './UpdateScheduleModal';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { onGetMovies } from '@redux/actions/movies.action';

const StyledAutocomplete = styled(Autocomplete)({
  '& .MuiOutlinedInput-root': { fontSize: 14 },
  '& .MuiAutocomplete-listbox .MuiAutocomplete-option': {
    fontSize: 16,
  },
  '& .MuiInputLabel-outlined': {
    fontSize: 16,
  },
});

const ScheduleList = () => {
  const [isOpenCreateSchedule, setIsOpenCreateSchedule] = useState<boolean>(false);
  const [isOpenUpdateSchedule, setIsOpenUpdateSchedule] = useState<boolean>(false);
  const [isOpenDeleteSchedule, setIsOpenDeleteSchedule] = useState<boolean>(false);
  const [isScheduleId, setScheduleId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    dispatch(onGetMovies({ type: 'nowShowing', query: { page: 1, limit: Infinity } }));
  }, []);
  const { movies } = useAppSelector(state => state?.movies.nowShowing);
  const newMovies = movies?.map(movie => {
    return {
      label: `${movie.name} (${movie.duration} phút)`,
      id: movie.id,
    };
  });
  const [movie, setMovie] = React.useState<any>();
  const [inputMovieValue, setInputMovieValue] = React.useState<string>('');

  const pageSize = 10;
  useEffect(() => {
    dispatch(
      onGetSchedules({
        query: {
          page: currentPage,
          limit: pageSize,
          dateTime: dayjs(dateTime).format('YYYY-MM-DD'),
          movieId: movie?.id,
        },
      })
    );
  }, [currentPage, dateTime, movie]);
  const { schedules, paginationOptions } = useAppSelector(state => state.schedules);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleShowUpdateModal = (id: number) => {
    setIsOpenUpdateSchedule(true);
    setScheduleId(id);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteSchedule(true);
    setScheduleId(id);
  };

  const handleChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box className="pt-4 pb-6 flex justify-between">
        <Box className="flex gap-4">
          <DesktopDatePicker
            inputFormat="DD/MM/YYYY"
            label="Ngày"
            renderInput={inputProps => <TextField size="small" value={dateTime} sx={{ width: 250 }} {...inputProps} />}
            value={dateTime}
            onChange={(dateTime: any) => {
              setDateTime(dateTime);
              setCurrentPage(1);
            }}
          />
          <StyledAutocomplete
            sx={{ width: 250 }}
            size="small"
            disablePortal
            id="combo-box-demo"
            value={movie}
            defaultValue={movie}
            onChange={(event: any, newValue: any) => {
              setMovie(newValue);
              setCurrentPage(1);
            }}
            inputValue={inputMovieValue}
            onInputChange={(event, newInputValue) => {
              setInputMovieValue(newInputValue);
            }}
            options={newMovies}
            renderInput={params => <TextField {...params} label="Phim" />}
          />
        </Box>
        <Button onClick={() => setIsOpenCreateSchedule(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Tên phim</TableCell>
              <TableCell align="left">Phòng chiếu</TableCell>
              <TableCell align="left">Thời gian bắt đầu</TableCell>
              <TableCell align="left">Thời gian kết thúc</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules?.map((schedule, index) => (
              <TableRow key={schedule.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{schedule?.movie?.name}</TableCell>
                <TableCell align="left">
                  {schedule?.room.roomName}
                  {','} {schedule?.room.cinemaName}
                </TableCell>
                <TableCell align="left">{moment(schedule.startTime).format('HH:mm, DD/MM/YYYY')}</TableCell>
                <TableCell align="left">{moment(schedule.endTime).format('HH:mm, DD/MM/YYYY')}</TableCell>

                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(schedule.id)}
                      className="!text-lg hover:text-primary"
                    />
                    {/* <Tooltip title="Không khả dụng" placement="top">
                      <DeleteOutline
                        // onClick={() => handleShowDeleteModal(schedule.id)}
                        className="cursor-default opacity-[0.6]"
                      />
                    </Tooltip> */}
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
      <CreateScheduleModal open={isOpenCreateSchedule} onClose={setIsOpenCreateSchedule} />
      <UpdateScheduleModal id={isScheduleId} open={isOpenUpdateSchedule} onClose={setIsOpenUpdateSchedule} />
      {/* <DeleteScheduleModal id={isScheduleId} open={isOpenDeleteSchedule} onClose={setIsOpenDeleteSchedule} /> */}
    </>
  );
};

export default ScheduleList;
