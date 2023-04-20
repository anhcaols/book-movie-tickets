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
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onCreateRoom, onGetRooms } from '@redux/actions/rooms.action';
import { useAsync } from '@hooks/useAsync';
import { onGetCinemas } from '@redux/actions/cinemas.action';

interface CreateRoomModalOpen {
  open: boolean;
  onClose: any;
}

const createFormSchema = z.object({
  name: z.string().min(1, 'Tên phòng là bắt buộc.'),
  // cinema: z.string().min(1, 'Đia chỉ rạp là bắt buộc.'),
  cinema: z.any(),
  rowNumber: z
    .string()
    .min(1, 'Số hàng là bắt buộc')
    .refine(value => Number(value) > 0 && Number(value) < 10, {
      message: 'Số hàng phải lớn hơn 0 và nhỏ hơn 15',
    }),
  columnNumber: z
    .string()
    .min(1, 'Số cột là bắt buộc')
    .refine(value => Number(value) > 0 && Number(value) < 10, {
      message: 'Số cột phải lớn hơn 0 và nhỏ hơn 15',
    }),
});

export const CreateRoomModal = ({ open, onClose }: CreateRoomModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetCinemas({ query: { page: 1, limit: Infinity } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { cinemas } = useAppSelector(state => state.cinemas);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const dataValues = {
      name: data.name,
      cinema_id: data.cinema,
      row_number: Number(data.rowNumber),
      column_number: Number(data.columnNumber),
    };
    executeCreate(dataValues);
  });

  const [executeCreate] = useAsync<{
    name: string;
    cinema_id: number;
    row_number: number;
    column_number: number;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onCreateRoom(payload)),
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
    <AppDialog title="Thêm phòng chiếu" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <TextField
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              label=" Tên phòng"
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="select-cinema" error={!!errors.cinema}>
                Chọn rạp
              </InputLabel>
              <Controller
                name="cinema"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-cinema"
                    {...field}
                    value={field.value || ''}
                    input={<OutlinedInput error={!!errors.cinema} label="Chọn rạp" />}
                  >
                    {cinemas.map(cinema => (
                      <MenuItem key={cinema.id} value={cinema.id}>
                        {cinema.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.cinema}>
                {errors.cinema ? String(errors.cinema.message) : ''}
              </FormHelperText>
            </FormControl>
            <Box display="flex" gap={1}>
              <TextField
                {...register('rowNumber')}
                error={!!errors.rowNumber}
                helperText={errors.rowNumber?.message}
                type="number"
                label="Số hàng"
                variant="outlined"
                inputProps={{ min: 0, max: 100, step: 1 }}
                fullWidth
              />
              <TextField
                {...register('columnNumber')}
                error={!!errors.columnNumber}
                helperText={errors.columnNumber?.message}
                type="number"
                label="Số cột"
                variant="outlined"
                inputProps={{ min: 0, max: 100, step: 1 }}
                fullWidth
              />
            </Box>
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
