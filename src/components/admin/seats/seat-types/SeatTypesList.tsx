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
import { animateScroll as scroll } from 'react-scroll';
import { onGetSeatTypes } from '@redux/actions/seatTypes.action';
import { CreateSeatTypeModal } from './CreateSeatTypeModal';
import { UpdateSeatTypeModal } from './UpdateSeatTypeModal';
import { DeleteSeatTypeModal } from './DeleteSeatTypeModal';

const StyledSelect = styled(Select)({
  '& .css-wgexrc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    fontSize: 13,
  },
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: 13,
});

const SeatTypesList = () => {
  const [isOpenCreateSeatType, setIsOpenCreateSeatType] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenUpdateSeatType, setIsOpenUpdateSeatType] = useState<boolean>(false);
  const [isOpenDeleteSeatType, setIsOpenDeleteSeatType] = useState<boolean>(false);
  const [isSeatTypeId, setSeatTypeId] = useState<number>(0);

  const pageSize = 10;

  useEffect(() => {
    dispatch(onGetSeatTypes({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);

  const { seatTypes, paginationOptions } = useAppSelector(state => state.seatTypes);

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
      <Box className="py-6 flex items-center justify-end">
        <Button onClick={() => setIsOpenCreateSeatType(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Loại ghế</TableCell>
              <TableCell align="left">Giá</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seatTypes?.map((seatType, index) => (
              <TableRow key={seatType.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{seatType.type}</TableCell>
                <TableCell align="left">{parseFloat(seatType.price.toString())} đ</TableCell>
                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(seatType.id)}
                      className="!text-lg hover:text-primary"
                    />
                    <DeleteOutline
                      onClick={() => handleShowDeleteModal(seatType.id)}
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
      <CreateSeatTypeModal open={isOpenCreateSeatType} onClose={setIsOpenCreateSeatType} />
      <UpdateSeatTypeModal id={isSeatTypeId} open={isOpenUpdateSeatType} onClose={setIsOpenUpdateSeatType} />
      <DeleteSeatTypeModal id={isSeatTypeId} open={isOpenDeleteSeatType} onClose={setIsOpenDeleteSeatType} />
    </>
  );
};

export default SeatTypesList;
