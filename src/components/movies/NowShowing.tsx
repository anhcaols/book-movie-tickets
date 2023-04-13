import MovieItem from '@components/shared/movie-item/MovieItem';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { Pagination } from '@mui/material';
import { onGetMovies } from '@redux/actions/movies.action';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';

function NowShowing() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const { nowShowing } = useAppSelector(state => state.movies);
  useEffect(() => {
    dispatch(onGetMovies({ type: 'nowShowing', query: { page, limit: 8 } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="bg-bgd">
      <div className="container flex flex-row flex-wrap content-center items-center mx-auto py-16">
        <div className="w-full">
          <div className="flex items-center justify-between w-full pb-4">
            <h2 className="text-3xl text-white leading-[100%] pl-[10px] relative">
              Phim đang chiếu <p className="underline-title top-11"></p>
            </h2>
            <Link href="/movies/coming-soon">
              <p className=" cursor-pointer text-lg pr-3 hover:underline text-primary">Phim sắp chiếu</p>
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {nowShowing?.movies?.map(nowShowingMovie => (
              <MovieItem movie={nowShowingMovie} key={nowShowingMovie.id} state="now-showing" />
            ))}
          </div>
          <div className="container flex flex-row flex-wrap content-center justify-center items-center ">
            <Pagination
              count={nowShowing.moviesPagination.totalPages}
              onChange={handleChangePage}
              className="mt-12"
              size="large"
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NowShowing;
