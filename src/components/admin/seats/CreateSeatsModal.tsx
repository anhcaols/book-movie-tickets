import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Chip,
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
import { useAsync } from '@hooks/useAsync';
import { getRoomsCreatedSeats } from '@redux/actions/rooms.action';
import { onCreateSeats } from '@redux/actions/seats.action';

interface CreateSeatsModalOpen {
  open: boolean;
  onClose: any;
}

const createFormSchema = z.object({
  room: z.any(),
});

export const CreateSeatsModal = ({ open, onClose }: CreateSeatsModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [selectedRoom, setSelectedRoom] = useState<number | undefined>(undefined);
  const [rowNumberSelectedRoom, setRowNumberSetSelectedRoom] = useState<number>(0);
  const [rowsVip, setRowsVip] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getRoomsCreatedSeats()).then((res: any) => {
      const firstRoom = res.payload.roomCreatedSeats[0];
      setSelectedRoom(firstRoom.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { roomHasNotCreatedSeats } = useAppSelector(state => state.rooms);

  useEffect(() => {
    const data: any = roomHasNotCreatedSeats.filter(item => item.id === selectedRoom);
    setRowNumberSetSelectedRoom(data[0]?.rowNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = handleSubmit(() => {
    setIsLoading(true);
    if (selectedRoom) {
      const dataValues = {
        room_id: selectedRoom,
        row_vip: rowsVip,
      };
      executeCreate(dataValues);
    }
  });

  const [executeCreate] = useAsync<{
    room_id: number;
    row_vip?: number[] | undefined;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onCreateSeats(payload)),
    onResolve: () => {
      onClose(false);
      setIsLoading(false);
      reset();
      enqueueSnackbar('Thêm thành công', {
        variant: 'success',
      });
      window.location.reload();
    },
    onReject: (error: any) => {
      setIsLoading(false);
      enqueueSnackbar('Thêm thất bại', {
        variant: 'error',
      });
    },
  });
  const handleChangeRoom = (event: any) => {
    setSelectedRoom(event.target.value);
  };

  var rowList = [];
  for (var i = 1; i <= rowNumberSelectedRoom; i++) {
    rowList.push(i);
  }

  return (
    <AppDialog title="Thêm ghế" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="select-room">Chọn phòng</InputLabel>
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                onChange={handleChangeRoom}
                labelId="select-room"
                value={selectedRoom}
                input={<OutlinedInput label="Chọn phòng" />}
              >
                {roomHasNotCreatedSeats.length > 0 ? (
                  roomHasNotCreatedSeats.map((room, index) => (
                    <MenuItem key={index} value={room.id}>
                      {room.name}, {room.cinema.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem aria-readonly key={0} value={0}>
                    Không có phòng để tạo ghế
                  </MenuItem>
                )}
              </Select>
              <FormHelperText error={!!errors.room}>{errors.room ? 'Phòng chiếu là bắt buộc.' : ''}</FormHelperText>
            </FormControl>

            <Autocomplete
              fullWidth
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={rowList}
              getOptionLabel={option => `Dãy ${option}`}
              renderTags={(value: any[], getTagProps: (arg0: { index: any }) => JSX.IntrinsicAttributes) =>
                value.map((option: any, index: any) => {
                  setRowsVip(value);
                  return <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />;
                })
              }
              renderInput={params => <TextField {...params} label="Chọn dãy vip" />}
            />

            <Box>
              <LoadingButton
                disabled={roomHasNotCreatedSeats.length === 0}
                type="submit"
                className="w-full"
                variant="contained"
                size="large"
                loading={isLoading}
              >
                Thêm
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </LocalizationProvider>
    </AppDialog>
  );
};
