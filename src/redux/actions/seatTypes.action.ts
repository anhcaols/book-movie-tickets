import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { seatTypesService } from '@services/seatTypes.service';
import { z } from 'zod';

const getSeatTypesPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

const createSeatTypePayloadSchema = z.object({
  type: z.string(),
  price: z.string(),
});

const deleteSeatTypePayloadSchema = z.object({
  seatTypeId: z.number(),
});

const updateSeatTypePayloadSchema = z.object({
  seatTypeId: z.number(),
  dataValues: z.object({ price: z.string() }),
});

type GetSeatTypesPayload = z.infer<typeof getSeatTypesPayloadSchema>;
type CreateSeatTypePayload = z.infer<typeof createSeatTypePayloadSchema>;
type DeleteSeatTypePayload = z.infer<typeof deleteSeatTypePayloadSchema>;
type UpdateSeatTypePayload = z.infer<typeof updateSeatTypePayloadSchema>;

export const onGetSeatTypes = createAsyncThunkWithCustomError<
  {
    seatTypes: SeatTypeEntity[];
    paginationOptions: ApiPagination;
  },
  GetSeatTypesPayload
>(
  'seat-types',
  async payload => {
    getSeatTypesPayloadSchema.parse(payload);
    const response: any = await seatTypesService.getSeatTypes(payload.query);
    return {
      seatTypes: response.seatTypes,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching seat types',
  }
);

export const onCreateSeatType = createAsyncThunkWithCustomError<
  {
    newSeatType: SeatTypeEntity;
  },
  CreateSeatTypePayload
>(
  'seat-types/add',
  async payload => {
    createSeatTypePayloadSchema.parse(payload);
    const response: any = await seatTypesService.createSeatType(payload);
    return {
      newSeatType: response.seatType,
    };
  },
  {
    defaultErrorMessage: 'Error while create seat type',
  }
);

export const onDeleteSeatType = createAsyncThunkWithCustomError<{ seatTypeId: number }, DeleteSeatTypePayload>(
  'seat-types/delete',
  async payload => {
    deleteSeatTypePayloadSchema.parse(payload);
    await seatTypesService.deleteSeatType(payload.seatTypeId);
    return {
      seatTypeId: payload.seatTypeId,
    };
  },
  {
    defaultErrorMessage: 'Error while delete room',
  }
);

export const onUpdateSeatType = createAsyncThunkWithCustomError<
  {
    updateValues: SeatTypeEntity;
  },
  UpdateSeatTypePayload
>(
  'seat-types/update',
  async payload => {
    updateSeatTypePayloadSchema.parse(payload);
    const { dataValues, seatTypeId } = payload;
    const response: any = await seatTypesService.updateSeatType(dataValues, seatTypeId);
    return {
      updateValues: response.newSeatType,
    };
  },
  {
    defaultErrorMessage: 'Error while update seat type',
  }
);
