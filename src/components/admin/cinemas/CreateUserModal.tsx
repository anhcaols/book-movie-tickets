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
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@hooks/useRedux';
import { onCreateCinema } from '@redux/actions/cinemas.action';
import { useAsync } from '@hooks/useAsync';

interface CreateCinemaModalOpen {
  open: boolean;
  onClose: any;
}

const registerFormSchema = z.object({
  name: z.string().min(1, 'Tên rạp là bắt buộc.'),
  address: z.string().min(1, 'Đia chỉ rạp là bắt buộc.'),
});

export const CreateCinemaModal = ({ open, onClose }: CreateCinemaModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const dataValues = {
      name: data.name,
      address: data.address,
    };

    setIsLoading(true);
    executeCreate(dataValues);
  });

  const [executeCreate] = useAsync<{
    name: string;
    address: string;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onCreateCinema(payload)),
    onResolve: () => {
      onClose(false);
      setIsLoading(false);
      reset();
      enqueueSnackbar('Thêm thành công', {
        variant: 'success',
      });
    },
    onReject: (error: any) => {
      setIsLoading(false);
      enqueueSnackbar('Thêm thất bại', {
        variant: 'error',
      });
    },
  });

  return (
    <AppDialog title="Thêm rạp phim" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <TextField
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              label=" Tên rạp"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
              label="Địa chỉ"
              variant="outlined"
              fullWidth
            />

            <Box>
              <LoadingButton type="submit" className="w-full" variant="contained" size="large" loading={isLoading}>
                Thêm
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </LocalizationProvider>
    </AppDialog>
  );
};
