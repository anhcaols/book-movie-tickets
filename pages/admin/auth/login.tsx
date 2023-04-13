import AuthenticationLayout from '@layouts/AuthenticationLayout/AuthenticationLayout';
import React from 'react';
import { NextPageWithLayout } from '../../_app';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@hooks/useRedux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onSignIn } from '@redux/actions/auth.action';
import { setCookie } from 'cookies-next';
import { authService } from '@services/auth.service';
import { Box, Button, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  password: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
});

const AdminLoginPage: NextPageWithLayout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
    dispatch(onSignIn({ email: data.email, password: data.password, role: 'admin' })).then((result: any) => {
      if (result.meta.requestStatus === 'fulfilled') {
        const accessToken = (result.payload as any).accessToken;
        setCookie('accessToken', accessToken);
        authService.setToken(accessToken);

        router.push('/admin');
        enqueueSnackbar('Đăng nhập thành công', {
          variant: 'success',
        });
      } else {
        enqueueSnackbar('Đăng nhập thất bại', {
          variant: 'error',
        });
      }
    });
  });
  return (
    <>
      <form onSubmit={onSubmit} action="#">
        <Stack spacing={5}>
          <Stack spacing={3}>
            <TextField
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              label="Email"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              type="password"
              label="Mật khẩu"
              variant="outlined"
              fullWidth
            />
          </Stack>
          <Stack spacing={3}>
            <Box>
              <Button type="submit" className="w-full" variant="contained" size="large">
                Đăng nhập
              </Button>
            </Box>
            <span className=" text-[#ffffff80] text-[14px] text-center ">
              Bạn không có một tài khoản? {''}
              <Link className="text-primary opacity-[0.9]" href={'/admin/auth/register'}>
                Đăng ký!
              </Link>
            </span>
            <p className=" text-[#ffffff80] text-[14px] text-center">
              <Link className="text-primary opacity-[0.9]" href={'/auth/forget'}>
                Quên mật khẩu?
              </Link>
            </p>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

AdminLoginPage.getLayout = page => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default AdminLoginPage;
