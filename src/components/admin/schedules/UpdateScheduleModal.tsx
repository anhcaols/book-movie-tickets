import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@hooks/useRedux';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { onUpdateSchedule } from '@redux/actions/schedules.action';
import { schedulesService } from '@services/schedules.service';

interface UpdateScheduleModalOpen {
  open: boolean;
  onClose: any;
  id: number;
}

const scheduleFormSchema = z.object({
  startTime: z.any().refine(value => value !== null, {
    message: 'Thời gian bắt đầu là bắt buộc',
  }),
  endTime: z.any().refine(value => value !== null, {
    message: 'Thời gian kết thúc là bắt buộc',
  }),
});

export const UpdateScheduleModal = ({ open, onClose, id }: UpdateScheduleModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { control, setValue, handleSubmit } = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      const res: any = await schedulesService.getSchedule(id);
      console.log(res.schedule.startTime);
      setValue('startTime', res.schedule.start_time);
      setValue('endTime', res.schedule.end_time);
    };
    if (id) {
      fetchSchedule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = handleSubmit(data => {
    setIsLoading(true);
    const payload = {
      dataValues: {
        start_time: dayjs(data.startTime).format(),
        end_time: dayjs(data.endTime).format(),
      },
      scheduleId: id,
    };
    dispatch(onUpdateSchedule(payload)).then(res => {
      if (res.meta.requestStatus.includes('fulfilled')) {
        setIsLoading(false);
        onClose(false);
        enqueueSnackbar('Cập nhật thành công', {
          variant: 'success',
        });
      } else {
        setIsLoading(false);
        enqueueSnackbar('Cập nhật thất bại', {
          variant: 'error',
        });
      }
    });
  });

  return (
    <AppDialog title="Cập nhật lịch trình" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <Box display="flex" gap={1}>
              <Controller
                name="startTime"
                control={control}
                defaultValue={null}
                render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                  <DateTimePicker
                    {...field}
                    inputFormat="HH:mm DD/MM/YYYY"
                    inputRef={ref}
                    label="Bắt đầu"
                    renderInput={inputProps => (
                      <TextField
                        fullWidth
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
              <Controller
                name="endTime"
                control={control}
                defaultValue={null}
                render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                  <DateTimePicker
                    {...field}
                    inputFormat="HH:mm DD/MM/YYYY"
                    inputRef={ref}
                    label="Kết thúc"
                    renderInput={inputProps => (
                      <TextField
                        fullWidth
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
            </Box>

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
