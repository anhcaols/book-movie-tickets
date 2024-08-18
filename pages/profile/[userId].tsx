import MainLayout from '@layouts/MainLayout/MainLayout';
import { NextPageWithLayout } from '../_app';
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';
import { animateScroll as scroll } from 'react-scroll';
import { onGetOrders } from '@redux/actions/orders.action';
import moment from 'moment';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { accountsService } from '@services/account.service';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { useAsync } from '@hooks/useAsync';
import { onUpdateUser } from '@redux/actions/accounts.action';
import { useSnackbar } from 'notistack';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const StyledHeader = styled(Box)(() => ({
  background: '50%/cover no-repeat',
}));

// @ts-ignore
const StyledNav = styled(Box)(() => ({
  backgroundColor: '#28282d',
  boxShadow: '0 5px 25px 0 rgb(0 0 0 / 30%)',
  height: 82,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  '&:before': {
    backgroundImage: 'linear-gradient(90deg,#ff55a5,#ff5860)',
    content: '""',
    display: 'block',
    height: 2,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  }
}));

// @ts-ignore
const StyledGenre = styled(TextField)(() => ({
  '.css-11e0ke3-MuiInputBase-input-MuiOutlinedInput-input': {
    textTransform: 'capitalize'
  },
}));

const userInfoSchema = z.object({
  fullName: z.string().min(1, 'Họ tên là bắt buộc.'),
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  phoneNumber: z.string(),
  gender: z.any().refine(value => value !== '', {
    message: 'Giới tính là bắt buộc',
  }),
  dateOfBirth: z.any().refine(value => value !== null, {
    message: 'Ngày sinh là bắt buộc',
  }),
});

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
    newPassword: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
    confirmNewPassword: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Hai mật khẩu phải trùng nhau',
    path: ['confirmNewPassword'],
  });

