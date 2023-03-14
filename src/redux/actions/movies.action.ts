import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { moviesService } from '@services/movies.service';
// import { z } from 'zod';

export const onGetMovies = createAsyncThunkWithCustomError<{
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
}>(
  'movies',
  async () => {
    const allMovies: any = await moviesService.getMovies();
    const nowShowingMovies: any = await moviesService.getNowShowingMovies();
    const comingSoonMovies: any = await moviesService.getComingSoonMovies();
    return {
      allMovies: {
        movies: allMovies.movies,
        moviesPagination: allMovies.paginationOptions,
      },
      nowShowing: {
        movies: nowShowingMovies.movies,
        moviesPagination: nowShowingMovies.paginationOptions,
      },
      comingSoon: {
        movies: comingSoonMovies.movies,
        moviesPagination: comingSoonMovies.paginationOptions,
      },
    };
  },
  {
    defaultErrorMessage: 'Error while fetching projects',
  }
);
