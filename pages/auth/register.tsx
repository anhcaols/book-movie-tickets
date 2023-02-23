/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Button from '@components/shared/Button/Button';
import {
  Box,
  FormControl,
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

const RegisterPage: NextPageWithLayout = () => {
  const [gender, setGender] = useState('');
  //   const [dateOfBirth, setDateOfBirth] = useState<any>('');

  const handleGender = (event: any) => {
    setGender(event.target.value as string);
  };
  //   const handleDateOfBirth = (newValue: any) => {
  //     setDateOfBirth(newValue);
  //   };

  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className="w-full max-w-xl px-9 py-10 bg-[#28282d] shadow-xl rounded border-t-2 border-primary" action="#">
        <Stack spacing={3}>
          <Link className="flex justify-center items-center mb-7" href={'/'}>
            <img className="max-w-[127px]" src={'/assets/images/logo.svg'} alt="img" />
          </Link>
          <TextField label=" Họ tên" variant="outlined" fullWidth />
          <TextField label="Email" variant="outlined" fullWidth />
          <Box display="flex" gap={1}>
            <TextField label="Mật khẩu" variant="outlined" fullWidth />
            <TextField label="Xác nhận mật khẩu" variant="outlined" fullWidth />
          </Box>
          <Box display="flex" gap={1}>
            <TextField label="Số điện thoại" variant="outlined" fullWidth />
            <FormControl fullWidth>
              <InputLabel id="select-gender">Chọn giới tính</InputLabel>
              <Select
                labelId="select-gender"
                value={gender}
                label="Age"
                onChange={handleGender}
                input={<OutlinedInput label="Chọn giới tính" />}
              >
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Controller
            name=""
            control={control}
            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
              <DesktopDatePicker
                {...field}
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
          <Box className="form-group">
            <Link href="/auth/register">
              <Button className="w-full mt-3 " primary large>
                Đăng ký
              </Button>
            </Link>
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