const UserProfilePage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const router = useRouter();
  const id = router.query.userId as string;
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [isChecked, setIsChecked] = useState(false);
  const [isShowOldPassword, setIsShowOldPassword] = useState<boolean>(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState<boolean>(false);
  const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
  });

  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePasswordForm,
    formState: { errors: errorsChangePassword },
    setValue: setValueChangePassword,
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { account } = useAppSelector(state => state.auth);
  useEffect(() => {
    if (id) {
      dispatch(onGetOrders({ userId: id, query: { page: currentPage, limit: pageSize } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage]);
  const { orders, paginationOptions } = useAppSelector(state => state.orders);

  const calculateRowIndex = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const handleChange = (event: any, value: number) => {
    scroll.scrollToTop({ duration: 500, delay: 10 });
    setCurrentPage(value);
  };

  // handle get seats
  function getSeatName(row: number, col: number) {
    const rowNames = [];
    for (let i = 65; i <= 90; i++) {
      rowNames.push(String.fromCharCode(i));
    }
    const rowName = rowNames[row - 1];
    return `${rowName}${col}, `;
  }

  useEffect(() => {
    const fetchUser = async () => {
      const response: any = await accountsService.getUser(Number(id));
      setValue('fullName', response.account.fullName);
      setValue('email', response.account.email);
      setValue('phoneNumber', response.account.phoneNumber);
      setValue('dateOfBirth', response.account.dateOfBirth);
      setValue('gender', response.account.gender);
    };
    if (id) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const gender = data.gender;
    const dataValues = {
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phoneNumber,
      gender,
      date_of_birth: dayjs(data.dateOfBirth).format(),
    };

    executeUpdate(dataValues);
  });

  const [executeUpdate] = useAsync<{
    full_name: string;
    email: string;
    phone_number: string;
    gender: string;
    date_of_birth: string;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onUpdateUser({ dataValues: payload, userId: Number(id) })),
    onResolve: () => {
      setIsLoading(false);
      enqueueSnackbar('Cập nhập thành công', {
        variant: 'success',
      });
      // window.location.reload();
    },
    onReject: (error: any) => {
      setIsLoading(false);
      enqueueSnackbar('Cập nhật thất bại', {
        variant: 'error',
      });
    },
  });

  const handleSubmitChangePassword = handleSubmitChangePasswordForm(async data => {
    const payload = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmNewPassword,
    };
    try {
      await accountsService.changePassword(payload);
      enqueueSnackbar('Đổi mật khẩu thành công', {
        variant: 'success',
      });
      setValueChangePassword('oldPassword', '');
      setValueChangePassword('newPassword', '');
      setValueChangePassword('confirmNewPassword', '');
    } catch (e) {
      enqueueSnackbar('Mật khẩu cũ không chính xác', {
        variant: 'error',
      });
    }
  });

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="min-h-[60vh]">
          <StyledHeader
            className="py-[50px] xl:pt-[70px] xl:pb-[68px]"
            style={{ backgroundImage: `url(/assets/images/section.jpg)` }}
          >
            <Box
              className="movie-title container flex flex-col xl:flex-row justify-between flex-wrap xl:items-center
                    mx-auto pl-[15px] pr-[15px] "
            >
              <h1 className="text-[30px] xl:text-[36px] text-[#fff] leading-[42px] xl:leading-[50px] font-light mb-[10px] xl:mb-0">
                My AnhLs
              </h1>
              <Box display={'flex'} gap={4}>
                <Link className="text-[#ffffff80]  text-[14px] xl:text-[15px] font-openSans relative " href="/">
                  <Typography className="cursor-pointer hover:text-primary ml-[40px] text-[#ffffff80] text-[15px] font-openSans">
                    Home
                  </Typography>
                </Link>
                <Typography className="cursor-default ml-[40px] text-[#ffffff80] text-[15px] font-openSans">
                  Profile
                </Typography>
              </Box>
            </Box>
          </StyledHeader>
          <Box>
            <StyledNav>
              <Box className="container flex flex-row flex-wrap content-center items-center mx-auto px-4">
                <Box className="flex gap-3 items-center">
                  <Avatar
                    className="!w-[50px] !h-[50px] rounded-full cursor-pointer object-cover"
                    src={account.avatar || '/assets/images/avatar.jpg'}
                    alt="img"
                  />
                  <Box>
                    <Typography className="!text-base">{account.fullName}</Typography>
                    <Typography className="!text-sm">{account.email}</Typography>
                  </Box>
                </Box>
              </Box>
            </StyledNav>

            <Box className="container flex flex-row flex-wrap content-center items-center mx-auto  ">
              <Box className="mt-3 w-full">
                <form onSubmit={onSubmit} action="#">
                  <Box>
                    <Typography className="!text-xl !font-medium py-4">Thông tin thành viên </Typography>
                    <Stack spacing={3}>
                      <Grid container>
                        <Grid item xs={9}>
                          <Box className="flex gap-2">
                            <TextField
                              fullWidth
                              {...register('fullName')}
                              defaultValue={getValues('fullName') || ''}
                              error={!!errors.fullName}
                              helperText={errors.fullName?.message}
                              label=" Họ tên"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                              disabled
                              fullWidth
                              {...register('email')}
                              error={!!errors.email}
                              helperText={errors.email?.message}
                              label="Email"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={9}>
                          <Box className="flex gap-4">
                            <TextField
                              disabled
                              {...register('phoneNumber')}
                              error={!!errors.phoneNumber}
                              helperText={errors.phoneNumber?.message}
                              label="Số điện thoại"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                              fullWidth
                              focused
                            />

                            <StyledGenre
                              disabled
                              {...register('gender')}
                              error={!!errors.gender}
                              label="Giới tính"
                              variant="outlined"
                              InputLabelProps={{ shrink: true }}
                              fullWidth
                            />

                            <Controller
                              name="dateOfBirth"
                              control={control}
                              defaultValue={null}
                              render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <DesktopDatePicker
                                  disabled
                                  {...field}
                                  inputFormat="DD/MM/YYYY"
                                  inputRef={ref}
                                  label="Ngày sinh"
                                  renderInput={inputProps => (
                                    <TextField
                                      fullWidth
                                      {...inputProps}
                                      onBlur={onBlur}
                                      name={name}
                                      error={!!fieldState.error}
                                      helperText={fieldState.error?.message}
                                    />
                                  )}
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                    <Box pt={3}>
                      <LoadingButton type="submit" variant="contained" size="large" loading={isLoading}>
                        Cập nhật
                      </LoadingButton>
                    </Box>
                  </Box>
                </form>
                <Box mt={4}>
                  <Box className="flex gap-2">
                    <Checkbox
                      checked={isChecked}
                      onChange={event => {
                        setIsChecked(event.target.checked);
                      }}
                    />
                    <Typography>Đổi mật khẩu</Typography>
                  </Box>
                  {isChecked && (
                    <form action="#" onSubmit={handleSubmitChangePassword}>
                      <Box mt={3} className="flex flex-col" gap={3}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="filled-adornment-password">Nhập mật khẩu cũ</InputLabel>
                          <OutlinedInput
                            {...registerChangePassword('oldPassword')}
                            error={!!errorsChangePassword.oldPassword}
                            style={{ width: 560 }}
                            type={isShowOldPassword ? 'text' : 'password'}
                            label="Nhập mật khẩu cũ"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setIsShowOldPassword(show => !show)}
                                  onMouseDown={(e: any) => e.preventDefault()}
                                >
                                  {isShowOldPassword ? (
                                    <Visibility className="!text-[16px]" />
                                  ) : (
                                    <VisibilityOff className="!text-[16px]" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText error={!!errorsChangePassword.oldPassword}>
                            {errorsChangePassword.oldPassword ? String(errorsChangePassword.oldPassword.message) : ''}
                          </FormHelperText>
                        </FormControl>

                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="filled-adornment-password">Nhập mật khẩu mới</InputLabel>
                          <OutlinedInput
                            {...registerChangePassword('newPassword')}
                            error={!!errorsChangePassword.newPassword}
                            style={{ width: 560 }}
                            type={isShowNewPassword ? 'text' : 'password'}
                            label="Nhập mật khẩu mới"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setIsShowNewPassword(show => !show)}
                                  onMouseDown={(e: any) => e.preventDefault()}
                                >
                                  {isShowNewPassword ? (
                                    <Visibility className="!text-[16px]" />
                                  ) : (
                                    <VisibilityOff className="!text-[16px]" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText error={!!errorsChangePassword.newPassword}>
                            {errorsChangePassword.newPassword ? String(errorsChangePassword.newPassword.message) : ''}
                          </FormHelperText>
                        </FormControl>

                        <FormControl fullWidth variant="outlined">
                          <InputLabel htmlFor="filled-adornment-password">Xác nhận mật khẩu mới</InputLabel>
                          <OutlinedInput
                            {...registerChangePassword('confirmNewPassword')}
                            error={!!errorsChangePassword.confirmNewPassword}
                            style={{ width: 560 }}
                            type={isShowConfirmNewPassword ? 'text' : 'password'}
                            label="Xác nhận mật khẩu mới"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setIsShowConfirmNewPassword(show => !show)}
                                  onMouseDown={(e: any) => e.preventDefault()}
                                >
                                  {isShowConfirmNewPassword ? (
                                    <Visibility className="!text-[16px]" />
                                  ) : (
                                    <VisibilityOff className="!text-[16px]" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText error={!!errorsChangePassword.confirmNewPassword}>
                            {errorsChangePassword.confirmNewPassword
                              ? String(errorsChangePassword.confirmNewPassword.message)
                              : ''}
                          </FormHelperText>
                        </FormControl>
                      </Box>
                      <Box pt={3}>
                        <LoadingButton type="submit" variant="contained" size="large" loading={isLoading}>
                          Cập nhật
                        </LoadingButton>
                      </Box>
                    </form>
                  )}
                </Box>
                <Box mt={4}>
                  <Typography className="!text-xl !font-medium py-4">Giao dịch của tôi</Typography>
                  {orders.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Mã vé</TableCell>
                            <TableCell align="left">Phim</TableCell>
                            <TableCell align="left">Ghế</TableCell>
                            <TableCell align="left">Phòng</TableCell>
                            <TableCell align="left">Rạp</TableCell>
                            <TableCell align="left">Suất chiếu</TableCell>
                            <TableCell align="left">Ngày lập</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="left">Tổng tiền</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders?.map((order, index) => (
                            <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                {calculateRowIndex(index)}
                              </TableCell>
                              <TableCell align="left">{order.id}</TableCell>
                              <TableCell align="left">{order.schedule?.movieName}</TableCell>
                              <TableCell align="left">
                                {order.seats?.map(seat => getSeatName(seat.rowPosition, seat.columnPosition))}
                              </TableCell>
                              <TableCell align="left">{order.schedule?.roomName}</TableCell>
                              <TableCell align="left">{order.schedule?.cinemaName}</TableCell>
                              <TableCell align="left">
                                {moment(order.schedule?.startTime).format('HH:mm, DD/MM/YYYY ')}
                              </TableCell>
                              <TableCell align="left">{moment(order.orderDate).format('HH:mm, DD/MM/YYYY')}</TableCell>
                              <TableCell align="left">
                                <Chip
                                  label={order.status === 1 ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                  color={order.status === 1 ? 'success' : 'warning'}
                                  variant="filled"
                                ></Chip>
                              </TableCell>
                              <TableCell align="left">
                                {order.totalAmount.toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography className="text-center pb-8 italic text-text !text-sm w-full">
                      Bạn chưa đặt một vé phim nào
                    </Typography>
                  )}
                  {orders.length > 0 && (
                    <Box className="flex justify-center my-6">
                      <Pagination count={paginationOptions.totalPages} page={currentPage} onChange={handleChange} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>
    </>
  );
};

UserProfilePage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default UserProfilePage;
