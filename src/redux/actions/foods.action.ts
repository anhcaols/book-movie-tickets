import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { foodsService } from '@services/foods.service';
import { z } from 'zod';

const getFoodsPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

const updateFoodPayloadSchema = z.object({
  dataValues: z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    image: z.string(),
  }),
  foodId: z.number(),
});

const deleteFoodPayloadSchema = z.object({
  foodId: z.number(),
});

type GetFoodsPayload = z.infer<typeof getFoodsPayloadSchema>;
type UpdateFoodPayload = z.infer<typeof updateFoodPayloadSchema>;
type DeleteFoodPayload = z.infer<typeof deleteFoodPayloadSchema>;

export const onGetFoods = createAsyncThunkWithCustomError<
  {
    foods: FoodEntity[];
    paginationOptions: ApiPagination;
  },
  GetFoodsPayload
>(
  'foods',
  async payload => {
    getFoodsPayloadSchema.parse(payload);
    const { query } = payload;
    const response: any = await foodsService.getFoods(query);
    return {
      foods: response.foods,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching foods',
  }
);

export const onCreateFood = createAsyncThunkWithCustomError(
  'foods/create',
  async (payload: FormData) => {
    const response: any = await foodsService.createFood(payload);
    return {
      newFood: response.food,
    };
  },
  {
    defaultErrorMessage: 'Error while create food',
  }
);

export const onUpdateFood = createAsyncThunkWithCustomError<
  {
    updateValues: FoodEntity;
  },
  UpdateFoodPayload
>(
  'foods/update',
  async payload => {
    updateFoodPayloadSchema.parse(payload);
    const { dataValues, foodId } = payload;

    const payloadUpdate = new FormData();
    Object.keys(dataValues).forEach(key => {
      payloadUpdate.append(key, (dataValues as any)[key]);
    });
    const response: any = await foodsService.updateFood(foodId, payloadUpdate);
    return {
      updateValues: response.food,
    };
  },
  {
    defaultErrorMessage: 'Error while update food',
  }
);

export const onDeleteFood = createAsyncThunkWithCustomError<{ foodId: number }, DeleteFoodPayload>(
  'foods/delete',
  async payload => {
    deleteFoodPayloadSchema.parse(payload);
    await foodsService.deleteFood(payload.foodId);
    return {
      foodId: payload.foodId,
    };
  },
  {
    defaultErrorMessage: 'Error while delete food',
  }
);
