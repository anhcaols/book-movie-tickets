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
  style?: any;
}

const Button = forwardRef(
  ({ className, children, icon, primary, outline, small, large, disabled, onClick, style }: ButtonProps, ref: any) => {
    const classes = classNames('wrapper-btn', {
      [className]: className,
      primary,
      outline,
      small,
      large,
    });
    return (
      <button style={style} ref={ref} className={classes} onClick={onClick} disabled={disabled}>
        <span className="title text-[white] tracking-[0.6px]">{children}</span>
        {icon && <span className="flex items-center content-center">{icon}</span>}
      </button>
    );
  }
);

export default Button;
