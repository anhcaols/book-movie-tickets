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
import { seatTypesService } from '@services/seatTypes.service';
import { onUpdateSeatType } from '@redux/actions/seatTypes.action';

interface UpdateSeatTypeModalOpen {
  id: number;
  open: boolean;
  onClose: any;
}

const updateFormSchema = z.object({
  price: z.string().min(1, 'Giá vé là bắt buộc.'),
  type: z.string().min(1, 'Tên vé là bắt buộc.'),
});

export const UpdateSeatTypeModal = ({ open, onClose, id }: UpdateSeatTypeModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [gender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
  });

  useEffect(() => {
    const fetchSeatType = async () => {
      const response: any = await seatTypesService.getSeatType(id);
      setValue('type', response.seatType.type);
      setValue('price', String(parseFloat(response.seatType.price.toString())));
    };
    if (id !== 0) {
      fetchSeatType();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const dataValues = {
      price: data.price,
    };

    executeUpdate(dataValues);
  });

  const [executeUpdate] = useAsync<{
    price: string;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onUpdateSeatType({ seatTypeId: id, dataValues: payload })),
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
    <AppDialog title="Cập nhật loại ghế" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <TextField
              {...register('type')}
              error={!!errors.type}
              helperText={errors.type?.message}
              label="Tên loại ghế"
              variant="outlined"
              fullWidth
              disabled
            />
            <TextField
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price?.message}
              label="Giá loại ghế"
              variant="outlined"
              fullWidth
              type="number"
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
