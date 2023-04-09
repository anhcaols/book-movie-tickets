import { onCreateOrder } from '@redux/actions/orders.action';
import { createSlice } from '@reduxjs/toolkit';

interface OrdersState {
  orders: OrderByUserEntity[];
  // ordersPagination: ApiPagination;
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
  // ordersPagination: initialPagination,
};

export const ratingSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onCreateOrder.fulfilled, (state, action) => {
      state.orders = [action.payload.newOrder, ...state.orders];
    });
  },
});

export const {} = ratingSlice.actions;

export default ratingSlice.reducer;
