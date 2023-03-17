import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onGetMovies, onGetMovie } from '@redux/actions/movies.action';

interface MoviesState {
  movie: MovieEntity;
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

const initialMovie = {
  id: 0,
  name: '',
  description: '',
  releaseDate: '',
  duration: 0,
  actor: '',
  director: '',
  language: '',
  country: '',
  producer: '',
  status: 0,
  age: 0,
  image: '',
  trailer: '',
  genres: [],
  slug: '',
  scoreRate: 0,
};

const moviesInitialState: MoviesState = {
  movie: initialMovie,
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
    builder.addCase(onGetMovie.fulfilled, (state, action) => {
      state.movie = action.payload.movie;
    });

    builder.addCase(onGetMovies.fulfilled, (state, action) => {
      state.allMovies.movies = action.payload.allMovies.movies;
      state.allMovies.moviesPagination = action.payload.allMovies.moviesPagination;

      state.nowShowing.movies = action.payload.nowShowing.movies;
      state.nowShowing.moviesPagination = action.payload.nowShowing.moviesPagination;

      state.comingSoon.movies = action.payload.comingSoon.movies;
      state.comingSoon.moviesPagination = action.payload.comingSoon.moviesPagination;
    });
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
