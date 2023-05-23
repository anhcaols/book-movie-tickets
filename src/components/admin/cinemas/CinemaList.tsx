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
import { onGetCinemas } from '@redux/actions/cinemas.action';
import { CreateCinemaModal } from './CreateCinemaModal';
import { UpdateCinemaModal } from './UpdateCinemaModal';
import { DeleteCinemaModal } from './DeleteCinemaModal';

const CinemaList = () => {
  const [isOpenCreateCinema, setIsOpenCreateCinema] = useState<boolean>(false);
  const [isOpenUpdateCinema, setIsOpenUpdateCinema] = useState<boolean>(false);
  const [isOpenDeleteCinema, setIsOpenDeleteCinema] = useState<boolean>(false);
  const [isCinemaId, setCinemaId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    dispatch(onGetCinemas({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);

  const { cinemas, paginationOptions } = useAppSelector(state => state.cinemas);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleShowUpdateModal = (id: number) => {
    setIsOpenUpdateCinema(true);
    setCinemaId(id);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteCinema(true);
    setCinemaId(id);
  };

  const handleChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box className="pt-4 pb-6 flex justify-end">
        <Button onClick={() => setIsOpenCreateCinema(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Tên rạp</TableCell>
              <TableCell align="left">Địa chỉ</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cinemas?.map((cinema, index) => (
              <TableRow key={cinema.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{cinema.name}</TableCell>
                <TableCell align="left">{cinema.address}</TableCell>
                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(cinema.id)}
                      className="!text-lg hover:text-primary"
                    />
                    <DeleteOutline
                      onClick={() => handleShowDeleteModal(cinema.id)}
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
      <CreateCinemaModal open={isOpenCreateCinema} onClose={setIsOpenCreateCinema} />
      <UpdateCinemaModal id={isCinemaId} open={isOpenUpdateCinema} onClose={setIsOpenUpdateCinema} />
      <DeleteCinemaModal id={isCinemaId} open={isOpenDeleteCinema} onClose={setIsOpenDeleteCinema} />
    </>
  );
};

export default CinemaList;
