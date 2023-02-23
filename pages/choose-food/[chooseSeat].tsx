/* eslint-disable @next/next/no-img-element */
import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import {
  Box,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Button from '@components/shared/Button/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useRef, useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1b1919',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#36363c',
  '&:nth-of-type(odd)': {},
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const rows = [
  {
    id: '1',
    image: 'https://www.galaxycine.vn/media/2023/2/1/combo1-1617790472299_1675215607802.jpg',
    name: 'iCombo 1 Big HB Standard',
    description: '1 bắp + 1 nước ngọt 32 Oz',
    price: '89.000',
  },
  {
    id: '2',
    image: 'https://www.galaxycine.vn/media/2023/2/1/combo1-1617790472299_1675215607802.jpg',
    name: 'iCombo 2 Big HB Standard',
    description: '1 bắp + 1 nước ngọt 32 Oz',
    price: '90.000',
  },
  {
    id: '3',
    image: 'https://www.galaxycine.vn/media/2023/2/1/combo1-1617790472299_1675215607802.jpg',
    name: 'iCombo 3 Big HB Standard',
    description: '1 bắp + 1 nước ngọt 32 Oz',
    price: '100.000',
  },
  {
    id: '4',
    image: 'https://www.galaxycine.vn/media/2023/2/1/combo1-1617790472299_1675215607802.jpg',
    name: 'iCombo 4 Big HB Standard',
    description: '1 bắp + 1 nước ngọt 32 Oz',
    price: '120.000',
  },
];

const ChooseFoodPage: NextPageWithLayout = () => {
  const [countFoods, setCountFoods] = useState<number>(0);

  const countFoodRef = useRef<any>(null);

  return (
    <Box className="container flex flex-row flex-wrap content-center items-center mx-auto">
      <Box className="px-4 py-16" width="100%">
        <h2 className="text-2xl text-white leading-[100%] relative">
          Chọn combo <p className="underline-title top-10"></p>
        </h2>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={8}>
            <Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>COMBO</StyledTableCell>
                      <StyledTableCell>SỐ LƯỢNG</StyledTableCell>
                      <StyledTableCell>GIÁ(VND)</StyledTableCell>
                      <StyledTableCell>TỔNG(VND)</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell>
                          <Box display="flex" gap={2}>
                            <img className="w-12 h-12 rounded-md" src={`${row.image}`} alt="img" />
                            <Box>
                              <Typography>{row.name}</Typography>
                              <Typography className="text-sm text-text">{row.description}</Typography>
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box display="flex" gap={1}>
                            <RemoveCircleOutlineIcon
                              onClick={() => {
                                setCountFoods(count => count - 1);
                              }}
                            />
                            <input
                              type="text"
                              min={0}
                              max={10}
                              readOnly
                              value={countFoods}
                              style={{
                                background: 'transparent',
                                width: 20,
                                outline: 'none',
                                textAlign: 'center',
                              }}
                            />
                            <AddCircleOutlineIcon onClick={() => setCountFoods(count => count + 1)} />
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>{row.price}</StyledTableCell>
                        <StyledTableCell>200.000</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="bg-[#ffffff0d] p-4 rounded-lg gap-1 flex flex-col">
              <Typography className="text-xl text-white capitalize font-semibold">Nhà bà nữ</Typography>
              <Box mb={1}>
                <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">C16</span>
                <span className="text-xs mt-2 ml-2 text-primary opacity-[0.8] ">
                  Phim chỉ dành cho khán giả từ 16 tuổi trở lên
                </span>
              </Box>
              <Typography className="text-[15px] text-text ">
                Rạp:<span className="text-white capitalize font-semibold">Cinema Nam Định</span>
              </Typography>
              <Typography className="text-[15px] text-text ">
                Suất: <span className="font-semibold text-white">11:20</span> -{' '}
                <span className="font-semibold text-white">Thứ tư, 22/02/2023</span>
              </Typography>
              <Typography className="text-[15px] text-text ">
                Phòng chiếu: <span className="font-semibold text-white">PC01</span> - Ghế:{' '}
                <span className="font-semibold text-white">A1, B1</span>
              </Typography>
              <Typography className="text-[15px] text-text ">
                Combo:{' '}
                <span className="font-semibold text-white">
                  {' '}
                  iCombo 1 Big HB Standard(2),iCombo 2 Big HB Standard(1)
                </span>
              </Typography>

              <Typography className="text-[15px] text-text mt-2 ">
                Tổng: <span className="font-semibold text-white">120.000 VND</span>
              </Typography>
              <Button className="mt-4 h-10 w-full" primary>
                Đặt vé
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

ChooseFoodPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default ChooseFoodPage;
