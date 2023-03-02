import MovieItem from '@components/shared/MovieItem/MovieItem';
import styles from './home.module.scss';
import classNames from 'classnames/bind';
import SimpleSlider from './Slider';
import Link from 'next/link';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div>
      <div className="mt-16">
        <SimpleSlider />
      </div>

      <div className="content-item-wrapper relative mt-11 pb-16">
        <div className="container flex flex-row flex-wrap content-center items-center mx-auto">
          <div className="w-full">
            <div className="flex items-center justify-between w-full pb-4">
              <h2 className="text-3xl text-white leading-[100%] pl-[10px] relative">
                Phim đang chiếu <p className="underline-title left-[13px] top-11"></p>
              </h2>
              <Link href="/movies/now-showing">
                <p className="hover:underline cursor-pointer text-lg text-primary pr-3 opacity-[0.9]">Xem thêm</p>
              </Link>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              <MovieItem state="now-showing" />
              <MovieItem state="now-showing" />
              <MovieItem state="now-showing" />
              <MovieItem state="now-showing" />
            </div>
          </div>
        </div>
      </div>

      <div className="content-item-wrapper relative pb-16">
        <div className="container flex flex-row flex-wrap content-center items-center mx-auto">
          <div className={cx('content-head', 'w-full')}>
            <div className="flex items-center justify-between w-full pb-4 mt-16">
              <h2 className="text-3xl text-white leading-[100%] pl-[10px] relative">
                Phim sắp chiếu <p className="underline-title left-[13px] top-11"></p>
              </h2>
              <Link href="/movies/coming-soon">
                <p className="hover:underline cursor-pointer text-lg text-primary pr-3 opacity-[0.9]">Xem thêm</p>
              </Link>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              <MovieItem state="coming-soon" />
              <MovieItem state="coming-soon" />
              <MovieItem state="coming-soon" />
              <MovieItem state="coming-soon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
