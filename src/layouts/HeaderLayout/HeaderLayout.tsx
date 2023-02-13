/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Link from 'next/link';
import Tippy from '@tippyjs/react/headless';
import { FeedbackIcon, LogoutIcon, SearchIcon, UserIcon } from '@components/shared/icons';
import Navbar, { NavbarItem } from '@components/shared/Navbar';
import PopperWrapper from '@components/shared/Popper';
import Subnav from '@components/shared/Navbar/Subnav/Subnav';
import SubnavItem from '@components/shared/Navbar/Subnav/SubnavItem';
import Button from '@components/shared/Button/Button';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './header-layout.module.scss';

const cx = classNames.bind(styles);

let userCurrent = false;
function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [iconSearch, setIconSearch] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const { pathname } = useRouter();
  console.log(styles);
  //handle Events
  const handleShowSearch = () => {
    setIconSearch(!iconSearch);
    setShowSearch(!showSearch);
  };
  const handleCloseSearch = () => {
    setIconSearch(false);
    setShowSearch(false);
  };

  const handleToggle = () => {
    setToggleBtn(!toggleBtn);
  };
  return (
    <header className={cx('header-wrapper', 'fixed top-0 right-0 left-0 z-50 bg-bgd')}>
      <div className={cx('header-top', 'bg-bgd')}>
        <div className="container h-[70px] md:h-20 flex flex-row items-center mx-auto pl-[15px] pr-[15px] ">
          {/* Logo */}
          <Link
            onClick={handleCloseSearch}
            className="logo flex justify-center items-center w-[110px] sm:w-[157px] md:w-[175px] lg:[210px] xl:w-[248px] bg-[#28282d] hover:bg-bgd"
            href={'/'}
          >
            <img
              className="w-[80px] sm:w-[100px] md:w-[120px] h-[70px] md:h-20"
              src="/assets/images/logo.svg"
              alt="img"
            />
          </Link>
          {/* Navbar */}
          <div className={cx('navbar-header ', `${toggleBtn ? 'active' : ''}`)}>
            <div onClick={handleToggle} className={cx(`overlay ${toggleBtn ? 'active' : ''}`)}></div>
            <Navbar className="ml-[40px]">
              <NavbarItem
                onClick={handleCloseSearch}
                title="Trang chủ"
                className={cx(pathname === '/' ? 'text-primary' : '')}
                href={'/'}
              />
              <NavbarItem
                onClick={handleCloseSearch}
                title="Lịch chiếu"
                className={cx(pathname === '/showtimes' ? 'text-primary' : '')}
                href={'/'}
              />
              <div>
                <Tippy
                  interactive
                  delay={[200, 500]}
                  render={(attrs: any) => (
                    <PopperWrapper>
                      <div className="" tabIndex="-1" {...attrs}>
                        <Subnav>
                          <SubnavItem title="Thể loại phim" href={'/'} />
                          <SubnavItem title="Diễn viên" href={'/'} />
                          <SubnavItem title="Đạo diễn" href={'/'} />
                          <SubnavItem title="Bình luận phim" href={'/'} />
                        </Subnav>
                      </div>
                    </PopperWrapper>
                  )}
                  placement="top-start"
                  offset={[0, 0]}
                >
                  <NavbarItem title="Góc điện ảnh" href={'/'} />
                </Tippy>
              </div>

              <NavbarItem className={cx(pathname === '/event' ? 'text-primary' : '')} title="Sự kiện" href={'/'} />
              <NavbarItem className={cx(pathname === '/help' ? 'text-primary' : '')} title="Hỗ trợ" href={'/'} />
            </Navbar>
          </div>
          {/* Action */}
          <div className="actions ml-auto flex items-center">
            <Link href={'/'} onClick={handleShowSearch}>
              <SearchIcon
                className={`${iconSearch && 'fill-[#ff55a5] '} w-[22px] h- fill-text hover:fill-[#ff55a5] `}
              />
            </Link>
            <div>
              <Tippy
                interactive
                delay={[200, 500]}
                render={(attrs: any) => (
                  <PopperWrapper>
                    <div className="" tabIndex="-1" {...attrs}>
                      <Subnav>
                        <SubnavItem title="Tiếng anh" href={'/'} />
                        <SubnavItem title="Tiếng việt" href={'/'} />
                      </Subnav>
                    </div>
                  </PopperWrapper>
                )}
                placement="top-start"
                offset={[0, 0]}
              >
                <button className="hover:text-primary text-text text-sm h-[70px] md:h-20 ml-[20px] mr-[10px] md:mr-[45px] md:ml-[35px]">
                  VN
                </button>
              </Tippy>
            </div>
            {userCurrent ? (
              <div className="avatar">
                <div>
                  <Tippy
                    interactive
                    trigger="click"
                    delay={[200, 500]}
                    render={(attrs: any) => (
                      <PopperWrapper>
                        <div className="" tabIndex="-1" {...attrs}>
                          <Subnav>
                            <SubnavItem title="View Profile" href={'/'} icon={<UserIcon />} />
                            <SubnavItem title="Feedback and help" href={'/'} icon={<FeedbackIcon />} />
                            <SubnavItem title="Logout" href={'/'} icon={<LogoutIcon />} />
                          </Subnav>
                        </div>
                      </PopperWrapper>
                    )}
                    placement="top-end"
                    offset={[18, 19]}
                  >
                    <img className="ml-[10px] xl:ml-0 w-9 h-w-9 rounded-full cursor-pointer" src="" alt="img" />
                  </Tippy>
                </div>
              </div>
            ) : (
              <>
                <Button className="hidden md:flex " primary large>
                  Đăng nhập
                </Button>
                <Button
                  className="flex md:hidden w-[40px]"
                  icon={<LogoutIcon className="fill-[#fff] w-[22px]" />}
                  primary
                  small
                ></Button>
              </>
            )}
            <button
              onClick={handleToggle}
              className={cx(
                'header-toggle-btn',
                ` block xl:hidden relative ml-[20px] md:ml-[30px]  ${toggleBtn ? 'active' : ''}`
              )}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
