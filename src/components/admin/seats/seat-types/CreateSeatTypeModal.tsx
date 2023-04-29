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
import { useAsync } from '@hooks/useAsync';
import { onCreateSeatType } from '@redux/actions/seatTypes.action';

interface CreateSeatTypeModalOpen {
  open: boolean;
  onClose: any;
}

const createFormSchema = z.object({
  type: z.string().min(1, 'Tên vé là bắt buộc.'),
  price: z.string().min(1, 'Giá vé là bắt buộc.'),
});

export const CreateSeatTypeModal = ({ open, onClose }: CreateSeatTypeModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const dataValues = {
      type: data.type,
      price: data.price,
    };

    executeCreate(dataValues);
  });

  const [executeCreate] = useAsync<{
    type: string;
    price: string;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onCreateSeatType(payload)),
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
    <AppDialog title="Thêm Loại vé" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <TextField
              {...register('type')}
              error={!!errors.type}
              helperText={errors.type?.message}
              label=" Tên vé"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price?.message}
              label=" Giá vé"
              variant="outlined"
              fullWidth
              type="number"
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
