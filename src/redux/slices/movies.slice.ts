import { createSlice } from '@reduxjs/toolkit';
import { onCreateMovie, onGetMovies } from '@redux/actions/movies.action';

interface MoviesState {
  allMovies: {
    movies: MovieEntity[];
    paginationOptions: ApiPagination;
  };
  nowShowing: {
    movies: MovieEntity[];
    paginationOptions: ApiPagination;
  };
  comingSoon: {
    movies: MovieEntity[];
    paginationOptions: ApiPagination;
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
    paginationOptions: initialPagination,
  },
  nowShowing: {
    movies: [],
    paginationOptions: initialPagination,
  },
  comingSoon: {
    movies: [],
    paginationOptions: initialPagination,
  },
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(onGetMovies.fulfilled, (state, action) => {
      if (action.payload.allMovies) {
        state.allMovies.movies = action.payload.allMovies.movies;
        state.allMovies.paginationOptions = action.payload.allMovies.paginationOptions;
      }

      if (action.payload.nowShowing) {
        state.nowShowing.movies = action.payload.nowShowing.movies;
        state.nowShowing.paginationOptions = action.payload.nowShowing.paginationOptions;
      }

      if (action.payload.comingSoon) {
        state.comingSoon.movies = action.payload.comingSoon.movies;
        state.comingSoon.paginationOptions = action.payload.comingSoon.paginationOptions;
      }
    });

    builder.addCase(onCreateMovie.fulfilled, (state, action) => {
      const { newMovie } = action.payload;
      state.allMovies.movies = [newMovie, ...state.allMovies.movies];
      state.allMovies.paginationOptions = {
        totalDocs: state.allMovies.paginationOptions.totalDocs + 1,
        offset: 0,
        limit: state.allMovies.paginationOptions.limit,
        page: Math.ceil(state.allMovies.paginationOptions.totalDocs / state.allMovies.paginationOptions.limit),
        totalPages: Math.ceil(state.allMovies.paginationOptions.totalDocs / state.allMovies.paginationOptions.limit),
        hasPrevPage: state.allMovies.paginationOptions.page > 1,
        hasNextPage: state.allMovies.paginationOptions.page < state.allMovies.paginationOptions.totalPages,
      };
    });
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
