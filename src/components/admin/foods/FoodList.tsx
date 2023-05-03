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
import moment from 'moment';
import { onGetFoods } from '@redux/actions/foods.action';
import { CreateFoodModal } from './CreateFoodModal';
import { UpdateFoodModal } from './UpdateFoodModal';

const FoodList = () => {
  const [isOpenCreateFood, setIsOpenCreateFood] = useState<boolean>(false);
  const [isOpenUpdateFood, setIsOpenUpdateFood] = useState<boolean>(false);
  const [isOpenDeleteFood, setIsOpenDeleteFood] = useState<boolean>(false);
  const [isFoodId, setFoodId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [currentPage, setPage] = useState(1);

  const pageSize = 10;
  useEffect(() => {
    dispatch(onGetFoods({ query: { page: currentPage, limit: pageSize } }));
  }, [currentPage]);
  const { foods, paginationOptions } = useAppSelector(state => state.foods);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleShowUpdateModal = (id: number) => {
    setIsOpenUpdateFood(true);
    setFoodId(id);
  };

  const handleShowDeleteModal = (id: number) => {
    setIsOpenDeleteFood(true);
    setFoodId(id);
  };

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Box className="pt-4 pb-6 flex justify-end">
        <Button onClick={() => setIsOpenCreateFood(true)} startIcon={<Add />} size="medium" variant="contained">
          Thêm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Mô tả</TableCell>
              <TableCell align="left">Giá</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods?.map((food, index) => (
              <TableRow key={food.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {calculateRowIndex(index)}
                </TableCell>
                <TableCell align="left">{food.name}</TableCell>
                <TableCell align="left">{food.description}</TableCell>
                <TableCell align="left">{parseFloat(food.price.toString())} đ</TableCell>

                <TableCell align="left">
                  <Box className="flex gap-3 w-full justify-start items-center cursor-pointer">
                    <BorderColorOutlined
                      onClick={() => handleShowUpdateModal(food.id)}
                      className="!text-lg hover:text-primary"
                    />
                    <DeleteOutline
                      // onClick={() => handleShowDeleteModal(food.id)}
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
      <CreateFoodModal open={isOpenCreateFood} onClose={setIsOpenCreateFood} />
      <UpdateFoodModal id={isFoodId} open={isOpenUpdateFood} onClose={setIsOpenUpdateFood} />
      {/*<DeleteFoodModal id={isFoodId} open={isOpenDeleteFood} onClose={setIsOpenDeleteFood} /> */}
    </>
  );
};

export default FoodList;
