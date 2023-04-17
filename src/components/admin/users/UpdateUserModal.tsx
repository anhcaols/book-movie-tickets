import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
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
import { useAppDispatch } from '@hooks/useRedux';
import { onCreateUser, onUpdateUser } from '@redux/actions/accounts.action';
import { accountsService } from '@services/account.service';
import { useAsync } from '@hooks/useAsync';

interface UpdateUserModalOpen {
  id: number;
  open: boolean;
  onClose: any;
}

const phoneRegex =
  /^(086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|084|091|094|088|083|082|085|081|092|056|058|099|059)\d{7}$/;

const registerFormSchema = z.object({
  fullName: z.string().min(1, 'Họ tên là bắt buộc.'),
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  phoneNumber: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ.'),
  gender: z.any().refine(value => value !== '', {
    message: 'Giới tính là bắt buộc',
  }),
  dateOfBirth: z.any().refine(value => value !== null, {
    message: 'Ngày sinh là bắt buộc',
  }),
});

export const UpdateUserModal = ({ open, onClose, id }: UpdateUserModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [gender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response: any = await accountsService.getUser(id);
      console.log(response.account);
      setValue('fullName', response.account.fullName);
      setValue('email', response.account.email);
      setValue('phoneNumber', response.account.phoneNumber);
      setValue('dateOfBirth', response.account.dateOfBirth);
      const gender = response.account.gender === 'nam' ? 1 : 0;
      setValue('gender', gender);
    };
    if (id !== 0) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const gender = data.gender === 1 ? 'nam' : 'nữ';
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
    asyncFunction: async payload => dispatch(onUpdateUser({ dataValues: payload, userId: id })),
    onResolve: () => {
      setIsLoading(false);
      reset();
      onClose(false);
      enqueueSnackbar('Cập nhập thành công', {
        variant: 'success',
      });
    },
    onReject: (error: any) => {
      setIsLoading(false);
      enqueueSnackbar('Cập nhật thất bại', {
        variant: 'error',
      });
    },
  });

  return (
    <AppDialog title="Cập nhật khách hàng" open={open} onClose={() => onClose(false)}>
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
            <Box className="w-full flex justify-end gap-2">
              <Button variant="outlined" size="medium" onClick={() => onClose(false)}>
                Hủy
              </Button>
              <LoadingButton type="submit" variant="contained" size="medium" loading={isLoading}>
                Cập nhật
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </LocalizationProvider>
    </AppDialog>
  );
};
