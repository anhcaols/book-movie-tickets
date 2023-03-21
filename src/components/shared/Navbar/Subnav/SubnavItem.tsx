/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import classNames from 'classnames';

interface SubnavItemProps {
  className?: any;
  title?: string;
  href?: any;
  classNameImg?: any;
  fontBase?: boolean;
  img?: any;
  icon?: any;
  onClick?: any;
  target?: string;
}

function SubnavItem({
  className,
  classNameImg,
  title,
  href,
  icon = false,
  fontBase = false,
  img = false,
  onClick,
  target,
}: SubnavItemProps) {
  const classes = classNames(
    `text-base flex items-center leading-10 text-[#ffffffbf] ${fontBase ? '' : 'font-light'} hover:text-primary`,
    {
      [className]: className,
    }
  );
  return (
    <li onClick={onClick}>
      <Link href={href} className={classes} target={target}>
        {icon && <span className="mr-2">{icon}</span>}
        {title}
        {img && <img className={classNames({ [classNameImg]: classNameImg })} src={`${img}`} alt="app-store" />}
      </Link>
    </li>
  );
}

export default SubnavItem;
