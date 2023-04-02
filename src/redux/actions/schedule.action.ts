import { schedulesService } from './../../services/schedule.service';
import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { z } from 'zod';

const getSchedulesPayloadSchema = z.object({
  payload: z.object({ movie_id: z.number(), date_time: z.string() }),
});

const filterSchedulesPayloadSchema = z.object({
  payload: z.object({ movie_id: z.number(), date_time: z.string(), cinema_name: z.string(), city: z.string() }),
});

type GetSchedulesPayload = z.infer<typeof getSchedulesPayloadSchema>;
type FilterSchedulesPayload = z.infer<typeof filterSchedulesPayloadSchema>;

export const onGetSchedulesByMovie = createAsyncThunkWithCustomError<
  {
    schedules: ScheduleEntity[];
  },
  GetSchedulesPayload
>(
  'schedules',
  async request => {
    getSchedulesPayloadSchema.parse(request);
    const { payload } = request;
    const schedules: any = await schedulesService.getSchedules(payload);
    return {
      schedules: schedules.schedules,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching schedules',
  }
);

export const onFilterSchedules = createAsyncThunkWithCustomError<
  {
    filterSchedules: ScheduleEntity[];
  },
  FilterSchedulesPayload
>(
  'schedules/filters',
  async request => {
    getSchedulesPayloadSchema.parse(request);
    const { payload } = request;
    const schedules: any = await schedulesService.getSchedules(payload);
    return {
      filterSchedules: schedules.filterSchedules,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching schedules',
  }
);
