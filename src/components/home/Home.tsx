import MovieItem from '@components/shared/MovieItem/MovieItem';
import styles from './home.module.scss';
import classNames from 'classnames/bind';
import SimpleSlider from './Slider';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('main-movie bg-bgd')}>
      <div className="mt-16">
        <SimpleSlider />
      </div>

      <div className="content-item-wrapper relative mt-11 pb-16">
        <div className="container flex flex-row flex-wrap content-center items-center mx-auto">
          <div className="w-full">
            <div className="flex items-center justify-between w-full px-[15px]">
              <h2 className="text-3xl text-[#fff] leading-[100%] px-[15px]">Phim đang chiếu</h2>
              <p className="underline cursor-pointer text-lg text-primary">See More</p>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
            </div>
          </div>
        </div>
      </div>

      <div className="content-item-wrapper relative pb-16">
        <div className="container flex flex-row flex-wrap content-center items-center mx-auto">
          <div className={cx('content-head', 'w-full')}>
            <div className="flex items-center mt-16 justify-between w-full px-[15px]">
              <h2 className="text-3xl text-[#fff] leading-[100%] px-[15px]">Phim sắp chiếu</h2>
              <p className="underline cursor-pointer text-lg text-primary">See More</p>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
