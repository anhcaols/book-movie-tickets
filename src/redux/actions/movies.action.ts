import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { moviesService } from '@services/movies.service';
import { z } from 'zod';

const getMoviesPayloadSchema = z.object({
  type: z.string(),
  query: z.object({ page: z.number(), limit: z.number() }),
});

type GetMoviesPayload = z.infer<typeof getMoviesPayloadSchema>;

export const onGetMovies = createAsyncThunkWithCustomError<
  {
    allMovies?: {
      movies: MovieEntity[];
      paginationOptions: ApiPagination;
    };
    nowShowing?: {
      movies: MovieEntity[];
      paginationOptions: ApiPagination;
    };
    comingSoon?: {
      movies: MovieEntity[];
      paginationOptions: ApiPagination;
    };
  },
  GetMoviesPayload
>(
  'movies',
  async payload => {
    getMoviesPayloadSchema.parse(payload);
    const { type, query } = payload;
    let allMovies: any;
    let nowShowingMovies: any;
    let comingSoonMovies: any;
    if (type === 'all') {
      allMovies = await moviesService.getMovies(query);
    }
    if (type === 'nowShowing') {
      nowShowingMovies = await moviesService.getNowShowingMovies(query);
    }
    if (type === 'comingSoon') {
      comingSoonMovies = await moviesService.getComingSoonMovies(query);
    }
    return {
      ...(allMovies && {
        allMovies: {
          movies: allMovies.movies,
          paginationOptions: allMovies.paginationOptions,
        },
      }),
      ...(nowShowingMovies && {
        nowShowing: {
          movies: nowShowingMovies.movies,
          paginationOptions: nowShowingMovies.paginationOptions,
        },
      }),
      ...(comingSoonMovies && {
        comingSoon: {
          movies: comingSoonMovies.movies,
          paginationOptions: comingSoonMovies.paginationOptions,
        },
      }),
    };
  },
  {
    defaultErrorMessage: 'Error while fetching movies',
  }
);

export const onCreateMovie = createAsyncThunkWithCustomError(
  'movies/create',
  async (payload: FormData) => {
    const response: any = await moviesService.createMovie(payload);
    return {
      newMovie: response.movie,
    };
  },
  {
    defaultErrorMessage: 'Error while create movie',
  }
);

export const onUpdateMovie = createAsyncThunkWithCustomError(
  'movies/update',
  async (payload: { movieId: number; updateValues: FormData }) => {
    const { movieId, updateValues } = payload;
    const response: any = await moviesService.updateMovie(movieId, updateValues);
    return {
      updateValues: response.movie,
    };
  },
  {
    defaultErrorMessage: 'Error while update movie',
  }
);

export const onDeleteMovie = createAsyncThunkWithCustomError(
  'movies/delete',
  async (payload: number) => {
    await moviesService.deleteMovie(payload);
    return {
      movieId: payload,
    };
  },
  {
    defaultErrorMessage: 'Error while delete movie',
  }
);
