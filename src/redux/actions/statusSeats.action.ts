import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { statusSeatsService } from '@services/statusSeats.service';
import { z } from 'zod';

const getStatusSeatsPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
  payload: z.object({ schedule_id: z.number() }),
});

type GetStatusSeatsPayload = z.infer<typeof getStatusSeatsPayloadSchema>;

export const onGetStatusSeats = createAsyncThunkWithCustomError<
  {
    statusSeats: StatusSeatEntity[];
    statusSeatsPagination: ApiPagination;
  },
  GetStatusSeatsPayload
>(
  'status-seats',
  async request => {
    getStatusSeatsPayloadSchema.parse(request);
    const { query, payload } = request;
    const statusSeats: any = await statusSeatsService.getStatusSeats(query, payload);
    return {
      statusSeats: statusSeats.statusSeats,
      statusSeatsPagination: statusSeats.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching status seats',
  }
);
