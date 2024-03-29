/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import AuthenticationLayout from '@layouts/AuthenticationLayout/AuthenticationLayout';
import { NextPageWithLayout } from '../_app';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsync } from '@hooks/useAsync';
import { authService } from '@services/auth.service';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const phoneRegex =
  /^(086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|084|091|094|088|083|082|085|081|092|056|058|099|059)\d{7}$/;

const registerFormSchema = z
  .object({
    fullName: z.string().min(1, 'Họ tên là bắt buộc.'),
    email: z.string().email('Địa chỉ email không hợp lệ.'),
    password: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
    confirmPassword: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
    phoneNumber: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ.'),
    gender: z.any().refine(value => value !== '', {
      message: 'Giới tính là bắt buộc',
    }),
    dateOfBirth: z.any().refine(value => value !== null, {
      message: 'Ngày sinh là bắt buộc',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Hai mật khẩu phải trùng nhau',
    path: ['confirmPassword'],
  });

const RegisterPage: NextPageWithLayout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [gender, setGender] = useState('');
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setIsShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setIsShowConfirmPassword(show => !show);

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleGender = (event: any) => {
    setGender(event.target.value as string);
  };
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const [executeRegister] = useAsync<{
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    gender: string;
    date_of_birth: string | Date;
  }>({
    delay: 500,
    asyncFunction: async payload => authService.signUp(payload),
    onResolve: () => {
      enqueueSnackbar('Đăng ký thành công', {
        variant: 'success',
      });
      router.push('/auth/login');
    },
    onReject: (error: any) => {
      enqueueSnackbar('Đăng ký thất bại', {
        variant: 'error',
      });
      reset();
    },
  });

  const onSubmit = handleSubmit(data => {
    const gender = data.gender === 1 ? 'nam' : 'nữ';
    executeRegister({
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phoneNumber,
      password: data.password,
      confirm_password: data.confirmPassword,
      gender,
      date_of_birth: dayjs(data.dateOfBirth).format(),
    });
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={onSubmit} action="#">
        <Stack spacing={3}>
          <TextField
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            label=" Họ tên"
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            variant="outlined"
            fullWidth
          />
          <Box display="flex" gap={1}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="filled-adornment-password">Mật khẩu</InputLabel>
              <OutlinedInput
                {...register('password')}
                error={!!errors.password}
                fullWidth
                id="filled-adornment-password"
                type={isShowPassword ? 'text' : 'password'}
                label="Mật khẩu"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {isShowPassword ? (
                        <Visibility className="!text-[16px]" />
                      ) : (
                        <VisibilityOff className="!text-[16px]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={!!errors.password}>
                {errors.password ? String(errors.password.message) : ''}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="filled-adornment-confirm-password">Xác nhận mật khẩu</InputLabel>
              <OutlinedInput
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                fullWidth
                id="filled-adornment-confirm-password"
                type={isShowConfirmPassword ? 'text' : 'password'}
                label="Xác nhận mật khẩu"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {isShowConfirmPassword ? (
                        <Visibility className="!text-[16px]" />
                      ) : (
                        <VisibilityOff className="!text-[16px]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={!!errors.confirmPassword}>
                {errors.confirmPassword ? String(errors.confirmPassword.message) : ''}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box display="flex" gap={1}>
            <TextField
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              label="Số điện thoại"
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="select-gender" error={!!errors.gender}>
                Chọn giới tính
              </InputLabel>
              <Controller
                name="gender"
                defaultValue={gender}
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-gender"
                    {...field}
                    input={<OutlinedInput error={!!errors.gender} label="Chọn giới tính" />}
                  >
                    <MenuItem value={0}>Nữ</MenuItem>
                    <MenuItem value={1}>Nam</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.gender}>
                {errors.gender ? String(errors.gender.message) : ''}
              </FormHelperText>
            </FormControl>
          </Box>
          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue={null}
            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
              <DesktopDatePicker
                {...field}
                inputFormat="DD/MM/YYYY"
                inputRef={ref}
                label="Ngày sinh"
                renderInput={inputProps => (
                  <TextField
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
          <Typography className=" text-[#ffffff80] font-openSans text-[14px] ">
            Tôi đã đọc và đồng ý với <span className="text-primary opacity-[0.9]">CHÍNH SÁCH</span> của chương trình.
          </Typography>
          <Box>
            <Button type="submit" className="w-full" variant="contained" size="large">
              Đăng ký
            </Button>
          </Box>
          <Typography className=" text-[#ffffff80] font-openSans text-[14px] text-center">
            Bạn đã có sẵn một tài khoản? {''}
            <Link className="text-primary opacity-[0.9]" href={'/auth/login'}>
              Đăng nhập!
            </Link>
          </Typography>
        </Stack>
      </form>
    </LocalizationProvider>
  );
};

RegisterPage.getLayout = page => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default RegisterPage;
