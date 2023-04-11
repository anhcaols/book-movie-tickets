/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Button from '@components/shared/Button';
import {
  Box,
  FormControl,
  FormHelperText,
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm } from 'react-hook-form';
import AuthenticationLayout from '@layouts/AuthenticationLayout/AuthenticationLayout';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsync } from '@hooks/useAsync';
import { authService } from '@services/auth.service';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';

const registerFormSchema = z
  .object({
    fullName: z.string().min(1, 'Họ tên là bắt buộc.'),
    email: z.string().email('Địa chỉ email không hợp lệ.'),
    password: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
    confirmPassword: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Hai mật khẩu phải trùng nhau',
    path: ['confirmPassword'],
  });

const AdminRegisterPage: NextPageWithLayout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

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
    password: string;
    confirm_password: string;
    role: string;
  }>({
    delay: 500,
    asyncFunction: async payload => authService.signUp(payload),
    onResolve: () => {
      enqueueSnackbar('Đăng ký thành công', {
        variant: 'success',
      });
      router.push('/admin/auth/login');
    },
    onReject: (error: any) => {
      enqueueSnackbar('Đăng ký thất bại', {
        variant: 'error',
      });
      reset();
    },
  });

  const onSubmit = handleSubmit(data => {
    executeRegister({
      full_name: data.fullName,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      role: 'admin',
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
            <TextField
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              type="password"
              label="Mật khẩu"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              type="password"
              label="Xác nhận mật khẩu"
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box className="form-group">
            <Button type="submit" className="w-full mt-3 " primary large>
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

AdminRegisterPage.getLayout = page => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default AdminRegisterPage;
