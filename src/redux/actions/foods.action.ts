import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { foodsService } from '@services/foods.service';
import { z } from 'zod';

export const onGetFoods = createAsyncThunkWithCustomError<{
  foods: FoodEntity[];
}>(
  'foods',
  async () => {
    const response: any = await foodsService.getFoods();
    return {
      foods: response.foods,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching foods',
  }
);
