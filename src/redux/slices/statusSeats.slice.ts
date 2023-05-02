import { onGetStatusSeats } from '@redux/actions/statusSeats.action';
import { createSlice } from '@reduxjs/toolkit';

interface StatusSeatsState {
  statusSeats: StatusSeatEntity[];
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

const statusSeatInitialState: StatusSeatsState = {
  statusSeats: [],
  paginationOptions: initialPagination,
};

export const statusSeatSlice = createSlice({
  name: 'statusSeat',
  initialState: statusSeatInitialState,
  reducers: {
    // onClearStatusSeats: state => {
    //   state.statusSeats = [];
    //   state.filterStatusSeats = [];
    // },
  },
  extraReducers(builder) {
    builder.addCase(onGetStatusSeats.fulfilled, (state, action) => {
      state.statusSeats = action.payload.statusSeats;
      state.paginationOptions = action.payload.paginationOptions;
    });
  },
});

export const {} = statusSeatSlice.actions;

export default statusSeatSlice.reducer;
