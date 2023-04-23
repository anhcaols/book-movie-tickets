import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { seatsService } from '@services/seats.service';
import { z } from 'zod';

const getSeatsPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
  roomId: z.number(),
});

const createSeatPayloadSchema = z.object({
  room_id: z.number(),
  row_vip: z.array(z.number()).optional(),
});

type GetSeatsPayload = z.infer<typeof getSeatsPayloadSchema>;
type CreateSeatsPayload = z.infer<typeof createSeatPayloadSchema>;

export const onGetSeats = createAsyncThunkWithCustomError<
  {
    seats: SeatEntity[];
    paginationOptions: ApiPagination;
  },
  GetSeatsPayload
>(
  'seats',
  async payload => {
    getSeatsPayloadSchema.parse(payload);
    const { query, roomId } = payload;
    const response: any = await seatsService.getSeatsByRoom(roomId, query);
    return {
      seats: response.seats,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching seats',
  }
);

export const onCreateSeats = createAsyncThunkWithCustomError<
  {
    newSeats: SeatEntity[];
  },
  CreateSeatsPayload
>(
  'seats/add',
  async payload => {
    createSeatPayloadSchema.parse(payload);
    const response: any = await seatsService.createSeat(payload);
    return {
      newSeats: response.seats,
    };
  },
  {
    defaultErrorMessage: 'Error while create seats',
  }
);
