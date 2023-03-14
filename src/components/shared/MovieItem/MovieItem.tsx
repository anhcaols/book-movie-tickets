/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './movie-item.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import moment from 'moment';
import { NEXT_APP_API_BASE_URL } from '@configs/app.config';

const cx = classNames.bind(styles);
interface MovieItemProps {
  movie?: MovieEntity;
  state: string;
}

function MovieItem({ movie, state }: MovieItemProps) {
  return (
    <div className="px-[10px] xl:px-[15px] mt-[15px] md:mt-[30px] flex flex-col">
      <div className={cx('movie-image', 'relative h-[355px]')}>
        <img
          className="block rounded w-full h-full object-contain overflow-hidden"
          src={`${NEXT_APP_API_BASE_URL}/static/${movie?.image}`}
          alt={'img'}
        />
        <div className={cx('ticket', 'flex flex-col justify-center items-center gap-2')}>
          <Link href={`/movies/${state}/${movie?.slug}`}>
            <p className="text-white hover:text-primary font-normal text-[15px] opacity-[0.9]">CHI TIẾT PHIM</p>
          </Link>
          <Link href={`/book-ticket/${movie?.slug}`}>
            <Button className="w-[150px] h-10 mt-2 hover:bg-primary hover:border-none " outline>
              ĐẶT VÉ NGAY
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-[white]">
        <Link href={`/movies/${state}/slug`}>
          <h3 className="hover:text-primary text-xl mt-4 mb-1 leading-[30px] overflow-hidden whitespace-nowrap text-ellipsis ">
            {movie?.name}
          </h3>
          <p className=" font-normal text-sm text-[#cfcaca] cursor-auto">
            {moment(movie?.releaseDate).format('DD/MM/YYYY')}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default MovieItem;
