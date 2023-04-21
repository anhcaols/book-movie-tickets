import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { cinemasService } from '@services/cinemas.service';
import { z } from 'zod';

const getCinemasPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

const createCinemaPayloadSchema = z.object({
  name: z.string(),
  address: z.string(),
});

const updateCinemaPayloadSchema = z.object({
  dataValues: z.object({
    name: z.string(),
    address: z.string(),
  }),
  cinemaId: z.number(),
});

const deleteCinemaPayloadSchema = z.object({
  cinemaId: z.number(),
});

type GetCinemasPayload = z.infer<typeof getCinemasPayloadSchema>;
type CreateCinemasPayload = z.infer<typeof createCinemaPayloadSchema>;
type UpdateCinemasPayload = z.infer<typeof updateCinemaPayloadSchema>;
type DeleteCinemasPayload = z.infer<typeof deleteCinemaPayloadSchema>;

export const onGetCinemas = createAsyncThunkWithCustomError<
  {
    cinemas: CinemaEntity[];
    paginationOptions: ApiPagination;
  },
  GetCinemasPayload
>(
  'cinemas',
  async payload => {
    getCinemasPayloadSchema.parse(payload);
    const { query } = payload;
    const response: any = await cinemasService.getCinemas(query);
    return {
      cinemas: response.cinemas,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching cinemas',
  }
);

export const onCreateCinema = createAsyncThunkWithCustomError<
  {
    newCinema: CinemaEntity;
  },
  CreateCinemasPayload
>(
  'cinemas/add',
  async payload => {
    createCinemaPayloadSchema.parse(payload);
    const response: any = await cinemasService.createCinema(payload);
    return {
      newCinema: response.cinema,
    };
  },
  {
    defaultErrorMessage: 'Error while create cinema',
  }
);

export const onUpdateCinema = createAsyncThunkWithCustomError<
  {
    updateValues: CinemaEntity;
  },
  UpdateCinemasPayload
>(
  'cinemas/update',
  async payload => {
    updateCinemaPayloadSchema.parse(payload);
    const { dataValues, cinemaId } = payload;
    const response: any = await cinemasService.updateCinema(dataValues, cinemaId);
    return {
      updateValues: response.cinema,
    };
  },
  {
    defaultErrorMessage: 'Error while update cinema',
  }
);

export const onDeleteCinema = createAsyncThunkWithCustomError<{ cinemaId: number }, DeleteCinemasPayload>(
  'cinema/delete',
  async payload => {
    deleteCinemaPayloadSchema.parse(payload);
    await cinemasService.deleteCinema(payload.cinemaId);
    return {
      cinemaId: payload.cinemaId,
    };
  },
  {
    defaultErrorMessage: 'Error while delete cinema',
  }
);
