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
// import { BorderColorOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { animateScroll as scroll } from 'react-scroll';
import { onGetSeatTypes } from '@redux/actions/seatTypes.action';
import moment from 'moment';
import { onGetStatusSeats } from '@redux/actions/statusSeats.action';
import { onGetUsers } from '@redux/actions/accounts.action';
import { onGetOrders } from '@redux/actions/orders.action';
import { BorderColorOutlined } from '@mui/icons-material';
// import { UpdateStatusSeatTypeModal } from './UpdateStatusSeatModal';

const StyledAutocomplete = styled(Autocomplete)({
  '& .MuiOutlinedInput-root': { fontSize: 14 },
  '& .MuiAutocomplete-listbox .MuiAutocomplete-option': {
    fontSize: 14,
  },
  '& .MuiInputLabel-outlined': {
    fontSize: 13,
  },
});

const InvoiceList = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenUpdateStatusSeat, setIsOpenUpdateStatusSeat] = useState<boolean>(false);
  const [isStatusSeatId, setStatusSeatId] = useState<{
    seatId: number;
    scheduleId: number;
  }>({ seatId: 0, scheduleId: 0 });

  const pageSize = 10;

  useEffect(() => {
    dispatch(onGetUsers({ query: { page: 1, limit: Infinity } }));
  }, []);

  useEffect(() => {
    dispatch(onGetSeatTypes({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);

  const { accounts } = useAppSelector(state => state.accounts);
  const users = accounts?.map(account => {
    return {
      label: account.fullName,
      id: account.id,
    };
  });

  const [user, setUser] = React.useState<any>(users[0]);
  const [inputValue, setInputValue] = React.useState<string>('');

  useEffect(() => {
    if (user === undefined || user === null) {
      dispatch(onGetOrders({ userId: 'all', query: { page: currentPage, limit: pageSize } }));
    }
    dispatch(onGetOrders({ userId: user?.id, query: { page: currentPage, limit: pageSize } }));
  }, [user, currentPage]);

  const { orders, paginationOptions } = useAppSelector(state => state.orders);

  // handle events
  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleChange = (event: any, value: number) => {
    scroll.scrollToTop({ duration: 500, delay: 10 });
    setCurrentPage(value);
  };

  const handleShowUpdateModal = (seatId: number, scheduleId: number) => {
    setIsOpenUpdateStatusSeat(true);
    setStatusSeatId({ seatId, scheduleId });
  };

  return (
    <>
      <Box className="py-6 flex items-center justify-between">
        <StyledAutocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          value={user}
          defaultValue={user}
          onChange={(event: any, newValue: any) => {
            setUser(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          // defaultValue={newSchedules[0]}
          options={users}
          sx={{ width: 250 }}
          renderInput={params => <TextField {...params} label="Khách hàng" />}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Khách hàng</TableCell>
              <TableCell align="left">Ghế</TableCell>
              <TableCell align="left">Lịch trình</TableCell>
              <TableCell align="left">Đồ ăn</TableCell>
              <TableCell align="left">Ngày lập</TableCell>
              <TableCell align="left">Tổng tiền</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order, index) => (
              <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{order.user?.fullName}</TableCell>
                <TableCell align="left">{order.user?.fullName}</TableCell>
                <TableCell align="left">
                  {order.schedule?.movieName}
                  {','} {moment(order.schedule?.startTime).format('HH:mm')}
                </TableCell>
                <TableCell align="left">{order.totalAmount}</TableCell>
                <TableCell align="left">{moment(order.orderDate).format('HH:mm, DD/MM/YYYY')}</TableCell>
                <TableCell align="left">{order.totalAmount} đ</TableCell>

                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined onClick={() => {}} className="!text-lg hover:text-primary" />
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
      {/* <UpdateStatusSeatTypeModal
        id={isStatusSeatId}
        open={isOpenUpdateStatusSeat}
        onClose={setIsOpenUpdateStatusSeat}
      /> */}
    </>
  );
};

export default InvoiceList;
