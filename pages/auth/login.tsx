/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Button from '@components/shared/Button/Button';
import { Box, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import AuthenticationLayout from '@layouts/AuthenticationLayout/AuthenticationLayout';
import { NextPageWithLayout } from '../_app';
import { useEffect } from 'react';
import { authService } from '@services/auth.service';

const LoginPage: NextPageWithLayout = () => {
  // useEffect(() => {
  //   const demo = async () => {
  //     const res = await authService.signIn({
  //       email: 'caotheanh1@gmail.com',
  //       password: 'caotheanh',
  //     });
  //     console.log(res);
  //   };
  //   demo();
  // }, []);
  return (
    <>
      <form action="#">
        <Stack spacing={3}>
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Mật khẩu" variant="outlined" fullWidth />
          <Box className="form-group">
            <Link href="/auth/register">
              <Button className="w-full mt-3 " primary large>
                Đăng nhập
              </Button>
            </Link>
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
