/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Button from '@components/shared/Button/Button';
import { Box, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import AuthenticationLayout from '@layouts/AuthenticationLayout/AuthenticationLayout';
import { NextPageWithLayout } from '../_app';

const ForgetPage: NextPageWithLayout = () => {
  return (
    <>
      <form action="#">
        <Stack spacing={3}>
          <TextField label="Email" variant="outlined" fullWidth />
          <Box className="form-group">
            <Link href="/auth/register">
              <Button className="w-full mt-3 " primary large>
                Gửi
              </Button>
            </Link>
          </Box>
          <p className=" text-[#ffffff80] font-openSans text-[14px] text-center">
            Chúng tôi sẽ gửi mật khẩu vào Email của bạn
          </p>
        </Stack>
      </form>
    </>
  );
};

ForgetPage.getLayout = page => <AuthenticationLayout>{page}</AuthenticationLayout>;

export default ForgetPage;
