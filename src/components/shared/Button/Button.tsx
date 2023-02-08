/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  className?: any;
  primary?: any;
  outline?: any;
  disabled?: any;
  small?: any;
  large?: any;
  icon?: any;
  children?: any;
  onClick?: any;
}

const Button = forwardRef(
  ({ className, children, icon, primary, outline, small, large, disabled, onClick }: ButtonProps, ref: any) => {
    const classes = classNames('wrapper-btn', {
      [className]: className,
      primary,
      outline,
      small,
      large,
    });
    return (
      <button ref={ref} className={classes} onClick={onClick} disabled={disabled}>
        {icon && <span className="flex items-center content-center">{icon}</span>}
        <span className="title text-sm text-[white] tracking-[0.6px]">{children}</span>
      </button>
    );
  }
);

export default Button;
