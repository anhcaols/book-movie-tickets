import { onUpdateCinema } from '@redux/actions/cinemas.action';
import { onCreateSeatType, onDeleteSeatType, onGetSeatTypes } from '@redux/actions/seatTypes.action';
import { createSlice } from '@reduxjs/toolkit';

interface seatTypesState {
  seatTypes: SeatTypeEntity[];
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

const seatTypesInitialState: seatTypesState = {
  seatTypes: [],
  paginationOptions: initialPagination,
};

export const seatTypeSlice = createSlice({
  name: 'seatTypes',
  initialState: seatTypesInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetSeatTypes.fulfilled, (state, action) => {
      state.seatTypes = action.payload.seatTypes;
      state.paginationOptions = action.payload.paginationOptions;
    });
    builder.addCase(onCreateSeatType.fulfilled, (state, action) => {
      const { newSeatType } = action.payload;
      state.seatTypes = [newSeatType, ...state.seatTypes];
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
    builder.addCase(onUpdateCinema.fulfilled, (state, action) => {
      const seatTypeId = action.payload.updateValues.id;
      const seatTypeIndex = state.seatTypes.findIndex(item => item.id === seatTypeId);
      if (seatTypeIndex === -1) return;
      state.seatTypes[seatTypeIndex] = { ...state.seatTypes[seatTypeIndex], ...action.payload.updateValues };
    });
    builder.addCase(onDeleteSeatType.fulfilled, (state, action) => {
      const { seatTypeId } = action.payload;
      state.seatTypes = state.seatTypes.filter(item => item.id !== seatTypeId);
      state.paginationOptions.totalDocs -= 1;
      state.paginationOptions.totalPages = Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit);
    });
  },
});

export const {} = seatTypeSlice.actions;

export default seatTypeSlice.reducer;
