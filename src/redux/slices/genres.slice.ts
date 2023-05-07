import { onGetGenres } from '@redux/actions/genres.action';
import { createSlice } from '@reduxjs/toolkit';

interface GenresState {
  genres: GenreEntity[];
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

const genresInitialState: GenresState = {
  genres: [],
  paginationOptions: initialPagination,
};

export const genreSlice = createSlice({
  name: 'genres',
  initialState: genresInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetGenres.fulfilled, (state, action) => {
      state.genres = action.payload.genres;
      state.paginationOptions = action.payload.paginationOptions;
    });
    // builder.addCase(onCreateGenre.fulfilled, (state, action) => {
    //   const { newGenre } = action.payload;
    //   state.genres = [newGenre, ...state.genres];
    //   state.paginationOptions = {
    //     totalDocs: state.paginationOptions.totalDocs + 1,
    //     offset: 0,
    //     limit: state.paginationOptions.limit,
    //     page: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
    //     totalPages: Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit),
    //     hasPrevPage: state.paginationOptions.page > 1,
    //     hasNextPage: state.paginationOptions.page < state.paginationOptions.totalPages,
    //   };
    // });
    // builder.addCase(onUpdateGenre.fulfilled, (state, action) => {
    //   const genreId = action.payload.updateValues.id;
    //   const genreIndex = state.genres.findIndex(item => item.id === genreId);
    //   if (genreIndex === -1) return;
    //   state.genres[genreIndex] = { ...state.genres[genreIndex], ...action.payload.updateValues };
    // });
    // builder.addCase(onDeleteGenre.fulfilled, (state, action) => {
    //   const { genreId } = action.payload;
    //   state.genres = state.genres.filter(item => item.id !== genreId);
    //   state.paginationOptions.totalDocs -= 1;
    //   state.paginationOptions.totalPages = Math.ceil(state.paginationOptions.totalDocs / state.paginationOptions.limit);
    // });
  },
});

export const {} = genreSlice.actions;

export default genreSlice.reducer;
