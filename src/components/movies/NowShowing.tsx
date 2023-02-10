import Button from '@components/shared/Button/Button';
import MovieItem from '@components/shared/MovieItem/MovieItem';
import Link from 'next/link';

function NowShowing() {
  return (
    <div className="bg-bgd">
      <div className="container flex flex-row flex-wrap content-center items-center mx-auto py-16">
        <div className="w-full">
          <div className="flex items-center justify-between w-full pb-4">
            <h2 className="text-3xl text-[#fff] leading-[100%] pl-[10px] relative">
              Phim đang chiếu <p className="underline-title"></p>
            </h2>
            <Link href="/movies/coming-soon">
              <p className=" cursor-pointer text-lg text-[#c4bfbf] pr-3">Phim sắp chiếu</p>
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            <MovieItem state="now-showing" />
            <MovieItem state="now-showing" />
            <MovieItem state="now-showing" />
            <MovieItem state="now-showing" />
            <MovieItem state="now-showing" />
            <MovieItem state="now-showing" />
            <MovieItem state="now-showing" />
            <MovieItem state="now-showing" />
          </div>
          <div className="container flex flex-row flex-wrap content-center justify-center items-center ">
            <Button className="mt-12" primary large>
              Xem thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NowShowing;
