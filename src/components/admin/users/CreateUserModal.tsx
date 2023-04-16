import AppDialog from '@components/shared/app-dialog';
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useAsync } from '@hooks/useAsync';
import { useAppDispatch } from '@hooks/useRedux';
import { onCreateUser } from '@redux/actions/accounts.action';

interface CreateUserModalOpen {
  open: boolean;
  onClose: any;
}

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
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

export const CreateUserModal = ({ open, onClose }: CreateUserModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [gender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const gender = data.gender === 1 ? 'nam' : 'nữ';
    const dataValues = {
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phoneNumber,
      password: data.password,
      confirm_password: data.confirmPassword,
      gender,
      date_of_birth: dayjs(data.dateOfBirth).format(),
    };

    dispatch(onCreateUser(dataValues)).then((resultAction: any) => {
      setIsLoading(false);

      if (onCreateUser.fulfilled.match(resultAction)) {
        reset();
        onClose(false);
        enqueueSnackbar('Đăng ký thành công', {
          variant: 'success',
        });
      }
      if (onCreateUser.rejected.match(resultAction)) {
        enqueueSnackbar('Đăng ký thất bại', {
          variant: 'error',
        });
      }
    });
  });

  return (
    <AppDialog title="Thêm khách hàng" open={open} onClose={() => onClose(false)}>
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
            <Box>
              <LoadingButton type="submit" className="w-full" variant="contained" size="large" loading={isLoading}>
                Đăng ký
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </LocalizationProvider>
    </AppDialog>
  );
};
