/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import AuthenticationLayout from '@layouts/AuthenticationLayout/AuthenticationLayout';
import { NextPageWithLayout } from '../_app';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { onSignIn } from '@redux/actions/auth.action';
import { useAppDispatch } from '@hooks/useRedux';
import { setCookie } from 'cookies-next';
import { authService } from '@services/auth.service';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const loginFormSchema = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  password: z.string().min(8, 'Mật khẩu phải có 8 ký tự trở lên.'),
});

const LoginPage: NextPageWithLayout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
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

  const handleClickShowPassword = () => setIsShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
          <Box>
            <Button type="submit" className="w-full" variant="contained" size="large">
              Đăng nhập
            </Button>
          </Box>
          <p className=" text-[#ffffff80] text-[14px] text-center">
            Bạn không có một tài khoản? {''}
            <Link className="text-primary opacity-[0.9]" href={'/auth/register'}>
              Đăng ký!
            </Link>
          </p>
          <p className=" text-[#ffffff80] text-[14px] text-center">
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
