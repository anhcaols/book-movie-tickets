import { createSlice } from '@reduxjs/toolkit';
import { onGetMovies } from '@redux/actions/movies.action';

interface MoviesState {
  allMovies: {
    movies: MovieEntity[];
    moviesPagination: ApiPagination;
  };
  nowShowing: {
    movies: MovieEntity[];
    moviesPagination: ApiPagination;
  };
  comingSoon: {
    movies: MovieEntity[];
    moviesPagination: ApiPagination;
  };
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

const moviesInitialState: MoviesState = {
  allMovies: {
    movies: [],
    moviesPagination: initialPagination,
  },
  nowShowing: {
    movies: [],
    moviesPagination: initialPagination,
  },
  comingSoon: {
    movies: [],
    moviesPagination: initialPagination,
  },
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetMovies.fulfilled, (state, action) => {
      state.allMovies.movies = action.payload.allMovies.movies;
      state.nowShowing.movies = action.payload.nowShowing.movies;
      state.comingSoon.movies = action.payload.comingSoon.movies;

      state.allMovies.moviesPagination = action.payload.allMovies.moviesPagination;
      state.nowShowing.moviesPagination = action.payload.nowShowing.moviesPagination;
      state.comingSoon.moviesPagination = action.payload.comingSoon.moviesPagination;
    });
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
