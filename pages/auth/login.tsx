/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Button from '@components/shared/Button/Button';
import { Box, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import AuthenticationLayout from '@layouts/AuthenticationLayout/AuthenticationLayout';
import { NextPageWithLayout } from '../_app';
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { onSignIn } from '@redux/actions/auth.action';
import { useAppDispatch } from '@hooks/useRedux';
import { setCookie } from 'cookies-next';
import { authService } from '@services/auth.service';

const loginFormSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  password: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
});

const LoginPage: NextPageWithLayout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    dispatch(onSignIn({ email: data.email, password: data.password })).then((result: any) => {
      if (result.meta.requestStatus === 'fulfilled') {
        const accessToken = (result.payload as any).accessToken;
        setCookie('accessToken', accessToken);
        authService.setToken(accessToken);

        router.push('/');
        enqueueSnackbar('Login successfully', {
          variant: 'success',
        });
      } else {
        enqueueSnackbar('Login failed', {
          variant: 'error',
        });
      }
    });
  });

  return (
    <>
      <form onSubmit={onSubmit} action="#">
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
          <Box className="form-group">
            <Button type="submit" className="w-full mt-3 " primary large>
              Đăng nhập
            </Button>
          </Box>
          <p className=" text-[#ffffff80] font-openSans text-[14px] text-center">
            Bạn không có một tài khoản? {''}
            <Link className="text-primary opacity-[0.9]" href={'/auth/register'}>
              Đăng ký!
            </Link>
          </p>
          <p className=" text-[#ffffff80] font-openSans text-[14px] text-center">
            <Link className="text-primary opacity-[0.9]" href={'/auth/forget'}>
              Quên mật khẩu?
            </Link>
          </p>
        </Stack>
      </form>
    </>
  );
};

LoginPage.getLayout = page => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default LoginPage;
