import { schedulesService } from '../../services/schedules.service';
import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { z } from 'zod';

const getSchedulesByMoviePayloadSchema = z.object({
  payload: z.object({ movie_id: z.number(), date_time: z.string() }),
});

const getSchedulesPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number(), dateTime: z.any(), movieId: z.number() }),
});

const filterSchedulesPayloadSchema = z.object({
  payload: z.object({ movie_id: z.number(), date_time: z.string(), cinema_name: z.string(), city: z.string() }),
});

const createSchedulePayloadSchema = z.object({
  movie_id: z.number(),
  room_id: z.number(),
  start_time: z.string(),
  end_time: z.string(),
});

const updateSchedulePayloadSchema = z.object({
  dataValues: z.object({
    start_time: z.string(),
    end_time: z.string(),
  }),
  scheduleId: z.number(),
});

type GetSchedulesPayload = z.infer<typeof getSchedulesPayloadSchema>;
type GetSchedulesByMoviePayload = z.infer<typeof getSchedulesByMoviePayloadSchema>;
type FilterSchedulesPayload = z.infer<typeof filterSchedulesPayloadSchema>;
type CreateSchedulesPayload = z.infer<typeof createSchedulePayloadSchema>;
type UpdateSchedulesPayload = z.infer<typeof updateSchedulePayloadSchema>;

export const onGetSchedules = createAsyncThunkWithCustomError<
  {
    schedules: ScheduleEntity[];
    paginationOptions: ApiPagination;
  },
  GetSchedulesPayload
>(
  'schedules',
  async payload => {
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

export const onCreateSchedule = createAsyncThunkWithCustomError<
  {
    newSchedule: ScheduleEntity;
  },
  CreateSchedulesPayload
>(
  'schedules/add',
  async payload => {
    createSchedulePayloadSchema.parse(payload);
    const response: any = await schedulesService.createSchedule(payload);
    return {
      newSchedule: response.schedule,
    };
  },
  {
    defaultErrorMessage: 'Error while create schedule',
  }
);

export const onUpdateSchedule = createAsyncThunkWithCustomError<
  {
    updateValues: ScheduleEntity;
  },
  UpdateSchedulesPayload
>(
  'schedules/update',
  async payload => {
    updateSchedulePayloadSchema.parse(payload);
    const { dataValues, scheduleId } = payload;
    const response: any = await schedulesService.updateSchedule(dataValues, scheduleId);
    return {
      updateValues: response.schedule,
    };
  },
  {
    defaultErrorMessage: 'Error while update schedule',
  }
);
