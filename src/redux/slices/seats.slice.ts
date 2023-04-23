import { onCreateSeats, onGetSeats } from '@redux/actions/seats.action';
import { createSlice } from '@reduxjs/toolkit';

interface seatsState {
  seats: SeatEntity[];
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

const seatsInitialState: seatsState = {
  seats: [],
  paginationOptions: initialPagination,
};

export const seatSlice = createSlice({
  name: 'seats',
  initialState: seatsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetSeats.fulfilled, (state, action) => {
      state.seats = action.payload.seats;
      state.paginationOptions = action.payload.paginationOptions;
    });
    builder.addCase(onCreateSeats.fulfilled, (state, action) => {
      const { newSeats } = action.payload;
      state.seats = [...newSeats, ...state.seats];
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

export const {} = seatSlice.actions;

export default seatSlice.reducer;
