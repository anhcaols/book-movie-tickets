import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { roomsService } from '@services/rooms.service';
import { z } from 'zod';

const getRoomsPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

const createRoomPayloadSchema = z.object({
  name: z.string(),
  cinema_id: z.number(),
  row_number: z.number(),
  column_number: z.number(),
});

const deleteRoomPayloadSchema = z.object({
  roomId: z.number(),
});

type GetRoomsPayload = z.infer<typeof getRoomsPayloadSchema>;
type CreateRoomsPayload = z.infer<typeof createRoomPayloadSchema>;
type DeleteRoomsPayload = z.infer<typeof deleteRoomPayloadSchema>;

export const onGetRooms = createAsyncThunkWithCustomError<
  {
    rooms: RoomEntity[];
    paginationOptions: ApiPagination;
  },
  GetRoomsPayload
>(
  'rooms',
  async payload => {
    getRoomsPayloadSchema.parse(payload);
    const { query } = payload;
    const response: any = await roomsService.getRooms(query);
    return {
      rooms: response.rooms,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching rooms',
  }
);

export const onCreateRoom = createAsyncThunkWithCustomError<
  {
    newRoom: RoomEntity;
  },
  CreateRoomsPayload
>(
  'rooms/add',
  async payload => {
    createRoomPayloadSchema.parse(payload);
    const response: any = await roomsService.createRoom(payload);
    return {
      newRoom: response.room,
    };
  },
  {
    defaultErrorMessage: 'Error while create room',
  }
);

export const onDeleteRoom = createAsyncThunkWithCustomError<{ roomId: number }, DeleteRoomsPayload>(
  'room/delete',
  async payload => {
    deleteRoomPayloadSchema.parse(payload);
    await roomsService.deleteRoom(payload.roomId);
    return {
      roomId: payload.roomId,
    };
  },
  {
    defaultErrorMessage: 'Error while delete room',
  }
);

export const getRoomsCreatedSeats = createAsyncThunkWithCustomError<{
  roomCreatedSeats: RoomEntity[];
  roomHasNotCreatedSeats: RoomEntity[];
}>(
  'rooms/created-seats',
  async () => {
    const response: any = await roomsService.getRoomsCreatedSeats();
    return {
      roomCreatedSeats: response.data.roomCreatedSeats,
      roomHasNotCreatedSeats: response.data.roomHasNotCreatedSeats,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching rooms',
  }
);
