/* eslint-disable @next/next/no-img-element */
import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import {
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Stack,
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { Base64 } from 'js-base64';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { onGetFoods } from '@redux/actions/foods.action';
import { NEXT_APP_API_BASE_URL } from '@configs/app.config';
import getVietnameseDayOfWeek from '@utils/index';
import { onSetInvoiceData } from '@redux/slices/invoiceData.slice';
import { onCreateOrder } from '@redux/actions/orders.action';
import AppDialog from '@components/shared/app-dialog';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';

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

const ChooseFoodPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [countFoods, setCountFoods] = useState<any>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [displayFoods, setDisplayFoods] = useState<
    {
      id: number;
      name: string;
      quantity: number;
    }[]
  >([]);
  const [openPayment, setOpenPayment] = useState<boolean>(false);

  const slug = router.query.chooseFood;
  const { foods } = useAppSelector(state => state.foods);
  const { invoiceData } = useAppSelector(state => state.invoiceData);

  useEffect(() => {
    dispatch(onGetFoods({ query: { page: 1, limit: 10 } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // handle when remove persist
  const [storageEventHandled, setStorageEventHandled] = useState(false);
  useEffect(() => {
    if (!storageEventHandled) {
      window.addEventListener('storage', event => {
        if (event.key === 'persist:root' && event.newValue === null) {
          router.push('/');
          enqueueSnackbar('Thao tác thất bại', {
            variant: 'error',
          });
        }
      });
      setStorageEventHandled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, storageEventHandled]);

  const date = moment(invoiceData?.showTime);
  const dayOfWeek = date.format('dddd');
  const vietnameseDayOfWeek = getVietnameseDayOfWeek(dayOfWeek);

  useEffect(() => {
    if (foods) {
      let sum = 0;
      let foodNames: any = [];
      Object.keys(countFoods).forEach(key => {
        const foodId = key.split('-')[1];
        const quantity = countFoods[key];
        const food = foods.find(food => food?.id === Number(foodId));
        if (food) {
          sum += food?.price * quantity;
        }
        if (quantity > 0) {
          foodNames.push({
            id: Number(foodId),
            name: `${food?.name} (${quantity})`,
            quantity,
          });
        }
      });
      setDisplayFoods(foodNames);
      setTotalAmount(sum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countFoods]);

  // custom render foods
  const lastFood = displayFoods[displayFoods.length - 1]?.name;
  const customDisplayFoods = displayFoods?.map(food => {
    let spread = food?.name === lastFood ? ' ' : ', ';
    return food?.name + spread;
  });

  const handleIncreaseQuantity = (food: FoodEntity) => {
    const currentCount = countFoods[`foodId-${food.id}`] || 0;
    const quantity = currentCount + 1;
    if (currentCount < 10) {
      setCountFoods((prevCount: any) => {
        const newCount = {
          ...prevCount,
          [`foodId-${food.id}`]: quantity,
        };
        return newCount;
      });
    }
  };

  const handleDecreaseQuantity = (food: FoodEntity) => {
    const currentCount = countFoods[`foodId-${food.id}`] || 0;
    const quantity = currentCount - 1;
    if (currentCount > 0) {
      setCountFoods((prevCountFoods: any) => {
        const updatedCountFoods = {
          ...prevCountFoods,
          [`foodId-${food.id}`]: quantity,
        };
        return updatedCountFoods;
      });
    }
  };

  const handleBookTicket = () => {
    const foods = displayFoods?.map(food => {
      return {
        id: food.id,
        quantity: food.quantity,
      };
    });
    const data = {
      user_id: invoiceData.user_id,
      schedule_id: invoiceData.schedule_id,
      seats: invoiceData.seats.map((seat: any) => seat.id),
      foods,
    };
    dispatch(onCreateOrder(data));
    setOpenPayment(false);
    enqueueSnackbar('Đã đặt vé thành công.', {
      variant: 'success',
    });
    router.push(`/profile/${invoiceData.user_id}`);
  };

  return (
    <>
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
                        <StyledTableCell>GIÁ TIỀN</StyledTableCell>
                        <StyledTableCell>SỐ LƯỢNG</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {foods.map(food => (
                        <StyledTableRow key={food.id}>
                          <StyledTableCell>
                            <Box display="flex" alignItems="center" gap={2}>
                              <img
                                className="w-12 h-12 rounded-md"
                                src={
                                  food?.image !== undefined
                                    ? ` ${NEXT_APP_API_BASE_URL}/static/foods/${food?.image}`
                                    : ''
                                }
                                alt="img"
                              />

                              <Box>
                                <Typography>{food.name}</Typography>
                                <Typography className="text-sm text-text">{food.description}</Typography>
                              </Box>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>{parseFloat(food.price.toString())} đ</StyledTableCell>
                          <StyledTableCell>
                            <Box display="flex" gap={1}>
                              <RemoveCircleOutlineIcon
                                className="cursor-pointer"
                                onClick={() => handleDecreaseQuantity(food)}
                              />
                              <input
                                id={`food-${food.id}`}
                                type="text"
                                min={0}
                                max={10}
                                readOnly
                                value={countFoods[`foodId-${food.id}`] || 0}
                                style={{
                                  background: 'transparent',
                                  width: 20,
                                  outline: 'none',
                                  textAlign: 'center',
                                }}
                              />
                              <AddCircleOutlineIcon
                                className="cursor-pointer"
                                onClick={() => handleIncreaseQuantity(food)}
                              />
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="bg-[#ffffff0d] p-4 rounded-lg gap-1 flex flex-col">
                <p className="text-lg text-white capitalize font-semibold">{invoiceData?.movie?.name}</p>
                <Box mb={1}>
                  <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">
                    C{invoiceData?.movie?.age}
                  </span>
                  <span className="text-xs mt-2 ml-2 text-primary opacity-[0.8] ">
                    Phim chỉ dành cho khán giả từ {invoiceData?.movie?.age} tuổi trở lên
                  </span>
                </Box>
                <p className=" text-[15px] text-text ">
                  Rạp: <span className="text-white capitalize font-semibold">{invoiceData?.cinema}</span>
                </p>
                <p className=" text-[15px] text-text ">
                  Suất:{' '}
                  <span className="font-semibold text-white">{moment(invoiceData?.showTime).format('HH:mm')}</span> -{' '}
                  <span className="font-semibold text-white">
                    {vietnameseDayOfWeek}, {moment(invoiceData?.startTime).format('DD/MM/YYYY')}
                  </span>
                </p>
                <p className=" text-[15px] text-text ">
                  Phòng chiếu: <span className="font-semibold text-white">{invoiceData?.room}</span> - Ghế:{' '}
                  <span className="font-semibold text-white">A1, B1</span>
                </p>
                <p className=" text-[15px] text-text ">
                  Combo: <span className="font-semibold text-white">{customDisplayFoods}</span>
                </p>

                <p className="text-base text-[15px] text-text mt-2 ">
                  Tổng:{' '}
                  <span className="font-semibold text-white text-base">
                    {(totalAmount + invoiceData.totalAmount).toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                </p>
                <Box className="flex gap-4">
                  <Link href={`/choose-seat/${slug}`} className="block w-full">
                    <Button variant="outlined" className="!mt-4  w-full">
                      Quay lại
                    </Button>
                  </Link>
                  <Button variant="contained" onClick={() => setOpenPayment(true)} className="!mt-4  w-full">
                    Thanh toán
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AppDialog
        bgColor="#2b2b31"
        size={'md'}
        title="Quét mã QR để thanh toán"
        open={openPayment}
        onClose={() => setOpenPayment(false)}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography className="italic text-primary" fontSize={14} mb={2}>
              * Bạn có thể tiến hành thanh toán sau
            </Typography>
            <Stack spacing={4}>
              <TextField
                InputProps={{ readOnly: true }}
                label="Số tài khoản"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={'0971000032922'}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Ngân hàng"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={'Ngân hàng TMCP Ngoại thương Việt Nam (VCB)'}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Chủ tài khoản"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={'CAO THE ANH'}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Chi nhánh"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={'Trụ sở CN Nam Hà Nội'}
              />
              <TextField
                InputProps={{ readOnly: true }}
                label="Nội dung chuyển khoản"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={'anhls movie'}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{ width: '100%', height: 420, borderRadius: 4 }} src="/assets/images/qr-vcb.jpg" alt="img" />
          </Grid>
        </Grid>
        <Box className="flex justify-end mt-8 gap-4">
          <Button variant="text" size="large" onClick={() => setOpenPayment(false)}>
            Hủy
          </Button>
          <Button onClick={() => handleBookTicket()} variant="contained" size="large">
            Đặt vé
          </Button>
        </Box>
      </AppDialog>
    </>
  );
};

ChooseFoodPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default ChooseFoodPage;
