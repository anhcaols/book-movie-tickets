import Link from 'next/link';
import classNames from 'classnames';

import Image from '@components/shared/images/Image';

interface SubnavItemProps {
  className?: any;
  title?: string;
  href?: any;
  classNameImg?: any;
  fontBase?: boolean;
  img?: any;
  icon?: any;
  onClick?: any;
}

function SubnavItem({
  className,
  classNameImg,
  title,
  href,
  icon = false,
  fontBase = false,
  img = false,
}: SubnavItemProps) {
  const classes = classNames(
    `text-base flex items-center leading-10 text-[#ffffffbf] ${fontBase ? '' : 'font-light'} hover:text-primary`,
    {
      [className]: className,
    }
  );
  return (
    <li>
      <Link href={href} className={classes}>
        {icon && <span className="mr-2">{icon}</span>}
        {title}
        {img && <Image className={classNames({ [classNameImg]: classNameImg })} src={img} alt="app-store" />}
      </Link>
    </li>
  );
}

export default SubnavItem;
