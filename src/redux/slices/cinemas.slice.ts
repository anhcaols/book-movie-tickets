import { onCreateCinema, onDeleteCinema, onGetCinemas, onUpdateCinema } from '@redux/actions/cinemas.action';
import { createSlice } from '@reduxjs/toolkit';

interface cinemasState {
  cinemas: CinemaEntity[];
  cinemasPagination: ApiPagination;
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
  cinemasPagination: initialPagination,
};

export const cinemaSlice = createSlice({
  name: 'cinemas',
  initialState: cinemasInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetCinemas.fulfilled, (state, action) => {
      state.cinemas = action.payload.cinemas;
      state.cinemasPagination = action.payload.cinemasPagination;
    });
    builder.addCase(onCreateCinema.fulfilled, (state, action) => {
      const { newCinema } = action.payload;
      state.cinemas = [newCinema, ...state.cinemas];
      state.cinemasPagination = {
        totalDocs: state.cinemasPagination.totalDocs + 1,
        offset: 0,
        limit: state.cinemasPagination.limit,
        page: Math.ceil(state.cinemasPagination.totalDocs / state.cinemasPagination.limit),
        totalPages: Math.ceil(state.cinemasPagination.totalDocs / state.cinemasPagination.limit),
        hasPrevPage: state.cinemasPagination.page > 1,
        hasNextPage: state.cinemasPagination.page < state.cinemasPagination.totalPages,
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
      state.cinemasPagination.totalDocs -= 1;
      state.cinemasPagination.totalPages = Math.ceil(state.cinemasPagination.totalDocs / state.cinemasPagination.limit);
    });
  },
});

export const {} = cinemaSlice.actions;

export default cinemaSlice.reducer;
