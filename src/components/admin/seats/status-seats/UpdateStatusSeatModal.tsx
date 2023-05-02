import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
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
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@hooks/useRedux';
import { useAsync } from '@hooks/useAsync';
import { onUpdateCinema } from '@redux/actions/cinemas.action';
import { cinemasService } from '@services/cinemas.service';
import { seatTypesService } from '@services/seatTypes.service';
import { onUpdateSeatType } from '@redux/actions/seatTypes.action';

interface UpdateStatusSeatTypeModalOpen {
  id: {
    seatId: number;
    scheduleId: number;
  };
  open: boolean;
  onClose: any;
}

const updateFormSchema = z.object({
  status: z.string().min(1, 'Giá vé là bắt buộc.'),
});

export const UpdateStatusSeatTypeModal = ({ open, onClose, id }: UpdateStatusSeatTypeModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [gender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
  });

  useEffect(() => {
    // const fetchSeatType = async () => {
    //   const response: any = await seatTypesService.getSeatType(id);
    //   setValue('type', response.seatType.type);
    //   setValue('price', String(parseFloat(response.seatType.price.toString())));
    // };
    // if (id !== 0) {
    //   fetchSeatType();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

  const onSubmit = handleSubmit(data => {
    // setIsLoading(true);
    // const dataValues = {
    //   price: data.price,
    // };
    // executeUpdate(dataValues);
  });

  // const [executeUpdate] = useAsync<{
  //   price: string;
  // }>({
  //   delay: 500,
  //   asyncFunction: async payload => dispatch(onUpdateSeatType({ seatTypeId: id, dataValues: payload })),
  //   onResolve: () => {
  //     setIsLoading(false);
  //     reset();
  //     onClose(false);
  //     enqueueSnackbar('Cập nhập thành công', {
  //       variant: 'success',
  //     });
  //   },
  //   onReject: (error: any) => {
  //     setIsLoading(false);
  //     enqueueSnackbar('Cập nhật thất bại', {
  //       variant: 'error',
  //     });
  //   },
  // });

  return (
    <AppDialog title="Cập nhật trạng thái ghế" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="select-gender" error={!!errors.status}>
                Chọn trạng thái
              </InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-status"
                    {...field}
                    input={<OutlinedInput error={!!errors.status} label="Chọn giới tính" />}
                  >
                    <MenuItem value={1}>unavailable </MenuItem>
                    <MenuItem value={0}>available</MenuItem>
                    <MenuItem value={1}>booked</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.status}>
                {errors.status ? String(errors.status.message) : ''}
              </FormHelperText>
            </FormControl>
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
