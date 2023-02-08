import classNames from 'classnames';

interface NavbarProps {
  className?: any;
  children: React.ReactNode;
}

function Navbar({ className, children }: NavbarProps) {
  const classes = classNames('navbar flex flex-row text-[text] items-center', {
    [className]: className,
  });
  return <nav className={classes}>{children}</nav>;
}

export default Navbar;
