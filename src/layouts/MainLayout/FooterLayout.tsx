import Link from 'next/link';
import { FacebookIcon, InstagramIcon, TwitterIcon, VkIcon } from '@components/shared/icons';
import Subnav from '@components/shared/Navbar/Subnav/Subnav';
import SubnavItem from '@components/shared/Navbar/Subnav/SubnavItem';

import styles from '@components/home/home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('content-head', 'relative bg-bgd')}>
      <div className="container flex flex-row flex-wrap content-center items-center mx-auto pl-[15px] pr-[15px]">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] xl:gap-[30px] my-[40px] xl:my-[70px]">
          <div className="download">
            <Subnav>
              <SubnavItem
                fontBase
                className=" hover:text-[#fff] cursor-default text-[#fff] font-medium leading-8"
                title="Download Our App"
                href={'#'}
              />
              <div className="flex items-center md:block">
                <SubnavItem
                  classNameImg="w-[140px] my-[15px] mr-[15px] md:mr-[0]"
                  img={'/assets/images/google-play.png'}
                  href={'#'}
                />
                <SubnavItem classNameImg="w-[140px]" img={'/assets/images/app-store.svg'} href={'#'} />
              </div>
            </Subnav>
          </div>
          <div className="resources">
            <Subnav>
              <SubnavItem
                fontBase
                className="mb-2 hover:text-[#fff] cursor-default text-[#fff] font-medium leading-8"
                title="Góc điện ảnh"
                href={'#'}
              />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="Thể loại phim" href={'#'} />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="Diễn viên" href={'#'} />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="Đạo diễn" href={'#'} />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="Bình luận phim" href={'#'} />
            </Subnav>
          </div>
          <div className="legal">
            <Subnav>
              <SubnavItem
                fontBase
                className="mb-2 hover:text-[#fff] cursor-default text-[#fff] font-medium leading-8"
                title="Hỗ trợ"
                href={'#'}
              />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="Góp ý" href={'#'} />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="Rạp/ giá vé" href={'#'} />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="Tuyển dụng" href={'#'} />
            </Subnav>
          </div>
          <div className="Contact">
            <Subnav>
              <SubnavItem
                fontBase
                className="mb-2 hover:text-[#fff] cursor-default text-[#fff] font-medium leading-8"
                title="Kết nối với chúng tôi"
                href={'#'}
              />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="+84.395.562.788" href={'#'} />
              <SubnavItem className="leading-8 text-[#ffffff99]" title="caotheanhls2001@gmail.com" href={'#'} />
              <div className={cx('social-media flex items-center h-[40px]')}>
                <SubnavItem
                  icon={<FacebookIcon className="fill-[#3b5999] w-[22px] h-[22px] mr-[12px]" />}
                  href={'https://www.facebook.com/anhcao.201'}
                  target="_blank"
                />
                <SubnavItem
                  icon={<InstagramIcon className="fill-[#ff55a5] w-[22px] h-[22px] mr-[12px]" />}
                  href={'https://www.instagram.com/__anhcao.201/'}
                  target="_blank"
                />
                <SubnavItem
                  icon={<TwitterIcon className="fill-[#1da1f2] w-[22px] h-[22px] mr-[12px]" />}
                  href={'https://twitter.com/caoanh0410'}
                  target="_blank"
                />
                <SubnavItem icon={<VkIcon className="fill-[#45668e] w-[22px] h-[22px] mr-[12px]" />} href={'#'} />
              </div>
            </Subnav>
          </div>
        </div>
        <div
          className={cx(
            'footer-copyright w-full flex flex-col xl:flex-row justify-between border-t-[1px] border-solid border-[#ffffff0f] py-[32px]'
          )}
        >
          <h4 className="text-[#ffffff99] text-sm pb-[20px] xl:pb-0">
            © FlixGo, 2022—2023. Create by{' '}
            <Link className="hover:underline" href={'#'}>
              Cao Anh
            </Link>
            .
          </h4>
          <div className="text-[#ffffff99] text-sm">
            <span className="mr-[30px]">Terms of Use </span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
