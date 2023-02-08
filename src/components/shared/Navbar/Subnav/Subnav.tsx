import classNames from 'classnames';

interface SubnavProps {
  className?: any;
  children: React.ReactNode;
}
function Subnav({ className, children }: SubnavProps) {
  const classes = classNames('', {
    [className]: className,
  });
  return <ul className={classes}>{children}</ul>;
}

export default Subnav;
