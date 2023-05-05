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
} from '@mui/material';
import { Add, BorderColorOutlined, DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import moment from 'moment';
import { onGetSchedules } from '@redux/actions/schedules.action';
import { CreateScheduleModal } from './CreateScheduleModal';
import { UpdateScheduleModal } from './UpdateScheduleModal';

const ScheduleList = () => {
  const [isOpenCreateSchedule, setIsOpenCreateSchedule] = useState<boolean>(false);
  const [isOpenUpdateSchedule, setIsOpenUpdateSchedule] = useState<boolean>(false);
  const [isOpenDeleteSchedule, setIsOpenDeleteSchedule] = useState<boolean>(false);
  const [isScheduleId, setScheduleId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [currentPage, setPage] = useState(1);

  const pageSize = 10;
  useEffect(() => {
    dispatch(onGetSchedules({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);
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
    setPage(value);
  };

  return (
    <>
      <Box className="pt-4 pb-6 flex justify-end">
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
                    <Tooltip title="Không khả dụng" placement="top">
                      <DeleteOutline
                        // onClick={() => handleShowDeleteModal(schedule.id)}
                        className="cursor-default opacity-[0.6]"
                      />
                    </Tooltip>
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
