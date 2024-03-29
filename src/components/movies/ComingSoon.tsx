import MovieItem from '@components/shared/movie-item/MovieItem';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { Pagination } from '@mui/material';
import { onGetMovies } from '@redux/actions/movies.action';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

function ComingSoon() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const { comingSoon } = useAppSelector(state => state.movies);
  useEffect(() => {
    dispatch(onGetMovies({ type: 'comingSoon', query: { page, limit: 8 } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="bg-bgd">
      <div className="container flex flex-row flex-wrap content-center items-center mx-auto py-16">
        <div className="w-full">
          <div className="flex items-center justify-between w-full pb-4">
            <h2 className="text-3xl text-white leading-[100%] pl-[10px] relative">
              Phim sắp chiếu <p className="underline-title top-11"></p>
            </h2>
            <Link href="/movies/now-showing">
              <p className=" cursor-pointer text-lg text-primary hover:underline pr-3">Phim đang chiếu</p>
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {comingSoon?.movies?.map(comingSoonMovie => (
              <MovieItem movie={comingSoonMovie} key={comingSoonMovie.id} state="coming-soon" />
            ))}
          </div>
          <div className="container flex flex-row flex-wrap content-center justify-center items-center ">
            <Pagination
              count={comingSoon.paginationOptions.totalPages}
              onChange={(event: ChangeEvent<unknown>, newPage: number) => {
                setPage(newPage);
                scroll.scrollToTop({ duration: 500, delay: 10 });
              }}
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

export default ComingSoon;
