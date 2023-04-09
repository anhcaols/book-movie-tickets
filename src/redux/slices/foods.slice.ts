import { onGetFoods } from '@redux/actions/foods.action';
import { createSlice } from '@reduxjs/toolkit';

interface FoodsState {
  foods: FoodEntity[];
}

const foodsInitialState: FoodsState = {
  foods: [],
};

export const foodSlice = createSlice({
  name: 'foods',
  initialState: foodsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetFoods.fulfilled, (state, action) => {
      state.foods = action.payload.foods;
    });
  },
});

export const {} = foodSlice.actions;

export default foodSlice.reducer;
