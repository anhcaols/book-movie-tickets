import { onCreateOrder, onGetOrders } from '@redux/actions/orders.action';
import { createSlice } from '@reduxjs/toolkit';

interface OrdersState {
  orders: OrderByUserEntity[];
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

const ordersInitialState: OrdersState = {
  orders: [],
  paginationOptions: initialPagination,
};

export const ratingSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.paginationOptions = action.payload.paginationOptions;
    });
    builder.addCase(onCreateOrder.fulfilled, (state, action) => {
      state.orders = [...state.orders, action.payload.newOrder];
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
  },
});

export const {} = ratingSlice.actions;

export default ratingSlice.reducer;
