import { onCreateFood, onDeleteFood, onGetFoods, onUpdateFood } from '@redux/actions/foods.action';
import { createSlice } from '@reduxjs/toolkit';

interface FoodsState {
  foods: FoodEntity[];
  paginationOptions: ApiPagination;
}

const initialPagination = {
  totalDocs: 0,
  offset: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  hasPrevPage: false,
  hasNextPage: false,
};

const foodsInitialState: FoodsState = {
  foods: [],
  paginationOptions: initialPagination,
};

export const foodSlice = createSlice({
  name: 'foods',
  initialState: foodsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetFoods.fulfilled, (state, action) => {
      state.foods = action.payload.foods;
      state.paginationOptions = action.payload.paginationOptions;
    });

    builder.addCase(onCreateFood.fulfilled, (state, action) => {
      const { newFood } = action.payload;
      state.foods = [newFood, ...state.foods];
      state.paginationOptions = {
        totalDocs: state.paginationOptions.totalDocs + 1,
        offset: 0,
        limit: state.paginationOptions.limit,
        page: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
        totalPages: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
        hasPrevPage: state.paginationOptions.page > 1,
        hasNextPage: state.paginationOptions.page < state.paginationOptions.totalPages,
      };
    });

    builder.addCase(onUpdateFood.fulfilled, (state, action) => {
      const foodId = action.payload.updateValues.id;
      const foodIndex = state.foods.findIndex(item => item.id === foodId);
      if (foodIndex === -1) return;
      state.foods[foodIndex] = { ...state.foods[foodIndex], ...action.payload.updateValues };
    });
    builder.addCase(onDeleteFood.fulfilled, (state, action) => {
      const { foodId } = action.payload;
      state.foods = state.foods.filter(item => item.id !== foodId);
      state.paginationOptions.totalDocs -= 1;
      state.paginationOptions.totalPages = Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit);
    });
  },
});

export const {} = foodSlice.actions;

export default foodSlice.reducer;
