/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './movie-item.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';

const cx = classNames.bind(styles);
interface MovieItemProps {
  data?: any;
  state: string;
}

function MovieItem({ data, state }: MovieItemProps) {
  return (
    <div className="px-[10px] xl:px-[15px] mt-[15px] md:mt-[30px] flex flex-col">
      <div className={cx('movie-image', 'relative h-[355px]')}>
        <img
          className="block rounded w-full h-full object-cover overflow-hidden"
          src={'/assets/images/nhabanu.jpg'}
          alt={'img'}
        />
        <div className={cx('ticket', 'flex flex-col justify-center items-center gap-2')}>
          <Link href={`/movies/${state}/slug`}>
            <p className="text-white hover:text-primary font-normal text-[15px] opacity-[0.9]">CHI TIẾT PHIM</p>
          </Link>
          <Link href="/book-ticket/slug">
            <Button className="w-[150px] h-10 mt-2 hover:bg-primary hover:border-none " outline>
              ĐẶT VÉ NGAY
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-[white]">
        <Link href={`/movies/${state}/slug`}>
          <h3 className="hover:text-primary text-xl mt-4 mb-1 leading-[30px] overflow-hidden whitespace-nowrap text-ellipsis ">
            Sherlock Holmes
          </h3>
          <p className=" font-normal text-sm text-[#cfcaca] cursor-auto">24/03/2023</p>
        </Link>
      </div>
    </div>
  );
}

export default MovieItem;
