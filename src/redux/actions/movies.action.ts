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
      moviesPagination: ApiPagination;
    };
    nowShowing?: {
      movies: MovieEntity[];
      moviesPagination: ApiPagination;
    };
    comingSoon?: {
      movies: MovieEntity[];
      moviesPagination: ApiPagination;
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
          moviesPagination: allMovies.paginationOptions,
        },
      }),
      ...(nowShowingMovies && {
        nowShowing: {
          movies: nowShowingMovies.movies,
          moviesPagination: nowShowingMovies.paginationOptions,
        },
      }),
      ...(comingSoonMovies && {
        comingSoon: {
          movies: comingSoonMovies.movies,
          moviesPagination: comingSoonMovies.paginationOptions,
        },
      }),
    };
  },
  {
    defaultErrorMessage: 'Error while fetching movies',
  }
);
