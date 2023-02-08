import Link from 'next/link';
import Image from '../images/Image';
import styles from './movie-item.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button/Button';

const cx = classNames.bind(styles);
interface MovieItemProps {
  data?: any;
}

function MovieItem({ data }: MovieItemProps) {
  return (
    <div className="px-[10px] xl:px-[15px] mt-[15px] md:mt-[30px] flex flex-col">
      <div className={cx('movie-image', 'relative h-[355px]')}>
        <Image
          className="block rounded w-full h-full object-cover overflow-hidden"
          src={'https://image.tmdb.org/t/p/original/wsJkEzktZV83DXlQItsO1ooGGq0.jpg'}
          alt={'img'}
        />
        <div className={cx('ticket', 'flex flex-col justify-center items-center gap-2')}>
          <Link href={'/movie'}>
            <p className="text-[#fff] hover:text-primary font-normal text-[15px]">READ MORE</p>
          </Link>
          <Link href="/booking">
            <Button className="w-[150px] h-10 mt-2 hover:bg-primary hover:border-none " outline>
              BOOK IT NOW
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-[white]">
        <Link href="/">
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
