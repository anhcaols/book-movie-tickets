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
// import { UpdateCinemaModal } from './UpdateCinemaModal';
// import { DeleteCinemaModal } from './DeleteCinemaModal';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onGetCinemas } from '@redux/actions/cinemas.action';
import { CreateCinemaModal } from './CreateUserModal';

const CinemaList = () => {
  const [isOpenCreateCinema, setIsOpenCreateCinema] = useState<boolean>(false);
  const [isOpenUpdateCinema, setIsOpenUpdateCinema] = useState<boolean>(false);
  const [isOpenDeleteCinema, setIsOpenDeleteCinema] = useState<boolean>(false);
  const [isIdCinema, setIsIdCinema] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(onGetCinemas({ query: { page, limit: 10 } }));
  }, [page]);

  const { cinemas, cinemasPagination } = useAppSelector(state => state.cinemas);

  const handleShowUpdateModal = (id: number) => {
    setIsOpenUpdateCinema(true);
    setIsIdCinema(id);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteCinema(true);
    setIsIdCinema(id);
  };

  const handleChange = (event: any, value: number) => {
    setPage(value);
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
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Dịa chỉ</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cinemas?.map((cinema, index) => (
              <TableRow key={cinema.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
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
      <Box className="flex justify-end mt-6">
        <Pagination count={cinemasPagination.totalPages} page={page} onChange={handleChange} />
      </Box>
      <CreateCinemaModal open={isOpenCreateCinema} onClose={setIsOpenCreateCinema} />
      {/* <UpdateCinemaModal id={isIdCinema} open={isOpenUpdateCinema} onClose={setIsOpenUpdateCinema} />
      <DeleteCinemaModal id={isIdCinema} open={isOpenDeleteCinema} onClose={setIsOpenDeleteCinema} /> */}
    </>
  );
};

export default CinemaList;
