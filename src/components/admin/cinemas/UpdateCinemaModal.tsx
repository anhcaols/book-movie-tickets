import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@hooks/useRedux';
import { useAsync } from '@hooks/useAsync';
import { onUpdateCinema } from '@redux/actions/cinemas.action';
import { cinemasService } from '@services/cinemas.service';

interface UpdateCinemaModalOpen {
  id: number;
  open: boolean;
  onClose: any;
}

const updateFormSchema = z.object({
  name: z.string().min(1, 'Tên rạp là bắt buộc.'),
  address: z.string().min(1, 'Đia chỉ rạp là bắt buộc.'),
});

export const UpdateCinemaModal = ({ open, onClose, id }: UpdateCinemaModalOpen) => {
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
  } = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
  });

  useEffect(() => {
    const fetchCinema = async () => {
      const response: any = await cinemasService.getCinema(id);
      setValue('name', response.cinema.name);
      setValue('address', response.cinema.address);
    };
    if (id !== 0) {
      fetchCinema();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const dataValues = {
      name: data.name,
      address: data.address,
    };

    executeUpdate(dataValues);
  });

  const [executeUpdate] = useAsync<{
    name: string;
    address: string;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onUpdateCinema({ dataValues: payload, cinemaId: id })),
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
    <AppDialog title="Cập nhật rạp phim" open={open} onClose={() => onClose(false)}>
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
                Cập nhật
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </LocalizationProvider>
    </AppDialog>
  );
};
