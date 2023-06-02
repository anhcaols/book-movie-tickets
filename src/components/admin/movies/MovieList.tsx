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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
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
  const [currentPage, setPage] = useState(1);
  const [status, setStatus] = useState<string>('all');

  const dispatch = useAppDispatch();

  const pageSize = 10;
  useEffect(() => {
    dispatch(onGetMovies({ type: status, query: { page: currentPage, limit: pageSize } }));
  }, [currentPage, status]);
  const { movies, paginationOptions } = useAppSelector((state: any) => {
    if (status === 'all') {
      return state?.movies.allMovies;
    }
    if (status === 'nowShowing') {
      return state?.movies.nowShowing;
    }
    if (status === 'comingSoon') {
      return state?.movies.comingSoon;
    }
  });

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

  const handleChangeStatus = (event: any) => {
    setStatus(event.target.value as string);
  };

  return (
    <>
      <Box className="pt-6 pb-6 flex justify-between">
        <FormControl size="small" style={{ width: 220 }}>
          <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Trạng thái"
            input={<OutlinedInput label="Trạng thái" />}
            onChange={handleChangeStatus}
          >
            <MenuItem value={'all'}>Tất cả</MenuItem>
            <MenuItem value={'nowShowing'}>Đang chiếu</MenuItem>
            <MenuItem value={'comingSoon'}>Sắp chiếu</MenuItem>
          </Select>
        </FormControl>
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
            {movies?.map((movie: any, index: number) => (
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
                  {movie.genres.map((genre: any) => `${genre?.name}, `)}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Chip
                    label={movie.status === 1 ? 'Đang chiếu' : 'Sắp chiếu'}
                    color={movie.status === 1 ? 'success' : 'warning'}
                    variant="filled"
                  ></Chip>
                </TableCell>
                <TableCell component="th" scope="row">
                  {movie?.scoreRate?.toFixed(1) || 'Chưa có đánh giá'}
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
