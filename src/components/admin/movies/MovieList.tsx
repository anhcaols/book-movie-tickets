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
import { onGetMovies } from '@redux/actions/movies.action';
import { CreateMovieModal } from './CreateMovieModal';
import { UpdateMovieModal } from './UpdateMovieModal';
import { DeleteMovieModal } from './DeleteMovieModal';

const MovieList = () => {
  const [isOpenCreateMovie, setIsOpenCreateMovie] = useState<boolean>(false);
  const [isOpenUpdateMovie, setIsOpenUpdateMovie] = useState<boolean>(false);
  const [isOpenDeleteMovie, setIsOpenDeleteMovie] = useState<boolean>(false);
  const [isMovieSlug, setMovieSlug] = useState<string>('');
  const [isMovieId, setMovieId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [currentPage, setPage] = useState(1);

  const pageSize = 10;
  useEffect(() => {
    dispatch(onGetMovies({ type: 'all', query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);
  const { movies, paginationOptions } = useAppSelector(state => state.movies.allMovies);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleShowUpdateModal = (slug: string, id: number) => {
    setIsOpenUpdateMovie(true);
    setMovieSlug(slug);
    setMovieId(id);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteMovie(true);
    setMovieId(id);
  };

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Box className="pt-4 pb-6 flex justify-end">
        <Button onClick={() => setIsOpenCreateMovie(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Tên phim</TableCell>
              <TableCell align="left">Thời lượng (phút)</TableCell>
              <TableCell align="left">Ngày khởi chiếu</TableCell>
              {/* <TableCell align="left">Diễn viên</TableCell> */}
              <TableCell align="left">Thể loại</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left">Đánh giá</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies?.map((movie, index) => (
              <TableRow key={movie.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {movie.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {movie.duration}
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment(movie.releaseDate).format('DD/MM/YYYY')}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  {movie.actor}
                </TableCell> */}
                <TableCell component="th" scope="row">
                  {movie.genres.map(genre => `${genre?.name}, `)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {movie.status === 1 ? 'Đang chiếu' : 'Sắp chiếu'}
                </TableCell>
                <TableCell component="th" scope="row">
                  {movie.scoreRate || 'Chưa có đánh giá'}
                </TableCell>

                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(movie.slug, movie.id)}
                      className="!text-lg hover:text-primary"
                    />
                    <DeleteOutline
                      onClick={() => handleShowDeleteModal(movie.id)}
                      // className="cursor-default opacity-[0.6]"
                      className="!text-xl hover:text-primary"
                    />
                    {/* <Tooltip title="Không khả dụng" placement="top">
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
      <CreateMovieModal open={isOpenCreateMovie} onClose={setIsOpenCreateMovie} />
      <UpdateMovieModal id={isMovieId} slug={isMovieSlug} open={isOpenUpdateMovie} onClose={setIsOpenUpdateMovie} />
      <DeleteMovieModal id={isMovieId} open={isOpenDeleteMovie} onClose={setIsOpenDeleteMovie} />
    </>
  );
};

export default MovieList;
