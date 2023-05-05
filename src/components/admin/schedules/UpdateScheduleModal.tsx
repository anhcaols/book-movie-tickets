import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useAsync } from '@hooks/useAsync';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { onGetMovies } from '@redux/actions/movies.action';
import { onGetRooms } from '@redux/actions/rooms.action';
import dayjs from 'dayjs';
import { onCreateSchedule } from '@redux/actions/schedules.action';

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

export const UpdateScheduleModal = ({ open, onClose }: UpdateScheduleModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  // get movie
  useEffect(() => {
    dispatch(onGetMovies({ type: 'nowShowing', query: { page: 1, limit: Infinity } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { movies } = useAppSelector(state => state.movies.nowShowing);

  const newMovies = movies?.map(movie => {
    return {
      label: `${movie.name} (${movie.duration} phút)`,
      id: movie.id,
    };
  });
  const [movie, setMovie] = React.useState<any>();
  const [inputMovieValue, setInputMovieValue] = React.useState<string>('');

  // get room
  useEffect(() => {
    dispatch(onGetRooms({ query: { page: 1, limit: Infinity } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { rooms } = useAppSelector(state => state.rooms);
  const newRooms = rooms?.map(movie => {
    return {
      label: movie.name,
      id: movie.id,
    };
  });
  const [room, setRoom] = React.useState<any>();
  const [inputRoomValue, setInputRoomValue] = React.useState<string>('');

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    const dataValues = {
      movie_id: movie.id,
      room_id: room.id,
      start_time: dayjs(data.startTime).format(),
      end_time: dayjs(data.endTime).format(),
    };
    setIsLoading(true);
    // executeCreate(dataValues);
  });

  // const [executeCreate] = useAsync<{
  //   movie_id: number;
  //   room_id: number;
  //   start_time: string;
  //   end_time: string;
  // }>({
  //   delay: 500,
  //   asyncFunction: async payload => dispatch(onCreateSchedule(payload)),
  //   onResolve: () => {
  //     setIsLoading(false);
  //     reset();
  //     onClose(false);
  //     enqueueSnackbar('Thêm thành công', {
  //       variant: 'success',
  //     });
  //   },
  //   onReject: (error: any) => {
  //     setIsLoading(false);
  //     enqueueSnackbar('Thêm thất bại', {
  //       variant: 'error',
  //     });
  //   },
  // });

  return (
    <AppDialog title="Cập nhật lịch trình" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              value={movie}
              defaultValue={movie}
              onChange={(event: any, newValue: any) => {
                setMovie(newValue);
              }}
              inputValue={inputMovieValue}
              onInputChange={(event, newInputValue) => {
                setInputMovieValue(newInputValue);
              }}
              options={newMovies}
              renderInput={params => <TextField {...params} label="Chọn phim" />}
            />

            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              value={room}
              defaultValue={room}
              onChange={(event: any, newValue: any) => {
                setRoom(newValue);
              }}
              inputValue={inputRoomValue}
              onInputChange={(event, newInputValue) => {
                setInputRoomValue(newInputValue);
              }}
              options={newRooms}
              renderInput={params => <TextField {...params} label="Chọn phòng" />}
            />

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
