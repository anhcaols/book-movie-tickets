import { schedulesService } from '../../services/schedules.service';
import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { z } from 'zod';

const getSchedulesByMoviePayloadSchema = z.object({
  payload: z.object({ movie_id: z.number(), date_time: z.string() }),
});

const getSchedulesPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

const filterSchedulesPayloadSchema = z.object({
  payload: z.object({ movie_id: z.number(), date_time: z.string(), cinema_name: z.string(), city: z.string() }),
});

type GetSchedulesPayload = z.infer<typeof getSchedulesPayloadSchema>;
type GetSchedulesByMoviePayload = z.infer<typeof getSchedulesByMoviePayloadSchema>;
type FilterSchedulesPayload = z.infer<typeof filterSchedulesPayloadSchema>;

export const onGetSchedules = createAsyncThunkWithCustomError<
  {
    schedules: ScheduleEntity[];
    paginationOptions: ApiPagination;
  },
  GetSchedulesPayload
>(
  'schedules',
  async payload => {
    getSchedulesPayloadSchema.parse(payload);
    const { query } = payload;
    const response: any = await schedulesService.getSchedules(query);
    return {
      schedules: response.schedules,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching schedules',
  }
);

export const onGetSchedulesByMovie = createAsyncThunkWithCustomError<
  {
    schedulesByMovie: ScheduleEntityByMovie[];
  },
  GetSchedulesByMoviePayload
>(
  'schedules-by-movie',
  async request => {
    getSchedulesByMoviePayloadSchema.parse(request);
    const { payload } = request;
    const schedules: any = await schedulesService.getSchedulesByMovie(payload);
    return {
      schedulesByMovie: schedules.schedules,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching schedules by movies',
  }
);

export const onFilterSchedules = createAsyncThunkWithCustomError<
  {
    filterSchedulesByMovie: ScheduleEntityByMovie[];
  },
  FilterSchedulesPayload
>(
  'schedules-by-movie/filters',
  async request => {
    filterSchedulesPayloadSchema.parse(request);
    const { payload } = request;
    const schedules: any = await schedulesService.getSchedulesByMovie(payload);
    console.log(schedules);
    return {
      filterSchedulesByMovie: schedules.filterSchedules,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching schedules by Movies',
  }
);
