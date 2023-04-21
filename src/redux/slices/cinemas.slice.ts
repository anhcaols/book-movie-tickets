import { onCreateCinema, onDeleteCinema, onGetCinemas, onUpdateCinema } from '@redux/actions/cinemas.action';
import { createSlice } from '@reduxjs/toolkit';

interface cinemasState {
  cinemas: CinemaEntity[];
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

const cinemasInitialState: cinemasState = {
  cinemas: [],
  paginationOptions: initialPagination,
};

export const cinemaSlice = createSlice({
  name: 'cinemas',
  initialState: cinemasInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetCinemas.fulfilled, (state, action) => {
      state.cinemas = action.payload.cinemas;
      state.paginationOptions = action.payload.paginationOptions;
    });
    builder.addCase(onCreateCinema.fulfilled, (state, action) => {
      const { newCinema } = action.payload;
      state.cinemas = [newCinema, ...state.cinemas];
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
      const cinemaId = action.payload.updateValues.id;
      const userIndex = state.cinemas.findIndex(item => item.id === cinemaId);
      if (userIndex === -1) return;
      state.cinemas[userIndex] = { ...state.cinemas[userIndex], ...action.payload.updateValues };
    });
    builder.addCase(onDeleteCinema.fulfilled, (state, action) => {
      const { cinemaId } = action.payload;
      state.cinemas = state.cinemas.filter(item => item.id !== cinemaId);
      state.paginationOptions.totalDocs -= 1;
      state.paginationOptions.totalPages = Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit);
    });
  },
});

export const {} = cinemaSlice.actions;

export default cinemaSlice.reducer;
