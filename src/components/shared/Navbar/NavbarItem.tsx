/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface NavbarItemProps {
  title: any;
  icon?: boolean;
  href?: any;
  fontThin?: any;
  className?: any;
  activeNewItem?: boolean;
  onClick?: any;
}

const NavbarItem = forwardRef(
  ({ className, title, icon = false, href, fontThin, activeNewItem = false, onClick }: NavbarItemProps, ref: any) => {
    const classes = classNames(
      `navbar-item ${
        activeNewItem && 'nav-tab'
      }  relative flex items-center h-10 xl:h-20 cursor-pointer text-[#ffffffbf] text-md mr-10 hover:text-primary`,
      {
        [className]: className,
      }
    );
    return (
      <div ref={ref} className={classes} onClick={onClick}>
        <Link className={`flex hover:fill-text-primary  ${fontThin && 'font-thin'} `} href={href}>
          {title}
          {icon && <span className="navbar-icon flex  w-4 h-auto ml-[2px] fill-text">{icon}</span>}
        </Link>
      </div>
    );
  }
);

export default NavbarItem;
